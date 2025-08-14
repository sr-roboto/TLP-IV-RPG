import { Arma } from '../juego/arma.js';
import { Pocion } from '../juego/pocion.js';
import { Hechizo } from '../juego/hechizo.js';

export class InventoryService {
  equiparItem(heroe, itemName) {
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

  usarItem(heroe, itemName) {
    if (!heroe) {
      throw new Error('Héroe no encontrado');
    }

    const item = heroe.inventario.removerItem(itemName);
    if (!item) {
      throw new Error('Item no encontrado en el inventario');
    }

    try {
      if (item instanceof Pocion) {
        return this.#usarPocion(heroe, item);
      } else if (item instanceof Hechizo) {
        return this.#usarHechizo(heroe, item);
      } else {
        // Devolver el item al inventario si no se puede usar
        heroe.inventario.agregarItem(item);
        return `${item.nombre} no se puede usar de esta manera`;
      }
    } catch (error) {
      // En caso de error, devolver el item al inventario
      heroe.inventario.agregarItem(item);
      throw error;
    }
  }

  #usarPocion(heroe, pocion) {
    const vidaAntes = heroe.vida;
    const manaAntes = heroe.mana || 0;

    pocion.aplicarEfecto(heroe);

    if (pocion.tipo === 'Vida') {
      const vidaCurada = heroe.vida - vidaAntes;
      return `${heroe.nombre} usa ${pocion.nombre} y recupera ${vidaCurada} HP`;
    } else if (pocion.tipo === 'Mana' && heroe.mana !== undefined) {
      const manaRecuperado = heroe.mana - manaAntes;
      return `${heroe.nombre} usa ${pocion.nombre} y recupera ${manaRecuperado} MP`;
    } else {
      return `${heroe.nombre} usa ${pocion.nombre}`;
    }
  }

  #usarHechizo(heroe, hechizo) {
    if (!hechizo.puedeUsarse(heroe)) {
      heroe.inventario.agregarItem(hechizo);
      throw new Error(
        `${heroe.nombre} no tiene suficiente mana para usar ${hechizo.nombre}`
      );
    }

    const manaAntes = heroe.mana;
    const vidaAntes = heroe.vida;

    // Consumir mana y aplicar efecto
    hechizo.consumirMana(heroe);
    hechizo.aplicarEfecto(heroe);

    const manaConsumido = manaAntes - heroe.mana;

    if (hechizo.tipo === 'Curativo') {
      const vidaCurada = heroe.vida - vidaAntes;
      return `${heroe.nombre} lanza ${hechizo.nombre} (${manaConsumido} MP) y se cura ${vidaCurada} HP`;
    } else {
      return `${heroe.nombre} lanza ${hechizo.nombre} (${manaConsumido} MP) con poder ${hechizo.poder}`;
    }
  }

  obtenerItemsUsables(heroe) {
    if (!heroe || !heroe.inventario) {
      return [];
    }

    return heroe.inventario
      .obtenerItems()
      .filter((item) => item instanceof Pocion || item instanceof Hechizo);
  }

  obtenerArmas(heroe) {
    if (!heroe || !heroe.inventario) {
      return [];
    }

    return heroe.inventario
      .obtenerItems()
      .filter((item) => item instanceof Arma);
  }

  obtenerItemsPorTipo(heroe, tipo) {
    if (!heroe || !heroe.inventario) {
      return [];
    }

    const items = heroe.inventario.obtenerItems();

    switch (tipo.toLowerCase()) {
      case 'arma':
        return items.filter((item) => item instanceof Arma);
      case 'pocion':
        return items.filter((item) => item instanceof Pocion);
      case 'hechizo':
        return items.filter((item) => item instanceof Hechizo);
      default:
        return items;
    }
  }

  obtenerEstadisticasInventario(heroe) {
    if (!heroe || !heroe.inventario) {
      return { total: 0, armas: 0, pociones: 0, hechizos: 0, valorTotal: 0 };
    }

    const items = heroe.inventario.obtenerItems();

    return {
      total: items.length,
      armas: items.filter((item) => item instanceof Arma).length,
      pociones: items.filter((item) => item instanceof Pocion).length,
      hechizos: items.filter((item) => item instanceof Hechizo).length,
      valorTotal: items.reduce((acc, item) => acc + item.valor, 0),
      itemMasValioso: items.reduce(
        (max, item) => (item.valor > (max?.valor || 0) ? item : max),
        null
      ),
    };
  }

  organizarInventario(heroe) {
    if (!heroe || !heroe.inventario) {
      return false;
    }

    const items = heroe.inventario.obtenerItems();

    // Limpiar inventario
    heroe.inventario.items = [];

    // Reorganizar: Armas primero, luego pociones, luego hechizos
    const armas = items.filter((item) => item instanceof Arma);
    const pociones = items.filter((item) => item instanceof Pocion);
    const hechizos = items.filter((item) => item instanceof Hechizo);

    // Ordenar cada categoría por valor (descendente)
    armas.sort((a, b) => b.valor - a.valor);
    pociones.sort((a, b) => b.valor - a.valor);
    hechizos.sort((a, b) => b.valor - a.valor);

    // Reagregar al inventario
    [...armas, ...pociones, ...hechizos].forEach((item) =>
      heroe.inventario.agregarItem(item)
    );

    return true;
  }
}
