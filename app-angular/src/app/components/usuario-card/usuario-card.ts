import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-usuario-card',
  standalone: true,
  imports: [],
  templateUrl: './usuario-card.html',
  styleUrl: './usuario-card.css'
})
class UsuarioCard {
  @Input() usuario: any;
  @Input() esFavorito: boolean = false;
  @Output() cambiarFavorito = new EventEmitter<number>();

  mostrarExtra: boolean = false;

  clickFavorito() {
    this.cambiarFavorito.emit(this.usuario.id);
  }

  alternarExtra() {
    this.mostrarExtra = !this.mostrarExtra;
  }
}
export { UsuarioCard };