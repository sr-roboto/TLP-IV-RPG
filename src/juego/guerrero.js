import { Heroe } from './heroe.js';

export class Guerrero extends Heroe {
  #fuerza;

  constructor(nombre, vida = 100, fuerza = 15, experiencia = 0, nivel = 1) {
    super(nombre, vida, experiencia, nivel);
    this.#fuerza = fuerza;
  }

  get fuerza() {
    return this.#fuerza;
  }

  atacar(objetivo) {
    let danio = this.#fuerza + this.nivel * 2; // El daño aumenta con el nivel

    // Si tiene arma equipada, añadir su daño
    if (this.armaEquipada) {
      danio += this.armaEquipada.aplicarEfecto(this);
    }

    console.log(
      `${this.nombre} ataca con fuerza brutal causando ${danio} de daño`
    );
    objetivo.recibirDanio(danio);

    // Ganar experiencia por atacar
    this.ganarExperiencia(danio * 0.1);

    return danio;
  }

  defender() {
    const reduccionDanio = Math.floor((this.#fuerza + this.nivel) * 0.3);
    console.log(
      `${this.nombre} se defiende reduciendo ${reduccionDanio} de daño`
    );
    return reduccionDanio;
  }

  // Habilidad especial del guerrero
  ataqueEspecial(objetivo) {
    const danioEspecial = (this.#fuerza + this.nivel * 3) * 1.5;
    console.log(
      `¡${this.nombre} usa GOLPE DEVASTADOR causando ${danioEspecial} de daño!`
    );
    objetivo.recibirDanio(danioEspecial);
    this.ganarExperiencia(danioEspecial * 0.15);
    return danioEspecial;
  }

  // Mejoras específicas del guerrero al subir de nivel
  mejorasEspecificas() {
    const fuerzaAnterior = this.#fuerza;
    this.#fuerza += 2; // Los guerreros ganan fuerza al subir de nivel
    console.log(`Fuerza aumentada de ${fuerzaAnterior} a ${this.#fuerza}`);
  }
}
