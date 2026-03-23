# 🚀 Physics Lab: Animación 2D con Canvas

Este proyecto consiste en una aplicación web interactiva que implementa simulaciones físicas y animaciones 2D utilizando el elemento `<canvas>` de HTML5 y Programación Orientada a Objetos (POO) en JavaScript.

---

## 📚 Datos Académicos
* **Materia:** Graficación
* **Unidad:** 2.2 - Introducción a las animaciones 2D
* **Alumno:** Leonardo Gutiérrez
* **Docente:** Pinedo Fernandez Victor Manuel

---

## 🎯 Objetivo
Entender y aplicar la lógica de las animaciones en escenarios gráficos 2D, gestionando el renderizado por fotogramas e implementando conceptos de física básica (gravedad, fricción y colisiones) mediante el uso de la API de Canvas en JavaScript.

---

## ⚙️ Descripción del Proyecto
Se desarrolló un "Laboratorio de Partículas" dinámico donde los objetos (esferas) interactúan con el entorno. El motor de física integrado permite que las partículas:
- Aparezcan desde múltiples direcciones proyectadas por vectores de velocidad inicial.
- Simulen la caída libre a través de una constante de **gravedad**.
- Reboten contra el suelo y las paredes, experimentando **pérdida de energía (fricción)** en cada impacto.
- Cuenten con un ciclo de vida, desapareciendo progresivamente (fade-out) tras detener su movimiento para optimizar la memoria (Garbage Collection).
- Se generen de forma aleatoria y orgánica mediante un sistema de *spawner* asíncrono.

---

## 🛠️ Tecnologías Utilizadas
* **HTML5:** Estructuración semántica.
* **CSS3:** Diseño moderno aplicando el efecto **Glassmorphism** (cristal esmerilado) para la interfaz de usuario.
* **Bootstrap 5:** Sistema de cuadrícula y componentes responsivos para el panel de control.
* **JavaScript (Vanilla):** Lógica del negocio, manipulación del DOM y renderizado gráfico usando **Canvas API** y `requestAnimationFrame`.
* **Git & GitHub:** Control de versiones y alojamiento del código fuente.

---

## 🚀 Funcionalidades Principales
* **Panel de Control en Tiempo Real:** Interfaz lateral para ajustar parámetros de la simulación sin recargar la página.
* **Gestor de Población:** Control exacto del límite máximo de partículas en pantalla.
* **Redimensionamiento Dinámico:** Ajuste del área de colisión (ancho y alto del canvas) en vivo.
* **Selector de Emisor:** Control direccional que determina el punto de origen y el impulso inicial de las partículas (Lluvia, Viento lateral, Geiser).
* **Renderizado Fluido:** Animación optimizada a 60 FPS limpiando y redibujando el lienzo por cada *frame*.

---

## 📁 Estructura del Proyecto

```text
📦 ANIMATION-CANVAS-2D
 ┣ 📂 assets
 ┃ ┣ 📂 css
 ┃ ┃ ┗ 📜 styles.css
 ┃ ┣ 📂 img
 ┃ ┃ ┣ 🖼️ favicon.png
 ┃ ┃ ┗ 🖼️ imagen.jpg
 ┃ ┗ 📂 js
 ┃ ┃ ┗ 📜 main.js
 ┣ 📜 index.html
 ┗ 📜 README.md