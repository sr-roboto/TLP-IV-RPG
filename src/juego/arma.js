import { Item } from './item.js';

export class Arma extends Item {
  #danio;
  #tipo;

  constructor(nombre, valor, danio, tipo = 'Espada') {
    super(nombre, valor);
    this.#danio = danio;
    this.#tipo = tipo;
  }

  get danio() {
    return this.#danio;
  }
  get tipo() {
    return this.#tipo;
  }

  aplicarEfecto(personaje) {
    // Las armas añaden daño al ataque
    return this.#danio;
  }

  toString() {
    return `${this.nombre} (${this.#tipo}) - Daño: ${this.#danio}`;
  }
}
