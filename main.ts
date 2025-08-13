abstract class personaje {
  public salud: number;
  public nombre: string;
  public stamina: number;
  public mana: number;
  public nivel: number;

  constructor(
    salud: number,
    nombre: string,
    stamina: number,
    mana: number,
    nivel: number
  ) {
    this.salud = salud;
    this.nombre = nombre;
    this.stamina = stamina;
    this.mana = mana;
    this.nivel = nivel;
  }

  public abstract atacar(): void;
  public abstract estaVivo(): boolean;
  public abstract recibirAtaque(daño: number): void;
}

class Protagonista extends personaje {
  public vidas: number;
  public experiencia: number;
  public tipoDaño: string;

  constructor(
    salud: number,
    nombre: string,
    stamina: number,
    mana: number,
    nivel: number,
    vidas: number,
    experiencia: number,
    tipoDaño: string
  ) {
    super(salud, nombre, stamina, mana, nivel);
    this.vidas = vidas;
    this.experiencia = experiencia;
    this.nivel = nivel;
    this.tipoDaño = tipoDaño;
  }

  public atacar(): void {
    console.log(`${this.nombre} ataca con ${this.tipoDaño}`);
  }

  public estaVivo(): boolean {
    return this.salud > 0;
  }

  public recibirAtaque(daño: number): void {
    this.salud -= daño;
    console.log(`${this.nombre} ha recibido ${daño} de daño.`);
    if (!this.estaVivo()) {
      console.log(`${this.nombre} ha muerto.`);
    }
  }
}

class Monstruo extends personaje {
  public tipo: string;
  public poderAtaque: number;
  public nivel: number;

  constructor(
    salud: number,
    nombre: string,
    stamina: number,
    mana: number,
    nivel: number,
    tipo: string,
    poderAtaque: number
  ) {
    super(salud, nombre, stamina, mana, nivel);
    this.tipo = tipo;
    this.poderAtaque = poderAtaque;
    this.nivel = nivel;
  }

  public atacar(): void {
    console.log(`${this.nombre} ataca con poder de ataque ${this.poderAtaque}`);
  }

  public estaVivo(): boolean {
    return this.salud > 0;
  }

  public recibirAtaque(daño: number): void {
    this.salud -= daño;
    console.log(`${this.nombre} ha recibido ${daño} de daño.`);
    if (!this.estaVivo()) {
      console.log(`${this.nombre} ha muerto.`);
    }
  }
}
