export class Personaje {
  #nombre;
  #vida;
  #vidaMaxima;

  constructor(nombre, vida) {
    this.#nombre = nombre;
    this.#vida = vida;
    this.#vidaMaxima = vida;
  }

  // Getters básicos
  get nombre() {
    return this.#nombre;
  }
  get vida() {
    return this.#vida;
  }
  get vidaMaxima() {
    return this.#vidaMaxima;
  }

  // Método polimórfico - debe ser implementado por subclases
  atacar(objetivo) {
    throw new Error('Método atacar debe ser implementado por subclases');
  }

  recibirDanio(danio) {
    this.#vida = Math.max(0, this.#vida - danio);
  }

  curar(cantidad) {
    this.#vida = Math.min(this.#vidaMaxima, this.#vida + cantidad);
  }

  estaVivo() {
    return this.#vida > 0;
  }
}
