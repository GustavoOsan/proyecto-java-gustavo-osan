// Función para agregar un producto al carrito
function agregarAlCarrito(producto) {
    const MEMORIA = JSON.parse(localStorage.getItem('carrito'));
    let cuenta = 0;

    if (!MEMORIA) {
        const NUEVO_PRODUCTO = getNuevoProductoParaMemoria(producto);
        localStorage.setItem('carrito', JSON.stringify([NUEVO_PRODUCTO]));
        cuenta = 1;
    } else {
        const INDICE_PRODUCTO = MEMORIA.findIndex(carrito => carrito.id === producto.id);
        const NUEVA_MEMORIA = MEMORIA.slice(); // Crear una copia del array para evitar problemas de referencia

        if (INDICE_PRODUCTO === -1) {
            NUEVA_MEMORIA.push(getNuevoProductoParaMemoria(producto));
            cuenta = 1;
        } else {
            NUEVA_MEMORIA[INDICE_PRODUCTO].cantidad++;
            cuenta = NUEVA_MEMORIA[INDICE_PRODUCTO].cantidad;
        }
        localStorage.setItem('carrito', JSON.stringify(NUEVA_MEMORIA));
    }

    // Actualizar el número del carrito cada vez que se añade un producto
    actualizarNroCarrito();
}

// Función para restar un producto del carrito
function restarAlCarrito(producto) {
    const MEMORIA = JSON.parse(localStorage.getItem('carrito'));
    const INDICE_PRODUCTO = MEMORIA.findIndex(carrito => carrito.id === producto.id);
    const NUEVA_MEMORIA = MEMORIA.slice(); // Crear una copia del array

    if (NUEVA_MEMORIA[INDICE_PRODUCTO].cantidad === 1) {
        NUEVA_MEMORIA.splice(INDICE_PRODUCTO, 1);
    } else {
        NUEVA_MEMORIA[INDICE_PRODUCTO].cantidad--;
    }

    localStorage.setItem('carrito', JSON.stringify(NUEVA_MEMORIA));
    actualizarNroCarrito(); // Llama para actualizar el número del carrito
}

// Función para crear un nuevo producto en formato adecuado
function getNuevoProductoParaMemoria(producto) {
    const NUEVO_PRODUCTO = { ...producto }; 
    NUEVO_PRODUCTO.cantidad = 1;
    return NUEVO_PRODUCTO;
}

// Función para actualizar el número de productos en el carrito
function actualizarNroCarrito() {
    const MEMORIA = JSON.parse(localStorage.getItem('carrito')) || [];
    const CUENTA = MEMORIA.reduce((acumulador, valorActual) => acumulador + valorActual.cantidad, 0);
    const CUENTA_CARRITO = document.getElementById("cuenta-carrito");
    CUENTA_CARRITO.innerText = CUENTA;
}

// Inicializa el contador del carrito al cargar la página
document.addEventListener('DOMContentLoaded', (event) => {
    actualizarNroCarrito(); // Llama a la función al cargar la página
});

