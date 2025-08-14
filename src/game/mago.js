import { Heroe } from './heroe.js';

export class Mago extends Heroe {
  constructor(
    salud,
    nombre,
    stamina,
    mana,
    nivel,
    vidas,
    experiencia,
    hechizo
  ) {
    super(salud, nombre, stamina, mana, nivel, vidas, experiencia);
    this.hechizo = hechizo;
  }
}

export const mage = new Mago(50, 'Gandalf', 30, 100, 1, 3, 0);
