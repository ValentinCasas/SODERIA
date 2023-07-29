
$(document).ready(function() {
$('form').submit(function(e) {
    e.preventDefault(); // Evita el envío normal del formulario

    var formData = new FormData(this);

    $.ajax({
    url: '/productos/agregar',
    method: 'POST',
    data: formData,
    processData: false,
    contentType: false,
    success: function(response) {
        swal({
        icon: 'success',
        title: '¡Éxito!',
        text: 'Producto agregado correctamente',
        timer: 3000,
        timerProgressBar: true
        });
    }
    });
});
});  