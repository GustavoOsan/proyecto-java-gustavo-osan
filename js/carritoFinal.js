const CONTENEDOR_TARJETAS = document.getElementById("productos-container");
const unidadesElement = document.getElementById("unidades");
const precioElement = document.getElementById("total");
const carritoVacioElement = document.getElementById("carrito-vacio");
const totalesElement = document.getElementById("totales");
const botonReset = document.getElementById("reiniciar");

function crearTarjetasProductosInicio() {
    CONTENEDOR_TARJETAS.innerHTML = "";
    const productos = JSON.parse(localStorage.getItem(`carrito`));
    console.log(productos);
    if (productos && productos.length > 0) {
        productos.forEach(producto => {
            const nuevoProducto = document.createElement("div");
            nuevoProducto.classList = "tarjeta-producto";
            nuevoProducto.innerHTML = `
        <img src="${producto.imagen}" alt="${producto.nombre}" class="tarjeta-imagen">
        <div class="tarjeta-contenido">
            <h3>${producto.nombre}</h3>
            <h4>$${producto.precio}</h4>
        </div>
        <div class="buttons-container">
            <button>+</button>
            <span class="cantidad">${producto.cantidad}</span>
            <button>-</button>
        </div>
        `;
            CONTENEDOR_TARJETAS.appendChild(nuevoProducto);
            
            nuevoProducto
                .getElementsByTagName("button")[0]
                .addEventListener("click", (e) => {
                    agregarAlCarrito(producto);
                    crearTarjetasProductosInicio();
                    actualizarTotales();
                });

            nuevoProducto
                .getElementsByTagName("button")[1]
                .addEventListener("click", (e) => {
                    restarAlCarrito(producto);
                    crearTarjetasProductosInicio();
                    actualizarTotales();
                    revisarMensajeVacio();
                    
                    // Mostrar notificación utilizando Toastify
                    Toastify({
                        text: "Has eliminado el producto",
                        duration: 4000,
                        gravity: "top", // `top` o `bottom`
                        position: "center", // `left`, `center` o `right`
                        stopOnFocus: true, // Previene que se cierre el toast al pasar el mouse
                        style: {
                            background: "linear-gradient(to right, #f44336, #ff5722)", // Color rojo
                        },
                        onClick: function() {} // Callback después de hacer clic
                    }).showToast(); // Mostrar el toast
                });
        });
        actualizarNroCarrito();
    }
}

crearTarjetasProductosInicio();
actualizarTotales();

function actualizarTotales() {
    const productos = JSON.parse(localStorage.getItem(`carrito`));
    let unidades = 0;
    let total = 0;
    if (productos && productos.length > 0) {
        productos.forEach(producto => {
            unidades += producto.cantidad;
            total += producto.precio * producto.cantidad;
        })
        unidadesElement.innerText = unidades;
        precioElement.innerText = total;
    }
}

function revisarMensajeVacio() {
    const productos = JSON.parse(localStorage.getItem(`carrito`));
    carritoVacioElement.classList.toggle("escondido", productos && productos.length > 0);
    totalesElement.classList.toggle("escondido", !(productos && productos.length > 0));
}

revisarMensajeVacio();