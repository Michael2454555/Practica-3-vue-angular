import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UsuarioCard } from './components/usuario-card/usuario-card';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule, UsuarioCard],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  usuarios: any[] = [];
  cargando: boolean = true;
  error: string = '';
  textoBusqueda: string = '';
  favoritos: number[] = [];
  verSoloFavoritos: boolean = false;

  ngOnInit() {
    this.cargarUsuarios();
  }

  async cargarUsuarios() {
    this.cargando = true;
    this.error = '';
    try {
      const respuesta = await fetch('https://jsonplaceholder.typicode.com/users');
      if (!respuesta.ok) {
        throw new Error('Error al consultar la API');
      }
      this.usuarios = await respuesta.json();
    } catch (e: any) {
      this.error = 'No se pudieron cargar los usuarios: ' + e.message;
    } finally {
      this.cargando = false;
    }
  }

  alternarFavorito(idUsuario: number) {
    if (this.favoritos.includes(idUsuario)) {
      this.favoritos = this.favoritos.filter(id => id !== idUsuario);
    } else {
      this.favoritos.push(idUsuario);
    }
  }

  get listaFiltrada() {
    return this.usuarios.filter(u => {
      const coincideNombre = u.name.toLowerCase().includes(this.textoBusqueda.toLowerCase());
      const coincideFav = this.verSoloFavoritos ? this.favoritos.includes(u.id) : true;
      return coincideNombre && coincideFav;
    });
  }
}