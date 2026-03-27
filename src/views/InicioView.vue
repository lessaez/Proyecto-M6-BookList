<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import BuyBookButton from '../components/BuyBookButton.vue'
import DetailBookButton from '../components/DetailBookButton.vue'
import { librosBase } from '../data/libros'
import { formatBookPrice } from '../utils/bookStore'

const router = useRouter()

const nombre = ref('')
const usuario = ref('')
const libros = librosBase

const syncUsuario = () => {
  usuario.value = localStorage.getItem('usuario') || ''
}

onMounted(() => {
  syncUsuario()
  window.addEventListener('usuario-actualizado', syncUsuario)
})

onUnmounted(() => {
  window.removeEventListener('usuario-actualizado', syncUsuario)
})

const guardarUsuario = () => {
  if (nombre.value.trim() === '') return

  localStorage.setItem('usuario', nombre.value)
  syncUsuario()
  window.dispatchEvent(new Event('usuario-actualizado'))
  nombre.value = ''
}

const verDetalle = (libro) => {
  router.push({
    name: 'DetalleLibro',
    params: { id: libro.id }
  })
}
</script>

<template>
  <div class="inicio">
    <div v-if="!usuario" class="login">
      <h2>Bienvenid@s</h2>
      <p class="intro">Ingresa tu nombre para guardar tu biblioteca personal.</p>

      <input v-model="nombre" placeholder="Ingresa tu nombre" />
      <button @click="guardarUsuario">Entrar</button>
    </div>

    <div v-else>
      <h2>Hola {{ usuario }}</h2>
      <p class="intro">Recomendaciones para empezar tu proxima lectura.</p>

      <div class="grid">
        <div class="card" v-for="libro in libros" :key="libro.id">
          <img :src="libro.imagen" :alt="`Portada de ${libro.titulo}`" />
          <h3>{{ libro.titulo }}</h3>
          <p class="autor">{{ libro.autor }}</p>
          <p class="meta">Año: {{ libro.anio }}</p>
          <p class="price">{{ formatBookPrice(libro.precio) }}</p>
          <p class="descripción">{{ libro.descripcion }}</p>

          <div class="acciones">
            <DetailBookButton full-width @click="verDetalle(libro)" />
            <BuyBookButton :book="libro" full-width />
          </div>
        </div>
      </div>

      <router-link to="/libros" class="link-button">
        Ir a mis libros
      </router-link>
    </div>
  </div>
</template>

<style scoped>
.inicio {
  text-align: center;
}

.intro {
  margin-bottom: 20px;
}

.login {
  max-width: 420px;
  margin: 0 auto;
  padding: 24px;
  border-radius: 18px;
  background: rgba(255, 255, 255, 0.8);
}

.login input {
  width: 100%;
  max-width: 260px;
  padding: 10px;
  border-radius: 8px;
  margin: 12px 0;
  border: 1px solid #d8ceda;
}

button,
.link-button {
  display: inline-block;
  padding: 10px 14px;
  border-radius: 8px;
  border: none;
  background: #42b983;
  color: white;
  cursor: pointer;
  text-decoration: none;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 18px;
  margin-top: 20px;
}

.card {
  display: flex;
  flex-direction: column;
  min-width: 0;
  gap: 8px;
  padding: 16px;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.86);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.card h3,
.autor,
.meta,
.price,
.descripcion {
  min-width: 0;
  overflow-wrap: anywhere;
}

.card img {
  width: 130px;
  height: 190px;
  object-fit: cover;
  border-radius: 10px;
  margin: 0 auto 12px;
}

.autor,
.meta,
.price,
.descripcion {
  margin: 0;
}

.meta {
  color: #6d6674;
}

.price {
  font-weight: 700;
  color: #2f684e;
}

.descripcion {
  color: #564f5c;
  line-height: 1.45;
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  overflow: hidden;
  line-clamp: 3;
}

.acciones {
  margin-top: auto;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 10px;
}

.acciones > * {
  min-width: 0;
}

.link-button {
  margin-top: 24px;
}

@media (max-width: 640px) {
  .acciones {
    grid-template-columns: 1fr;
  }
}
</style>
