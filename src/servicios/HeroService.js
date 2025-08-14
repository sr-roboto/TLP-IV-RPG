import { Guerrero } from '../juego/guerrero.js';
import { Mago } from '../juego/mago.js';
import { ItemFactory } from './ItemFactory.js';

export class HeroService {
  #heroes;

  constructor() {
    this.#heroes = new Map();
  }

  crearHeroe(tipo, nombre) {
    if (this.#heroes.has(nombre)) {
      throw new Error(`Ya existe un héroe con el nombre ${nombre}`);
    }

    let heroe;
    switch (tipo.toLowerCase()) {
      case 'guerrero':
        heroe = new Guerrero(nombre, 100, 15);
        this.#darItemsIniciales(heroe, 'guerrero');
        break;
      case 'mago':
        heroe = new Mago(nombre, 80, 50, 12);
        this.#darItemsIniciales(heroe, 'mago');
        break;
      default:
        throw new Error("Tipo de héroe no válido. Usa 'guerrero' o 'mago'");
    }

    this.#heroes.set(nombre, heroe);
    return heroe;
  }

  #darItemsIniciales(heroe, tipo) {
    const itemFactory = new ItemFactory();

    if (tipo === 'guerrero') {
      const items = itemFactory.crearItemsIniciales('guerrero');
      items.forEach((item) => heroe.inventario.agregarItem(item));
    } else if (tipo === 'mago') {
      const items = itemFactory.crearItemsIniciales('mago');
      items.forEach((item) => heroe.inventario.agregarItem(item));
    }
  }

  obtenerHeroes() {
    return Array.from(this.#heroes.values());
  }

  obtenerHeroe(nombre) {
    return this.#heroes.get(nombre);
  }

  existeHeroe(nombre) {
    return this.#heroes.has(nombre);
  }

  eliminarHeroe(nombre) {
    return this.#heroes.delete(nombre);
  }

  contarHeroes() {
    return this.#heroes.size;
  }

  buscarHeroesPorTipo(tipo) {
    return this.obtenerHeroes().filter(
      (heroe) => heroe.constructor.name.toLowerCase() === tipo.toLowerCase()
    );
  }

  obtenerEstadisticasHeroes() {
    const heroes = this.obtenerHeroes();
    return {
      total: heroes.length,
      guerreros: heroes.filter((h) => h instanceof Guerrero).length,
      magos: heroes.filter((h) => h instanceof Mago).length,
      nivelPromedio:
        heroes.reduce((acc, h) => acc + h.nivel, 0) / heroes.length || 0,
      experienciaTotal: heroes.reduce((acc, h) => acc + h.experiencia, 0),
    };
  }
}
