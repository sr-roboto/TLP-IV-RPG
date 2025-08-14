import { Arma } from '../juego/arma.js';
import { Pocion } from '../juego/pocion.js';
import { Hechizo } from '../juego/hechizo.js';

export class ItemServicio {
  constructor() {
    this.plantillasArmas = {
      guerrero: [
        { nombre: 'Espada Básica', valor: 50, danio: 8, tipo: 'Espada' },
        { nombre: 'Daga Básica', valor: 30, danio: 5, tipo: 'Daga' },
      ],
      mago: [
        { nombre: 'Bastón Básico', valor: 60, danio: 6, tipo: 'Bastón' },
        { nombre: 'Tótem Mágico', valor: 70, danio: 10, tipo: 'Tótem' },
      ],
    };

    this.plantillasPociones = {
      guerrero: [
        {
          nombre: 'Poción de Vida Menor',
          valor: 50,
          curacion: 20,
          tipo: 'Vida',
        },
      ],
      mago: [
        { nombre: 'Poción de Mana', valor: 80, curacion: 30, tipo: 'Mana' },
      ],
    };

    this.plantillasHechizos = {
      mago: [
        {
          nombre: 'Curación Menor',
          valor: 80,
          costeMana: 15,
          poder: 25,
          tipo: 'Curativo',
        },
      ],
    };
  }

  crearItemsIniciales(tipoHeroe) {
    const items = [];

    // Agregar armas
    const armas = this.plantillasArmas[tipoHeroe] || [];
    armas.forEach((plantilla) => {
      items.push(
        new Arma(
          plantilla.nombre,
          plantilla.valor,
          plantilla.danio,
          plantilla.tipo
        )
      );
    });

    // Agregar pociones
    const pociones = this.plantillasPociones[tipoHeroe] || [];
    pociones.forEach((plantilla) => {
      items.push(
        new Pocion(
          plantilla.nombre,
          plantilla.valor,
          plantilla.curacion,
          plantilla.tipo
        )
      );
    });

    // Agregar hechizos (solo para magos)
    const hechizos = this.plantillasHechizos[tipoHeroe] || [];
    hechizos.forEach((plantilla) => {
      items.push(
        new Hechizo(
          plantilla.nombre,
          plantilla.valor,
          plantilla.costeMana,
          plantilla.poder,
          plantilla.tipo
        )
      );
    });

    return items;
  }

  crearArma(nombre, valor, danio, tipo) {
    return new Arma(nombre, valor, danio, tipo);
  }

  crearPocion(nombre, valor, curacion, tipo) {
    return new Pocion(nombre, valor, curacion, tipo);
  }

  crearHechizo(nombre, valor, costeMana, poder, tipo) {
    return new Hechizo(nombre, valor, costeMana, poder, tipo);
  }

  crearArmaAleatoria(nivel = 1) {
    const tipos = ['Espada', 'Daga', 'Bastón', 'Tótem', 'Hacha', 'Arco'];
    const nombres = ['Básica', 'Común', 'Rara', 'Épica', 'Legendaria'];

    const tipo = tipos[Math.floor(Math.random() * tipos.length)];
    const calidad =
      nombres[Math.min(Math.floor(nivel / 2), nombres.length - 1)];
    const nombre = `${tipo} ${calidad}`;

    const danioBase = 5 + nivel * 3;
    const valorBase = 50 + nivel * 25;

    return new Arma(nombre, valorBase, danioBase, tipo);
  }

  crearPocionAleatoria(nivel = 1) {
    const tipos = ['Vida', 'Mana'];
    const calidades = ['Menor', 'Común', 'Mayor', 'Superior', 'Suprema'];

    const tipo = tipos[Math.floor(Math.random() * tipos.length)];
    const calidad =
      calidades[Math.min(Math.floor(nivel / 2), calidades.length - 1)];
    const nombre = `Poción de ${tipo} ${calidad}`;

    const curacionBase = 15 + nivel * 5;
    const valorBase = 40 + nivel * 15;

    return new Pocion(nombre, valorBase, curacionBase, tipo);
  }

  crearHechizoAleatorio(nivel = 1) {
    const tipos = ['Curativo', 'Ofensivo', 'Defensivo'];
    const nombres = ['Menor', 'Común', 'Mayor', 'Superior', 'Maestro'];

    const tipo = tipos[Math.floor(Math.random() * tipos.length)];
    const calidad =
      nombres[Math.min(Math.floor(nivel / 3), nombres.length - 1)];

    let nombre, costeMana, poder;

    switch (tipo) {
      case 'Curativo':
        nombre = `Curación ${calidad}`;
        costeMana = 10 + nivel * 3;
        poder = 20 + nivel * 5;
        break;
      case 'Ofensivo':
        nombre = `Rayo ${calidad}`;
        costeMana = 15 + nivel * 4;
        poder = 15 + nivel * 4;
        break;
      case 'Defensivo':
        nombre = `Escudo ${calidad}`;
        costeMana = 12 + nivel * 3;
        poder = 10 + nivel * 3;
        break;
    }

    const valorBase = 60 + nivel * 30;

    return new Hechizo(nombre, valorBase, costeMana, poder, tipo);
  }
}
