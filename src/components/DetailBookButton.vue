<script setup>
defineProps({
  fullWidth: {
    type: Boolean,
    default: false
  }
})
</script>

<template>
  <button
    type="button"
    class="detail-button"
    :class="{ 'detail-button-full': fullWidth }"
  >
    <svg
      class="detail-icon"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
    >
      <path
        fill="currentColor"
        d="M12 5c5.23 0 9.17 4.04 10.4 6.23a1.5 1.5 0 0 1 0 1.54C21.17 14.96 17.23 19 12 19S2.83 14.96 1.6 12.77a1.5 1.5 0 0 1 0-1.54C2.83 9.04 6.77 5 12 5m0 1.5c-4.56 0-8.05 3.55-9.1 5.5c1.05 1.95 4.54 5.5 9.1 5.5s8.05-3.55 9.1-5.5c-1.05-1.95-4.54-5.5-9.1-5.5"
      />
      <path
        fill="currentColor"
        d="M12 8.25A3.75 3.75 0 1 1 8.25 12A3.75 3.75 0 0 1 12 8.25m0 1.5A2.25 2.25 0 1 0 14.25 12A2.25 2.25 0 0 0 12 9.75"
      />
    </svg>
    <span class="detail-label">Ver detalle</span>
  </button>
</template>

<style scoped>
.detail-button {
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 5px;
  min-height: 54px;
  min-width: 0;
  padding: 10px 8px;
  border: none;
  border-radius: 12px;
  background: linear-gradient(135deg, #42b983, #7ad7aa);
  color: #ffffff;
  font-weight: 700;
  font-size: 0.95rem;
  line-height: 1.15;
  text-align: center;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  box-shadow: 0 8px 18px rgba(66, 185, 131, 0.22);
}

.detail-button:hover {
  transform: translateY(-1px);
}

.detail-button-full {
  width: 100%;
}

.detail-icon {
  width: 18px;
  height: 18px;
  flex-shrink: 0;
}

.detail-label {
  min-width: 0;
  white-space: normal;
  overflow-wrap: break-word;
  text-wrap: balance;
}
</style>
