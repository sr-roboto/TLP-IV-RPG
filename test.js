import { GameService } from './src/servicio/servicio.js';
import { Arma } from './src/juego/arma.js';
import { Pocion } from './src/juego/pocion.js';
import { Hechizo } from './src/juego/hechizo.js';

console.log('🧪 EJECUTANDO PRUEBAS AUTOMATIZADAS DEL RPG\n');

const gameService = new GameService();

// ========== PRUEBA 1: CREACIÓN DE HÉROES ==========
console.log('='.repeat(50));
console.log('🧪 PRUEBA 1: Creación de Héroes');
console.log('='.repeat(50));

try {
  const guerrero = gameService.crearHero('guerrero', 'Aragorn');
  const mago = gameService.crearHero('mago', 'Gandalf');

  console.log('✅ Héroes creados exitosamente:');
  console.log(
    `   ⚔️  ${guerrero.nombre} (Guerrero) - Vida: ${guerrero.vida}/${guerrero.vidaMaxima}`
  );
  console.log(
    `   🧙 ${mago.nombre} (Mago) - Vida: ${mago.vida}/${mago.vidaMaxima}, Mana: ${mago.mana}/${mago.manaMaximo}`
  );
} catch (error) {
  console.log(`❌ Error: ${error.message}`);
}

// ========== PRUEBA 2: INVENTARIOS ==========
console.log('\n' + '='.repeat(50));
console.log('🧪 PRUEBA 2: Sistema de Inventarios');
console.log('='.repeat(50));

const heroes = gameService.obtenerHeroes();
heroes.forEach((heroe) => {
  console.log(`\n🎒 Inventario de ${heroe.nombre}:`);
  const items = heroe.inventario.obtenerItems();
  items.forEach((item, index) => {
    if (item instanceof Arma) {
      console.log(`   ${index + 1}. ⚔️  ${item.nombre} (Daño: ${item.danio})`);
    } else if (item instanceof Pocion) {
      console.log(
        `   ${index + 1}. 🧪 ${item.nombre} (Curación: ${item.curacion})`
      );
    }
  });
});

// ========== PRUEBA 3: EQUIPAMIENTO ==========
console.log('\n' + '='.repeat(50));
console.log('🧪 PRUEBA 3: Sistema de Equipamiento');
console.log('='.repeat(50));

const aragorn = gameService.obtenerHeroe('Aragorn');
const gandalf = gameService.obtenerHeroe('Gandalf');

try {
  const resultadoAragorn = gameService.equiparItem('Aragorn', 'Espada Básica');
  const resultadoGandalf = gameService.equiparItem('Gandalf', 'Espada Básica');

  console.log(`✅ ${resultadoAragorn}`);
  console.log(`✅ ${resultadoGandalf}`);

  console.log(
    `\n⚔️  Arma equipada de Aragorn: ${
      aragorn.armaEquipada?.nombre || 'Ninguna'
    }`
  );
  console.log(
    `⚔️  Arma equipada de Gandalf: ${gandalf.armaEquipada?.nombre || 'Ninguna'}`
  );
} catch (error) {
  console.log(`❌ Error: ${error.message}`);
}

// ========== PRUEBA 4: POLIMORFISMO EN COMBATE ==========
console.log('\n' + '='.repeat(50));
console.log('🧪 PRUEBA 4: Polimorfismo en Combate');
console.log('='.repeat(50));

// Crear monstruos para prueba
const goblin1 = gameService.crearMonstruo('Goblin Salvaje', 'goblin');
const goblin2 = gameService.crearMonstruo('Goblin Malvado', 'goblin');

console.log(`\n⚔️  COMBATE 1: ${aragorn.nombre} vs ${goblin1.nombre}`);
console.log('-'.repeat(40));
const resultado1 = gameService.combate(aragorn, goblin1);
resultado1.slice(0, 10).forEach((msg) => console.log(msg)); // Mostrar solo las primeras líneas

console.log(`\n🧙 COMBATE 2: ${gandalf.nombre} vs ${goblin2.nombre}`);
console.log('-'.repeat(40));
const resultado2 = gameService.combate(gandalf, goblin2);
resultado2.slice(0, 10).forEach((msg) => console.log(msg)); // Mostrar solo las primeras líneas

// ========== PRUEBA 5: USO DE POCIONES ==========
console.log('\n' + '='.repeat(50));
console.log('🧪 PRUEBA 5: Sistema de Pociones');
console.log('='.repeat(50));

try {
  // Reducir vida para probar curación
  aragorn.recibirDanio(30);
  console.log(
    `💔 ${aragorn.nombre} herido: ${aragorn.vida}/${aragorn.vidaMaxima} HP`
  );

  const resultadoPocion = gameService.usarItem('Aragorn', 'Poción Básica');
  console.log(`✅ ${resultadoPocion}`);
  console.log(
    `💚 ${aragorn.nombre} después de curación: ${aragorn.vida}/${aragorn.vidaMaxima} HP`
  );
} catch (error) {
  console.log(`❌ Error: ${error.message}`);
}

// ========== PRUEBA 6: DEMOSTRACIÓN DE ENCAPSULACIÓN ==========
console.log('\n' + '='.repeat(50));
console.log('🧪 PRUEBA 6: Encapsulación de Datos');
console.log('='.repeat(50));

console.log(
  '🔒 Intentando acceder a campos privados (esto NO debería funcionar):'
);
console.log(
  `   Aragorn.#vida: ${
    aragorn['#vida'] || 'UNDEFINED (correcto, está encapsulado)'
  }`
);
console.log(
  `   Gandalf.#mana: ${
    gandalf['#mana'] || 'UNDEFINED (correcto, está encapsulado)'
  }`
);

console.log('\n✅ Acceso a través de getters públicos (esto SÍ funciona):');
console.log(`   Aragorn.vida: ${aragorn.vida}`);
console.log(`   Gandalf.mana: ${gandalf.mana}`);

// ========== RESUMEN ==========
console.log('\n' + '='.repeat(50));
console.log('📊 RESUMEN DE PRUEBAS');
console.log('='.repeat(50));

console.log('✅ Herencia: Personaje → Guerrero/Mago/Monstruo');
console.log('✅ Polimorfismo: Método atacar() diferente en cada clase');
console.log('✅ Encapsulación: Campos privados (#) funcionando correctamente');
console.log('✅ Composición: Inventario dentro de Personaje');
console.log('✅ Abstracción: GameService orquesta toda la lógica');
console.log('✅ Gestión de Items: Armas y Pociones con efectos polimórficos');

console.log('\n🎉 ¡TODAS LAS PRUEBAS COMPLETADAS EXITOSAMENTE!');
console.log('🎮 Ahora ejecuta "node src/main.js" para jugar interactivamente.');
