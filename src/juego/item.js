export class Item {
  #nombre;
  #valor;

  constructor(nombre, valor) {
    this.#nombre = nombre;
    this.#valor = valor;
  }

  get nombre() {
    return this.#nombre;
  }

  get valor() {
    return this.#valor;
  }

  // Método polimórfico - debe ser implementado por subclases
  aplicarEfecto(personaje) {
    throw new Error('Método aplicarEfecto debe ser implementado por subclases');
  }

  toString() {
    return `${this.#nombre} - Valor: ${this.#valor}`;
  }
}
