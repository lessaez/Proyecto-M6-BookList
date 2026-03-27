<template>
  <div v-if="loading" class="splash">
    <img :src="logoSrc" alt="Logo de BookList" class="splash-logo" />
    <p>Tu biblioteca digital</p>
  </div>

  <div v-else :class="['app-shell', { 'app-shell-dark': isDark }]">
    <header class="header">
      <div class="header-left">
        <img :src="logoSrc" alt="Logo de BookList" class="logo-img" />
      </div>

      <nav class="nav">
        <router-link to="/">Inicio</router-link>
        <router-link to="/sobre-nosotros">Sobre nosotros</router-link>
        <router-link to="/libros">Mis libros</router-link>
        <router-link to="/contacto">Contacto</router-link>
      </nav>

      <div class="header-right">
        <button class="theme-toggle" type="button" @click="toggleDark">
          {{ isDark ? 'Claro' : 'Oscuro' }}
        </button>

        <button
          v-if="usuario"
          class="logout-button"
          type="button"
          @click="cerrarSesion"
        >
          Cerrar sesión
        </button>

        <p v-if="usuario" class="user">{{ usuario }}</p>
      </div>
    </header>

    <main class="content">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>

    <footer class="footer">
      <div>
        <p class="footer-title">BookList</p>
        <p class="footer-text">Un espacio simple para guardar y revisar tus libros.</p>
      </div>

      <div class="footer-links">
        <router-link to="/">Inicio</router-link>
        <router-link to="/libros">Mis libros</router-link>
        <router-link to="/sobre-nosotros">Sobre nosotros</router-link>
        <router-link to="/contacto">Contacto</router-link>
      </div>
    </footer>

    <p class="copy">BookList | Todos los derechos reservados</p>

    <div class="page-counter">
      Paginas vistas: <strong>{{ totalViews }}</strong>
    </div>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import logoSrc from './assets/img/logo.png.png'

const route = useRoute()
const router = useRouter()

const loading = ref(true)
const isDark = ref(false)
const usuario = ref('')
const totalViews = ref(Number(localStorage.getItem('contadorPaginas') || '0'))

const syncUsuario = () => {
  usuario.value = localStorage.getItem('usuario') || ''
}

onMounted(() => {
  syncUsuario()
  isDark.value = localStorage.getItem('modoOscuro') === 'true'

  window.addEventListener('usuario-actualizado', syncUsuario)
  window.addEventListener('storage', syncUsuario)

  window.setTimeout(() => {
    loading.value = false
  }, 500)
})

onUnmounted(() => {
  window.removeEventListener('usuario-actualizado', syncUsuario)
  window.removeEventListener('storage', syncUsuario)
})

watch(
  () => route.fullPath,
  () => {
    totalViews.value += 1
    localStorage.setItem('contadorPaginas', String(totalViews.value))
  },
  { immediate: true }
)

const toggleDark = () => {
  isDark.value = !isDark.value
  localStorage.setItem('modoOscuro', String(isDark.value))
}

const cerrarSesion = async () => {
  localStorage.removeItem('usuario')
  syncUsuario()
  window.dispatchEvent(new Event('usuario-actualizado'))
  await router.push('/')
}
</script>

<style>
* {
  box-sizing: border-box;
}

body {
  margin: 0;
  font-family: 'Poppins', sans-serif;
  background: #fff7ef;
  color: #2f2a33;
}

a {
  color: inherit;
}

.app-shell {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 24px;
  background:
    radial-gradient(circle at top left, rgba(255, 122, 122, 0.2), transparent 28%),
    radial-gradient(circle at top right, rgba(122, 215, 255, 0.16), transparent 30%),
    #fff7ef;
}

.app-shell-dark {
  background:
    radial-gradient(circle at top left, rgba(255, 122, 122, 0.15), transparent 28%),
    radial-gradient(circle at top right, rgba(122, 215, 255, 0.14), transparent 30%),
    #1d1a22;
  color: #f6eff8;
}

.header {
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  gap: 18px;
  padding: 18px 28px;
  border-radius: 22px;
  background: rgba(255, 255, 255, 0.75);
  backdrop-filter: blur(14px);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.08);
}

.logo-img {
  width: 350px;
  height: auto;
  object-fit: contain;
  transition: transform 0.2s ease;
}

.logo-img:hover {
  transform: scale(1.05);
}

.nav {
  display: flex;
  justify-content: center;
  gap: 18px;
  flex-wrap: wrap;
}

.nav a,
.footer-links a {
  padding: 10px 20px;
  border-radius: 999px;
  font-weight: 600;
  text-decoration: none;
  color: #2f2a33;
  transition: all 0.25s ease;
}

.nav a.router-link-exact-active,
.footer-links a.router-link-exact-active {
  background: linear-gradient(135deg, #2f2a33, #4b4453);
  color: white;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.nav a:hover,
.footer-links a:hover {
  background: rgba(0, 0, 0, 0.05);
}

.header-right {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
  justify-content: flex-end;
}

.theme-toggle {
  border: none;
  border-radius: 999px;
  padding: 10px 18px;
  color: white;
  font-weight: 600;
  cursor: pointer;
  background: linear-gradient(135deg, #ff9d76, #ff7a7a);
  box-shadow: 0 4px 12px rgba(255, 122, 122, 0.4);
  transition: transform 0.2s ease;
}

.theme-toggle:hover,
.logout-button:hover {
  transform: scale(1.05);
}

.logout-button {
  border: 1px solid rgba(47, 42, 51, 0.12);
  border-radius: 999px;
  padding: 10px 16px;
  background: rgba(255, 255, 255, 0.88);
  color: #4b4453;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(47, 42, 51, 0.08);
  transition: transform 0.2s ease, background-color 0.2s ease;
}

.logout-button:hover {
  background: rgba(255, 245, 240, 1);
}

.user {
  margin: 0;
  font-weight: 700;
}

.content {
  flex: 1;
  padding: 28px;
  border-radius: 24px;
  background: rgba(255, 255, 255, 0.74);
  box-shadow: 0 12px 30px rgba(47, 42, 51, 0.08);
}

.app-shell-dark .content {
  background: rgba(35, 31, 41, 0.84);
  box-shadow: none;
}

.footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 18px;
  padding: 20px 24px;
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.82);
  box-shadow: 0 12px 30px rgba(47, 42, 51, 0.08);
}

.footer-title {
  margin: 0 0 6px;
  font-weight: 700;
}

.footer-text {
  margin: 0;
  color: #6a6072;
}

.footer-links {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.copy {
  margin: 0;
  text-align: center;
  font-size: 0.95rem;
}

.page-counter {
  position: fixed;
  left: 50%;
  bottom: 18px;
  transform: translateX(-50%);
  z-index: 30;
  padding: 10px 18px;
  border-radius: 999px;
  background: linear-gradient(135deg, rgba(255, 122, 122, 0.95), rgba(255, 211, 110, 0.95));
  color: #2f2a33;
  box-shadow: 0 10px 24px rgba(47, 42, 51, 0.16);
  backdrop-filter: blur(10px);
  font-weight: 700;
}

.page-counter strong {
  color: #7a2222;
}

.app-shell-dark .logout-button {
  color: #1f1a24;
  background: rgba(255, 211, 110, 0.92);
  border-color: rgba(255, 211, 110, 0.2);
}

.app-shell-dark .page-counter {
  background: linear-gradient(135deg, rgba(255, 157, 118, 0.95), rgba(122, 215, 255, 0.9));
  color: #201b24;
}

.app-shell-dark .page-counter strong {
  color: #4b1f00;
}

.splash {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  background: linear-gradient(135deg, #ff7a7a, #ffd36e, #7ad7ff);
  color: #fff;
}

.splash-logo {
  width: 140px;
  animation: zoom 0.8s ease;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease, transform 0.25s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(10px);
}

@keyframes zoom {
  from {
    opacity: 0;
    transform: scale(0.7);
  }

  to {
    opacity: 1;
    transform: scale(1);
  }
}

@media (max-width: 980px) {
  .header {
    grid-template-columns: 1fr;
    justify-items: center;
    text-align: center;
  }

  .header-right {
    justify-content: center;
  }

  .logo-img {
    width: min(320px, 100%);
  }
}

@media (max-width: 640px) {
  .app-shell {
    padding: 16px;
  }

  .content {
    padding: 20px;
  }

  .footer {
    flex-direction: column;
    align-items: flex-start;
  }

  .page-counter {
    width: calc(100% - 32px);
    text-align: center;
    bottom: 12px;
  }
}
</style>
