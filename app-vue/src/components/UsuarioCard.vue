<script setup>
import { ref } from 'vue'

const props = defineProps({
  usuario: {
    type: Object,
    required: true
  },
  esFavorito: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['cambiar-favorito'])
const mostrarExtra = ref(false)

function clickFavorito() {
  emit('cambiar-favorito', props.usuario.id)
}
</script>

<template>
  <article class="tarjeta" :class="{ favorita: esFavorito }">
    <h3>{{ usuario.name }}</h3>
    <p><strong>Correo:</strong> {{ usuario.email }}</p>
    <p><strong>Ciudad:</strong> {{ usuario.address?.city }}</p>

    <div v-if="mostrarExtra" class="info-extra">
      <p><strong>Teléfono:</strong> {{ usuario.phone }}</p>
      <p><strong>Empresa:</strong> {{ usuario.company?.name }}</p>
    </div>

    <div class="botones">
      <button class="btn-fav" @click="clickFavorito">
        {{ esFavorito ? '★ Quitar Favorito' : '☆ Favorito' }}
      </button>
      <button class="btn-extra" @click="mostrarExtra = !mostrarExtra">
        {{ mostrarExtra ? 'Ver menos' : 'Ver más' }}
      </button>
    </div>
  </article>
</template>

<style scoped>
.tarjeta {
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 15px;
  background-color: #ffffff;
  color: #222;
}
.favorita {
  border: 2px solid #eab308;
  background-color: #fefce8;
}
.info-extra {
  margin-top: 8px;
  padding-top: 8px;
  border-top: 1px dashed #ccc;
  font-size: 0.9em;
}
.botones {
  display: flex;
  gap: 10px;
  margin-top: 12px;
}
button {
  padding: 6px 10px;
  cursor: pointer;
}
</style>