import { Personaje } from './Personaje.js';

export class Mago extends Personaje {
  #mana;
  #inteligencia;
  #inventario;

  constructor(nombre, vida = 80, mana = 50, inteligencia = 20) {
    super(nombre, vida);
    this.#mana = mana;
    this.#inteligencia = inteligencia;
    this.#inventario = [];
  }

  get mana() {
    return this.#mana;
  }

  get inteligencia() {
    return this.#inteligencia;
  }

  get inventario() {
    return [...this.#inventario];
  }

  atacar(objetivo) {
    const costoMana = 10;

    if (this.#mana < costoMana) {
      console.log(`${this.nombre} no tiene mana! Ataque débil.`);
      const danio = Math.floor(Math.random() * 5) + 1;
      objetivo.recibirDanio(danio);
      return danio;
    }

    this.#mana -= costoMana;
    const danio = Math.floor(Math.random() * this.#inteligencia) + 8;
    console.log(`${this.nombre} lanza un hechizo! Mana: ${this.#mana}`);
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

  restaurarMana(cantidad) {
    this.#mana = Math.min(50, this.#mana + cantidad); // Máximo 50 de mana
    console.log(
      `${this.nombre} restaura ${cantidad} de mana. Mana: ${this.#mana}/50`
    );
  }

  toString() {
    return `Mago ${super.toString()} - Int: ${this.#inteligencia}, Mana: ${
      this.#mana
    }`;
  }
}
