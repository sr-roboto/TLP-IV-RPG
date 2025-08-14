export class Personaje {
  constructor(salud, nombre, stamina, mana, nivel) {
    this.salud = salud;
    this.nombre = nombre;
    this.stamina = stamina;
    this.mana = mana;
    this.nivel = nivel;
  }

  atacar(objetivo) {
    throw new Error("El método 'atacar' debe ser implementado por la subclase");
  }

  estaVivo() {
    throw new Error(
      "El método 'estaVivo' debe ser implementado por la subclase"
    );
  }

  recibirAtaque(daño) {
    throw new Error(
      "El método 'recibirAtaque' debe ser implementado por la subclase"
    );
  }

  calcularDaño() {
    throw new Error(
      "El método 'calcularDaño' debe ser implementado por la subclase"
    );
  }
}
