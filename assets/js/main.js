/**
 * Physics Lab - Simulador de Partículas 2D
 * Desarrollado por: Leonardo Gutiérrez
 */

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let window_width = 800;
let window_height = 500;
let circles = [];
let maxCircles = 20;
let direction = "top"; // Dirección por defecto

canvas.width = window_width;
canvas.height = window_height;

class Circle {
    constructor(x, y, radius, color) {
        this.posX = x;
        this.posY = y;
        this.radius = radius;
        this.color = color;
        
        // --- CONSTANTES DE FÍSICA ---
        this.dx = (Math.random() - 0.5) * 4; // Velocidad lateral aleatoria
        this.dy = 0;                         // Se asignará en el generador según dirección
        this.gravity = 0.2;                  // Gravedad constante hacia abajo
        this.friction = 0.6;                 // Energía retenida tras rebote
        this.life = 1.0;                     // Opacidad inicial
        this.bounces = 0;                    // Contador de impactos
    }

    draw(context) {
        context.save();
        context.globalAlpha = this.life; // Efecto de desvanecimiento (Fade out)
        context.beginPath();
        context.fillStyle = this.color;
        context.arc(this.posX, this.posY, this.radius, 0, Math.PI * 2);
        
        // Estilo Neon/Tech
        context.shadowColor = this.color;
        context.shadowBlur = 15;
        context.fill();

        context.strokeStyle = "rgba(255,255,255,0.5)";
        context.lineWidth = 1.5;
        context.stroke();
        
        context.closePath();
        context.restore();
    }

    update(context) {
        this.draw(context);

        // 1. APLICAR GRAVEDAD (Siempre hacia abajo)
        this.dy += this.gravity;

        // 2. COLISIÓN CON EL SUELO
        if (this.posY + this.radius >= window_height) {
            this.posY = window_height - this.radius;
            this.dy *= -this.friction; // Invierte dirección y pierde fuerza
            this.bounces++;
            
            // Lógica de "Muerte": tras varios rebotes, se detiene y desvanece
            if (this.bounces > 5) {
                this.dy = 0;
                this.life -= 0.02; 
            }
        }

        // 3. COLISIÓN CON PAREDES LATERALES
        if (this.posX + this.radius >= window_width) {
            this.posX = window_width - this.radius;
            this.dx *= -1;
        } else if (this.posX - this.radius <= 0) {
            this.posX = this.radius;
            this.dx *= -1;
        }

        // 4. ACTUALIZAR POSICIÓN
        this.posX += this.dx;
        this.posY += this.dy;
    }
}

// 🔥 GENERADOR SEGÚN DIRECCIÓN (Lógica central del Commit 5)
function generarCirculo() {
    let radius = Math.random() * 25 + 15;
    let x, y, dx, dy;

    // Inicialización de velocidades base
    dx = (Math.random() - 0.5) * 2;
    dy = 0;

    // Ajuste de origen e impulso según el selector
    switch (direction) {
        case "top":
            x = Math.random() * window_width;
            y = -radius; // Nace arriba
            break;
        case "bottom":
            x = Math.random() * window_width;
            y = window_height + radius; // Nace abajo
            dy = -12; // Fuerte impulso hacia arriba
            break;
        case "left":
            x = -radius; // Nace a la izquierda
            y = Math.random() * (window_height / 2);
            dx = Math.random() * 6 + 2; // Impulso hacia la derecha
            break;
        case "right":
            x = window_width + radius; // Nace a la derecha
            y = Math.random() * (window_height / 2);
            dx = -(Math.random() * 6 + 2); // Impulso hacia la izquierda
            break;
    }

    // Colores modernos semitransparentes (RGB Aleatorio)
    let color = `rgba(${Math.random()*255}, ${Math.random()*255}, 255, 0.7)`;
    
    let nuevoCirculo = new Circle(x, y, radius, color);
    nuevoCirculo.dx = dx;
    nuevoCirculo.dy = dy;
    
    return nuevoCirculo;
}

// FUNCIÓN DE CONTROL (Botón Aplicar)
function aplicarCambios() {
    // Obtener valores del HTML
    maxCircles = parseInt(document.getElementById("numCircles").value);
    window_width = parseInt(document.getElementById("canvasWidth").value);
    window_height = parseInt(document.getElementById("canvasHeight").value);
    direction = document.getElementById("direction").value;

    // Ajustar Canvas
    canvas.width = window_width;
    canvas.height = window_height;
    
    // Limpiar simulación actual
    circles = []; 
}

// 🔥 SPAWNER ALEATORIO (Bucle de generación)
function spawner() {
    if (circles.length < maxCircles) {
        circles.push(generarCirculo());
        
        // Pequeña probabilidad de "combo" (dos partículas a la vez)
        if (Math.random() < 0.2 && circles.length < maxCircles) {
            circles.push(generarCirculo());
        }
    }
    
    // Calcula el tiempo para la próxima partícula (entre 300ms y 1300ms)
    let nextSpawn = Math.random() * 1000 + 300;
    setTimeout(spawner, nextSpawn);
}

// BUCLE DE ANIMACIÓN
function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, window_width, window_height);
    
    // Renderizado y Garbage Collection
    circles.forEach((c, index) => {
        c.update(ctx);
        
        // Si la partícula es invisible (life <= 0), se elimina del arreglo
        if (c.life <= 0) {
            circles.splice(index, 1);
        }
    });
}

// --- INICIALIZACIÓN ---
aplicarCambios();
spawner();
animate();