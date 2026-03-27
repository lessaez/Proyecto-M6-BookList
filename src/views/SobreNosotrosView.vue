<template>
  <section class="info-page">
    <div class="info-card">
      <p class="eyebrow">Sobre nosotros</p>
      <h2>BookList nace para ordenar lecturas de una forma simple y cercana.</h2>
      <p>
        Este proyecto busca reunir tus libros favoritos en un solo espacio, con una
        interfaz amable para descubrir, registrar, comprar y seguir tu progreso de lectura.
      </p>
      <p>
        La idea principal es que puedas construir tu propia biblioteca digital,
        guardar detalles importantes y volver facilmente a cada historia.
      </p>
    </div>
  </section>
</template>

<style scoped>
.info-page {
  display: flex;
  justify-content: center;
}

.info-card {
  width: min(760px, 100%);
  padding: 28px;
  border-radius: 24px;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.95), rgba(255, 240, 232, 0.92));
  box-shadow: 0 12px 28px rgba(47, 42, 51, 0.08);
}

.eyebrow {
  margin: 0 0 10px;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  font-size: 0.82rem;
  font-weight: 700;
  color: #ff7a7a;
}

h2 {
  margin-top: 0;
}

p {
  line-height: 1.65;
  color: #554d59;
}
</style>
