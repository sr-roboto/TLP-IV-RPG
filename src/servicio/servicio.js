import { Guerrero } from '../juego/guerrero.js';
import { Mago } from '../juego/mago.js';
import { Monstruo } from '../juego/monstruo.js';
import { Arma } from '../juego/arma.js';
import { Pocion } from '../juego/pocion.js';
import { Hechizo } from '../juego/hechizo.js';

export class GameService {
  #heroes;
  #monstruos;

  constructor() {
    this.#heroes = new Map();
    this.#monstruos = new Map();
  }

  crearHero(tipo, nombre) {
    if (this.#heroes.has(nombre)) {
      throw new Error(`Ya existe un héroe con el nombre ${nombre}`);
    }

    let heroe;
    switch (tipo.toLowerCase()) {
      case 'guerrero':
        heroe = new Guerrero(nombre, 100, 15);
        break;
      case 'mago':
        heroe = new Mago(nombre, 80, 50, 12);
        break;
      default:
        throw new Error("Tipo de héroe no válido. Usa 'guerrero' o 'mago'");
    }

    this.#heroes.set(nombre, heroe);

    // Dar items iniciales según el tipo de héroe
    if (tipo.toLowerCase() === 'guerrero') {
      const espadaInicial = new Arma('Espada Básica', 50, 8, 'Espada');
      const dagaInicial = new Arma('Daga Básica', 30, 5, 'Daga');
      const pocionVida = new Pocion('Poción de Vida Menor', 50, 20, 'Vida');
      heroe.inventario.agregarItem(espadaInicial);
      heroe.inventario.agregarItem(dagaInicial);
      heroe.inventario.agregarItem(pocionVida);
    } else if (tipo.toLowerCase() === 'mago') {
      const bastonInicial = new Arma('Bastón Básico', 60, 6, 'Bastón');
      const totemInicial = new Arma('Tótem Mágico', 70, 10, 'Tótem');
      const pocionMana = new Pocion('Poción de Mana', 80, 30, 'Mana');
      const hechizoCura = new Hechizo('Curación Menor', 80, 15, 25, 'Curativo');
      heroe.inventario.agregarItem(bastonInicial);
      heroe.inventario.agregarItem(totemInicial);
      heroe.inventario.agregarItem(pocionMana);
      heroe.inventario.agregarItem(hechizoCura);
    }

    return heroe;
  }

  obtenerHeroes() {
    return Array.from(this.#heroes.values());
  }

  obtenerHeroe(nombre) {
    return this.#heroes.get(nombre);
  }

  crearMonstruo(nombre, tipo = 'Goblin') {
    const monstruosDisponibles = {
      goblin: { vida: 60, poder: 8 },
      orc: { vida: 80, poder: 12 },
      dragon: { vida: 150, poder: 20 },
      esqueleto: { vida: 40, poder: 6 },
    };

    const stats =
      monstruosDisponibles[tipo.toLowerCase()] ||
      monstruosDisponibles['goblin'];
    return new Monstruo(nombre, stats.vida, stats.poder, tipo);
  }

  combate(heroe, monstruo) {
    const resultado = [];
    let turno = 1;

    resultado.push(`=== COMBATE: ${heroe.nombre} vs ${monstruo.nombre} ===`);
    resultado.push(`${heroe.nombre}: ${heroe.vida}/${heroe.vidaMaxima} HP`);
    resultado.push(`${monstruo.nombre}: ${monstruo.vida} HP`);
    resultado.push('');

    while (heroe.estaVivo() && monstruo.estaVivo()) {
      resultado.push(`--- Turno ${turno} ---`);

      // Turno del héroe
      const danioHeroe = heroe.atacar(monstruo);
      resultado.push(`${heroe.nombre} causa ${danioHeroe} de daño`);
      resultado.push(`${monstruo.nombre}: ${monstruo.vida} HP restantes`);

      if (!monstruo.estaVivo()) {
        resultado.push(`¡${monstruo.nombre} ha sido derrotado!`);
        resultado.push(`¡${heroe.nombre} gana el combate!`);
        break;
      }

      // Turno del monstruo
      const danioMonstruo = monstruo.atacar(heroe);
      resultado.push(`${monstruo.nombre} causa ${danioMonstruo} de daño`);
      resultado.push(
        `${heroe.nombre}: ${heroe.vida}/${heroe.vidaMaxima} HP restantes`
      );

      if (!heroe.estaVivo()) {
        resultado.push(`¡${heroe.nombre} ha sido derrotado!`);
        resultado.push(`¡${monstruo.nombre} gana el combate!`);
        break;
      }

      resultado.push('');
      turno++;

      // Evitar combates infinitos
      if (turno > 20) {
        resultado.push('El combate es demasiado largo. ¡Empate!');
        break;
      }
    }

    return resultado;
  }

  equiparItem(heroeName, itemName) {
    const heroe = this.#heroes.get(heroeName);
    if (!heroe) {
      throw new Error('Héroe no encontrado');
    }

    const item = heroe.inventario.buscarItem(itemName);
    if (!item) {
      throw new Error('Item no encontrado en el inventario');
    }

    if (item instanceof Arma) {
      const exito = heroe.equiparArma(item);
      if (exito) {
        return `${heroe.nombre} ha equipado ${item.nombre}`;
      } else {
        return `No se pudo equipar ${item.nombre}`;
      }
    } else {
      return `${item.nombre} no es equipable`;
    }
  }

  usarItem(heroeName, itemName) {
    const heroe = this.#heroes.get(heroeName);
    if (!heroe) {
      throw new Error('Héroe no encontrado');
    }

    const item = heroe.inventario.removerItem(itemName);
    if (!item) {
      throw new Error('Item no encontrado en el inventario');
    }

    if (item instanceof Pocion) {
      item.aplicarEfecto(heroe);
      return `${heroe.nombre} usa ${item.nombre} y recupera según su tipo`;
    } else if (item instanceof Hechizo) {
      // Verificar si el héroe puede usar el hechizo
      if (!item.puedeUsarse(heroe)) {
        // Devolver el item al inventario si no puede usarlo
        heroe.inventario.agregarItem(item);
        return `${heroe.nombre} no tiene suficiente mana para usar ${item.nombre}`;
      }

      // Consumir mana y aplicar efecto
      item.consumirMana(heroe);
      const efecto = item.aplicarEfecto(heroe);

      if (item.tipo === 'Curativo') {
        return `${heroe.nombre} lanza ${item.nombre} y se cura ${item.poder} HP`;
      } else {
        return `${heroe.nombre} preparó ${item.nombre} (poder: ${item.poder})`;
      }
    } else {
      // Devolver el item al inventario si no se puede usar
      heroe.inventario.agregarItem(item);
      return `${item.nombre} no se puede usar de esta manera`;
    }
  }
}
