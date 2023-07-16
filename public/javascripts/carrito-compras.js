// Función para encontrar un producto por su id (puedes adaptarla según tu estructura de datos)
function encontrarProductoPorId(id) {
    const productoElement = document.getElementById(`producto-${id}`);

    if (productoElement) {
        const nombre = productoElement.querySelector('.card-title.title').textContent;
        const descripcion = productoElement.querySelector('.card-text.descripcion').textContent;
        const precioText = productoElement.querySelector('.card-text.precio').textContent;
        const precio = parseFloat(precioText.replace('$', ''));

        return {
            id: id,
            nombre: nombre,
            descripcion: descripcion,
            precio: precio
        };
    }

    return null;
}

function calcularSumaTotal() {
    const totalSumaElement = document.querySelector('.total-suma');
    let sumaTotal = 0;

    carrito.forEach((producto) => {
        sumaTotal += producto.precio;
    });

    totalSumaElement.textContent = `Total: $${sumaTotal.toFixed(2)}`;
}

function agregarAlCarrito(event) {
    const boton = event.target;
    const productoId = boton.getAttribute('data-producto-id');
    const producto = encontrarProductoPorId(productoId);
    carrito.push(producto);
    actualizarCarrito();
}

// Array para almacenar los productos en el carrito
let carrito = [];

// Obtener todos los botones "Agregar al carrito"
const botonesAgregar = document.querySelectorAll('.agregar');

// Agregar evento de clic a cada botón
botonesAgregar.forEach((boton) => {
    boton.addEventListener('click', agregarAlCarrito);
});

// Función para actualizar la visualización del carrito en el modal
function actualizarCarrito() {
    const totalItemsElement = document.getElementById('totalItems');
    const cartListElement = document.querySelector('.cart');

    // Limpiar contenido anterior del carrito
    cartListElement.innerHTML = '';

    // Recorrer los productos en el carrito y agregarlos al carrito visual en el modal
    carrito.forEach((producto) => {
        const listItem = document.createElement('li');
        listItem.textContent = producto.nombre;

        const listItemDescripcion = document.createElement('li');
        listItemDescripcion.textContent = producto.descripcion;

        const listItemPrecio = document.createElement('li');
        listItemPrecio.textContent = `Precio: ${producto.precio}`;

        const listItemId = document.createElement('li');
        listItemId.textContent = `Id: ${producto.id}`;

        const cartListElement = document.querySelector('.cart');
        cartListElement.innerHTML = '';

        carrito.forEach((producto) => {
            const listItemWrapper = document.createElement('li');
            listItemWrapper.classList.add('cart-item');

            const listItem = document.createElement('span');
            listItem.textContent = producto.nombre;

            const listItemDescripcion = document.createElement('p');
            listItemDescripcion.textContent = producto.descripcion;

            const listItemPrecio = document.createElement('p');
            listItemPrecio.textContent = `Precio: $${producto.precio.toFixed(2)}`;


            const listItemId = document.createElement('p');
            listItemId.textContent = `Id: ${producto.id}`;

            listItemWrapper.appendChild(listItem);
            listItemWrapper.appendChild(listItemDescripcion);
            listItemWrapper.appendChild(listItemPrecio);
            listItemWrapper.appendChild(listItemId);

            cartListElement.appendChild(listItemWrapper);
        });
        calcularSumaTotal();

    });

    // Actualizar la cantidad de productos en el carrito en el modal
    const cantidadProductos = carrito.length;
    totalItemsElement.textContent = cantidadProductos;
}


// Al hacer clic en el botón del carrito, mostrar el modal
const carritoIcon = document.querySelector('.cart-icon');
const carritoModal = document.getElementById('carritoModal');
carritoIcon.addEventListener('click', () => {
    carritoModal.style.display = 'block';
});

// Al hacer clic en el botón "Cerrar", ocultar el modal
const cerrarBtn = document.querySelector('.modal-footer .cerrar');
cerrarBtn.addEventListener('click', () => {
    carritoModal.style.display = 'none';
});



function generarObjetoCarrito() {
    const carritoIds = carrito.map((producto) => producto.id);
    const objetoCarrito = {
        ids: carritoIds
    };

    // Agregar el objeto carrito a un campo oculto en el formulario
    const objetoCarritoInput = document.createElement('input');
    objetoCarritoInput.type = 'hidden';
    objetoCarritoInput.name = 'objetoCarrito';
    objetoCarritoInput.value = JSON.stringify(objetoCarrito);
    document.querySelector('form').appendChild(objetoCarritoInput);
}

// Obtener el botón "Generar objeto con ID"
const generarObjetoBtn = document.getElementById('generarObjetoBtn');

// Agregar evento de clic al botón
generarObjetoBtn.addEventListener('click', generarObjetoCarrito);

