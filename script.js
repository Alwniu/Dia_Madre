// --- LÓGICA DE MÚSICA Y PANTALLA DE INICIO ---
const bgMusic = document.getElementById('bg-music');
const startScreen = document.getElementById('start-screen');
const startBtn = document.getElementById('start-btn');

// Ajusta el volumen si lo deseas (0.0 a 1.0)
bgMusic.volume = 0.5; 

startBtn.addEventListener('click', () => {
    // 1. Iniciar la música
    bgMusic.play().catch(error => {
        console.log("No se pudo reproducir el audio.", error);
    });

    // 2. Desvanecer la pantalla de inicio
    startScreen.style.opacity = '0';
    
    // 3. Quitarla del DOM para interactuar con la presentación
    setTimeout(() => {
        startScreen.style.visibility = 'hidden';
    }, 1000);
});

// --- LÓGICA DE LA PRESENTACIÓN ---
const slides = document.querySelectorAll('.slide');
const nextBtn = document.getElementById('next-btn');
let currentSlide = 0;

nextBtn.addEventListener('click', () => {
    // Ocultar diapositiva actual
    slides[currentSlide].classList.remove('active');
    
    // Calcular siguiente diapositiva
    currentSlide++;
    
    // Si llegamos a la última, reiniciar
    if (currentSlide >= slides.length) {
        currentSlide = 0; 
    }
    
    if (currentSlide === slides.length - 1) {
        nextBtn.innerText = "Repetir 💫";
    } else {
        nextBtn.innerText = "Siguiente 🌸";
    }

    // Mostrar nueva diapositiva
    slides[currentSlide].classList.add('active');
});

// --- LÓGICA DE PARTÍCULAS (BOSQUE MÁGICO) ---
function createParticle() {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    const types = ['🌼', '🌸', '✨', '🍂', '🍃', '💮', '💛'];
    particle.innerText = types[Math.floor(Math.random() * types.length)];
    
    const startPosX = Math.random() * 100;
    const duration = Math.random() * 6 + 6; 
    const size = Math.random() * 1.5 + 0.8; 
    
    particle.style.left = startPosX + 'vw';
    particle.style.animationDuration = duration + 's';
    particle.style.fontSize = size + 'rem';
    
    if (Math.random() > 0.7) {
        particle.style.filter = 'blur(2px)';
        particle.style.zIndex = 10; 
    }

    document.body.appendChild(particle);

    setTimeout(() => {
        particle.remove();
    }, duration * 1000);
}

setInterval(createParticle, 250);

// --- INTERACTIVIDAD EXTRA: Magia al tocar la pantalla ---
// Usamos 'pointerdown' para que detecte toques en teléfonos y clics en PC
document.addEventListener('pointerdown', (e) => {
    // Evitar generar flores si tocamos botones
    if(e.target.tagName.toLowerCase() === 'button') return;

    const magic = document.createElement('div');
    magic.innerText = '🌼'; 
    magic.style.position = 'absolute';
    magic.style.left = (e.pageX - 15) + 'px';
    magic.style.top = (e.pageY - 15) + 'px';
    magic.style.fontSize = '30px';
    magic.style.pointerEvents = 'none';
    magic.style.zIndex = '999';
    magic.style.transition = 'all 1s ease-out';
    
    document.body.appendChild(magic);

    requestAnimationFrame(() => {
        magic.style.transform = 'translateY(-100px) rotate(180deg) scale(1.5)';
        magic.style.opacity = '0';
    });

    setTimeout(() => magic.remove(), 1000);
});