import { Item } from './item.js';

export class Pocion extends Item {
  #curacion;
  #tipo;

  constructor(nombre, valor, curacion, tipo = 'Vida') {
    super(nombre, valor);
    this.#curacion = curacion;
    this.#tipo = tipo;
  }

  get curacion() {
    return this.#curacion;
  }
  get tipo() {
    return this.#tipo;
  }

  aplicarEfecto(personaje) {
    switch (this.#tipo) {
      case 'Vida':
        personaje.curar(this.#curacion);
        break;
      case 'Mana':
        if (personaje.recuperarMana) {
          personaje.recuperarMana(this.#curacion);
        }
        break;
      case 'Fuerza':
        // Podría aumentar temporalmente la fuerza
        console.log(`${personaje.nombre} se siente más fuerte!`);
        break;
    }
    return 0; // Las pociones no añaden daño de ataque
  }

  toString() {
    return `${this.nombre} (${this.#tipo}) - ${this.#tipo}: +${this.#curacion}`;
  }
}
