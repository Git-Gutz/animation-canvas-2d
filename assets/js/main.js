const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// Dimensiones por defecto
let window_width = 800;
let window_height = 500;

class Circle {
    constructor(x, y, radius, color, text, speed) {
        this.posX = x;
        this.posY = y;
        this.radius = radius;
        this.color = color;
        this.text = text;
        this.speed = speed;

        // Velocidad aleatoria en ambas direcciones
        this.dx = (Math.random() - 0.5) * this.speed;
        this.dy = (Math.random() - 0.5) * this.speed;
    }

    draw(context) {
        context.save(); // Guarda el estado actual del contexto

        context.beginPath();

        // --- 1. CUERPO DE LA BURBUJA (Transparencia) ---
        // Usamos una opacidad más baja (0.1) para un efecto de jabón
        context.fillStyle = this.color.replace(')', ', 0.1)').replace('hsl', 'hsla');
        context.arc(this.posX, this.posY, this.radius, 0, Math.PI * 2);
        
        // --- 2. SOMBRA EXTERIOR ---
        context.shadowColor = "rgba(0,0,0,0.2)";
        context.shadowBlur = 15;
        context.fill();

        // --- 3. BORDE BLANCO SUAVE ---
        context.strokeStyle = "rgba(255,255,255,0.7)";
        context.lineWidth = 1.5;
        context.stroke();
        context.closePath();

        // --- 4. BRILLO SUPERIOR IZQUIERDO (PRINCIPAL) ---
        context.beginPath();
        context.arc(
            this.posX - this.radius / 2.8,
            this.posY - this.radius / 2.8,
            this.radius / 3.5,
            0,
            Math.PI * 2
        );
        context.fillStyle = "rgba(255,255,255,0.5)"; // Más sutil
        context.fill();
        context.closePath();

        // --- 5. BRILLO INFERIOR DERECHO (SEGUNDARIO - EFECTO VOLUMEN) ---
        context.beginPath();
        context.arc(
            this.posX + this.radius / 2.5,
            this.posY + this.radius / 2.5,
            this.radius / 6,
            0,
            Math.PI * 2
        );
        context.strokeStyle = "rgba(255,255,255,0.3)";
        context.lineWidth = 1;
        context.stroke();
        context.closePath();

        // --- 6. TEXTO ELEGANTE ---
        context.fillStyle = "rgba(255,255,255,0.6)"; // Blanco suave semitransparente
        context.textAlign = "center";
        context.textBaseline = "middle";
        context.font = "16px 'Poppins', sans-serif";
        context.fillText(this.text, this.posX, this.posY);

        context.restore(); // Restaura el estado original
    }

    update(context) {
        this.draw(context);

        // --- COLISIONES CON LOS BORDES ---
        // DERECHA
        if (this.posX + this.radius > window_width) {
            this.posX = window_width - this.radius;
            this.dx = -this.dx;
        }

        // IZQUIERDA
        if (this.posX - this.radius < 0) {
            this.posX = this.radius;
            this.dx = -this.dx;
        }

        // ABAJO
        if (this.posY + this.radius > window_height) {
            this.posY = window_height - this.radius;
            this.dy = -this.dy;
        }

        // ARRIBA
        if (this.posY - this.radius < 0) {
            this.posY = this.radius;
            this.dy = -this.dy;
        }

        // Actualización de posición
        this.posX += this.dx;
        this.posY += this.dy;
    }
}

let circles = [];

// Función para crear las burbujas
function generarCirculos(cantidad) {
    circles = [];
    for (let i = 0; i < cantidad; i++) {
        // Radio dinámico: entre 25px y 55px
        let radius = Math.random() * 30 + 25; 
        
        // Evitar que nazcan pegadas al borde
        let x = Math.random() * (window_width - 2 * radius) + radius;
        let y = Math.random() * (window_height - 2 * radius) + radius;
        
        // Color HSL aleatorio (formato base sin opacidad)
        let color = `hsl(${Math.random() * 360}, 70%, 60%)`;
        
        // Velocidad base
        let speed = Math.random() * 2 + 1.5; 

        circles.push(new Circle(x, y, radius, color, i + 1, speed));
    }
}

// Función que lee el formulario y actualiza el canvas
function aplicarCambios() {
    let cantidadInput = document.getElementById("numCircles");
    let anchoInput = document.getElementById("canvasWidth");
    let altoInput = document.getElementById("canvasHeight");

    // Validar cantidad (mínimo 1)
    let cantidad = parseInt(cantidadInput.value) || 1;
    if (cantidad < 1) cantidad = 1;

    // Leer dimensiones
    window_width = parseInt(anchoInput.value) || 800;
    window_height = parseInt(altoInput.value) || 500;

    // Actualizar tamaño físico del canvas
    canvas.width = window_width;
    canvas.height = window_height;

    // Regenerar burbujas con las nuevas dimensiones
    generarCirculos(cantidad);
}

// Ciclo de animación principal
function animate() {
    requestAnimationFrame(animate);
    
    // Limpiamos el lienzo en cada frame
    ctx.clearRect(0, 0, window_width, window_height);
    
    // Actualizamos y dibujamos todas las burbujas
    circles.forEach(c => c.update(ctx));
}

// Inicialización automática al cargar la página
// Esto asegura que haya burbujas y el canvas tenga tamaño desde el inicio
aplicarCambios(); 
animate();