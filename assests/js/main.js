const canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

// Obtiene las dimensiones de la pantalla actual (a la mitad, según los commits)
const window_height = window.innerHeight / 2;
const window_width = window.innerWidth / 2;

// El canvas tiene las mismas dimensiones que calculamos
canvas.height = window_height;
canvas.width = window_width;

canvas.style.background = "#ff8";

class Circle {
  constructor(x, y, radius, color, text, speed) {
    this.posX = x;
    this.posY = y;
    this.radius = radius;
    this.color = color;
    this.text = text;

    this.speed = speed;

    this.dx = 1 * this.speed;
    this.dy = 1 * this.speed;
  }

  draw(context) {
    context.beginPath();
    context.strokeStyle = this.color;
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.font = "20px Arial";
    context.fillText(this.text, this.posX, this.posY);
    context.lineWidth = 2;
    context.arc(this.posX, this.posY, this.radius, 0, Math.PI * 2, false);
    context.stroke();
    context.closePath();
  }

  update(context) {
    this.draw(context);

    // Margen derecho
    if (this.posX + this.radius >= window_width) {
      this.dx = -Math.abs(this.dx); // Fuerza a que la velocidad sea negativa (hacia la izquierda)
      this.posX = window_width - this.radius; // Lo empuja justo al límite de la pared
    }
    // Margen izquierdo
    if (this.posX - this.radius <= 0) {
      this.dx = Math.abs(this.dx); // Fuerza a que la velocidad sea positiva (hacia la derecha)
      this.posX = this.radius; // Lo empuja de vuelta al límite
    }
    // Margen inferior
    if (this.posY + this.radius >= window_height) {
      this.dy = -Math.abs(this.dy); // Hacia arriba
      this.posY = window_height - this.radius;
    }
    // Margen superior
    if (this.posY - this.radius <= 0) {
      this.dy = Math.abs(this.dy); // Hacia abajo
      this.posY = this.radius; 
    }

    this.posX += this.dx;
    this.posY += this.dy;
  }
}

// --- ARRAY DE CÍRCULOS ---
// Nota: Arreglé la llave que faltaba para cerrar el for y le apliqué 
// la misma lógica para que no nazcan fuera del lienzo.
let arrayCircle = [];

for(let i = 0; i < 10; i++) {
    let randomRadius = Math.floor(Math.random() * 100 + 30);
    let randomX = Math.random() * (window_width - 2 * randomRadius) + randomRadius;
    let randomY = Math.random() * (window_height - 2 * randomRadius) + randomRadius;

    let miCirculoBucle = new Circle(randomX, randomY, randomRadius, 'green', i + 1, 3);
    arrayCircle.push(miCirculoBucle);
}

// --- CÍRCULOS INDIVIDUALES ---
// 1. PRIMERO calculamos el radio
let randomRadius = Math.floor(Math.random() * 100 + 30);

// 2. DESPUÉS calculamos X e Y. 
let randomX = Math.random() * (window_width - 2 * randomRadius) + randomRadius;
let randomY = Math.random() * (window_height - 2 * randomRadius) + randomRadius;

// 3. Ahora sí, creamos los círculos
let miCirculo = new Circle(randomX, randomY, randomRadius, "blue", "Tec1", 5);
let miCirculo2 = new Circle(randomX, randomY, randomRadius, "red", "Tec2", 2);

// --- CICLO DE ANIMACIÓN ---
let updateCircle = function () {
  requestAnimationFrame(updateCircle);
  
  // Limpiamos el lienzo en cada frame
  ctx.clearRect(0, 0, window_width, window_height);
  
  // Actualizamos los círculos individuales
  miCirculo.update(ctx);
  miCirculo2.update(ctx);

  // Si en algún momento quieres que también se muevan los 10 círculos del array, 
  // solo quítale las barras de comentario (//) a las siguientes 3 líneas:
  // for(let i = 0; i < arrayCircle.length; i++){
  //   arrayCircle[i].update(ctx);
  // }
};

updateCircle();