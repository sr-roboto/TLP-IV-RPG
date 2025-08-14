import { Personaje } from './personaje.js';
import { Inventario } from './inventario.js';

export class Heroe extends Personaje {
  #experiencia;
  #nivel;
  #inventario;
  #armaEquipada;

  constructor(nombre, vida, experiencia = 0, nivel = 1) {
    super(nombre, vida);
    this.#experiencia = experiencia;
    this.#nivel = nivel;
    this.#inventario = new Inventario();
    this.#armaEquipada = null;
  }

  get experiencia() {
    return this.#experiencia;
  }
  get nivel() {
    return this.#nivel;
  }
  get inventario() {
    return this.#inventario;
  }
  get armaEquipada() {
    return this.#armaEquipada;
  }

  // Método base para atacar - será sobrescrito por subclases específicas
  atacar(objetivo) {
    throw new Error(
      'Método atacar debe ser implementado por subclases específicas (Guerrero/Mago)'
    );
  }

  recibirDanio(danio) {
    super.recibirDanio(danio);
    if (!this.estaVivo()) {
      console.log(`${this.nombre} ha sido derrotado.`);
    }
  }

  equiparArma(arma) {
    if (this.#inventario.buscarItem(arma.nombre)) {
      this.#armaEquipada = arma;
      return true;
    }
    return false;
  }

  ganarExperiencia(exp) {
    this.#experiencia += exp;
    console.log(`${this.nombre} ha ganado ${exp} de experiencia.`);
    console.log(
      `Experiencia actual: ${this.#experiencia}/${this.#nivel * 100}`
    );
    if (this.#experiencia >= this.#nivel * 100) {
      this.subirNivel();
    }
  }

  subirNivel() {
    const nivelAnterior = this.#nivel;

    // 1. Aumentar nivel y resetear experiencia (común para todos los héroes)
    this.#nivel += 1;
    this.#experiencia = 0;

    // 2. Mejoras de vida (común para todos los héroes)
    const vidaAnterior = this.vidaMaxima;
    super.aumentarVidaMaxima(10);

    // 3. Permitir que las subclases apliquen sus mejoras específicas
    this.mejorasEspecificas();

    // 4. Mostrar mensaje de subida de nivel
    console.log(
      `¡${this.nombre} ha subido del nivel ${nivelAnterior} al nivel ${
        this.#nivel
      }!`
    );
    console.log(
      `Vida máxima aumentada de ${vidaAnterior} a ${this.vidaMaxima}`
    );
  }

  mejorasEspecificas() {
    throw new Error(
      'Método mejorasEspecificas debe ser implementado por subclases específicas (Guerrero/Mago)'
    );
  }
}
