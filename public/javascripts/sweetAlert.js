
function confirmarLogout() {
    swal({
        title: "¿Seguro quieres salir?",
        text: "Se cerrará la sesión",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
        .then((willDelete) => {
            if (willDelete) {
                window.location.replace('/auth/logout');
            } else {
                swal("¡Su cuenta sigue activa!");
            }
        });
}