const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let window_width = 800;
let window_height = 500;
let circles = [];
let maxCircles = 20;

canvas.width = window_width;
canvas.height = window_height;

class Circle {
    constructor(x, y, radius, color) {
        this.posX = x;
        this.posY = y;
        this.radius = radius;
        this.color = color;
        
        // --- NUEVA FÍSICA ---
        this.dx = (Math.random() - 0.5) * 4; // Velocidad lateral aleatoria
        this.dy = 0;                         // Inicia sin velocidad vertical
        this.gravity = 0.4;                  // Fuerza de gravedad
        this.friction = 0.6;                 // Energía que pierde al rebotar
        this.life = 1.0;                     // Opacidad (1 = 100%)
        this.bounces = 0;                    // Contador de rebotes
    }

    draw(context) {
        context.save();
        context.globalAlpha = this.life; // Efecto de desvanecimiento
        context.beginPath();
        context.fillStyle = this.color;
        context.arc(this.posX, this.posY, this.radius, 0, Math.PI * 2);
        
        // Estilo simplificado pero tech
        context.shadowColor = this.color;
        context.shadowBlur = 10;
        context.fill();

        context.strokeStyle = "rgba(255,255,255,0.8)";
        context.lineWidth = 2;
        context.stroke();
        context.closePath();
        context.restore();
    }

    update(context) {
        this.draw(context);

        // APLICAR GRAVEDAD
        this.dy += this.gravity;

        // REBOTE EN EL SUELO
        if (this.posY + this.radius >= window_height) {
            this.posY = window_height - this.radius;
            this.dy *= -this.friction; // Rebota y pierde fuerza
            this.bounces++;
            
            // Si rebota mucho, deja de moverse y empieza a morir
            if (this.bounces > 5) {
                this.dy = 0;
                this.life -= 0.03; // Se desvanece
            }
        }

        // PAREDES LATERALES
        if (this.posX + this.radius >= window_width || this.posX - this.radius <= 0) {
            this.dx *= -1;
        }

        // Actualizar posición
        this.posX += this.dx;
        this.posY += this.dy;
    }
}

// GENERADOR DE PARTÍCULA ÚNICA
function generarCirculo() {
    let radius = Math.random() * 20 + 10;
    let x = Math.random() * (window_width - 2 * radius) + radius;
    let y = -radius; // Nace arriba, fuera del canvas
    
    // Paleta de colores tech (azules y cianes)
    let color = `rgba(${Math.random()*100}, ${Math.random()*255}, 255, 0.8)`;
    
    return new Circle(x, y, radius, color);
}

function aplicarCambios() {
    maxCircles = parseInt(document.getElementById("numCircles").value);
    window_width = parseInt(document.getElementById("canvasWidth").value);
    window_height = parseInt(document.getElementById("canvasHeight").value);

    canvas.width = window_width;
    canvas.height = window_height;
    circles = []; // Limpiar pantalla
}

// 🔥 SPAWNER ALEATORIO (NUEVO)
function spawner() {
    if (circles.length < maxCircles) {
        circles.push(generarCirculo());
        
        // Probabilidad de soltar una segunda partícula rápido
        if (Math.random() < 0.3 && circles.length < maxCircles) {
            circles.push(generarCirculo());
        }
    }
    
    // Siguiente spawn en un tiempo aleatorio
    let delay = Math.random() * 1000 + 200;
    setTimeout(spawner, delay);
}

function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, window_width, window_height);
    
    circles.forEach((c, index) => {
        c.update(ctx);
        
        // ELIMINACIÓN DE PARTÍCULAS MUERTAS (Garbage Collection)
        if (c.life <= 0) {
            circles.splice(index, 1);
        }
    });
}

// INICIO
aplicarCambios();
spawner();
animate();