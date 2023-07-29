  //crear publicacion

  $(document).ready(function() {
  $('form').submit(function(e) {
      e.preventDefault(); // Evita el envío normal del formulario

      var formData = new FormData(this);

      $.ajax({
      url: '/blog/agregar',
      method: 'POST',
      data: formData,
      processData: false,
      contentType: false,
      success: function(response) {
          swal({
          icon: 'success',
          title: '¡Éxito!',
          text: 'Publicación agregada correctamente',
          timer: 3000,
          timerProgressBar: true
          });
      }
      });
  });
  });  

