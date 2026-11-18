import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UsuarioCard } from './usuario-card';

describe('UsuarioCard', () => {
  let component: UsuarioCard;
  let fixture: ComponentFixture<UsuarioCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsuarioCard]
    }).compileComponents();

    fixture = TestBed.createComponent(UsuarioCard);
    component = fixture.componentInstance;
  });

  it('debe renderizar los datos del usuario y emitir el evento al hacer clic en Favorito', () => {
    component.usuario = {
      id: 5,
      name: 'Chelsey Dietrich',
      email: 'chelsey@annie.ca',
      address: { city: 'Roscoeview' }
    };
    component.esFavorito = false;
    fixture.detectChanges();

    const elemento: HTMLElement = fixture.nativeElement;
    expect(elemento.textContent).toContain('Chelsey Dietrich');
    expect(elemento.textContent).toContain('chelsey@annie.ca');
    expect(elemento.textContent).toContain('Roscoeview');

    let idEmitido: number | undefined;
    component.cambiarFavorito.subscribe((id: number) => {
      idEmitido = id;
    });

    const boton = elemento.querySelector('.btn-fav') as HTMLButtonElement;
    boton.click();

    expect(idEmitido).toBe(5);
  });
});