const CONTENEDOR_TARJETAS = document.getElementById("productos-container");

function crearTarjetasProductosInicio(productos){
    productos.forEach(producto => {
        const nuevoProducto = document.createElement("div");
        nuevoProducto.classList = "tarjeta-producto";
        nuevoProducto.innerHTML = `
        <img src="${producto.imagen}" alt="${producto.nombre}" class="tarjeta-imagen">
        <h3>${producto.nombre}</h3>
        <h4>$${producto.precio}</h4>
        <button class="boton-comprar">Comprar</button>
        `
        CONTENEDOR_TARJETAS.appendChild(nuevoProducto);
    });
}

crearTarjetasProductosInicio(productos);