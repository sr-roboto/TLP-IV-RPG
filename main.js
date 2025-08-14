class Personaje {
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

class Protagonista extends Personaje {
  constructor(
    salud,
    nombre,
    stamina,
    mana,
    nivel,
    vidas,
    experiencia,
    tipoDaño
  ) {
    super(salud, nombre, stamina, mana, nivel);
    this.vidas = vidas;
    this.experiencia = experiencia;
    this.tipoDaño = tipoDaño;
  }

  atacar(objetivo) {
    const daño = this.calcularDaño();
    console.log(
      `${this.nombre} ataca con ${this.tipoDaño} causando ${daño} de daño`
    );
    objetivo.recibirAtaque(daño);
    this.ganarExperiencia(daño * 0.2);
  }

  estaVivo() {
    return this.salud > 0;
  }

  recibirAtaque(daño) {
    this.salud -= daño;
    console.log(`${this.nombre} ha recibido ${daño} de daño.`);
    if (!this.estaVivo()) {
      console.log(`${this.nombre} ha muerto.`);
    }
  }

  calcularDaño() {
    return 10 + this.nivel * 2;
  }

  subirNivel() {
    this.nivel += 1;
    this.experiencia = 0;
    this.salud += 5;
    this.stamina += 5;
    this.mana += 5;
    console.log(`${this.nombre} ha subido al nivel ${this.nivel}!`);
  }

  ganarExperiencia(exp) {
    this.experiencia += exp;
    console.log(`${this.nombre} ha ganado ${exp} de experiencia.`);
    if (this.experiencia >= this.nivel * 100) {
      this.subirNivel();
    }
  }
}

class Monstruo extends Personaje {
  constructor(salud, nombre, stamina, mana, nivel, tipo, poderAtaque) {
    super(salud, nombre, stamina, mana, nivel);
    this.poderAtaque = poderAtaque;
    this.tipo = tipo;
  }

  atacar(objetivo) {
    const daño = this.calcularDaño();
    console.log(
      `${this.nombre} ataca con poder ${this.poderAtaque} causando ${daño} de daño`
    );
    objetivo.recibirAtaque(daño);
  }

  estaVivo() {
    return this.salud > 0;
  }

  recibirAtaque(daño) {
    this.salud -= daño;
    console.log(`${this.nombre} ha recibido ${daño} de daño.`);
    if (!this.estaVivo()) {
      console.log(`${this.nombre} ha muerto.`);
    }
  }

  calcularDaño() {
    return 10 + this.nivel * 2;
  }
}

const tobi = new Protagonista(100, 'Tobi', 50, 30, 1, 3, 0, 'cortante');
const monstruo = new Monstruo(80, 'Goblin', 20, 10, 1, 15, 'bestia');

console.log(tobi);
tobi.atacar(monstruo);
console.log(tobi);
