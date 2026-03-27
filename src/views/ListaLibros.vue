<template>
  <div class="biblioteca">
    <h2>Mis libros</h2>

    <div v-if="toast" class="toast">
      Libro agregado
    </div>

    <div class="form-grid">
      <input v-model="nuevoLibro" placeholder="Nombre del libro" />
      <input v-model="nuevoAutor" placeholder="Autor" />

      <input
        v-model="nuevoAnio"
        type="number"
        min="0"
        max="2100"
        placeholder="Año de publicación"
      />

      <select v-model="categoria">
        <option value="Fantasia">Fantasía</option>
        <option value="Aventura">Aventura</option>
        <option value="Drama">Drama</option>
        <option value="Romance">Romance</option>
        <option value="Infantil">Infantil</option>
        <option value="Ciencia Ficcion">Ciencia Ficción</option>
        <option value="Misterio">Misterio</option>
        <option value="Suspenso">Suspenso</option>
        <option value="Adulto Joven">Adulto Joven</option>
        <option value="Ficción Contemporanea">Ficción Contemporánea</option>
        <option value="Ficción Historica">Ficción Histórica</option>
        <option value="Autobiografia">Autobiografía</option>
      </select>

      <label class="upload-field">
        <span>Subir imagen</span>
        <input
          ref="imagenInput"
          type="file"
          accept="image/*"
          @change="handleImageUpload"
        />
      </label>

      <button class="add-button" @click="agregarLibro">Agregar</button>
    </div>

    <div class="image-helper">
      <div v-if="nuevaImagen" class="image-preview">
        <img :src="nuevaImagen" alt="Vista previa de la imagen subida" />
        <button class="secondary-button" @click="limpiarImagen">Quitar imagen</button>
      </div>

      <p v-else class="auto-cover-note">
        (Se debe subir la portada del libro o se generará automáticamente.)
      </p>
    </div>

    <input
      v-model="busqueda"
      placeholder="Buscar por titulo, autor o categoria..."
      class="busqueda"
    />

    <p class="contador">Total: {{ libros.length }}</p>

    <p v-if="libros.length === 0" class="empty">
      No hay libros aún. Agrega uno para empezar.
    </p>

    <div class="grid">
      <transition-group name="fade">
        <article class="card" v-for="libro in librosFiltrados" :key="libro.id">
          <img :src="libro.imagen" :alt="`Portada de ${libro.titulo}`" class="portada" />

          <button class="fav" @click="toggleFavorito(libro)">
            {{ esFavorito(libro.id) ? 'Favorito' : 'Guardar' }}
          </button>

          <h3>{{ libro.titulo }}</h3>
          <p class="meta">{{ libro.autor }}</p>
          <p class="price">Precio: {{ formatPrice(libro.precio) }}</p>
          <p class="meta">Año: {{ libro.anio }}</p>
          <p class="meta">Categoria: {{ libro.categoria }}</p>
          <p class="descripción">{{ libro.descripcion }}</p>

          <div class="progreso">
            <p>Progreso: {{ libro.progreso }}%</p>
            <input
              v-model="libro.progreso"
              type="range"
              min="0"
              max="100"
            />
          </div>

          <div class="acciones">
            <DetailBookButton full-width @click="verDetalle(libro)" />
            <BuyBookButton :book="libro" full-width />
            <button
              class="delete icon-button"
              @click="eliminarLibro(libro.id)"
              aria-label="Eliminar libro"
              title="Eliminar libro"
            >
              <svg
                class="delete-icon"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                aria-hidden="true"
                focusable="false"
              >
                <defs>
                  <mask :id="`delete-mask-${libro.id}`">
                    <path
                      fill="none"
                      stroke="#fff"
                      stroke-dasharray="18"
                      stroke-dashoffset="18"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M5 7.67h1c0.6 -0.37 1.22 -0.67 2 -0.67c2 0 3 2 5 2c1.64 0 2.6 -1.34 4 -1.83h1"
                    >
                      <animate
                        fill="freeze"
                        attributeName="stroke-dashoffset"
                        begin="0.6s"
                        dur="0.3s"
                        to="0"
                      />
                    </path>
                    <path d="M18 3l-2 18h-9l-2 -18h-5v21h24v-20Z" />
                  </mask>
                </defs>
                <path
                  fill="currentColor"
                  d="M0 0h24v24H0z"
                  :mask="`url(#delete-mask-${libro.id})`"
                />
                <path
                  fill="none"
                  stroke="currentColor"
                  stroke-dasharray="62"
                  stroke-dashoffset="62"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M18 3l-2 18h-9l-2 -18Z"
                >
                  <animate
                    fill="freeze"
                    attributeName="stroke-dashoffset"
                    dur="0.6s"
                    values="62;0"
                  />
                </path>
              </svg>
            </button>
          </div>
        </article>
      </transition-group>
    </div>
  </div>
</template>

<script>
import BuyBookButton from '../components/BuyBookButton.vue'
import DetailBookButton from '../components/DetailBookButton.vue'
import { formatBookPrice, resolveBookPrice } from '../utils/bookStore'

const COVER_THEMES = {
  Fantasia: {
    bgFrom: '#2c1c5c',
    bgTo: '#6c5ce7',
    accent: '#f7d774',
    ink: '#ffffff',
    motif: 'moon'
  },
  Aventura: {
    bgFrom: '#1d4e89',
    bgTo: '#f59f00',
    accent: '#ffe08a',
    ink: '#ffffff',
    motif: 'mountain'
  },
  Drama: {
    bgFrom: '#4a1942',
    bgTo: '#c9184a',
    accent: '#ffcad4',
    ink: '#ffffff',
    motif: 'curtain'
  },
  Romance: {
    bgFrom: '#7b2cbf',
    bgTo: '#ff6b97',
    accent: '#ffd6e7',
    ink: '#ffffff',
    motif: 'heart'
  },
  Infantil: {
    bgFrom: '#0096c7',
    bgTo: '#ffd166',
    accent: '#ffffff',
    ink: '#17324d',
    motif: 'spark'
  },
  'Ciencia Ficcion': {
    bgFrom: '#0b132b',
    bgTo: '#3a86ff',
    accent: '#8ecae6',
    ink: '#ffffff',
    motif: 'planet'
  },
  Misterio: {
    bgFrom: '#111827',
    bgTo: '#312e81',
    accent: '#c4b5fd',
    ink: '#ffffff',
    motif: 'moon'
  },
  Suspenso: {
    bgFrom: '#2b2d42',
    bgTo: '#d90429',
    accent: '#edf2f4',
    ink: '#ffffff',
    motif: 'curtain'
  },
  'Adulto Joven': {
    bgFrom: '#264653',
    bgTo: '#f4a261',
    accent: '#ffe8d6',
    ink: '#ffffff',
    motif: 'heart'
  },
  'Ficcion Contemporanea': {
    bgFrom: '#0f766e',
    bgTo: '#84a98c',
    accent: '#d8f3dc',
    ink: '#ffffff',
    motif: 'spark'
  },
  'Ficcion Historica': {
    bgFrom: '#6b4f3b',
    bgTo: '#c08552',
    accent: '#f2d0a9',
    ink: '#fff7ed',
    motif: 'mountain'
  },
  Autobiografia: {
    bgFrom: '#355070',
    bgTo: '#6d597a',
    accent: '#e5d9f2',
    ink: '#ffffff',
    motif: 'spark'
  },
}

function normalizeText(text) {
  return String(text || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
}

function escapeSvgText(text) {
  return String(text || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

function buildTitleLines(title) {
  const words = String(title || 'Nuevo libro').split(/\s+/).filter(Boolean)
  const lines = []
  let currentLine = ''

  words.forEach((word) => {
    const nextLine = currentLine ? `${currentLine} ${word}` : word

    if (nextLine.length <= 16) {
      currentLine = nextLine
      return
    }

    if (currentLine) lines.push(currentLine)
    currentLine = word
  })

  if (currentLine) lines.push(currentLine)

  return lines.slice(0, 3).map((line, index) => ({
    text: line.length > 16 ? `${line.slice(0, 13)}...` : line,
    y: 250 + index * 34
  }))
}

function inferTheme(categoria, titulo) {
  const normalizedTitle = normalizeText(titulo)

  if (normalizedTitle.includes('dragon') || normalizedTitle.includes('mago')) {
    return COVER_THEMES.Fantasia
  }

  if (normalizedTitle.includes('amor') || normalizedTitle.includes('corazon')) {
    return COVER_THEMES.Romance
  }

  if (normalizedTitle.includes('espacio') || normalizedTitle.includes('robot')) {
    return COVER_THEMES['Ciencia Ficcion']
  }

  return COVER_THEMES[categoria] || COVER_THEMES.Fantasia
}

function buildMotif(theme) {
  if (theme.motif === 'moon') {
    return `
      <circle cx="240" cy="90" r="34" fill="${theme.accent}" opacity="0.95" />
      <circle cx="255" cy="82" r="30" fill="${theme.bgFrom}" />
      <circle cx="72" cy="86" r="4" fill="${theme.accent}" />
      <circle cx="98" cy="62" r="3" fill="${theme.accent}" />
      <circle cx="120" cy="98" r="2.5" fill="${theme.accent}" />
    `
  }

  if (theme.motif === 'mountain') {
    return `
      <path d="M36 180 110 88l44 54 28-30 102 98Z" fill="${theme.accent}" opacity="0.75" />
      <path d="M0 214 88 112l50 64 34-42 148 160H0Z" fill="#ffffff" opacity="0.22" />
    `
  }

  if (theme.motif === 'curtain') {
    return `
      <path d="M32 30h256v130H32Z" fill="#ffffff" opacity="0.12" />
      <path d="M56 30h28v130H56Zm60 0h28v130h-28Zm60 0h28v130h-28Z" fill="${theme.accent}" opacity="0.42" />
    `
  }

  if (theme.motif === 'heart') {
    return `
      <path d="M160 158c-52-33-86-61-86-98 0-24 18-42 42-42 18 0 32 10 44 25 12-15 26-25 44-25 24 0 42 18 42 42 0 37-34 65-86 98Z" fill="${theme.accent}" opacity="0.88" />
    `
  }

  if (theme.motif === 'spark') {
    return `
      <circle cx="92" cy="96" r="34" fill="#ffffff" opacity="0.35" />
      <circle cx="228" cy="78" r="26" fill="#ffffff" opacity="0.28" />
      <path d="M160 28l9 24 24 9-24 9-9 24-9-24-24-9 24-9Z" fill="${theme.accent}" />
    `
  }

  return `
    <circle cx="180" cy="94" r="42" fill="${theme.accent}" opacity="0.92" />
    <ellipse cx="180" cy="94" rx="68" ry="18" fill="none" stroke="#ffffff" stroke-width="4" opacity="0.7" />
    <circle cx="76" cy="64" r="3.5" fill="#ffffff" opacity="0.85" />
    <circle cx="100" cy="92" r="2.5" fill="#ffffff" opacity="0.6" />
  `
}

function generateDescription({ titulo, autor, categoria, anio }) {
  const authorLabel = autor || 'un autor por descubrir'
  const yearLabel = anio || 'una epoca indefinida'
  const categoryPhrases = {
    Fantasia: 'una aventura llena de magia, secretos y mundos imaginarios',
    Aventura: 'un viaje cargado de desafios, movimiento y descubrimientos',
    Drama: 'una historia intensa centrada en emociones, conflictos y decisiones',
    Romance: 'una historia emocional donde los vinculos y sentimientos marcan el ritmo',
    Infantil: 'un relato creativo pensado para despertar imaginacion y curiosidad',
    'Ciencia Ficción': 'una propuesta futurista con ideas sorprendentes y atmosfera tecnologica',
    Misterio: 'un relato enigmatico donde las pistas y lo desconocido marcan el camino',
    Suspenso: 'una historia de tension creciente que mantiene la intriga hasta el final',
    'Adulto Joven': 'una lectura cercana y emotiva sobre cambios, identidad y descubrimiento',
    'Ficcion Contemporanea': 'una mirada actual a vinculos, decisiones y desafios cotidianos',
    'Ficcion Historica': 'una recreación narrativa de otra epoca con personajes y conflictos memorables',
    Autobiografia: 'un recorrido personal lleno de recuerdos, aprendizajes y experiencias reales'
  }

  const baseText = categoryPhrases[categoria] || 'una historia especial dentro de tu biblioteca'

  return `${titulo} es una propuesta de ${baseText}, firmada por ${authorLabel} y asociada a ${yearLabel}.`
}

function createGeneratedCover({ titulo, autor, categoria, anio }) {
  const theme = inferTheme(categoria, titulo)
  const safeTitle = buildTitleLines(titulo)
  const titleSvg = safeTitle
    .map(
      (line) =>
        `<text x="34" y="${line.y}" fill="${theme.ink}" font-size="28" font-weight="700" font-family="Arial, sans-serif">${escapeSvgText(line.text)}</text>`
    )
    .join('')

  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 480">
      <defs>
        <linearGradient id="cover-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="${theme.bgFrom}" />
          <stop offset="100%" stop-color="${theme.bgTo}" />
        </linearGradient>
      </defs>
      <rect width="320" height="480" rx="30" fill="url(#cover-gradient)" />
      <rect x="20" y="20" width="280" height="440" rx="24" fill="#ffffff" opacity="0.08" />
      ${buildMotif(theme)}
      <rect x="32" y="336" width="256" height="2" fill="${theme.accent}" opacity="0.6" />
      <text x="34" y="52" fill="${theme.accent}" font-size="14" font-weight="700" font-family="Arial, sans-serif">${escapeSvgText(categoria.toUpperCase())}</text>
      ${titleSvg}
      <text x="34" y="382" fill="${theme.ink}" opacity="0.88" font-size="18" font-family="Arial, sans-serif">${escapeSvgText(autor || 'Autor no indicado')}</text>
      <text x="34" y="414" fill="${theme.ink}" opacity="0.72" font-size="16" font-family="Arial, sans-serif">${escapeSvgText(anio || 'Ano no disponible')}</text>
    </svg>
  `

  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`
}

function normalizeBook(book) {
  return {
    id: book.id ?? Date.now(),
    titulo: book.titulo || 'Sin titulo',
    autor: book.autor || 'Autor no indicado',
    anio: book.anio || 'No disponible',
    categoria: book.categoria || 'Fantasia',
    descripcion:
      book.descripcion ||
      generateDescription({
        titulo: book.titulo,
        autor: book.autor,
        categoria: book.categoria,
        anio: book.anio
      }),
    imagen:
      book.imagen ||
      createGeneratedCover({
        titulo: book.titulo,
        autor: book.autor,
        categoria: book.categoria,
        anio: book.anio
      }),
    progreso: Number(book.progreso ?? 0),
    precio: resolveBookPrice(book.precio)
  }
}

export default {
  components: {
    BuyBookButton,
    DetailBookButton
  },

  data() {
    return {
      nuevoLibro: '',
      nuevoAutor: '',
      nuevoAnio: '',
      nuevaImagen: '',
      categoria: 'Fantasia',
      busqueda: '',
      libros: [],
      favoritos: [],
      toast: false
    }
  },

  mounted() {
    const data = localStorage.getItem('libros')
    if (data) {
      this.libros = JSON.parse(data).map((libro) => normalizeBook(libro))
    }

    const fav = localStorage.getItem('favoritos')
    if (fav) {
      this.favoritos = JSON.parse(fav).map((libro) => normalizeBook(libro))
    }
  },

  computed: {
    librosFiltrados() {
      const query = this.busqueda.toLowerCase().trim()

      if (!query) return this.libros

      return this.libros.filter((libro) =>
        [libro.titulo, libro.autor, libro.categoria, libro.anio]
          .some((value) => String(value).toLowerCase().includes(query))
      )
    }
  },

  watch: {
    libros: {
      handler(nuevos) {
        localStorage.setItem('libros', JSON.stringify(nuevos))
      },
      deep: true
    },
    favoritos: {
      handler(nuevos) {
        localStorage.setItem('favoritos', JSON.stringify(nuevos))
      },
      deep: true
    }
  },

  methods: {
    handleImageUpload(event) {
      const file = event.target.files?.[0]

      if (!file) {
        this.nuevaImagen = ''
        return
      }

      const reader = new FileReader()
      reader.onload = () => {
        this.nuevaImagen = typeof reader.result === 'string' ? reader.result : ''
      }
      reader.readAsDataURL(file)
    },

    limpiarImagen() {
      this.nuevaImagen = ''

      if (this.$refs.imagenInput) {
        this.$refs.imagenInput.value = ''
      }
    },

    agregarLibro() {
      const titulo = this.nuevoLibro.trim()

      if (titulo === '') return

      const libro = normalizeBook({
        id: Date.now(),
        titulo,
        autor: this.nuevoAutor.trim(),
        anio: this.nuevoAnio ? String(this.nuevoAnio) : 'No disponible',
        categoria: this.categoria,
        imagen: this.nuevaImagen,
        progreso: 0
      })

      this.libros.push(libro)
      this.nuevoLibro = ''
      this.nuevoAutor = ''
      this.nuevoAnio = ''
      this.categoria = 'Fantasia'
      this.toast = true
      this.limpiarImagen()

      setTimeout(() => {
        this.toast = false
      }, 2000)
    },

    eliminarLibro(id) {
      this.libros = this.libros.filter((libro) => libro.id !== id)
      this.favoritos = this.favoritos.filter((libro) => libro.id !== id)
    },

    verDetalle(libro) {
      this.$router.push({
        name: 'DetalleLibro',
        params: { id: libro.id }
      })
    },

    toggleFavorito(libro) {
      const existe = this.favoritos.find((favorito) => favorito.id === libro.id)

      if (existe) {
        this.favoritos = this.favoritos.filter((favorito) => favorito.id !== libro.id)
        return
      }

      this.favoritos.push(libro)
    },

    esFavorito(id) {
      return this.favoritos.some((favorito) => favorito.id === id)
    },

    formatPrice(price) {
      return formatBookPrice(price)
    }
  }
}
</script>

<style scoped>
.biblioteca {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 12px;
  align-items: stretch;
}

input,
select,
.upload-field {
  padding: 10px 12px;
  border-radius: 10px;
  border: 1px solid #ccc;
  background: rgba(255, 255, 255, 0.9);
}

.upload-field {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  cursor: pointer;
  font-weight: 700;
}

.upload-field input {
  display: none;
}

button {
  padding: 10px 14px;
  border: none;
  border-radius: 8px;
  background: #42b983;
  color: white;
  cursor: pointer;
  transition: all 0.2s ease;
}

button:hover {
  transform: scale(1.03);
}

.add-button {
  min-height: 48px;
}

.secondary-button {
  background: #ff9d76;
}

.image-helper {
  display: flex;
  align-items: center;
  justify-content: center;
}

.auto-cover-note {
  margin: 0;
  max-width: 760px;
  padding: 14px 16px;
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.7);
  color: #615866;
  text-align: center;
}

.image-preview {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 10px 14px;
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.7);
}

.image-preview img {
  width: 68px;
  height: 98px;
  object-fit: cover;
  border-radius: 10px;
}

.busqueda {
  width: 100%;
  max-width: 360px;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 18px;
}

.card {
  position: relative;
  display: flex;
  flex-direction: column;
  min-width: 0;
  gap: 8px;
  padding: 15px;
  border-radius: 18px;
  background: linear-gradient(135deg, #ff9a9e, #fad0c4);
  transition: transform 0.3s ease;
  box-shadow: 0 8px 20px rgba(47, 42, 51, 0.08);
}

.card:hover {
  transform: translateY(-5px);
}

.portada {
  width: 100%;
  height: 250px;
  object-fit: cover;
  border-radius: 14px;
}

.card h3 {
  margin: 0;
  min-width: 0;
  line-height: 1.2;
  overflow-wrap: anywhere;

  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;

  /* estándar */
  line-clamp: 2;
}

.meta,
.price,
.descripcion,
.card p[class*='descrip'] {
  margin: 0;
  min-width: 0;
  overflow-wrap: anywhere;
}

.meta {
  color: #4c4550;
}

.price {
  color: #2f684e;
  font-weight: 700;
}

.descripcion,
.card p[class*='descrip'] {
  color: #403943;
  line-height: 1.45;
 display: -webkit-box;
-webkit-line-clamp: 2;
-webkit-box-orient: vertical;
overflow: hidden;

line-clamp: 2;
}

.progreso {
  margin-top: auto;
}

.progreso p {
  margin: 0 0 6px;
}

.fav {
  position: absolute;
  top: 24px;
  right: 24px;
  background: rgba(47, 42, 51, 0.15);
  color: #2f2a33;
}

.delete {
  background: #ff5c5c;
}

.icon-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 52px;
}

.delete-icon {
  width: 22px;
  height: 22px;
  display: block;
}

.acciones {
  margin-top: 10px;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 10px;
  align-items: stretch;
}

.acciones > * {
  min-width: 0;
}

.acciones > button:not(.icon-button),
.acciones > :deep(button) {
  width: 100%;
}

.acciones .icon-button {
  grid-column: 1 / -1;
  justify-self: center;
  width: 56px;
  min-width: 56px;
  min-height: 46px;
}

.empty {
  text-align: center;
  color: #777;
}

.contador {
  font-weight: bold;
}

.toast {
  position: fixed;
  top: 20px;
  right: 20px;
  background: #42b983;
  color: white;
  padding: 12px 18px;
  border-radius: 12px;
  font-weight: bold;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.4s ease;
}

.fade-enter-from {
  opacity: 0;
  transform: scale(0.9);
}

.fade-leave-to {
  opacity: 0;
  transform: scale(0.8);
}

@media (max-width: 640px) {
  .form-grid,
  .image-preview {
    grid-template-columns: 1fr;
    flex-direction: column;
  }

  .acciones {
    grid-template-columns: 1fr;
  }

  .acciones .icon-button {
    grid-column: auto;
  }

  .fav {
    top: 18px;
    right: 18px;
  }
}
</style>
