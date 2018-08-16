// intancia de las clases
const ui = new UI();

document.addEventListener('DOMContentLoaded', () =>{
    ui.mostrarEstablecimientos();
});

// Habilitar busqueda en vivo
const buscador = document.querySelector('#buscar input');
buscador.addEventListener('input', () => {
    // si es mayor a 5 buscar segerencias
    if (buscador.value.length > 3) {
        ui.obtenerSugerencias(buscador.value);
    } else if(buscador.value.length === 0) {
        // Reiniciar el mapa
        ui.inicializarMapa();
        ui.mostrarEstablecimientos();
    }
});
