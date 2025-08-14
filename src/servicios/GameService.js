import { HeroService } from './HeroService.js';
import { MonsterService } from './MonsterService.js';
import { CombatService } from './CombatService.js';
import { InventoryService } from './InventoryService.js';
import { ItemFactory } from './ItemFactory.js';

export class GameService {
  constructor() {
    this.heroService = new HeroService();
    this.monsterService = new MonsterService();
    this.combatService = new CombatService();
    this.inventoryService = new InventoryService();
    this.itemFactory = new ItemFactory();
  }

  // ===== MÉTODOS DE HÉROES =====
  crearHero(tipo, nombre) {
    return this.heroService.crearHeroe(tipo, nombre);
  }

  obtenerHeroes() {
    return this.heroService.obtenerHeroes();
  }

  obtenerHeroe(nombre) {
    return this.heroService.obtenerHeroe(nombre);
  }

  obtenerEstadisticasHeroes() {
    return this.heroService.obtenerEstadisticasHeroes();
  }

  // ===== MÉTODOS DE MONSTRUOS =====
  crearMonstruo(nombre, tipo = 'goblin') {
    return this.monsterService.crearMonstruo(nombre, tipo);
  }

  crearMonstruoAleatorio() {
    return this.monsterService.crearMonstruoAleatorio();
  }

  crearMonstruoPorNivel(nivelHeroe) {
    return this.monsterService.crearMonstruoPorNivel(nivelHeroe);
  }

  obtenerMonstruosDisponibles() {
    return this.monsterService.obtenerMonstruosDisponibles();
  }

  // ===== MÉTODOS DE COMBATE =====
  combate(heroe, monstruo) {
    return this.combatService.combate(heroe, monstruo);
  }

  simularCombate(heroe, monstruo) {
    return this.combatService.simularCombate(heroe, monstruo);
  }

  // ===== MÉTODOS DE INVENTARIO =====
  equiparItem(heroeName, itemName) {
    const heroe = this.heroService.obtenerHeroe(heroeName);
    return this.inventoryService.equiparItem(heroe, itemName);
  }

  usarItem(heroeName, itemName) {
    const heroe = this.heroService.obtenerHeroe(heroeName);
    return this.inventoryService.usarItem(heroe, itemName);
  }

  obtenerItemsUsables(heroe) {
    return this.inventoryService.obtenerItemsUsables(heroe);
  }

  obtenerArmas(heroe) {
    return this.inventoryService.obtenerArmas(heroe);
  }

  // ===== MÉTODOS DE ITEMS =====
  crearArmaAleatoria(nivel = 1) {
    return this.itemFactory.crearArmaAleatoria(nivel);
  }

  crearPocionAleatoria(nivel = 1) {
    return this.itemFactory.crearPocionAleatoria(nivel);
  }

  crearHechizoAleatorio(nivel = 1) {
    return this.itemFactory.crearHechizoAleatorio(nivel);
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
            item = this.itemFactory.crearArmaAleatoria(nivel);
            break;
          case 1:
            item = this.itemFactory.crearPocionAleatoria(nivel);
            break;
          case 2:
            item = this.itemFactory.crearHechizoAleatorio(nivel);
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
    const statsHeroes = this.heroService.obtenerEstadisticasHeroes();
    const monstruosDisponibles =
      this.monsterService.obtenerMonstruosDisponibles();

    return {
      heroes: statsHeroes,
      monstruosDisponibles: monstruosDisponibles.length,
      tiposMonstruos: monstruosDisponibles,
    };
  }

  reiniciarJuego() {
    this.heroService = new HeroService();
    this.monsterService = new MonsterService();
    this.combatService = new CombatService();
    this.inventoryService = new InventoryService();
    this.itemFactory = new ItemFactory();
  }

  // ===== MÉTODOS DE CONFIGURACIÓN =====
  configurarCombate(maxTurnos) {
    this.combatService.configurarMaxTurnos(maxTurnos);
  }

  // ===== MÉTODOS DE GUARDADO (Para implementar en el futuro) =====
  exportarDatos() {
    return {
      heroes: this.heroService.obtenerHeroes(),
      configuracion: {
        maxTurnosCombate: this.combatService.maxTurnos,
      },
      timestamp: new Date().toISOString(),
    };
  }

  importarDatos(datos) {
    // Para implementar: cargar datos guardados
    console.log('Función de importar datos pendiente de implementar');
  }
}
