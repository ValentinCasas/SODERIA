$(".testimonial-reel").slick({
    centerMode: true,
    centerPadding: "40px",
    dots: false,
    slidesToShow: 3,
    infinite: true,
    arrows: false,
    lazyLoad: "ondemand",
    autoplay: true, // Agregar autoplay para el desplazamiento automático
    autoplaySpeed: 2000, // Configurar la velocidad de desplazamiento (en milisegundos)
    responsive: [
        {
            breakpoint: 1024,
            settings: {
                slidesToShow: 2,
                centerMode: false
            }
        },
        {
            breakpoint: 767,
            settings: {
                slidesToShow: 1
            }
        }
    ]
});





$(document).ready(function () {
    $('#form-retroalimentacion').submit(function (e) {
        e.preventDefault(); // Evita el envío normal del formulario

        var formData = new FormData(this);

        $.ajax({
            url: '/retroalimentacion/agregar',
            method: 'POST',
            data: formData,
            processData: false,
            contentType: false,
            success: function (response) {
                swal({
                    icon: 'success',
                    title: 'En espera',
                    text: 'Por ahora se encuentra en proceso de aceptación',
                    timer: 5000,
                    timerProgressBar: true
                });
            }
        });
    });
});



$(document).ready(function () {
    $('#form-foro').submit(function (e) {
        e.preventDefault(); // Evita el envío normal del formulario

        var formData = new FormData(this);

        $.ajax({
            url: '/foro/agregar',
            method: 'POST',
            data: formData,
            processData: false,
            contentType: false,
            success: function (response) {
                swal({
                    icon: 'success',
                    title: 'En espera',
                    text: 'Por ahora la pregunta se encuentra en proceso de aceptación, pronto será respondida',
                    timer: 5000,
                    timerProgressBar: true
                });
            }
        });
    });
});


