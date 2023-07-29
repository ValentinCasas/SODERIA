
//crear usuario

$(document).ready(function () {
    $('form').submit(function (e) {
        e.preventDefault(); // Evita el envío normal del formulario

        var formData = new FormData(this);

        $.ajax({
            url: '/usuario/agregar',
            method: 'POST',
            data: formData,
            processData: false,
            contentType: false,
            success: function (response) {
                if (response.success) {
                    // Mostrar el swal de éxito si la operación fue exitosa
                    swal({
                        icon: 'success',
                        title: '¡Éxito!',
                        text: 'Usuario agregado correctamente',
                        timer: 3000,
                        timerProgressBar: true
                    });
                } else {
                    // Mostrar el swal de error si la operación no fue exitosa
                    swal({
                        icon: 'error',
                        title: 'Error',
                        text: response.error, // El mensaje de error recibido del servidor
                        timer: 3000,
                        timerProgressBar: true
                    });
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                // Si ocurre un error en la petición AJAX, mostrar un swal de error genérico
                swal({
                    icon: 'error',
                    title: 'Error',
                    text: 'Ocurrió un error al agregar el usuario',
                    timer: 3000,
                    timerProgressBar: true
                });
            }
        });
    });
});