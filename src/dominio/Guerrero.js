import { Personaje } from './Personaje.js';

export class Guerrero extends Personaje {
  #fuerza;
  #inventario;

  constructor(nombre, vida = 120, fuerza = 15) {
    super(nombre, vida);
    this.#fuerza = fuerza;
    this.#inventario = [];
  }

  get fuerza() {
    return this.#fuerza;
  }

  get inventario() {
    return [...this.#inventario];
  }

  atacar(objetivo) {
    const danio = Math.floor(Math.random() * this.#fuerza) + 5;
    console.log(`${this.nombre} ataca con su espada!`);
    objetivo.recibirDanio(danio);
    return danio;
  }

  agregarItem(item) {
    this.#inventario.push(item);
    console.log(`${this.nombre} obtuvo: ${item.nombre}`);
  }

  usarItem(indice) {
    if (indice >= 0 && indice < this.#inventario.length) {
      const item = this.#inventario.splice(indice, 1)[0];
      item.aplicarEfecto(this);
      return item;
    }
    return null;
  }

  toString() {
    return `Guerrero ${super.toString()} - Fuerza: ${this.#fuerza}`;
  }
}
