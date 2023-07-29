//eliminar comercio

function eliminarComercio(event, idComercio) {
    event.preventDefault();

    const url = `/comercio/eliminar/${idComercio}`;

    swal({
        title: "¿Estás seguro?",
        text: "Esta acción eliminará el comercio",
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
                            text: 'El comercio ha sido eliminado',
                            timer: 3000,
                            timerProgressBar: true
                        }).then(() => {
                            // Eliminar la card del producto del DOM
                            const cardId = `#comercio-${idComercio}`;
                            $(cardId).remove();
                        });
                    } else {
                        swal({
                            icon: 'error',
                            title: 'Error',
                            text: 'No se pudo eliminar el comercio'
                        });
                    }
                },
                error: function (xhr, status, error) {
                    swal({
                        icon: 'error',
                        title: 'Error',
                        text: 'Ocurrió un error al eliminar el comercio'
                    });
                }
            });
        }
    });
}


//actualizar comecrio

$(document).ready(function () {
    $('form').submit(function (e) {
        e.preventDefault(); // Evita el envío normal del formulario

        var formData = new FormData(this);

        $.ajax({
            url: '/comercio/actualizar',
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
                    text: 'Ocurrió un error al intentar actualizar los comercios'
                });
            }
        });
    });
});
