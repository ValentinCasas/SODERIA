
function eliminarPregunta(event, idPregunta) {
    event.preventDefault();

    const url = `/foro/eliminar/${idPregunta}`;

    swal({
        title: "¿Estás seguro?",
        text: "Esta acción eliminará la pregunta",
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
                            text: 'La pregunta ha sido eliminada',
                            timer: 3000,
                            timerProgressBar: true
                        }).then(() => {
                            // Eliminar la card del producto del DOM
                            const cardId = `#pregunta-${idPregunta}`;
                            $(cardId).remove();
                        });
                    } else {
                        swal({
                            icon: 'error',
                            title: 'Error',
                            text: 'No se pudo eliminar la pregunta'
                        });
                    }
                },
                error: function (xhr, status, error) {
                    swal({
                        icon: 'error',
                        title: 'Error',
                        text: 'Ocurrió un error al eliminar la pregunta'
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
            url: '/foro/actualizar',
            method: 'POST',
            data: formData,
            processData: false,
            contentType: false,
            success: function (response) {
                swal({
                    icon: 'success',
                    title: 'Exito',
                    text: 'Pregunta del foro actualizada',
                    timer: 3000,
                    timerProgressBar: true
                });
            }
        });
    });
});   