import { Personaje } from './personaje.js';

export class Monstruo extends Personaje {
  constructor(salud, nombre, stamina, mana, nivel, tipo, poderAtaque) {
    super(salud, nombre, stamina, mana, nivel);
    this.poderAtaque = poderAtaque;
    this.tipo = tipo;
  }

  atacar(objetivo) {
    const daño = this.calcularDaño();
    console.log(
      `${this.nombre} ataca con poder ${this.poderAtaque} causando ${daño} de daño`
    );
    objetivo.recibirAtaque(daño);
  }

  estaVivo() {
    return this.salud > 0;
  }

  recibirAtaque(daño) {
    this.salud -= daño;
    console.log(`${this.nombre} ha recibido ${daño} de daño.`);
    if (!this.estaVivo()) {
      console.log(`${this.nombre} ha muerto.`);
    }
  }

  calcularDaño() {
    return 10 + this.nivel * 2;
  }
}
