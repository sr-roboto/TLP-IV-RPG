import { Personaje } from './Personaje.js';

export class Monstruo extends Personaje {
  #poderAtaque;

  constructor(nombre, vida = 60, poderAtaque = 12) {
    super(nombre, vida);
    this.#poderAtaque = poderAtaque;
  }

  get poderAtaque() {
    return this.#poderAtaque;
  }

  atacar(objetivo) {
    const danio = Math.floor(Math.random() * this.#poderAtaque) + 3;
    console.log(`👹 ${this.nombre} ataca ferozmente!`);
    objetivo.recibirDanio(danio);
    return danio;
  }

  toString() {
    return `👹 ${super.toString()}`;
  }
}
