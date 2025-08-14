# RPG Game - Juego de Rol Básico

## Descripción del Proyecto

Este es un juego de rol (RPG) básico implementado en JavaScript que demuestra
conceptos de programación orientada a objetos como herencia, polimorfismo y
encapsulación.

## Características Principales

- **Sistema de Personajes**: Héroes (Guerrero, Mago) y Monstruos
- **Sistema de Experiencia y Niveles**: Progresión de héroes
- **Sistema de Inventario**: Gestión de items (Armas, Pociones, Hechizos)
- **Sistema de Combate**: Combate por turnos polimórfico
- **Interfaz CLI**: Menú interactivo en terminal

## Diagrama de Clases - Jerarquía Corregida

```.
                     Personaje (clase base)
                   ┌─────────────────────────┐
                   │ #nombre, #vida          │
                   │ atacar(), estaVivo()    │
                   └─────────────────────────┘
                            │
                  ┌─────────┼─────────┐
                  │                   │
                Héroe              Monstruo
    ┌─────────────────────┐    ┌─────────────────┐
    │ + #experiencia      │    │ #poderAtaque    │
    │ + #nivel            │    │ #tipo           │
    │ + #inventario       │    │ atacar()        │
    │ + #armaEquipada     │    └─────────────────┘
    │ equiparArma()       │
    │ ganarExperiencia()  │
    └─────────────────────┘
             │
      ┌──────┼──────┐
      │             │
  Guerrero        Mago
┌─────────────┐ ┌──────────────┐
│ #fuerza     │ │ #mana        │
│ atacar()    │ │ #inteligencia│
│ defender()  │ │ atacar()     │
└─────────────┘ │ recuperarMana│
                └──────────────┘

                         Item (clase base)
                   ┌─────────────────────────┐
                   │ #nombre, #valor         │
                   │ aplicarEfecto()         │
                   └─────────────────────────┘
                            │
        ┌───────────────────┼───────────────────┐
        │                   │                   │
      Arma               Pocion              Hechizo
┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│ #danio      │    │ #curacion   │    │ #costoMana  │
│ #tipo       │    │ #tipo       │    │ #poder      │
└─────────────┘    └─────────────┘    │ #tipo       │
                                      └─────────────┘
```

## Arquitectura y Responsabilidades

### 👤 Personaje (Clase Base)

- **Propósito:** Características básicas de cualquier ser viviente
- **Atributos:** `#nombre`, `#vida`, `#vidaMaxima`
- **Métodos:** `atacar()`, `recibirDanio()`, `curar()`, `estaVivo()`
- **Herencia:** Base para Héroe y Monstruo

### 🦸 Héroe (Clase Intermedia)

- **Propósito:** Características específicas de aventureros controlados por el
  jugador
- **Añade:** `#experiencia`, `#nivel`, `#inventario`, `#armaEquipada`
- **Nuevos métodos:** `equiparArma()`, `ganarExperiencia()`, `subirNivel()`
- **Herencia:** Base para Guerrero y Mago

### ⚔️ Guerrero (Especialización)

- **Propósito:** Combatiente cuerpo a cuerpo
- **Añade:** `#fuerza`
- **Especializa:** `atacar()` con fuerza física y uso de armas

### 🧙 Mago (Especialización)

- **Propósito:** Combatiente mágico
- **Añade:** `#mana`, `#inteligencia`
- **Especializa:** `atacar()` con hechizos que consumen mana

### 👹 Monstruo (Enemigos Simples)

- **Propósito:** Enemigos controlados por IA
- **Añade:** `#poderAtaque`, `#tipo`
- **Especializa:** `atacar()` con lógica simple
- **Nota:** Hereda directamente de Personaje (no necesita inventario)

## Modularización de Items

### 📦 Item (Clase Base)

- **Archivo:** `src/juego/item.js`
- **Propósito:** Interfaz común para todos los items
- **Método polimórfico:** `aplicarEfecto(personaje)`

### ⚔️ Arma (Item Especializado)

- **Archivo:** `src/juego/arma.js`
- **Propósito:** Weapons que aumentan el daño de ataque
- **Efecto:** Retorna daño adicional para combate

### 🧪 Poción (Item Especializado)

- **Archivo:** `src/juego/pocion.js`
- **Propósito:** Consumibles que curan o mejoran atributos
- **Tipos:** Vida, Mana, Fuerza

### 🔮 Hechizo (Item Especializado)

- **Archivo:** `src/juego/hechizo.js`
- **Propósito:** Habilidades mágicas con costo de mana
- **Tipos:** Ofensivo, Curativo, Defensivo

## Decisiones de Diseño

### 1. Jerarquía de Herencia Correcta

**ANTES (Problemático):**

- Personaje tenía inventario y armas (demasiado específico)
- Guerrero y Mago heredaban directamente de Personaje
- Duplicación de funcionalidad entre clases

**AHORA (Correcto):**

- **Personaje**: Solo características básicas (nombre, vida, atacar)
- **Héroe**: Añade características de aventurero (inventario, experiencia,
  nivel)
- **Guerrero/Mago**: Heredan de Héroe correctamente
- **Monstruo**: Hereda directamente de Personaje (más simple)

### 2. Encapsulación con Campos Privados (#)

- Los atributos críticos como vida, mana, daño están encapsulados
- Se usan getters para acceso controlado
- Ejemplo: `#vida`, `#mana`, `#danio`

### 3. Polimorfismo

- Método `atacar()` implementado diferente en cada clase
- Método `aplicarEfecto()` varía según tipo de item
- Permite agregar nuevos tipos sin modificar código existente

### 4. Modularización de Items

- `item.js`: Solo la clase base Item
- `arma.js`, `pocion.js`, `hechizo.js`: Cada tipo en su archivo
- Fácil mantenimiento y escalabilidad
- Principio de responsabilidad única

### 5. Patrón Service

- `GameService` centraliza la lógica de negocio
- Mantiene colecciones de entidades
- Orquesta las interacciones entre objetos

## Estructura del Proyecto

```.
src/
├── main.js              # CLI y punto de entrada
├── juego/
│   ├── personaje.js     # Clase base abstracta
│   ├── heroe.js         # Clase intermedia
│   ├── guerrero.js      # Guerrero extends Héroe
│   ├── mago.js          # Mago extends Héroe
│   ├── monstruo.js      # Monstruo extends Personaje
│   ├── inventario.js    # Gestión de items
│   ├── item.js          # Clase base Item
│   ├── arma.js          # Arma extends Item
│   ├── pocion.js        # Pocion extends Item
│   └── hechizo.js       # Hechizo extends Item
└── servicio/
    └── servicio.js      # Lógica de negocio
```

## Instalación y Ejecución

### Requisitos

- Node.js 14+

### Cómo ejecutar

1. Clona el repositorio
2. Navega al directorio del proyecto
3. Ejecuta el juego:

```bash
node src/main.js
```

## Flujos de Prueba Documentados

### Flujo 1: Creación de Héroe y Combate Básico

1. Ejecutar `node src/main.js`
2. Seleccionar opción "1" (Crear Héroe)
3. Ingresar nombre "Aragorn"
4. Seleccionar tipo "1" (Guerrero)
5. Verificar en opción "2" (Ver Héroes) el nivel y experiencia inicial
6. Seleccionar opción "3" (Iniciar Combate)
7. Seleccionar héroe creado
8. Seleccionar enemigo "1" (Goblin)
9. Observar combate automático y ganancia de experiencia

### Flujo 2: Gestión de Inventario

1. Crear un héroe (seguir Flujo 1, pasos 1-4)
2. Seleccionar opción "4" (Ver Inventario)
3. Observar items iniciales
4. Seleccionar opción "5" (Equipar Arma)
5. Equipar "Espada Básica"
6. Verificar en inventario que está equipada

### Flujo 3: Combate con Mago

1. Crear héroe Mago llamado "Gandalf"
2. Iniciar combate vs Orc
3. Observar uso de mana en ataques
4. Si el mana se agota, el mago no puede atacar

### Flujo 4: Uso de Hechizos y Pociones

1. Crear un Mago llamado "Gandalf"
2. Ver inventario (opción 4) - observar "Curación Menor" y "Poción de Mana"
3. Combatir contra Orc para reducir vida
4. Seleccionar opción "6" (Usar Item)
5. Usar "Curación Menor" para recuperar vida (consume mana)
6. Si el mana está bajo, usar "Poción de Mana" para recuperarlo
7. Observar cómo diferentes items tienen efectos específicos

### Flujo 5: Sistema de Experiencia y Niveles

1. Crear héroe de cualquier tipo
2. Ver héroe en opción "2" - observar Nivel 1, Experiencia 0/100
3. Realizar combate contra monstruo débil (Goblin)
4. Observar ganancia de experiencia durante el combate
5. Ver héroe nuevamente - verificar experiencia acumulada
6. Realizar múltiples combates hasta alcanzar 100 exp
7. Observar subida de nivel automática y mejora de atributos

### Flujo 6: Múltiples Héroes

1. Crear Guerrero "Gimli"
2. Crear Mago "Radagast"
3. Ver lista de héroes (opción 2)
4. Combatir con cada uno contra diferentes enemigos
5. Observar diferentes estilos de combate y ganancia de experiencia

## Conceptos Implementados Correctamente

### 🧬 Principios de Programación Orientada a Objetos

- **Herencia**: Jerarquía correcta Personaje → Héroe → {Guerrero, Mago}
- **Polimorfismo**: Método `atacar()` implementado diferente en cada clase
- **Encapsulación**: Campos privados (#) en todas las clases con getters
- **Abstracción**: GameService oculta la complejidad del sistema

### 📁 Modularización y Arquitectura

- **Separación de responsabilidades**: Cada clase en su archivo
- **Principio de responsabilidad única**: Una clase, una responsabilidad
- **Composición**: Héroe contiene Inventario, no hereda de él
- **Patrón Service**: Centralizador de lógica de negocio

### ⚡ Funcionalidades del Sistema

- **13 tipos de items diferentes**: 5 armas, 4 pociones, 4 hechizos
- **Sistema de combate polimórfico**: Cada clase ataca diferente
- **Sistema de experiencia y niveles**: Progresión automática de héroes
- **Gestión de inventarios**: Solo héroes tienen inventario
- **Equipamiento de armas**: Mejora el daño de ataque
- **Sistema de vida única**: Combate directo sin revivals

## Pruebas Disponibles

### Pruebas Automatizadas

```bash
node test-simple.js        # Prueba básica de jerarquía
node test-jerarquia.js     # Prueba completa de herencia
node test-modular.js       # Prueba de modularización
```

### Juego Interactivo

```bash
node src/main.js          # Juego completo con menú CLI
```

## Arquitectura Final Lograda

✅ **Jerarquía correcta**: Personaje → Héroe → {Guerrero, Mago}  
✅ **Modularización completa**: Cada clase en su archivo  
✅ **Encapsulación total**: Todos los campos privados  
✅ **Polimorfismo funcional**: Métodos implementados diferente  
✅ **Sistema escalable**: Fácil agregar nuevos tipos  
✅ **Código mantenible**: Separación clara de responsabilidades

## Posibles Extensiones Futuras

- **Más tipos de héroes**: Arquero, Paladín, Ladrón
- **Más items y hechizos**: Armaduras, anillos, pergaminos mágicos
- **Sistema de rareza**: Items comunes, raros, legendarios
- **Habilidades especiales**: Cooldowns y efectos de área
- **Sistema de tienda**: Comprar/vender items con oro
- **Guardado de partidas**: Persistencia de progreso del héroe
- **Más enemigos**: Jefes con habilidades especiales y mayor recompensa
- **Sistema de guild**: Múltiples héroes trabajando juntos
- **Mazmorras**: Secuencias de combates con recompensas progresivas
