import { createRouter, createWebHashHistory } from 'vue-router'
import InicioView from '../views/InicioView.vue'
import ListaLibros from '../views/ListaLibros.vue'
import DetalleLibro from '../views/DetalleLibro.vue'
import SobreNosotrosView from '../views/SobreNosotrosView.vue'
import ContactoView from '../views/ContactoView.vue'

const routes = [
  {
    path: '/',
    name: 'Inicio',
    component: InicioView
  },
  {
    path: '/libros',
    name: 'Libros',
    component: ListaLibros
  },
  {
    path: '/libros/:id',
    name: 'DetalleLibro',
    component: DetalleLibro,
    props: true
  },
  {
    path: '/sobre-nosotros',
    name: 'SobreNosotros',
    component: SobreNosotrosView
  },
  {
    path: '/contacto',
    name: 'Contacto',
    component: ContactoView
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/'
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router