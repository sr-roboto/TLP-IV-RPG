import { HeroeServicio } from './heroeServicio.js';
import { MonstruoServicio } from './monstruoServicio.js';
import { CombateServicio } from './CombateServicio.js';
import { InventarioServicio } from './inventarioServicio.js';
import { ItemServicio } from './itemServicio.js';

export class JuegoServicio {
  constructor() {
    this.heroeServicio = new HeroeServicio();
    this.monstruoServicio = new MonstruoServicio();
    this.combateServicio = new CombateServicio();
    this.inventarioServicio = new InventarioServicio();
    this.itemServicio = new ItemServicio();
  }

  // ===== MÉTODOS DE HÉROES =====
  crearHero(tipo, nombre) {
    return this.heroeServicio.crearHeroe(tipo, nombre);
  }

  obtenerHeroes() {
    return this.heroeServicio.obtenerHeroes();
  }

  obtenerHeroe(nombre) {
    return this.heroeServicio.obtenerHeroe(nombre);
  }

  obtenerEstadisticasHeroes() {
    return this.heroeServicio.obtenerEstadisticasHeroes();
  }

  // ===== MÉTODOS DE MONSTRUOS =====
  crearMonstruo(nombre, tipo = 'goblin') {
    return this.monstruoServicio.crearMonstruo(nombre, tipo);
  }

  crearMonstruoAleatorio() {
    return this.monstruoServicio.crearMonstruoAleatorio();
  }

  crearMonstruoPorNivel(nivelHeroe) {
    return this.monstruoServicio.crearMonstruoPorNivel(nivelHeroe);
  }

  obtenerMonstruosDisponibles() {
    return this.monstruoServicio.obtenerMonstruosDisponibles();
  }

  // ===== MÉTODOS DE COMBATE =====
  combate(heroe, monstruo) {
    return this.combateServicio.combate(heroe, monstruo);
  }

  simularCombate(heroe, monstruo) {
    return this.combateServicio.simularCombate(heroe, monstruo);
  }

  // ===== MÉTODOS DE INVENTARIO =====
  equiparItem(heroeName, itemName) {
    const heroe = this.heroeServicio.obtenerHeroe(heroeName);
    return this.inventarioServicio.equiparItem(heroe, itemName);
  }

  usarItem(heroeName, itemName) {
    const heroe = this.heroeServicio.obtenerHeroe(heroeName);
    return this.inventarioServicio.usarItem(heroe, itemName);
  }

  obtenerItemsUsables(heroe) {
    return this.inventarioServicio.obtenerItemsUsables(heroe);
  }

  obtenerArmas(heroe) {
    return this.inventarioServicio.obtenerArmas(heroe);
  }

  // ===== MÉTODOS DE ITEMS =====
  crearArmaAleatoria(nivel = 1) {
    return this.itemServicio.crearArmaAleatoria(nivel);
  }

  crearPocionAleatoria(nivel = 1) {
    return this.itemServicio.crearPocionAleatoria(nivel);
  }

  crearHechizoAleatorio(nivel = 1) {
    return this.itemServicio.crearHechizoAleatorio(nivel);
  }

  // ===== MÉTODOS DE UTILIDAD =====
  darRecompensas(heroe, nivel = 1) {
    const recompensas = [];
    const probabilidades = [0.7, 0.5, 0.3]; // Arma, Poción, Hechizo

    probabilidades.forEach((prob, index) => {
      if (Math.random() < prob) {
        let item;
        switch (index) {
          case 0:
            item = this.itemServicio.crearArmaAleatoria(nivel);
            break;
          case 1:
            item = this.itemServicio.crearPocionAleatoria(nivel);
            break;
          case 2:
            item = this.itemServicio.crearHechizoAleatorio(nivel);
            break;
        }

        if (item) {
          heroe.inventario.agregarItem(item);
          recompensas.push(item.nombre);
        }
      }
    });

    return recompensas;
  }

  obtenerEstadisticasJuego() {
    const statsHeroes = this.heroeServicio.obtenerEstadisticasHeroes();
    const monstruosDisponibles =
      this.monstruoServicio.obtenerMonstruosDisponibles();

    return {
      heroes: statsHeroes,
      monstruosDisponibles: monstruosDisponibles.length,
      tiposMonstruos: monstruosDisponibles,
    };
  }

  reiniciarJuego() {
    this.heroeServicio = new HeroeServicio();
    this.monstruoServicio = new MonstruoServicio();
    this.combateServicio = new CombateServicio();
    this.inventarioServicio = new InventarioServicio();
    this.itemServicio = new ItemServicio();
  }

  // ===== MÉTODOS DE CONFIGURACIÓN =====
  configurarCombate(maxTurnos) {
    this.combateServicio.configurarMaxTurnos(maxTurnos);
  }

  // ===== MÉTODOS DE GUARDADO (Para implementar en el futuro) =====
  exportarDatos() {
    return {
      heroes: this.heroeServicio.obtenerHeroes(),
      configuracion: {
        maxTurnosCombate: this.combateServicio.maxTurnos,
      },
      timestamp: new Date().toISOString(),
    };
  }

  importarDatos(datos) {
    // Para implementar: cargar datos guardados
    console.log('Función de importar datos pendiente de implementar');
  }
}
