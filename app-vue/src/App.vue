<script setup>
import { ref, computed, onMounted } from 'vue'
import UsuarioCard from './components/UsuarioCard.vue'

const usuarios = ref([])
const cargando = ref(true)
const error = ref('')
const textoBusqueda = ref('')
const favoritos = ref([])
const verSoloFavoritos = ref(false)

async function cargarUsuarios() {
  cargando.value = true
  error.value = ''
  try {
    const respuesta = await fetch('https://jsonplaceholder.typicode.com/users')
    if (!respuesta.ok) {
      throw new Error('Error al consultar la API')
    }
    usuarios.value = await respuesta.json()
  } catch (e) {
    error.value = 'No se pudieron cargar los usuarios: ' + e.message
  } finally {
    cargando.value = false
  }
}

function alternarFavorito(idUsuario) {
  if (favoritos.value.includes(idUsuario)) {
    favoritos.value = favoritos.value.filter(id => id !== idUsuario)
  } else {
    favoritos.value.push(idUsuario)
  }
}

const listaFiltrada = computed(() => {
  return usuarios.value.filter(u => {
    const coincideNombre = u.name.toLowerCase().includes(textoBusqueda.value.toLowerCase())
    const coincideFavorito = verSoloFavoritos.value ? favoritos.value.includes(u.id) : true
    return coincideNombre && coincideFavorito
  })
})

onMounted(() => {
  cargarUsuarios()
})
</script>

<template>
  <main class="contenedor">
    <h1>Directorio de Usuarios - Vue 3</h1>

    <section class="controles">
      <input
        v-model="textoBusqueda"
        type="text"
        placeholder="Buscar por nombre..."
      />

      <label>
        <input type="checkbox" v-model="verSoloFavoritos" />
        Solo favoritos
      </label>

      <span class="contador">Favoritos: {{ favoritos.length }}</span>
    </section>

    <p v-if="cargando">Cargando...</p>
    <p v-else-if="error" class="error">{{ error }}</p>

    <section v-else class="grilla">
      <UsuarioCard
        v-for="user in listaFiltrada"
        :key="user.id"
        :usuario="user"
        :esFavorito="favoritos.includes(user.id)"
        @cambiar-favorito="alternarFavorito"
      />
    </section>
  </main>
</template>

<style scoped>
.contenedor {
  max-width: 900px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
}
.controles {
  display: flex;
  gap: 15px;
  align-items: center;
  margin-bottom: 20px;
}
.controles input[type="text"] {
  padding: 8px;
  width: 240px;
}
.contador {
  font-weight: bold;
  background: #eee;
  color: #222;
  padding: 6px 12px;
  border-radius: 4px;
}
.grilla {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 15px;
}
.error {
  color: red;
  font-weight: bold;
}
</style>