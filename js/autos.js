const { createApp } = Vue
createApp({
    data() {
        return {
            autos: [],
            backupAutos: [],
            texto: '',
            //url:'http://localhost:5000/productos',
            // si el backend esta corriendo local usar localhost 5000(si no lo subieron a pythonanywhere)
            url: 'https://jessica7rm.pythonanywhere.com/autos', // si ya lo subieron a pythonanywhere
            error: false,
            cargando: true,
            /*atributos para el guardar los valores del formulario */
            id: 0,
            modelo: "",
            precio: 0,
            anio: 0,
            km: 0,
            lugar: "",
            imagen: "",
        }
    },
    methods: {
        fetchData(url) {
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    this.autos = data;
                    this.backupAutos = this.autos
                    this.cargando = false
                })
                .catch(err => {
                    console.error(err);
                    this.error = true
                })
        },
        eliminar(auto) {
            const url = this.url + '/' + auto;
            var options = {
                method: 'DELETE',
            }
            fetch(url, options)
                .then(res => res.text()) // or res.json()
                .then(res => {
                    location.reload();
                })
        },
        grabar() {
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
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                redirect: 'follow'
            }
            fetch(this.url, options)
                .then(function () {
                    alert("Registro grabado")
                    window.location.href = "./index.html";
                })
                .catch(err => {
                    console.error(err);
                    alert("Error al Grabarr")
                })
        },
        filtrarPorTexto() {
            let texto = document.querySelector('input').value
            console.log(texto);
            this.autos = this.backupAutos.filter(auto => auto.modelo.toLowerCase().includes(texto.toLowerCase()))
        }
    },
    created() {
        this.fetchData(this.url)
    },
}).mount('#app')