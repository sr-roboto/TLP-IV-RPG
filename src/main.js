import { JuegoServicio } from './servicio/JuegoServicio.js';
import prompt from 'prompt-sync';
class CliRpg {
  constructor() {
    this.juegoServicio = new JuegoServicio();
    this.prompt = prompt();
  }

  mostrarMenu() {
    console.log('\n' + '='.repeat(40));
    console.log('RPG  - MENÚ PRINCIPAL');
    console.log('='.repeat(40));
    console.log('1.Crear Héroe');
    console.log('2.Ver Héroes');
    console.log('3.Iniciar Combate');
    console.log('4.Ver/Usar Inventario');
    console.log('5.Ver Estadísticas');
    console.log('6.Salir');
    console.log('='.repeat(40));
  }

  preguntar(pregunta) {
    return this.prompt(pregunta).trim() || '';
  }

  crearHeroe() {
    console.log('\n--- CREAR NUEVO HÉROE ---');

    try {
      const nombre = this.preguntar('Nombre del héroe: ');
      if (!nombre) {
        console.log('El nombre no puede estar vacío');
        return;
      }

      console.log('1. Guerrero (Ataque físico)');
      console.log('2. Mago (Ataque mágico)');
      const tipo = this.preguntar('Selecciona tipo (1-2): ');

      const tipoHeroe =
        tipo === '1' ? 'guerrero' : tipo === '2' ? 'mago' : null;
      if (!tipoHeroe) {
        console.log('Tipo inválido');
        return;
      }

      const heroe = this.juegoServicio.crearHeroe(tipoHeroe, nombre);
      console.log(`\n${heroe.toString()}`);
    } catch (error) {
      console.log(`Error: ${error.message}`);
    }
  }

  verHeroes() {
    console.log('\n--- LISTA DE HÉROES ---');

    const heroes = this.juegoServicio.obtenerTodosLosHeroes();

    if (heroes.length === 0) {
      console.log('No hay héroes. ¡Crea uno primero!');
      return;
    }

    heroes.forEach((heroe, index) => {
      console.log(`${index + 1}. ${heroe.toString()}`);
    });
  }

  iniciarCombate() {
    console.log('\n--- INICIAR COMBATE ---');

    const heroes = this.juegoServicio
      .obtenerTodosLosHeroes()
      .filter((h) => h.estaVivo());

    if (heroes.length === 0) {
      console.log('No hay héroes vivos para combatir');
      return;
    }

    console.log('Héroes disponibles:');
    heroes.forEach((heroe, index) => {
      console.log(`${index + 1}. ${heroe.toString()}`);
    });

    const seleccion = this.preguntar('Selecciona héroe (número): ');
    const indice = parseInt(seleccion) - 1;

    if (indice < 0 || indice >= heroes.length) {
      console.log('Selección inválida');
      return;
    }

    try {
      const resultado = this.juegoServicio.iniciarCombate(
        heroes[indice].nombre
      );
      console.log(`\nGanador: ${resultado.ganador}`);
      console.log(`Turnos: ${resultado.turnos}`);

      this.preguntar('Presiona Enter para continuar...');
    } catch (error) {
      console.log(`Error: ${error.message}`);
    }
  }

  verEstadisticas() {
    console.log('\n--- ESTADÍSTICAS ---');

    const stats = this.juegoServicio.obtenerEstadisticas();

    console.log(`Total héroes: ${stats.totalHeroes}`);
    console.log(`Héroes vivos: ${stats.heroesVivos}`);

    if (stats.heroes.length > 0) {
      console.log('\nDetalle:');
      stats.heroes.forEach((heroe) => {
        const estado = heroe.vida.split('/')[0] === '0' ? 'ESTA MUERTO' : 'ESTA VIVO';
        console.log(
          `  ${estado} ${heroe.nombre} (${heroe.tipo}) - ${heroe.vida} - Items: ${heroe.inventario}`
        );
      });
    }
  }

  gestionarInventario() {
    console.log('\n--- GESTIÓN DE INVENTARIO ---');

    const heroes = this.juegoServicio.obtenerTodosLosHeroes();

    if (heroes.length === 0) {
      console.log('No hay héroes. ¡Crea uno primero!');
      return;
    }

    console.log('Selecciona héroe:');
    heroes.forEach((heroe, index) => {
      console.log(
        `${index + 1}. ${heroe.nombre} - Items: ${heroe.inventario.length}`
      );
    });

    const seleccion = this.preguntar('Héroe (número): ');
    const indice = parseInt(seleccion) - 1;

    if (indice < 0 || indice >= heroes.length) {
      console.log('Selección inválida');
      return;
    }

    const heroe = heroes[indice];
    const inventario = heroe.inventario;

    if (inventario.length === 0) {
      console.log(`${heroe.nombre} no tiene items`);
      return;
    }

    console.log(`\nInventario de ${heroe.nombre}:`);
    inventario.forEach((item, index) => {
      console.log(`${index + 1}. ${item.nombre} - ${item.descripcion}`);
    });

    console.log('0. Volver al menú');
    const itemSeleccion = this.preguntar(
      'Usar item (número) o 0 para volver: '
    );

    if (itemSeleccion === '0') return;

    const itemIndice = parseInt(itemSeleccion) - 1;

    if (itemIndice < 0 || itemIndice >= inventario.length) {
      console.log('Selección inválida');
      return;
    }

    const item = heroe.usarItem(itemIndice);
    if (item) {
      console.log(`Usaste: ${item.nombre}`);
      console.log(`${heroe.toString()}`);
    }
  }

  ejecutar() {
    console.log('¡Bienvenido al RPG Simple!');
    console.log('Demuestra: Herencia, Polimorfismo y Encapsulación\n');

    let continuar = true;

    while (continuar) {
      this.mostrarMenu();

      const opcion = this.preguntar('Opción (1-6): ');

      switch (opcion) {
        case '1':
          this.crearHeroe();
          break;
        case '2':
          this.verHeroes();
          break;
        case '3':
          this.iniciarCombate();
          break;
        case '4':
          this.gestionarInventario();
          break;
        case '5':
          this.verEstadisticas();
          break;
        case '6':
          console.log('¡Hasta luego!');
          continuar = false;
          break;
        default:
          console.log('Opción inválida. Use 1-6');
      }
    }
  }
}

const cli = new CliRpg();

cli.ejecutar();
