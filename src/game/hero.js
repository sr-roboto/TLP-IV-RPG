import { Personaje } from './character.js';

export class Heroe extends Personaje {
  constructor(
    salud,
    nombre,
    stamina,
    mana,
    nivel,
    vidas,
    experiencia,
    tipoDaño
  ) {
    super(salud, nombre, stamina, mana, nivel);
    this.vidas = vidas;
    this.experiencia = experiencia;
    this.tipoDaño = tipoDaño;
  }

  atacar(objetivo) {
    const daño = this.calcularDaño();
    console.log(
      `${this.nombre} ataca con ${this.tipoDaño} causando ${daño} de daño`
    );
    objetivo.recibirAtaque(daño);
    this.ganarExperiencia(daño * 0.2);
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

  subirNivel() {
    this.nivel += 1;
    this.experiencia = 0;
    this.salud += 5;
    this.stamina += 5;
    this.mana += 5;
    console.log(`${this.nombre} ha subido al nivel ${this.nivel}!`);
  }

  ganarExperiencia(exp) {
    this.experiencia += exp;
    console.log(`${this.nombre} ha ganado ${exp} de experiencia.`);
    if (this.experiencia >= this.nivel * 100) {
      this.subirNivel();
    }
  }
}
