export class CombateServicio {
  constructor() {
    this.maxTurnos = 20;
  }

  combate(heroe, monstruo) {
    const resultado = [];
    let turno = 1;

    resultado.push(`=== COMBATE: ${heroe.nombre} vs ${monstruo.nombre} ===`);
    resultado.push(
      `${heroe.nombre}: ${heroe.vida}/${heroe.vidaMaxima} HP | Nivel: ${heroe.nivel} | Exp: ${heroe.experiencia}`
    );
    resultado.push(
      `${monstruo.nombre}: ${monstruo.vida} HP | Poder: ${monstruo.poder}`
    );
    resultado.push('');

    while (heroe.estaVivo() && monstruo.estaVivo() && turno <= this.maxTurnos) {
      resultado.push(`--- Turno ${turno} ---`);

      // Turno del héroe
      const danioHeroe = heroe.atacar(monstruo);
      resultado.push(`${heroe.nombre} causa ${danioHeroe} de daño`);
      resultado.push(`${monstruo.nombre}: ${monstruo.vida} HP restantes`);

      if (!monstruo.estaVivo()) {
        resultado.push(`[+] ${monstruo.nombre} ha sido derrotado!`);

        // Calcular experiencia ganada
        const expGanada = this.calcularExperiencia(monstruo, heroe);
        heroe.ganarExperiencia(expGanada);

        resultado.push(
          `${heroe.nombre} gana ${expGanada} puntos de experiencia!`
        );
        resultado.push(`[+] ${heroe.nombre} gana el combate!`);
        break;
      }

      // Turno del monstruo
      const danioMonstruo = monstruo.atacar(heroe);
      resultado.push(`${monstruo.nombre} causa ${danioMonstruo} de daño`);
      resultado.push(
        `${heroe.nombre}: ${heroe.vida}/${heroe.vidaMaxima} HP restantes`
      );

      if (!heroe.estaVivo()) {
        resultado.push(`[X] ${heroe.nombre} ha sido derrotado!`);
        resultado.push(`[+] ${monstruo.nombre} gana el combate!`);
        break;
      }

      resultado.push('');
      turno++;
    }

    // Si alcanzó el límite de turnos
    if (turno > this.maxTurnos) {
      resultado.push(`[!] El combate es demasiado largo. ¡Empate!`);
      // Dar experiencia reducida por empate
      const expEmpate = Math.floor(
        this.calcularExperiencia(monstruo, heroe) * 0.3
      );
      heroe.ganarExperiencia(expEmpate);
      resultado.push(
        `${heroe.nombre} gana ${expEmpate} puntos de experiencia por el empate.`
      );
    }

    return resultado;
  }

  calcularExperiencia(monstruo, heroe) {
    // Experiencia base según el poder del monstruo
    let expBase = monstruo.poder * 10 + 25;

    // Bonus por diferencia de nivel (si el monstruo es más fuerte)
    const diferenciaNivel = Math.max(0, monstruo.poder - heroe.nivel * 3);
    const bonusNivel = diferenciaNivel * 5;

    return expBase + bonusNivel;
  }

  simularCombate(heroe, monstruo) {
    // Simula el resultado sin ejecutar realmente el combate
    const probabilidadVictoria = this.calcularProbabilidadVictoria(
      heroe,
      monstruo
    );
    return {
      probabilidadVictoriaHeroe: probabilidadVictoria,
      probabilidadVictoriaMonstruo: 1 - probabilidadVictoria,
      experienciaPotencial: this.calcularExperiencia(monstruo, heroe),
      turnosEstimados: Math.ceil(
        (monstruo.vida + heroe.vida) / (heroe.poder + monstruo.poder)
      ),
    };
  }

  calcularProbabilidadVictoria(heroe, monstruo) {
    const poderHeroe = heroe.poder + heroe.nivel * 2;
    const poderMonstruo = monstruo.poder;
    const factorVida = heroe.vida / (heroe.vida + monstruo.vida);

    return Math.min(
      0.95,
      Math.max(0.05, (poderHeroe / (poderHeroe + poderMonstruo)) * factorVida)
    );
  }

  configurarMaxTurnos(maxTurnos) {
    this.maxTurnos = maxTurnos;
  }
}
