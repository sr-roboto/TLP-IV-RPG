import { Guerrero } from '../dominio/Guerrero.js';
import { Mago } from '../dominio/Mago.js';
import { Monstruo } from '../dominio/Monstruo.js';
import { ItemGenerador } from '../dominio/Item.js';

export class JuegoServicio {
  #heroes;

  constructor() {
    this.#heroes = new Map();
  }

  crearHeroe(tipo, nombre) {
    if (!nombre || nombre.trim() === '') {
      throw new Error('El nombre no puede estar vacío');
    }

    if (this.#heroes.has(nombre)) {
      throw new Error(`Ya existe un héroe llamado "${nombre}"`);
    }

    let heroe;
    switch (tipo.toLowerCase()) {
      case 'guerrero':
        heroe = new Guerrero(nombre);
        heroe.agregarItem(ItemGenerador.crear('Poción de Curación'));
        break;
      case 'mago':
        heroe = new Mago(nombre);
        heroe.agregarItem(ItemGenerador.crear('Poción de Mana'));
        break;
      default:
        throw new Error('Tipo inválido. Use "guerrero" o "mago"');
    }

    this.#heroes.set(nombre, heroe);
    console.log(`Héroe ${nombre} creado!`);
    return heroe;
  }

  obtenerHeroe(nombre) {
    return this.#heroes.get(nombre) || null;
  }

  obtenerTodosLosHeroes() {
    return Array.from(this.#heroes.values());
  }

  crearMonstruo(nombre = 'Goblin Salvaje') {
    return new Monstruo(nombre, 60, 12);
  }

  iniciarCombate(nombreHeroe) {
    const heroe = this.obtenerHeroe(nombreHeroe);
    if (!heroe) {
      throw new Error(`Héroe "${nombreHeroe}" no encontrado!`);
    }

    if (!heroe.estaVivo()) {
      throw new Error(`${nombreHeroe} está muerto`);
    }

    const monstruo = this.crearMonstruo();
    console.log(`\n¡${heroe.nombre} vs ${monstruo.nombre}!`);

    let turnos = 0;
    while (heroe.estaVivo() && monstruo.estaVivo() && turnos < 10) {
      console.log(`\n--- Turno ${turnos + 1} ---`);

      console.log('Turno del héroe:');
      heroe.atacar(monstruo);

      if (!monstruo.estaVivo()) {
        console.log(`\n¡${heroe.nombre} ganó!`);

        const recompensas = [
          'Poción de Curación',
          'Poción de Mana',
          'Espada de Hierro',
        ];
        const recompensa =
          recompensas[Math.floor(Math.random() * recompensas.length)];
        heroe.agregarItem(ItemGenerador.crear(recompensa));
        console.log(`Recibiste: ${recompensa}`);
        break;
      }

      console.log('Turno del monstruo:');
      monstruo.atacar(heroe);

      if (!heroe.estaVivo()) {
        console.log(`\n${heroe.nombre} fue derrotado...`);
        break;
      }

      turnos++;
    }

    return {
      ganador: heroe.estaVivo() ? heroe.nombre : monstruo.nombre,
      turnos: turnos + 1,
    };
  }

  obtenerEstadisticas() {
    const heroes = this.obtenerTodosLosHeroes();
    return {
      totalHeroes: heroes.length,
      heroesVivos: heroes.filter((h) => h.estaVivo()).length,
      heroes: heroes.map((h) => ({
        nombre: h.nombre,
        tipo: h instanceof Guerrero ? 'Guerrero' : 'Mago',
        vida: `${h.vida}/${h.vidaMaxima}`,
        inventario: h.inventario.length,
      })),
    };
  }
}
