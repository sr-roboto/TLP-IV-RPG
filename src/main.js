import { GameService } from './servicios/GameService.js';
import { Arma } from './juego/arma.js';
import { Pocion } from './juego/pocion.js';
import { Hechizo } from './juego/hechizo.js';
import readline from 'readline';

class Main {
  constructor() {
    this.gameService = new GameService();
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
  }

  async mostrarMenu() {
    console.log('\n' + '='.repeat(30));
    console.log('*** Polo Adventure ***');
    console.log('='.repeat(30));
    console.log('1. [*] Crear Héroe');
    console.log('2. [+] Ver Héroes');
    console.log('3. [!] Iniciar Combate');
    console.log('4. [#] Ver Inventario de Héroe');
    console.log('5. [=] Equipar Arma');
    console.log('6. [o] Usar Item');
    console.log('7.     Salir');
    console.log('='.repeat(30));

    const opcion = await this.pregunta('Selecciona una opción (1-7): ');
    return opcion;
  }

  pregunta(prompt) {
    return new Promise((resolve) => this.rl.question(prompt, resolve));
  }

  async ejecutar() {
    console.log('*** Iniciando RPG Game...\n');
    let continuar = true;

    while (continuar) {
      try {
        const opcion = await this.mostrarMenu();

        switch (opcion) {
          case '1':
            await this.crearHeroe();
            break;
          case '2':
            this.mostrarHeroes();
            break;
          case '3':
            await this.iniciarCombate();
            break;
          case '4':
            await this.verInventario();
            break;
          case '5':
            await this.equiparArma();
            break;
          case '6':
            await this.usarItem();
            break;
          case '7':
            console.log('👋 ¡Gracias por jugar! ¡Hasta la vista!');
            continuar = false;
            break;
          default:
            console.log(
              '[X] Opción no válida. Por favor selecciona una opción del 1 al 7.'
            );
        }
      } catch (error) {
        console.log(`[X] Error: ${error.message}`);
      }

      if (continuar) {
        await this.pregunta('\nPresiona Enter para continuar...');
      }
    }

    this.rl.close();
  }

  async crearHeroe() {
    console.log('\n*** CREAR NUEVO HÉROE ***');
    console.log('-'.repeat(20));

    const nombre = await this.pregunta('Nombre del héroe: ');
    if (!nombre.trim()) {
      console.log('ERROR: El nombre no puede estar vacío.');
      return;
    }

    console.log('Tipos disponibles:');
    console.log('1. [*] Guerrero (Alta vida y fuerza)');
    console.log('2. [+] Mago (Mana y ataques mágicos)');

    const tipoOpcion = await this.pregunta('Selecciona tipo (1-2): ');
    const tipos = { 1: 'guerrero', 2: 'mago' };
    const tipo = tipos[tipoOpcion];

    if (!tipo) {
      console.log('ERROR: Tipo no válido.');
      return;
    }

    try {
      const heroe = this.gameService.crearHero(tipo, nombre);
      console.log(
        `OK: ¡${heroe.nombre} el ${tipo} ha sido creado exitosamente!`
      );
      console.log(`   HP: ${heroe.vida}/${heroe.vidaMaxima}`);
      if (tipo === 'mago') {
        console.log(`   MP: ${heroe.mana}/${heroe.manaMaximo}`);
      }
    } catch (error) {
      console.log(`ERROR: ${error.message}`);
    }
  }

  mostrarHeroes() {
    const heroes = this.gameService.obtenerHeroes();
    if (heroes.length === 0) {
      console.log('\nNo hay héroes creados. ¡Crea uno primero!');
      return;
    }

    console.log('\n*** HÉROES DISPONIBLES ***');
    console.log('-'.repeat(30));
    heroes.forEach((heroe, index) => {
      console.log(`${index + 1}. ${heroe.nombre}`);
      console.log(`   Nivel: ${heroe.nivel}`);
      console.log(`   Experiencia: ${heroe.experiencia}/${heroe.nivel * 100}`);
      console.log(`   HP: ${heroe.vida}/${heroe.vidaMaxima}`);
      if (heroe.mana !== undefined) {
        console.log(`   MP: ${heroe.mana}/${heroe.manaMaximo}`);
      }
      if (heroe.armaEquipada) {
        console.log(`   Arma: ${heroe.armaEquipada.nombre}`);
      }
      console.log(`   Items: ${heroe.inventario.cantidad}`);
      console.log('');
    });
  }

  async verInventario() {
    const heroes = this.gameService.obtenerHeroes();
    if (heroes.length === 0) {
      console.log('\n[?] No hay héroes creados.');
      return;
    }

    const heroe = await this.seleccionarHeroe(heroes);
    if (!heroe) return;

    console.log(`\n*** INVENTARIO DE ${heroe.nombre.toUpperCase()} ***`);
    console.log('-'.repeat(30));

    const items = heroe.inventario.obtenerItems();
    if (items.length === 0) {
      console.log('El inventario está vacío.');
      return;
    }

    items.forEach((item, index) => {
      if (item instanceof Arma) {
        console.log(
          `${index + 1}. [*] ${item.nombre} (Daño: ${item.danio}, Valor: ${
            item.valor
          })`
        );
      } else if (item instanceof Pocion) {
        console.log(
          `${index + 1}. [o] ${item.nombre} (Curación: ${
            item.curacion
          }, Valor: ${item.valor})`
        );
      } else if (item instanceof Hechizo) {
        console.log(
          `${index + 1}. [+] ${item.nombre} (Poder: ${
            item.poder
          }, Costo Mana: ${item.costoMana}, Valor: ${item.valor})`
        );
      } else {
        console.log(`${index + 1}. [#] ${item.nombre} (Valor: ${item.valor})`);
      }
    });
  }

  async equiparArma() {
    const heroes = this.gameService.obtenerHeroes();
    if (heroes.length === 0) {
      console.log('\n[?] No hay héroes creados.');
      return;
    }

    const heroe = await this.seleccionarHeroe(heroes);
    if (!heroe) return;

    const armas = heroe.inventario
      .obtenerItems()
      .filter((item) => item instanceof Arma);
    if (armas.length === 0) {
      console.log('\n No hay armas en el inventario.');
      return;
    }

    console.log(`\n[*] ARMAS DE ${heroe.nombre.toUpperCase()}`);
    console.log('-'.repeat(30));
    armas.forEach((arma, index) => {
      const equipada =
        heroe.armaEquipada?.nombre === arma.nombre ? ' (EQUIPADA)' : '';
      console.log(
        `${index + 1}. ${arma.nombre} (Daño: ${arma.danio})${equipada}`
      );
    });

    const seleccion = await this.pregunta(
      'Selecciona arma a equipar (número): '
    );
    const armaIndex = parseInt(seleccion) - 1;

    if (armaIndex >= 0 && armaIndex < armas.length) {
      const resultado = this.gameService.equiparItem(
        heroe.nombre,
        armas[armaIndex].nombre
      );
      console.log(`[+] ${resultado}`);
    } else {
      console.log('[X] Selección inválida.');
    }
  }

  async iniciarCombate() {
    const heroes = this.gameService.obtenerHeroes();
    if (heroes.length === 0) {
      console.log('\n[?] Primero debes crear un héroe.');
      return;
    }

    const heroe = await this.seleccionarHeroe(heroes);
    if (!heroe) return;

    console.log('\n[*] SELECCIONA TU ENEMIGO');
    console.log('-'.repeat(25));
    console.log('1. Goblin (Fácil)');
    console.log('2. Orc (Medio)');
    console.log('3. Esqueleto (Fácil)');
    console.log('4. Dragón (Difícil)');

    const enemyChoice = await this.pregunta('Selecciona enemigo (1-4): ');
    const enemigos = {
      1: { tipo: 'Goblin', nombre: 'Goblin Salvaje' },
      2: { tipo: 'Orc', nombre: 'Orc Guerrero' },
      3: { tipo: 'Esqueleto', nombre: 'Esqueleto Maldito' },
      4: { tipo: 'Dragon', nombre: 'Dragón Ancestral' },
    };

    const enemyData = enemigos[enemyChoice];
    if (!enemyData) {
      console.log('[X] Selección inválida.');
      return;
    }

    const monstruo = this.gameService.crearMonstruo(
      enemyData.nombre,
      enemyData.tipo
    );
    console.log(`\n[*] ¡${heroe.nombre} se enfrenta a ${monstruo.nombre}!`);

    const resultado = this.gameService.combate(heroe, monstruo);
    console.log('\n' + '='.repeat(50));
    resultado.forEach((msg) => console.log(msg));
    console.log('='.repeat(50));
  }

  async seleccionarHeroe(heroes) {
    console.log('\nSelecciona un héroe:');
    heroes.forEach((heroe, index) => {
      console.log(
        `${index + 1}. ${heroe.nombre} ([+] ${heroe.vida}/${heroe.vidaMaxima})`
      );
    });

    const seleccion = await this.pregunta('Número: ');
    const heroe = heroes[parseInt(seleccion) - 1];

    if (!heroe) {
      console.log('[X] Selección inválida');
      return null;
    }

    return heroe;
  }

  async usarItem() {
    const heroes = this.gameService.obtenerHeroes();
    if (heroes.length === 0) {
      console.log('\n[?] No hay héroes creados.');
      return;
    }

    const heroe = await this.seleccionarHeroe(heroes);
    if (!heroe) return;

    const itemsUsables = heroe.inventario
      .obtenerItems()
      .filter((item) => item instanceof Pocion || item instanceof Hechizo);

    if (itemsUsables.length === 0) {
      console.log(
        '\n[X] No hay items usables (pociones/hechizos) en el inventario.'
      );
      return;
    }

    console.log(`\n[o] ITEMS USABLES DE ${heroe.nombre.toUpperCase()}`);
    console.log('-'.repeat(40));
    itemsUsables.forEach((item, index) => {
      if (item instanceof Pocion) {
        console.log(`${index + 1}. [o] ${item.toString()}`);
      } else if (item instanceof Hechizo) {
        console.log(`${index + 1}. [*] ${item.toString()}`);
      }
    });

    const seleccion = await this.pregunta('Selecciona item a usar (número): ');
    const itemIndex = parseInt(seleccion) - 1;

    if (itemIndex >= 0 && itemIndex < itemsUsables.length) {
      try {
        const resultado = this.gameService.usarItem(
          heroe.nombre,
          itemsUsables[itemIndex].nombre
        );
        console.log(`[+] ${resultado}`);
      } catch (error) {
        console.log(`[X] Error: ${error.message}`);
      }
    } else {
      console.log('[X] Selección inválida.');
    }
  }
}

// Ejecutar el juego
const juego = new Main();
juego.ejecutar().catch(console.error);
