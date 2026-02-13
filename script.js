// --- CONFIGURACIÓN DEL LOGO FLOTANTE (REBOTE) ---
const logo = document.getElementById('floatingLogo');
let posX = Math.random() * (window.innerWidth - 100);
let posY = Math.random() * (window.innerHeight - 100);
let velX = 2; // Velocidad horizontal
let velY = 2; // Velocidad vertical

function moverLogo() {
    // Actualizar posición
    posX += velX;
    posY += velY;

    // Detectar colisión con bordes derecho e izquierdo
    if (posX + logo.clientWidth >= window.innerWidth || posX <= 0) {
        velX *= -1;
    }

    // Detectar colisión con bordes superior e inferior
    if (posY + logo.clientHeight >= window.innerHeight || posY <= 0) {
        velY *= -1;
    }

    // Aplicar la nueva posición al logo
    logo.style.left = posX + 'px';
    logo.style.top = posY + 'px';

    // Ejecutar la animación continuamente
    requestAnimationFrame(moverLogo);
}

// Iniciar el movimiento cuando cargue la página
window.onload = moverLogo;


// --- LÓGICA DE INTERACCIÓN POR CLICS ---
let contadorClics = 0;

function handleInitialClicks() {
    contadorClics++;
    const btn = document.getElementById('mainBtn');
    const photoStep = document.getElementById('photoStep');

    if (contadorClics === 1) {
        btn.innerHTML = "¡Casi! Dale otra vez... 😅";
        btn.style.transform = "scale(1.6)";
        btn.style.backgroundColor = "#fff3cd"; 
    } 
    else if (contadorClics === 2) {
        btn.innerHTML = "¡UN ÚLTIMO ESFUERZO! 🚀";
        btn.style.transform = "scale(2.5)";
        btn.style.backgroundColor = "#ffeeba";
    } 
    else if (contadorClics === 3) {
        // PASO 1: Ocultar botón y mostrar la FOTO
        btn.style.display = "none";
        photoStep.style.display = "block";

        // Lanzar una explosión inicial de confeti
        confetti({
            particleCount: 150,
            spread: 70,
            origin: { y: 0.6 }
        });
    }
}

function showFinalMessage() {
    const photoStep = document.getElementById('photoStep');
    const finalCard = document.getElementById('finalCard');

    // PASO 2: Ocultar foto y mostrar MENSAJE FINAL
    photoStep.style.display = "none";
    finalCard.style.display = "block";

    // Efecto de confeti continuo por 3 segundos
    const duration = 3 * 1000;
    const end = Date.now() + duration;

    (function frame() {
        confetti({
            particleCount: 3,
            angle: 60,
            spread: 55,
            origin: { x: 0 },
            colors: ['#004a99', '#ffffff', '#00c6ff'] // Colores Tecman
        });
        confetti({
            particleCount: 3,
            angle: 120,
            spread: 55,
            origin: { x: 1 },
            colors: ['#004a99', '#ffffff', '#00c6ff'] // Colores Tecman
        });

        if (Date.now() < end) {
            requestAnimationFrame(frame);
        }
    }());
}

// Ajustar posición si cambian el tamaño de la ventana
window.onresize = function() {
    posX = Math.min(posX, window.innerWidth - logo.clientWidth);
    posY = Math.min(posY, window.innerHeight - logo.clientHeight);
};