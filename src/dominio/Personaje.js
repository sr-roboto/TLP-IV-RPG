export class Personaje {
  #nombre;
  #vida;
  #vidaMaxima;

  constructor(nombre, vida = 100) {
    this.#nombre = nombre;
    this.#vida = vida;
    this.#vidaMaxima = vida;
  }

  get nombre() {
    return this.#nombre;
  }
  get vida() {
    return this.#vida;
  }
  get vidaMaxima() {
    return this.#vidaMaxima;
  }

  atacar(objetivo) {
    throw new Error('Método atacar() debe ser implementado por subclases');
  }

  recibirDanio(danio) {
    this.#vida = Math.max(0, this.#vida - danio);
    console.log(
      `${this.#nombre} recibe ${danio} puntos de daño. Vida: ${this.#vida}/${
        this.#vidaMaxima
      }`
    );
  }

  curar(cantidad) {
    const vidaAnterior = this.#vida;
    this.#vida = Math.min(this.#vidaMaxima, this.#vida + cantidad);
    const curacionReal = this.#vida - vidaAnterior;
    console.log(
      `${this.#nombre} se cura ${curacionReal} puntos. Vida: ${this.#vida}/${
        this.#vidaMaxima
      }`
    );
  }

  estaVivo() {
    return this.#vida > 0;
  }

  toString() {
    return `${this.#nombre} (${this.#vida}/${this.#vidaMaxima} HP)`;
  }
}
