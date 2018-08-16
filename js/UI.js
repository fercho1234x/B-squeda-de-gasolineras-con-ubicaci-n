class UI {
    constructor() {
        // Intancia de la API
        this.api = new API();
        // iniciar el mapa
        this.inicializarMapa();

    }

    // Inicializa mapa
    inicializarMapa(){
        // Inicializar y obtener la propiedad del mapa
        this.latLng = {
            lat: 19.390519,
            lng: -99.3739778
        };
        this.mapa = new google.maps.Map(document.getElementById('mapa'), {
          center: this.latLng,
          zoom: 4
        });
    }

    // Mostrar establecimientos de la API
    mostrarEstablecimientos(){
        this.api.obtenerDatos()
            .then(data =>{
                const datosAPI = data.responseJSON.results;
                // Muestra los pines en el mapa
                this.mostrarMapa(datosAPI);
            })
    }
// Muestra los pines
    mostrarMapa(datosAPI){
        // Almacena info window activo
        let infoWindowActivo;

        // Recorrer establecimientos
        datosAPI.forEach((establecimiento) => {
            // console.log(establecimiento);
            // console.log(establecimiento);
            // Destructuting para recuperar informacion
            let {latitude, longitude, calle, regular, premium} = establecimiento;

            // Crear objeto con latitud y lingitud
            let  latLng = {
                lat: Number(latitude),
                lng: Number(longitude)
            }

            // Agregar pines
            let marker = new google.maps.Marker({
                position: latLng,
                map: this.mapa
            });

            // Crear infro InfoWindow
            let infoWindow = this.crearWindow(calle, regular, premium);

            // Mostrar infoWindow al hacer click
            marker.addListener('click', () => {

                // Cerrar infoWindowActivo
                if (infoWindowActivo) {
                    infoWindowActivo.close();
                }

                // Mostrar la info
                infoWindow.open(this.mapa, marker);

                // Asignarlo a activo
                infoWindowActivo = infoWindow;
            });
        });
    }

    // Crea el info window
    crearWindow(calle, regular, premium){
        // Crear info window
        let contenido = `
            Calle: ${calle}             </br>
            Precio magna: $${regular}    </br>
            Precio premium: $${premium}
        `;
        let infoWindow = new google.maps.InfoWindow({
            content: contenido
        });
        return infoWindow;
    }

    // Obtiene las sugerencias de la REST API
    obtenerSugerencias(busqueda){
        this.api.obtenerDatos()
            .then((datos) => {
                // Obtener los resultados
                const resultado = datos.responseJSON.results;
                // Enviar el JSOn y la busqueda al filtro
                this.filtrarSugerencias(resultado, busqueda);
            })
    }

    // Filtra las sugerencias de busqueda1
    filtrarSugerencias(resultado, busqueda){
        // console.log(busqueda);
        //  // Filter es una metodo en que recive un arreglo el cual retorna un
        //  // arreglo que retorna un arreglo con el valor que se busca
        //  const busquedaFiltrada = resultado.filter(function(elemento) {
        //      const cadena = elemento.calle;
        //      // return elemento.calle.indexOf('Guadalajara');
        //      console.log(cadena.indexOf(busqueda));
        //  });
        //  // console.log(busquedaFiltrada);
        // const filtro = resultado.filter(filtro => filtro.calle.indexOf(busqueda) !== -1);
        const filtro = resultado.filter(filtro => {
            const filtroCalleMayuscula = filtro.calle.toUpperCase();
            console.log(filtroCalleMayuscula.indexOf(busqueda.toUpperCase()) !== -1);
            return filtroCalleMayuscula.indexOf(busqueda.toUpperCase()) !== -1;
        });
        console.log(filtro);
        this.inicializarMapa();

        // Mostrar pines del filtroCalleMayuscula
        this.mostrarMapa(filtro)
    }

}
