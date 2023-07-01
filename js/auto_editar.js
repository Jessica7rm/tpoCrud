console.log(location.search) // lee los argumentos pasados a este formulario
var id=location.search.substr(4)
console.log(id)
const { createApp } = Vue
createApp({
    data() {
        return {
            id: 0,
            modelo: "",
            precio: 0,
            anio: 0,
            km: 0,
            lugar: "",
            imagen: "",
            url: 'http://jessica7rm.pythonanywhere.com/autos/'+id,
        }
    },
    methods: {
        fetchData(url) {
            fetch(url)
                .then(response => response.json())
                .then(data => {

                    console.log(data)
                    this.id = data.id
                    this.modelo = data.modelo;
                    this.precio = data.precio
                    this.anio = data.anio
                    this.km = data.km
                    this.lugar = data.lugar
                    this.imagen =data.imagen
                })
                .catch(err => {
                    console.error(err);
                    this.error = true
                })
        },
        modificar() {
            let auto = {
                modelo: this.modelo,
                precio: this.precio,
                anio: this.anio,
                km: this.km,
                lugar: this.lugar,
                imagen: this.imagen
            }
            var options = {
                body: JSON.stringify(auto),
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                redirect: 'follow'
            }
            fetch(this.url, options)
                .then(function () {
                    alert("Registro modificado")
                    window.location.href = "./index.html";
                })
                .catch(err => {
                    console.error(err);
                    alert("Error al Modificar")
                })
        }
    },
    created() {
        this.fetchData(this.url)
    },
}).mount('#app')