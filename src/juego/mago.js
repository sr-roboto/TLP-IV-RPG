import { Heroe } from './heroe.js';

export class Mago extends Heroe {
  #mana;
  #manaMaximo;
  #inteligencia;

  constructor(
    nombre,
    vida = 80,
    mana = 50,
    inteligencia = 12,
    experiencia = 0,
    nivel = 1
  ) {
    super(nombre, vida, experiencia, nivel);
    this.#mana = mana;
    this.#manaMaximo = mana;
    this.#inteligencia = inteligencia;
  }

  get mana() {
    return this.#mana;
  }
  get manaMaximo() {
    return this.#manaMaximo;
  }
  get inteligencia() {
    return this.#inteligencia;
  }

  atacar(objetivo) {
    const costoMana = 10;
    if (this.#mana < costoMana) {
      console.log(`${this.nombre} no tiene suficiente mana para atacar`);
      return 0;
    }

    this.#mana -= costoMana;
    let danio = this.#inteligencia + this.nivel * 3; // El daño mágico aumenta más con el nivel

    // Si tiene arma equipada (bastón mágico), añadir su daño
    if (this.armaEquipada) {
      danio += this.armaEquipada.aplicarEfecto(this);
    }

    console.log(
      `${this.nombre} lanza un hechizo causando ${danio} de daño mágico`
    );
    objetivo.recibirDanio(danio);

    // Ganar experiencia por atacar
    this.ganarExperiencia(danio * 0.1);

    return danio;
  }

  recuperarMana(cantidad) {
    this.#mana = Math.min(this.#manaMaximo, this.#mana + cantidad);
  }

  consumirMana(cantidad) {
    this.#mana = Math.max(0, this.#mana - cantidad);
  }

  // Habilidad especial del mago
  hechizoEspecial(objetivo) {
    const costoManaEspecial = 25;
    if (this.#mana < costoManaEspecial) {
      console.log(
        `${this.nombre} no tiene suficiente mana para el hechizo especial`
      );
      return 0;
    }

    this.#mana -= costoManaEspecial;
    const danioEspecial = (this.#inteligencia + this.nivel * 4) * 1.8;
    console.log(
      `¡${this.nombre} lanza BOLA DE FUEGO causando ${danioEspecial} de daño mágico devastador!`
    );
    objetivo.recibirDanio(danioEspecial);
    this.ganarExperiencia(danioEspecial * 0.15);
    return danioEspecial;
  }

  // Sobrescribir mejorasEspecificas para aumentar también el mana
  mejorasEspecificas() {
    const manaAnterior = this.#manaMaximo;
    const inteligenciaAnterior = this.#inteligencia;

    this.#manaMaximo += 15;
    this.#mana = this.#manaMaximo; // Recuperar mana completo
    this.#inteligencia += 2; // Aumentar inteligencia al subir de nivel

    console.log(
      `Mana máximo aumentado de ${manaAnterior} a ${this.#manaMaximo}`
    );
    console.log(
      `Inteligencia aumentada de ${inteligenciaAnterior} a ${
        this.#inteligencia
      }`
    );
  }
}
