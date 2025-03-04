function agregarAlCarrito(producto) {
    const MEMORIA = JSON.parse(localStorage.getItem('carrito'));
    let cuenta = 0;

    if (!MEMORIA) {
        const nuevoProducto = getNuevoProductoParaMemoria(producto);
        localStorage.setItem('carrito', JSON.stringify([nuevoProducto]));
        cuenta = 1;
    } else {
        const indiceProducto = MEMORIA.findIndex(carrito => carrito.id === producto.id);
        const nuevaMemoria = MEMORIA.slice(); // Crear una copia del array para evitar problemas de referencia

        if (indiceProducto === -1) {
            nuevaMemoria.push(getNuevoProductoParaMemoria(producto));
            cuenta = 1;
        } else {
            nuevaMemoria[indiceProducto].cantidad++;
            cuenta = nuevaMemoria[indiceProducto].cantidad;
        }
        localStorage.setItem('carrito', JSON.stringify(nuevaMemoria));
    }

    // Actualizar el número del carrito cada vez que se añade un producto
    actualizarNroCarrito();

    // Mostrar notificación utilizando Toastify
    Toastify({
        text: "Producto agregado",
        duration: 4000,
        gravity: "top", // `top` o `bottom`
        position: "center", // `left`, `center` o `right`
        stopOnFocus: true, // Previene que se cierre el toast al pasar el mouse
        style: {
            background: "linear-gradient(to right, #00b09b, #96c93d)",
        },
        onClick: function() {} // Callback después de hacer clic
    }).showToast(); // Mostrar el toast
}

// Función para restar un producto del carrito
function restarAlCarrito(producto) {
    const MEMORIA = JSON.parse(localStorage.getItem('carrito'));
    const indiceProducto = MEMORIA.findIndex(carrito => carrito.id === producto.id);
    const nuevaMemoria = MEMORIA.slice(); // Crear una copia del array

    if (nuevaMemoria[indiceProducto].cantidad === 1) {
        nuevaMemoria.splice(indiceProducto, 1);
    } else {
        nuevaMemoria[indiceProducto].cantidad--;
    }

    localStorage.setItem('carrito', JSON.stringify(nuevaMemoria));
    actualizarNroCarrito(); // Llama para actualizar el número del carrito
}

// Función para crear un nuevo producto en formato adecuado
function getNuevoProductoParaMemoria(producto) {
    const nuevoProducto = { ...producto }; 
    nuevoProducto.cantidad = 1;
    return nuevoProducto;
}

// Función para actualizar el número de productos en el carrito
function actualizarNroCarrito() {
    const MEMORIA = JSON.parse(localStorage.getItem('carrito')) || [];
    const cuenta = MEMORIA.reduce((acumulador, valorActual) => acumulador + valorActual.cantidad, 0);
    const CUENTA_CARRITO = document.getElementById("cuenta-carrito");
    CUENTA_CARRITO.innerText = cuenta;
}

// Inicializa el contador del carrito al cargar la página
document.addEventListener('DOMContentLoaded', (event) => {
    actualizarNroCarrito(); // Llama a la función al cargar la página
});