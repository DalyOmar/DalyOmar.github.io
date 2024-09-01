// Variable global para rastrear el modo actual
let modo_horas = true;

// Función para resetear la posición del objeto al centro
function resetearObjeto() {
    var objeto = document.getElementById('objeto');
    objeto.style.left = '50%';
    objeto.style.transform = 'translateX(-50%)';
    actualizarContador(0); // Resetea el contador a 0
}

// Función para mover el objeto basado en la distancia calculada
function moverObjeto(distancia_px) {
    var objeto = document.getElementById('objeto');
    var contenedor = document.getElementById('simulacion');
    var centro = contenedor.offsetWidth / 2;

    // Nueva posición calculada
    var nuevaPosicion = centro + distancia_px;
    objeto.style.left = nuevaPosicion + 'px';

    // Reproduce la animación del GIF mientras se mueve
    objeto.classList.add('play-animation');

    // Convertir la distancia en metros o kilómetros con la nueva escala
    let distancia = convertirADistancia(distancia_px);

    // Actualizar el contador con la distancia
    actualizarContador(distancia);

    // Pausar la animación del GIF después de que la transición se complete
    objeto.addEventListener('transitionend', function() {
        objeto.classList.remove('play-animation');
    }, { once: true });
}

// Función para convertir la distancia en píxeles a metros o kilómetros
function convertirADistancia(distancia_px) {
    let distancia;
    if (modo_horas) {
        distancia = distancia_px / 10;  // Multiplica por 10 para km
    } else {
        distancia = distancia_px / 10;  // Divide por 10 para m
    }
    return distancia.toFixed(2);  // Redondea a dos decimales
}

// Función para actualizar el contador encima del objeto
function actualizarContador(distancia) {
    var contador = document.getElementById('contador');
    if (contador) {
        let unidad = modo_horas ? 'km' : 'm';
        contador.innerText = `Distancia = ${distancia} ${unidad}`;
    } else {
        console.error('Elemento contador no encontrado');
    }
}

// Función para cambiar el modo entre horas y segundos
function cambiarModo() {
    modo_horas = !modo_horas;  // Cambia el modo
    var boton = document.getElementById("btn_cambiar_modo");
    boton.innerText = modo_horas ? "Cambiar a Segundos" : "Cambiar a Horas";

    // Actualizar las etiquetas y el contador
    actualizarInterfaz();
    resetearObjeto();
}

// Función para actualizar las etiquetas en la interfaz
function actualizarInterfaz() {
    document.getElementById("label_vinicial").innerText = modo_horas ? "Velocidad Inicial (km/h):" : "Velocidad Inicial (m/s):";
    document.getElementById("label_vfinal").innerText = modo_horas ? "Velocidad Final (km/h):" : "Velocidad Final (m/s):";
    document.getElementById("label_aceleracion").innerText = modo_horas ? "Aceleración (km/h²):" : "Aceleración (m/s²):";
    document.getElementById("label_tiempo").innerText = modo_horas ? "Tiempo (horas):" : "Tiempo (segundos):";
    document.getElementById("label_distancia").innerText = modo_horas ? "Distancia (km):" : "Distancia (m):";
}



// Inicializa la página
window.onload = function() {
    resetearObjeto(); // Inicializar el objeto en el centro y el contador a 0
    document.getElementById("btn_cambiar_modo").addEventListener("click", cambiarModo);
    aplicarEstilosBotones();
};
