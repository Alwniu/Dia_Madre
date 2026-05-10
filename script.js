// --- LÓGICA DE LA PRESENTACIÓN ---
const slides = document.querySelectorAll('.slide');
const nextBtn = document.getElementById('next-btn');
let currentSlide = 0;

nextBtn.addEventListener('click', () => {
    // Ocultar diapositiva actual
    slides[currentSlide].classList.remove('active');
    
    // Calcular siguiente diapositiva
    currentSlide++;
    
    // Si llegamos a la última, cambiar el texto del botón o reiniciar
    if (currentSlide >= slides.length) {
        currentSlide = 0; // Reinicia el ciclo
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
    
    // Gran variedad de elementos cayendo: Margaritas, hojas, pétalos, brillos
    const types = ['🌼', '🌸', '✨', '🍂', '🍃', '💮', '💛'];
    particle.innerText = types[Math.floor(Math.random() * types.length)];
    
    // Posición y tamaño aleatorio
    const startPosX = Math.random() * 100; // De 0 a 100vw
    const duration = Math.random() * 6 + 6; // Entre 6 y 12 segundos (caída suave)
    const size = Math.random() * 1.5 + 0.8; // Tamaño en rem
    
    // Asignar estilos
    particle.style.left = startPosX + 'vw';
    particle.style.animationDuration = duration + 's';
    particle.style.fontSize = size + 'rem';
    
    // Pequeño efecto de desenfoque para dar profundidad a algunas partículas
    if (Math.random() > 0.7) {
        particle.style.filter = 'blur(2px)';
        particle.style.zIndex = 10; // Detrás de la tarjeta
    }

    document.body.appendChild(particle);

    // Limpiar el DOM cuando la animación termine
    setTimeout(() => {
        particle.remove();
    }, duration * 1000);
}

// Generar una nueva partícula cada 250ms para un bosque frondoso
setInterval(createParticle, 250);

// --- INTERACTIVIDAD EXTRA: Magia al hacer clic ---
document.addEventListener('click', (e) => {
    // Evitar que el clic en el botón genere flores encima de él
    if(e.target.id === 'next-btn') return;

    const magic = document.createElement('div');
    magic.innerText = '🌼'; // Genera una margarita donde haces clic
    magic.style.position = 'absolute';
    magic.style.left = (e.pageX - 15) + 'px';
    magic.style.top = (e.pageY - 15) + 'px';
    magic.style.fontSize = '30px';
    magic.style.pointerEvents = 'none';
    magic.style.zIndex = '999';
    magic.style.transition = 'all 1s ease-out';
    
    document.body.appendChild(magic);

    // Animar la flor hacia arriba desvaneciéndose
    requestAnimationFrame(() => {
        magic.style.transform = 'translateY(-100px) rotate(180deg) scale(1.5)';
        magic.style.opacity = '0';
    });

    // Eliminar
    setTimeout(() => magic.remove(), 1000);
});