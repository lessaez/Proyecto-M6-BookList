<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import BuyBookButton from '../components/BuyBookButton.vue'
import { librosBaseMap } from '../data/libros'
import { formatBookPrice, resolveBookPrice } from '../utils/bookStore'

const route = useRoute()

const libro = computed(() => {
  const id = String(route.params.id)
  const guardados = JSON.parse(localStorage.getItem('libros') || '[]')
  const encontrado = guardados.find((item) => String(item.id) === id)

  if (encontrado) {
    return {
      id: encontrado.id,
      titulo: encontrado.titulo,
      autor: encontrado.autor || 'Autor no indicado',
      imagen: encontrado.imagen || 'https://placehold.co/240x360?text=BookList',
      descripcion: encontrado.descripcion || 'Libro agregado por el usuario en su biblioteca personal.',
      anio: encontrado.anio || 'No disponible',
      precio: resolveBookPrice(encontrado.precio),
      categoria: encontrado.categoria || 'Sin categoria',
      progreso: encontrado.progreso ?? 0
    }
  }

  if (!librosBaseMap[id]) return null

  return {
    ...librosBaseMap[id],
    precio: resolveBookPrice(librosBaseMap[id].precio)
  }
})
</script>

<template>
  <div v-if="libro" class="detalle">
    <div class="card">
      <img :src="libro.imagen" :alt="`Portada de ${libro.titulo}`" />

      <h2>{{ libro.titulo }}</h2>
      <p class="autor">{{ libro.autor }}</p>
      <p class="meta">Ano de publicacion: {{ libro.anio }}</p>
      <p class="price">Precio: {{ formatBookPrice(libro.precio) }}</p>
      <p v-if="libro.categoria" class="meta">Categoria: {{ libro.categoria }}</p>
      <p v-if="libro.progreso !== undefined" class="meta">Progreso: {{ libro.progreso }}%</p>
      <p class="descripcion">{{ libro.descripcion }}</p>

      <div class="acciones">
        <BuyBookButton :book="libro" full-width />
        <router-link to="/libros">
          <button>Volver</button>
        </router-link>
      </div>
    </div>
  </div>

  <div v-else class="error">
    <h2>Libro no encontrado</h2>
  </div>
</template>

<style scoped>
.detalle {
  display: flex;
  justify-content: center;
}

.card {
  background: rgba(255, 255, 255, 0.9);
  min-width: 0;
  padding: 20px;
  border-radius: 20px;
  max-width: 350px;
  text-align: center;
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.15);
  transition: transform 0.3s ease;
}

.card:hover {
  transform: translateY(-5px);
}

img {
  width: 150px;
  height: 220px;
  object-fit: cover;
  border-radius: 12px;
  margin: 0 auto 15px;
}

.card h2,
.autor {
  min-width: 0;
  overflow-wrap: anywhere;
}

.card h2 {
  margin: 0 0 8px;
  line-height: 1.2;
}

.autor {
  font-weight: bold;
  margin-bottom: 8px;
}

.meta {
  margin: 4px 0;
  overflow-wrap: anywhere;
}

.price {
  margin: 4px 0;
  font-weight: 700;
  color: #2f684e;
  overflow-wrap: anywhere;
}

.descripcion {
  font-size: 14px;
  color: #555;
  margin-top: 12px;
  overflow-wrap: anywhere;
}

button {
  padding: 10px 15px;
  border-radius: 10px;
  border: none;
  background: #42b983;
  color: white;
  cursor: pointer;
}

.acciones {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
  margin-top: 18px;
}

.acciones :deep(a) {
  display: block;
}

.acciones button {
  width: 100%;
}

.error {
  text-align: center;
}

@media (max-width: 640px) {
  .acciones {
    grid-template-columns: 1fr;
  }
}
</style>
