import { Personaje } from './personaje.js';

export class Monstruo extends Personaje {
  #poderAtaque;
  #tipo;

  constructor(nombre, vida, poderAtaque = 10, tipo = 'Bestia') {
    super(nombre, vida);
    this.#poderAtaque = poderAtaque;
    this.#tipo = tipo;
  }

  get poderAtaque() {
    return this.#poderAtaque;
  }
  get tipo() {
    return this.#tipo;
  }

  atacar(objetivo) {
    const danio = this.#poderAtaque + Math.floor(Math.random() * 5);
    console.log(
      `${this.nombre} (${
        this.#tipo
      }) ataca ferozmente causando ${danio} de daño`
    );
    objetivo.recibirDanio(danio);
    return danio;
  }
}
