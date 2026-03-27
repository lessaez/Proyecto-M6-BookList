export const librosBase = [
  {
    id: 1,
    titulo: 'Crep\u00fasculo',
    autor: 'Stephenie Meyer',
    anio: 2005,
    precio: 15990,
    imagen: 'https://images.cdn1.buscalibre.com/fit-in/360x360/97/b0/97b024dec05c73cf6c56c3df3540cd15.jpg',
    descripcion: 'Bella Swan llega a Forks y descubre un romance imposible con Edward Cullen, un joven que guarda un secreto sobrenatural.'
  },
  {
    id: 2,
    titulo: 'Bridgerton',
    autor: 'Julia Quinn',
    anio: 2000,
    precio: 14990,
    imagen: 'https://www.espacioforestal.cl/cdn/shop/files/elduqueyyotd_1024x1024.png?v=1732201488',
    descripcion: 'Daphne Bridgerton y el duque de Hastings fingen un cortejo para sobrevivir a las reglas de la alta sociedad londinense.'
  },
  {
    id: 3,
    titulo: 'El se\u00f1or de los anillos',
    autor: 'J.R.R. Tolkien',
    anio: 1954,
    precio: 22990,
    imagen: 'https://images.cdn2.buscalibre.com/fit-in/360x360/88/13/8813e98d85a1ec7cdae072c6d74a85b2.jpg',
    descripcion: 'Frodo Bolson emprende una travesia epica para destruir el Anillo Unico antes de que Sauron domine la Tierra Media.'
  },
  {
    id: 4,
    titulo: 'Harry Potter y la piedra filosofal',
    autor: 'J.K. Rowling',
    anio: 1997,
    precio: 16990,
    imagen: 'https://images.cdn3.buscalibre.com/fit-in/360x360/ce/e6/cee6ef96dad70d3f599b953f0e50afc7.jpg',
    descripcion: 'Harry descubre que es mago y entra a Hogwarts, donde comienzan amistades, misterios y una nueva vida.'
  },
  {
    id: 5,
    titulo: 'Cien a\u00f1os de soledad',
    autor: 'Gabriel Garcia Marquez',
    anio: 1967,
    precio: 18990,
    imagen: 'https://covers.openlibrary.org/b/isbn/9780307474728-L.jpg',
    descripcion: 'La familia Buendia atraviesa generaciones de amor, guerra y destino en el mitico pueblo de Macondo.'
  },
  {
    id: 6,
    titulo: 'Orgullo y prejuicio',
    autor: 'Jane Austen',
    anio: 1813,
    precio: 13990,
    imagen: 'https://covers.openlibrary.org/b/isbn/9780141439518-L.jpg',
    descripcion: 'Elizabeth Bennet desafia prejuicios sociales y emocionales mientras su relacion con el senor Darcy cambia para siempre.'
  },
  {
    id: 7,
    titulo: 'Duna',
    autor: 'Frank Herbert',
    anio: 1965,
    precio: 21990,
    imagen: 'https://covers.openlibrary.org/b/isbn/9780441172719-L.jpg',
    descripcion: 'Paul Atreides se enfrenta a profecias, traiciones y luchas por el control del planeta desertico Arrakis.'
  },
  {
    id: 8,
    titulo: 'Los juegos del hambre',
    autor: 'Suzanne Collins',
    anio: 2008,
    precio: 15990,
    imagen: 'https://covers.openlibrary.org/b/isbn/9780439023481-L.jpg',
    descripcion: 'Katniss Everdeen toma el lugar de su hermana en una competencia mortal que expone la crueldad del Capitolio.'
  },
  {
    id: 9,
    titulo: 'La ladrona de libros',
    autor: 'Markus Zusak',
    anio: 2005,
    precio: 17990,
    imagen: 'https://covers.openlibrary.org/b/isbn/9780375842207-L.jpg',
    descripcion: 'En la Alemania nazi, Liesel encuentra refugio en los libros y en las palabras mientras el mundo se derrumba.'
  },
  {
    id: 10,
    titulo: 'Percy Jackson y el ladron del rayo',
    autor: 'Rick Riordan',
    anio: 2005,
    precio: 14990,
    imagen: 'https://covers.openlibrary.org/b/isbn/9780786838653-L.jpg',
    descripcion: 'Percy descubre que es hijo de Poseidon y debe embarcarse en una aventura mitologica para evitar una guerra entre dioses.'
  }
]

export const librosBaseMap = Object.fromEntries(
  librosBase.map((libro) => [String(libro.id), libro])
)
