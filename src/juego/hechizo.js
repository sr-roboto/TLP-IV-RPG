import { Item } from './item.js';

export class Hechizo extends Item {
  #costoMana;
  #poder;
  #tipo;

  constructor(nombre, valor, costoMana, poder, tipo = 'Ofensivo') {
    super(nombre, valor);
    this.#costoMana = costoMana;
    this.#poder = poder;
    this.#tipo = tipo;
  }

  get costoMana() {
    return this.#costoMana;
  }
  get poder() {
    return this.#poder;
  }
  get tipo() {
    return this.#tipo;
  }

  aplicarEfecto(personaje) {
    // Los hechizos tienen diferentes efectos según su tipo
    switch (this.#tipo) {
      case 'Ofensivo':
        return this.#poder; // Daño mágico
      case 'Curativo':
        personaje.curar(this.#poder);
        return 0; // No añade daño de ataque
      case 'Defensivo':
        // Podría reducir daño recibido, por ahora solo retorna 0
        return 0;
      default:
        return this.#poder;
    }
  }

  puedeUsarse(personaje) {
    // Verificar si el personaje tiene suficiente mana
    return personaje.mana && personaje.mana >= this.#costoMana;
  }

  consumirMana(personaje) {
    if (personaje.mana && personaje.mana >= this.#costoMana) {
      personaje.mana -= this.#costoMana;
      return true;
    }
    return false;
  }

  toString() {
    return `${this.nombre} (${this.#tipo}) - Poder: ${
      this.#poder
    }, Costo Mana: ${this.#costoMana}`;
  }
}
