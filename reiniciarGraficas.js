let chartPosicion = null;
let chartVelocidad = null;
let chartAceleracion = null;

function resetearGraficas() {
    // Destruye las gráficas anteriores si existen y reinicia las referencias a null
    if (chartPosicion) {
        chartPosicion.destroy();
        chartPosicion = null;
    }
    if (chartVelocidad) {
        chartVelocidad.destroy();
        chartVelocidad = null;
    }
    if (chartAceleracion) {
        chartAceleracion.destroy();
        chartAceleracion = null;
    }
}

function generarGraficas(tiempo_total, v_inicial, v_final, aceleracion, distancia) {
    console.log("Tiempo Total:", tiempo_total);
    console.log("Velocidad Inicial:", v_inicial);
    console.log("Velocidad Final:", v_final);
    console.log("Aceleración:", aceleracion);
    console.log("Distancia:", distancia);

    // Verificación de NaN
    if (isNaN(tiempo_total) || isNaN(v_inicial) || isNaN(v_final) || isNaN(aceleracion) || isNaN(distancia)) {
        console.error('Uno o más valores son NaN, revise las entradas.');
        return;
    }

    resetearGraficas(); // Reinicia las gráficas antes de regenerarlas

    // Gráfica de Velocidad vs Tiempo
    const tiemposVelocidad = [0, tiempo_total];
    const velocidades = [v_inicial, v_final];

    chartVelocidad = new Chart(ctxVelocidad, {
        type: 'line',
        data: {
            labels: tiemposVelocidad,
            datasets: [{
                label: 'Velocidad vs Tiempo',
                data: velocidades,
                borderColor: 'green',
                borderWidth: 2,
                fill: false,
                tension: 0 // Línea recta
            }]
        },
        options: {
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Tiempo'
                    },
                    suggestedMin: 0,
                    suggestedMax: tiempo_total
                },
                y: {
                    title: {
                        display: true,
                        text: 'Velocidad'
                    },
                    suggestedMin: Math.min(v_inicial, v_final),
                    suggestedMax: Math.max(v_inicial, v_final)
                }
            }
        }
    });

    // Gráfica de Aceleración vs Tiempo
    const tiemposAceleracion = [0, tiempo_total];
    const aceleraciones = [aceleracion, aceleracion];

    chartAceleracion = new Chart(ctxAceleracion, {
        type: 'line',
        data: {
            labels: tiemposAceleracion,
            datasets: [{
                label: 'Aceleración vs Tiempo',
                data: aceleraciones,
                borderColor: 'blue',
                borderWidth: 2,
                fill: false,
                tension: 0 // Línea recta
            }]
        },
        options: {
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Tiempo'
                    },
                    suggestedMin: 0,
                    suggestedMax: tiempo_total
                },
                y: {
                    title: {
                        display: true,
                        text: 'Aceleración'
                    },
                    suggestedMin: aceleracion - 1, // Ajuste mínimo y máximo para asegurar que se vea la línea
                    suggestedMax: aceleracion + 1
                }
            }
        }
    });

    // Gráfica de Posición vs Tiempo
    const tiemposPosicion = [];
    const posiciones = [];

    for (let t = 0; t <= tiempo_total; t += tiempo_total / 20) {
        tiemposPosicion.push(t);
        // Aquí usamos una función exponencial simple para simular la tendencia
        posiciones.push(Math.exp(t)); // Suponemos una función de tipo y = e^t para ejemplo
    }

    chartPosicion = new Chart(ctxPosicion, {
        type: 'line',
        data: {
            labels: tiemposPosicion,
            datasets: [{
                label: 'Posición vs Tiempo',
                data: posiciones,
                borderColor: 'red',
                borderWidth: 2,
                fill: false,
                tension: 0.4 // Línea curva para representar la tendencia exponencial
            }]
        },
        options: {
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Tiempo'
                    },
                    suggestedMin: 0,
                    suggestedMax: tiempo_total
                },
                y: {
                    title: {
                        display: true,
                        text: 'Posición'
                    },
                    suggestedMin: 0,
                    suggestedMax: Math.exp(tiempo_total) 
                }
            }
        }
    });
}

function actualizarValores() {
    let v_inicial = parseFloat(document.getElementById("entry_vinicial").value);
    let v_final = parseFloat(document.getElementById("entry_vfinal").value);
    let aceleracion = parseFloat(document.getElementById("entry_aceleracion").value);
    let tiempo_total = parseFloat(document.getElementById("entry_tiempo").value);
    let distancia = parseFloat(document.getElementById("entry_distancia").value);

    // Calcular tiempo si no se ha proporcionado
    if (isNaN(tiempo_total)) {
        if (!isNaN(v_inicial) && !isNaN(v_final) && !isNaN(aceleracion)) {
            tiempo_total = Math.abs((v_final - v_inicial) / aceleracion);
            document.getElementById("entry_tiempo").value = tiempo_total.toFixed(2);
        }
    }

    // Calcular distancia si no se ha proporcionado
    if (isNaN(distancia)) {
        if (!isNaN(v_inicial) && !isNaN(v_final) && !isNaN(tiempo_total)) {
            distancia = ((v_inicial + v_final) / 2) * tiempo_total;
            document.getElementById("entry_distancia").value = distancia.toFixed(2);
        }
    }

    // Ahora, todos los valores deben estar actualizados o calculados
    generarGraficas(tiempo_total, v_inicial, v_final, aceleracion, distancia);
}

function cambiarModo() {
    // Lógica para cambiar el modo (ejemplo: de km/h a m/s)
    // Aquí también se puede resetear la interfaz y las gráficas
    actualizarInterfaz(); // Asegura que los valores de los campos se ajusten al nuevo modo
    actualizarValores(); // Calcula los valores y genera las gráficas en el nuevo modo
}

// Evento para el botón de simulación
document.getElementById('btn_simular').addEventListener('click', actualizarValores);
document.getElementById('btn_cambiar_modo').addEventListener('click', cambiarModo);
