export class Inventario {
  #items;

  constructor() {
    this.#items = [];
  }

  agregarItem(item) {
    this.#items.push(item);
  }

  removerItem(nombre) {
    const index = this.#items.findIndex((item) => item.nombre === nombre);
    if (index !== -1) {
      return this.#items.splice(index, 1)[0];
    }
    return null;
  }

  obtenerItems() {
    return [...this.#items];
  }

  buscarItem(nombre) {
    return this.#items.find((item) => item.nombre === nombre);
  }

  get cantidad() {
    return this.#items.length;
  }
}
