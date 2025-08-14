import { Monstruo } from '../juego/monstruo.js';

export class MonsterService {
  #monstruos;
  #plantillasMonstruos;

  constructor() {
    this.#monstruos = new Map();
    this.#plantillasMonstruos = {
      goblin: { vida: 60, poder: 8, experiencia: 105 },
      orc: { vida: 80, poder: 12, experiencia: 145 },
      dragon: { vida: 150, poder: 20, experiencia: 225 },
      esqueleto: { vida: 40, poder: 6, experiencia: 85 },
      troll: { vida: 120, poder: 16, experiencia: 185 },
      demonio: { vida: 200, poder: 25, experiencia: 275 },
    };
  }

  crearMonstruo(nombre, tipo = 'goblin') {
    const plantilla = this.#plantillasMonstruos[tipo.toLowerCase()];
    if (!plantilla) {
      throw new Error(`Tipo de monstruo '${tipo}' no existe`);
    }

    const monstruo = new Monstruo(
      nombre,
      plantilla.vida,
      plantilla.poder,
      tipo
    );
    this.#monstruos.set(nombre, monstruo);
    return monstruo;
  }

  obtenerMonstruosDisponibles() {
    return Object.keys(this.#plantillasMonstruos);
  }

  obtenerInfoMonstruo(tipo) {
    return this.#plantillasMonstruos[tipo.toLowerCase()] || null;
  }

  crearMonstruoAleatorio() {
    const tipos = this.obtenerMonstruosDisponibles();
    const tipoAleatorio = tipos[Math.floor(Math.random() * tipos.length)];
    const nombreAleatorio = `${
      tipoAleatorio.charAt(0).toUpperCase() + tipoAleatorio.slice(1)
    } Salvaje`;

    return this.crearMonstruo(nombreAleatorio, tipoAleatorio);
  }

  crearMonstruoPorNivel(nivelHeroe) {
    // Crear monstruos apropiados para el nivel del héroe
    const tiposApropiados = [];

    if (nivelHeroe <= 2) {
      tiposApropiados.push('goblin', 'esqueleto');
    } else if (nivelHeroe <= 5) {
      tiposApropiados.push('goblin', 'esqueleto', 'orc');
    } else if (nivelHeroe <= 10) {
      tiposApropiados.push('orc', 'troll');
    } else {
      tiposApropiados.push('troll', 'demonio', 'dragon');
    }

    const tipoElegido =
      tiposApropiados[Math.floor(Math.random() * tiposApropiados.length)];
    return this.crearMonstruo(
      `${
        tipoElegido.charAt(0).toUpperCase() + tipoElegido.slice(1)
      } Nivel ${nivelHeroe}`,
      tipoElegido
    );
  }

  obtenerExperienciaPorMonstruo(tipo) {
    const plantilla = this.#plantillasMonstruos[tipo.toLowerCase()];
    return plantilla ? plantilla.experiencia : 50;
  }

  obtenerMonstruos() {
    return Array.from(this.#monstruos.values());
  }

  eliminarMonstruo(nombre) {
    return this.#monstruos.delete(nombre);
  }
}
