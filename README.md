# RPG - Proyecto POO

Este es un juego **RPG** que demuestra los conceptos fundamentales de
Programación Orientada a Objetos de forma clara y concisa:

- **Herencia** (Personaje → Guerrero/Mago/Monstruo)
- **Polimorfismo** (método `atacar()` diferente en cada clase)
- **Encapsulación** (atributos privados con `#`)

## Diagrama de Clases
![RPG_](https://github.com/user-attachments/assets/d4c59dc0-17a3-49c9-b794-dd4abd3d23a4)

### **Modelado**

- **Entidades**: Personaje, Guerrero, Mago, Monstruo, Item, JuegoServicio
- **Clase base**: `Personaje` con subclases `Guerrero`, `Mago` y `Monstruo`
- **Polimorfismo**: Método `atacar()` implementado diferente en cada subclase
- **Encapsulación**: Todos los atributos importantes son privados (`#nombre`,
  `#vida`, `#fuerza`, `#mana`, `#poderAtaque`, `#inventario`)

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

## Extensiones Posibles

Si se quisiera extender el proyecto manteniendo la simplicidad:

1. **Nuevos tipos de héroe**: Crear `Arquero` clase que herede de `Personaje`
2. **Más tipos de items**: Añadir más casos al `ItemFactory.crear()`
3. **Persistencia**: Guardar/cargar héroes e inventarios en archivo JSON
4. **Habilidades especiales**: Métodos adicionales en subclases
5. **Items equipables**: Armas y armaduras que se equipan permanentemente
