//actualizar perfil

$(document).ready(function () {
    $('form').submit(function (e) {
        e.preventDefault(); // Evita el envío normal del formulario

        var formData = new FormData(this);

        $.ajax({
            url: '/usuario/actualizar-perfil',
            method: 'POST',
            data: formData,
            processData: false,
            contentType: false,
            success: function (response) {
                if (response.success) {
                    // Éxito al actualizar usuario
                    swal({
                        icon: 'success',
                        title: '¡Éxito!',
                        text: response.message,
                        timer: 3000,
                        timerProgressBar: true
                    });
                } else {
                    // Error al actualizar usuario
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
                    text: 'Ocurrió un error al intentar actualizar los usuarios'
                });
            }
        });
    });
});

