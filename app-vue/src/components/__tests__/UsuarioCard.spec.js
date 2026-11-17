import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import UsuarioCard from '../UsuarioCard.vue'

describe('UsuarioCard', () => {
  it('renderiza los datos del usuario y emite el evento al hacer clic en Favorito', async () => {
    const usuarioPrueba = {
      id: 5,
      name: 'Chelsey Dietrich',
      email: 'chelsey@annie.ca',
      address: { city: 'Roscoeview' }
    }

    const wrapper = mount(UsuarioCard, {
      props: {
        usuario: usuarioPrueba,
        esFavorito: false
      }
    })

    expect(wrapper.text()).toContain('Chelsey Dietrich')
    expect(wrapper.text()).toContain('chelsey@annie.ca')
    expect(wrapper.text()).toContain('Roscoeview')

    await wrapper.find('.btn-fav').trigger('click')
    expect(wrapper.emitted('cambiar-favorito')).toBeTruthy()
    expect(wrapper.emitted('cambiar-favorito')[0]).toEqual([5])
  })
})