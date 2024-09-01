function generarGraficaVacia(canvasId, titulo, labelY) {
    const ctx = document.getElementById(canvasId).getContext('2d');
    if (window[canvasId]) {
        window[canvasId].destroy();
    }
    window[canvasId] = new Chart(ctx, {
        type: 'line',
        data: {
            labels: [],
            datasets: [{
                label: labelY,
                data: [],
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                fill: true,
                tension: 0.1
            }]
        },
        options: {
            responsive: true,
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Tiempo'
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: labelY
                    },
                    beginAtZero: true,
                }
            }
        }
    });
}
