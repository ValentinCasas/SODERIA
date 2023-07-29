
function eliminarRetroalimentacion(event, idRetroalimentacion) {
    event.preventDefault();

    const url = `/retroalimentacion/eliminar/${idRetroalimentacion}`;

    swal({
        title: "¿Estás seguro?",
        text: "Esta acción eliminará el feedback",
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
                            text: 'El feedback ha sido eliminado',
                            timer: 3000,
                            timerProgressBar: true
                        }).then(() => {
                            // Eliminar la card del producto del DOM
                            const cardId = `#retroalimentacion-${idRetroalimentacion}`;
                            $(cardId).remove();
                        });
                    } else {
                        swal({
                            icon: 'error',
                            title: 'Error',
                            text: 'No se pudo eliminar el feedback'
                        });
                    }
                },
                error: function (xhr, status, error) {
                    swal({
                        icon: 'error',
                        title: 'Error',
                        text: 'Ocurrió un error al eliminar el feedback'
                    });
                }
            });
        }
    });
}



$(document).ready(function () {
    $('form').submit(function (e) {
        e.preventDefault(); // Evita el envío normal del formulario

        var formData = new FormData(this);

        $.ajax({
            url: '/retroalimentacion/actualizar',
            method: 'POST',
            data: formData,
            processData: false,
            contentType: false,
            success: function (response) {
                swal({
                    icon: 'success',
                    title: 'Exito',
                    text: 'feedback actualizado',
                    timer: 3000,
                    timerProgressBar: true
                });
            }
        });
    });
});                                