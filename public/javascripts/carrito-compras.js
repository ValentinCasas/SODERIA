// Función para encontrar un producto por su id (puedes adaptarla según tu estructura de datos)
function encontrarProductoPorId(id) {
    const productoElement = document.getElementById(`producto-${id}`);

    if (productoElement) {
        const nombre = productoElement.querySelector('.card-title.title').textContent;
        const descripcion = productoElement.querySelector('.card-text.descripcion').textContent;
        const precioText = productoElement.querySelector('.card-text.precio').textContent;
        const precio = parseFloat(precioText.replace('$', ''));

        // Corregir la obtención de la URL de la imagen
        const imagenUrl = productoElement.querySelector('img').getAttribute('src');

        return {
            id: id,
            nombre: nombre,
            descripcion: descripcion,
            precio: precio,
            imagenUrl: imagenUrl
        };
    }

    return null;
}



function calcularSumaTotal() {
    const totalSumaElement = document.querySelector('.total-suma');
    let sumaTotal = 0;

    carrito.forEach((producto) => {
        sumaTotal += producto.precio * producto.cantidad;
    });

    totalSumaElement.textContent = `Total: $${sumaTotal.toFixed(2)}`;
}


function agregarAlCarrito(event) {
    const boton = event.target;
    const productoId = boton.getAttribute('data-producto-id');
    const producto = encontrarProductoPorId(productoId);

    const productoExistenteIndex = carrito.findIndex((p) => p.id === producto.id);
    if (productoExistenteIndex !== -1) {
        // Si el producto ya existe, incrementar la cantidad
        carrito[productoExistenteIndex].cantidad++;
    } else {
        // Si no existe, agregar el producto al carrito con cantidad 1
        carrito.push({ ...producto, cantidad: 1 });
    }

    actualizarCarrito();
}


let carrito = [];


const botonesAgregar = document.querySelectorAll('.agregar');


botonesAgregar.forEach((boton) => {
    boton.addEventListener('click', agregarAlCarrito);
});

function actualizarCarrito() {
    const totalItemsElement = document.getElementById('totalItems');
    const totalItemsNavElement = document.getElementById('totalItems_nav');
    const cartListElement = document.querySelector('.cart');

    // Limpiar contenido anterior del carrito
    cartListElement.innerHTML = '';

    // Recorrer los productos en el carrito y agregarlos al carrito visual en el modal
    carrito.forEach((producto) => {
        const listItemWrapper = document.createElement('li');
        listItemWrapper.classList.add('cart-item');

        const itemInfoDiv = document.createElement('div');

        const imgElement = document.createElement('img');
        imgElement.classList.add('product-image');
        imgElement.src = producto.imagenUrl;
        itemInfoDiv.appendChild(imgElement);

        const listItem = document.createElement('span');
        listItem.textContent = producto.nombre;
        listItem.classList.add('producto-nombre');

        const listItemDescripcion = document.createElement('p');
        listItemDescripcion.textContent = producto.descripcion;
        listItemDescripcion.classList.add('producto-descripcion');

        const listItemPrecio = document.createElement('p');
        listItemPrecio.textContent = `Precio: $${producto.precio.toFixed(2)}`;
        listItemPrecio.classList.add('producto-precio');

        const listItemCantidad = document.createElement('p');
        listItemCantidad.textContent = `Cantidad: ${producto.cantidad}`;
        listItemCantidad.classList.add('producto-cantidad');

        itemInfoDiv.appendChild(listItem);
        itemInfoDiv.appendChild(listItemDescripcion);
        itemInfoDiv.appendChild(listItemPrecio);
        itemInfoDiv.appendChild(listItemCantidad);



        const listItemEliminar = document.createElement('button');
        listItemEliminar.classList.add('btn-borrar');
        listItemEliminar.setAttribute('type', 'button');

        const iconElement = document.createElement('i');
        iconElement.classList.add('ion-close-round'); // Clase para el ícono de Ionicons (puedes cambiarla según el ícono que desees)
        iconElement.setAttribute('data-producto-id', producto.id);
        iconElement.setAttribute('onclick', `eliminarDelCarrito(event, ${producto.id})`);


        listItemEliminar.appendChild(iconElement);
        itemInfoDiv.appendChild(listItemEliminar);
        listItemWrapper.appendChild(itemInfoDiv);

        cartListElement.appendChild(listItemWrapper);
    });

    // Actualizar la cantidad de productos en el carrito en el modal
    const cantidadProductos = carrito.reduce((total, producto) => total + producto.cantidad, 0);
    totalItemsElement.textContent = cantidadProductos;
    totalItemsNavElement.textContent = cantidadProductos;

    calcularSumaTotal();
}



const carritoIcon = document.querySelector('.cart-icon');
const carritoModal = document.getElementById('carritoModal');
carritoIcon.addEventListener('click', () => {
    carritoModal.style.display = 'block';
});


const cerrarBtn = document.querySelector('.modal-footer .cerrar');
cerrarBtn.addEventListener('click', () => {
    carritoModal.style.display = 'none';
});



function generarObjetoCarrito() {
    // Creamos un objeto para almacenar el conteo de productos por ID
    const conteoProductos = {};

    // Recorremos los elementos del carrito y extraemos la cantidad
    carrito.forEach((producto) => {
        const listItemCantidad = parseInt(
            document.querySelector(`#producto-${producto.id} .cart-item .cantidad`).textContent,
            10
        );

        conteoProductos[producto.id] = listItemCantidad;
    });

    // Convertimos el objeto a una cadena JSON
    const objetoCarritoJSON = JSON.stringify(conteoProductos);

    // Agregar el objeto carrito como un campo oculto en el formulario
    const objetoCarritoInput = document.createElement('input');
    objetoCarritoInput.type = 'hidden';
    objetoCarritoInput.name = 'objetoCarrito';
    objetoCarritoInput.value = objetoCarritoJSON;
    document.querySelector('form').appendChild(objetoCarritoInput);
}


function eliminarDelCarrito(event) {
    const boton = event.target;
    const productoId = boton.getAttribute('data-producto-id');

    // Buscar el índice del producto en el carrito
    const productoExistenteIndex = carrito.findIndex((p) => p.id === productoId);

    // Si el producto está en el carrito, manejar la eliminación o decremento de la cantidad
    if (productoExistenteIndex !== -1) {
        const productoExistente = carrito[productoExistenteIndex];
        if (productoExistente.cantidad > 1) {
            productoExistente.cantidad--;
        } else {
            carrito.splice(productoExistenteIndex, 1);
        }
    }

    actualizarCarrito();
}



// Obtener el botón "Generar objeto con ID"
const generarObjetoBtn = document.getElementById('generarObjetoBtn');

// Agregar evento de clic al botón
generarObjetoBtn.addEventListener('click', generarObjetoCarrito);

