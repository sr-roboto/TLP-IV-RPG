# RPG - Proyecto POO

Este es un juego **RPG** que demuestra los conceptos fundamentales de
Programación Orientada a Objetos de forma clara y concisa:

- **Herencia** (Personaje → Guerrero/Mago/Monstruo)
- **Polimorfismo** (método `atacar()` diferente en cada clase)
- **Encapsulación** (atributos privados con `#`)
- **Factory Pattern** (ItemFactory para crear items)

## Diagrama de Clases
![rpg_uml](https://github.com/user-attachments/assets/d4d2f4ef-d966-4bc8-b15a-cb216f691cf6)


### **Modelado**

- **Entidades**: Personaje, Guerrero, Mago, Monstruo, Item, JuegoServicio
- **Clase base**: `Personaje` con subclases `Guerrero`, `Mago` y `Monstruo`
- **Polimorfismo**: Método `atacar()` implementado diferente en cada subclase
- **Encapsulación**: Todos los atributos importantes son privados (`#nombre`,
  `#vida`, `#fuerza`, `#mana`, `#poderAtaque`, `#inventario`)
- **Factory**: `ItemFactory` usa patrón factory para crear diferentes tipos de
  items

### **Clases de dominio**

- **Clase base**: `Personaje` con atributos y métodos básicos
- **Subclases**: `Guerrero` (combate físico), `Mago` (combate mágico),
  `Monstruo` (enemigos)
- **Override**: Cada subclase implementa `atacar()` de manera diferente
- **Sistema de Items**: Inventario básico con `agregarItem()` y `usarItem()`
- **Métodos polimórficos**: `atacar()` funciona distinto según el tipo de
  personaje

### **Servicio de orquestación**

- **JuegoServicio**: Único servicio que mantiene colección interna de héroes
  (`Map`)
- **CRUD**: Crear/leer héroes, crear monstruos
- **Casos de uso**: Combate automático, estadísticas, gestión de inventarios
- **Reglas de negocio**: Validaciones básicas, límites de combate, recompensas
- **Items iniciales**: Cada héroe recibe un item inicial al crearse
- **Recompensas**: Items aleatorios al ganar combates

### **CLI**

- **Sin interfaz gráfica**: Solo terminal con menú simple
- **Menú textual**: 6 opciones esenciales (incluyendo inventario)
- **Validación**: Entrada básica con manejo de errores
- **Gestión de inventario**: Ver y usar items desde el CLI
- **Interacción**: Flujo intuitivo para demostrar conceptos POO

## 🚀 Cómo Ejecutar

### Instalación y Ejecución

```bash
# Navegar al directorio del proyecto
cd TLP-IV-RPG

# Ejecutar el juego
npm run dev
# o
node src/main.js

# Ejecutar pruebas
npm test
# o
node src/test.js
```

## 📦 Sistema de Items

El juego incluye un sistema básico de items que demuestra:

### **Tipos de Items**

- **Poción de Curación**: Restaura 30 HP
- **Poción de Mana**: Restaura 25 MP (solo magos)
- **Espada de Hierro**: Aumenta fuerza permanentemente +5

### **Mecánicas**

1. **Items iniciales**: Los guerreros reciben Poción de Curación, los magos
   Poción de Mana
2. **Recompensas**: Al ganar combates se obtienen items aleatorios
3. **Uso**: Opción de menú 4 para gestionar inventarios
4. **Efectos**: Cada item tiene efectos específicos según el tipo de héroe

## 🧪 Pruebas Manuales

### Creación de Héroes y Polimorfismo

```bash
1. Ejecutar: npm run dev
2. Opción 1: Crear Héroe - crear un Guerrero "Conan"
3. Opción 1: Crear Héroe - crear un Mago "Gandalf"
4. Opción 3: Iniciar Combate - elegir Conan
5. Observar: "⚔️ Conan ataca con su espada!" (polimorfismo)
6. Combate con Gandalf - observar: "✨ Gandalf lanza un hechizo!"
7. Ver cómo cada clase ataca diferente (POLIMORFISMO EN ACCIÓN)
8. Ganar combate y recibir item aleatorio
```

### Sistema de Items y Encapsulación

```bash
1. Opción 2: Ver Héroes - observar que cada héroe tiene items iniciales
2. Opción 4: Ver/Usar Inventario - seleccionar un héroe
3. Ver inventario encapsulado (solo copia es accesible)
4. Usar una Poción de Curación con guerrero herido
5. Usar Poción de Mana con mago (método polimórfico restaurarMana)
6. Observar efectos específicos según tipo de personaje
```

### Encapsulación y CRUD

```bash
1. Opción 1: Crear Héroe - probar validaciones
2. Intentar nombre vacío (error por validación)
3. Crear héroe válido - ver atributos encapsulados
4. Opción 5: Estadísticas - ver acceso a datos privados via getters públicos
5. Observar cantidad de items en estadísticas
```

**Resultado esperado**:

- Demostración clara de los 3 pilares de POO
- Sistema de items funcional con factory pattern
- Código simple de explicar en clase
- Funcionalidad completa en pocas líneas

## Extensiones Posibles

Si se quisiera extender el proyecto manteniendo la simplicidad:

1. **Nuevos tipos de héroe**: Crear `Arquero` clase que herede de `Personaje`
2. **Más tipos de items**: Añadir más casos al `ItemFactory.crear()`
3. **Persistencia**: Guardar/cargar héroes e inventarios en archivo JSON
4. **Habilidades especiales**: Métodos adicionales en subclases
5. **Items equipables**: Armas y armaduras que se equipan permanentemente
