class API {
    constructor() {}
    async obtenerDatos(){
        // obtener desde la API
        const response = await fetch('https://api.datos.gob.mx/v1/precio.gasolina.publico');
        const responseJSON = await response.json();
        
        return{
                responseJSON
        };

    }
}
