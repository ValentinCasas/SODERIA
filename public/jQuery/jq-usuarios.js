//eliminar usuario
function eliminarUsuario(event, idUsuario) {
  event.preventDefault();

  const url = `/usuario/eliminar/${idUsuario}`;

  swal({
    title: "¿Estás seguro?",
    text: "Esta acción eliminará el usuario",
    icon: "warning",
    buttons: ["Cancelar", "Eliminar"],
    dangerMode: true,
  }).then((confirm) => {
    if (confirm) {
      $.ajax({
        url: url,
        method: 'GET',
        success: function(response) {
          if (response.success) {
            swal({
              icon: 'success',
              title: '¡Éxito!',
              text: 'El usuario ha sido eliminado',
              timer: 3000,
              timerProgressBar: true
            }).then(() => {
              // Eliminar la card del producto del DOM
              const cardId = `#usuario-${idUsuario}`;
              $(cardId).remove();
            });
          } else {
            swal({
              icon: 'error',
              title: 'Error',
              text: 'No se pudo eliminar el usuario'
            });
          }
        },
        error: function(xhr, status, error) {
          swal({
            icon: 'error',
            title: 'Error',
            text: 'Ocurrió un error al eliminar el usuario'
          });
        }
      });
    }
  });
}


//actualizar usuarios
$(document).ready(function() {
  $('form').submit(function(e) {
    e.preventDefault(); // Evita el envío normal del formulario

    var formData = new FormData(this);

    $.ajax({
      url: '/usuario/actualizar',
      method: 'POST',
      data: formData,
      processData: false,
      contentType: false,
      success: function(response) {
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
      error: function(xhr, status, error) {
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
