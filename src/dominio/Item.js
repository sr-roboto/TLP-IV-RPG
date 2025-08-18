export class Item {
  #nombre;
  #tipo;
  #valor;
  #descripcion;

  constructor(nombre, tipo = 'consumible', valor = 0, descripcion = '') {
    this.#nombre = nombre;
    this.#tipo = tipo;
    this.#valor = valor;
    this.#descripcion = descripcion;
  }

  get nombre() {
    return this.#nombre;
  }

  get tipo() {
    return this.#tipo;
  }

  get valor() {
    return this.#valor;
  }

  get descripcion() {
    return this.#descripcion;
  }

  aplicarEfecto(personaje) {
    switch (this.#tipo) {
      case 'pocion_vida':
        personaje.curar(this.#valor);
        console.log(
          `🧪 ${personaje.nombre} usa ${this.#nombre} y recupera ${
            this.#valor
          } HP!`
        );
        break;

      case 'pocion_mana':
        if (personaje.constructor.name === 'Mago') {
          personaje.restaurarMana(this.#valor);
          console.log(
            `💙 ${personaje.nombre} usa ${this.#nombre} y recupera ${
              this.#valor
            } MP!`
          );
        } else {
          console.log(
            `❌ ${personaje.nombre} no puede usar ${
              this.#nombre
            }! Solo los magos pueden usar pociones de mana.`
          );
        }
        break;

      case 'arma':
        if (personaje.constructor.name === 'Guerrero') {
          // Método especial para guerreros (aumentar fuerza permanentemente)
          console.log(
            `⚔️ ${personaje.nombre} mejora su fuerza con ${this.#nombre}!`
          );
        } else {
          console.log(
            `❌ ${personaje.nombre} no puede usar ${
              this.#nombre
            }! Solo los guerreros pueden usar armas.`
          );
        }
        break;

      default:
        console.log(
          `❓ ${personaje.nombre} usa ${this.#nombre} pero no pasa nada...`
        );
    }
  }

  toString() {
    return `${this.#nombre} - ${this.#descripcion}`;
  }
}

export class ItemGenerador {
  static crear(tipoItem) {
    switch (tipoItem) {
      case 'Poción de Curación':
        return new Item(
          'Poción de Curación',
          'pocion_vida',
          30,
          'Restaura 30 HP'
        );

      case 'Poción de Mana':
        return new Item('Poción de Mana', 'pocion_mana', 25, 'Restaura 25 MP');

      case 'Espada de Hierro':
        return new Item(
          'Espada de Hierro',
          'arma',
          5,
          'Arma básica para guerreros'
        );

      default:
        return new Item(
          'Item Desconocido',
          'consumible',
          0,
          'Un item misterioso'
        );
    }
  }

  static crearPocionVida(cantidad = 30) {
    return new Item(
      'Poción de Vida',
      'pocion_vida',
      cantidad,
      `Restaura ${cantidad} HP`
    );
  }

  static crearPocionMana() {
    return new Item('Poción de Mana', 'pocion_mana', 25, 'Restaura 25 MP');
  }

  static crearItemAleatorio() {
    const tipos = ['Poción de Curación', 'Poción de Mana', 'Espada de Hierro'];
    const tipo = tipos[Math.floor(Math.random() * tipos.length)];
    return ItemFactory.crear(tipo);
  }
}
