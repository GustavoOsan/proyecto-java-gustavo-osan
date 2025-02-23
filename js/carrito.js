function agregarAlCarrito(producto) {
    const MEMORIA = JSON.parse(localStorage.getItem('carrito'));
    console.log(MEMORIA);
    if (!MEMORIA) {
        const NUEVO_PRODUCTO = getNuevoProductoParaMemoria(producto);
        localStorage.setItem('carrito', JSON.stringify([NUEVO_PRODUCTO]));
    } else {
        const INDICE_PRODUCTO = MEMORIA.findIndex(producto => producto.id === carrito.id);
        console.log(INDICE_PRODUCTO);
        const NUEVA_MEMORIA = MEMORIA;

        if (INDICE_PRODUCTO === -1) {
            NUEVA_MEMORIA.push(getNuevoProductoParaMemoria(producto));
        }
        else {
            NUEVA_MEMORIA[INDICE_PRODUCTO].cantidad++;
        }
        localStorage.setItem('carrito', JSON.stringify(NUEVA_MEMORIA));
    }
}

function getNuevoProductoParaMemoria(producto) {
    const NUEVO_PRODUCTO = producto;
    NUEVO_PRODUCTO.cantidad = 1;
    return NUEVO_PRODUCTO;
}