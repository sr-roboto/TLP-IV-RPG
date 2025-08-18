import { JuegoServicio } from './servicio/JuegoServicio.js';

console.log('🧪 Ejecutando pruebas rápidas del RPG Simplificado...\n');

const juego = new JuegoServicio();

try {
  // Prueba 1: Crear héroes (CRUD - Create)
  console.log('1️⃣ Creando héroes...');
  const guerrero = juego.crearHeroe('guerrero', 'TestGuerrero');
  const mago = juego.crearHeroe('mago', 'TestMago');

  // Prueba 2: Polimorfismo en combate
  console.log('\n2️⃣ Probando polimorfismo...');
  const monstruo = juego.crearMonstruo('TestMonstruo');

  console.log('🔸 Ataque del Guerrero (polimorfismo):');
  guerrero.atacar(monstruo);

  console.log('🔸 Ataque del Mago (polimorfismo):');
  mago.atacar(monstruo);

  console.log('🔸 Ataque del Monstruo (polimorfismo):');
  monstruo.atacar(guerrero);

  // Prueba 3: Encapsulación (acceso a atributos privados)
  console.log('\n3️⃣ Verificando encapsulación...');
  console.log(`Vida del guerrero (getter público): ${guerrero.vida}`);
  console.log(`Fuerza del guerrero (getter público): ${guerrero.fuerza}`);
  console.log(`Mana del mago (getter público): ${mago.mana}`);
  console.log(`Inteligencia del mago (getter público): ${mago.inteligencia}`);

  //Prueba 4: Operaciones CRUD
  console.log('\n4️⃣ Operaciones CRUD...');
  const heroeEncontrado = juego.obtenerHeroe('TestGuerrero');
  console.log(
    `Héroe encontrado: ${
      heroeEncontrado ? heroeEncontrado.nombre : 'No encontrado'
    }`
  );

  const todosLosHeroes = juego.obtenerTodosLosHeroes();
  console.log(`Total de héroes creados: ${todosLosHeroes.length}`);

  // Prueba 5: Caso de uso - Combate completo
  console.log('\n5️⃣ Caso de uso: Combate completo...');
  const resultado = juego.iniciarCombate('TestMago');
  console.log(
    `Resultado del combate: ${resultado.ganador} en ${resultado.turnos} turnos`
  );

  // Prueba 6: Estadísticas finales
  console.log('\n6️⃣ Estadísticas finales:');
  const stats = juego.obtenerEstadisticas();
  console.log(`Total de héroes: ${stats.totalHeroes}`);
  console.log(`Héroes vivos: ${stats.heroesVivos}`);
  console.log('Detalle de héroes:', stats.heroes);

  console.log('\n✅ ¡Todas las pruebas pasaron correctamente!');
  console.log('🎮 Ejecuta: npm run dev');
  console.log('📝 Con datos: node src/main.js --ejemplo');
} catch (error) {
  console.error('❌ Error en las pruebas:', error.message);
  console.error('Stack trace:', error.stack);
}
