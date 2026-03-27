<template>
  <section class="info-page">
    <div class="info-card">
      <p class="eyebrow">Contacto</p>
      <h2>Estamos disponibles para ideas, mejoras y nuevas recomendaciones.</h2>
      <div class="contact-grid">
        <div class="contact-item">
          <span class="label">Correo</span>
          <p>contacto@booklist.cl</p>
        </div>
        <div class="contact-item">
          <span class="label">Telefono</span>
          <p>+56 9 1234 5678</p>
        </div>
        <div class="contact-item">
          <span class="label">Horario</span>
          <p>Lunes a viernes, 09:00 a 18:00</p>
        </div>
        <div class="contact-item">
          <span class="label">Direccion</span>
          <p>Santiago, Chile</p>
        </div>
      </div>
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
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.95), rgba(235, 247, 255, 0.92));
  box-shadow: 0 12px 28px rgba(47, 42, 51, 0.08);
}

.eyebrow {
  margin: 0 0 10px;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  font-size: 0.82rem;
  font-weight: 700;
  color: #3a86ff;
}

h2 {
  margin-top: 0;
}

.contact-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 16px;
  margin-top: 20px;
}

.contact-item {
  padding: 18px;
  border-radius: 18px;
  background: rgba(255, 255, 255, 0.72);
}

.label {
  display: inline-block;
  margin-bottom: 8px;
  font-size: 0.85rem;
  font-weight: 700;
  color: #5a6470;
  text-transform: uppercase;
}

p {
  margin: 0;
  color: #434b54;
}
</style>
