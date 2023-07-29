
//eliminar producto
function eliminarProducto(event, idProducto) {
    event.preventDefault();

    const url = `/productos/eliminar/${idProducto}`;

    swal({
        title: "¿Estás seguro?",
        text: "Esta acción eliminará el producto",
        icon: "warning",
        buttons: ["Cancelar", "Eliminar"],
        dangerMode: true,
    }).then((confirm) => {
        if (confirm) {
            $.ajax({
                url: url,
                method: 'GET',
                success: function (response) {
                    if (response.success) {
                        swal({
                            icon: 'success',
                            title: '¡Éxito!',
                            text: 'El producto ha sido eliminado',
                            timer: 3000,
                            timerProgressBar: true
                        }).then(() => {
                            // Eliminar la card del producto del DOM
                            const cardId = `#producto-${idProducto}`;
                            $(cardId).remove();
                        });
                    } else {
                        swal({
                            icon: 'error',
                            title: 'Error',
                            text: 'No se pudo eliminar el producto'
                        });
                    }
                },
                error: function (xhr, status, error) {
                    swal({
                        icon: 'error',
                        title: 'Error',
                        text: 'Ocurrió un error al eliminar el producto'
                    });
                }
            });
        }
    });
}


//actualizar producto
$(document).ready(function () {
    $('form').submit(function (e) {
        e.preventDefault(); // Evita el envío normal del formulario

        var formData = new FormData(this);

        $.ajax({
            url: '/productos/actualizar',
            method: 'POST',
            data: formData,
            processData: false,
            contentType: false,
            success: function (response) {
                if (response.success) {
                    // Éxito al actualizar productos
                    swal({
                        icon: 'success',
                        title: '¡Éxito!',
                        text: response.message,
                        timer: 3000,
                        timerProgressBar: true
                    });

                    if (response.productosNoActualizados.length > 0) {
                        // Algunos productos no se pudieron actualizar
                        var errorMessage = 'No se pudieron actualizar los siguientes productos:\n';

                        response.productosNoActualizados.forEach(function (producto) {
                            errorMessage += 'Nombre: ' + producto.nombre + '\n';
                        });

                        swal({
                            icon: 'error',
                            title: 'Error al actualizar productos',
                            text: errorMessage
                        });
                    }
                } else {
                    // Error al actualizar productos
                    swal({
                        icon: 'error',
                        title: 'Error',
                        text: response.message
                    });
                }
            },
            error: function (xhr, status, error) {
                // Error en la solicitud AJAX
                swal({
                    icon: 'error',
                    title: 'Error',
                    text: 'Ocurrió un error al intentar actualizar los productos'
                });
            }
        });
    });
});
