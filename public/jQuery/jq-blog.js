function eliminarPublicacion(event, idPublicacion) {
    event.preventDefault();

    const url = `/blog/eliminar/${idPublicacion}`;

    swal({
        title: "¿Estás seguro?",
        text: "Esta acción eliminará la publicación",
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
                            text: 'La publicación ha sido eliminada',
                            timer: 3000,
                            timerProgressBar: true
                        }).then(() => {
                            // Eliminar la card del producto del DOM
                            const cardId = `#publicacion-${idPublicacion}`;
                            $(cardId).remove();
                        });
                    } else {
                        swal({
                            icon: 'error',
                            title: 'Error',
                            text: 'No se pudo eliminar la publicacion'
                        });
                    }
                },
                error: function (xhr, status, error) {
                    swal({
                        icon: 'error',
                        title: 'Error',
                        text: 'Ocurrió un error al eliminar la publicación'
                    });
                }
            });
        }
    });
}



$(document).ready(function () {

    // Cuando se hace clic en una imagen expandible
    $(".expandable-image").on("click", function () {
        const imageUrl = $(this).attr("src");
        $("#expanded-image-container img").attr("src", imageUrl);
        $("#expanded-image-container").fadeIn();
    });

    // Cuando se hace clic en el botón de cerrar
    $("#expanded-image-container .close-button").on("click", function () {
        $("#expanded-image-container").fadeOut();
    });


    //para ver los comentarios de determinada publicación
    $(".view-comments").on("click", function () {
        const publicacionId = $(this).data("publicacion-id");

        $("#idPublicacionInput").val(publicacionId);

        $.ajax({
            url: `/comentarios/view-comentarios/${publicacionId}`,
            type: "GET",
            success: function (data) {
                $("#comment-list").empty();

                data.comentarios.forEach(function (comentario) {
                    const listItem = $("<li>").addClass("comment-item").attr("data-comentario-id", comentario.id);

                    const commentImage = $("<img>").attr("src", "/" + data.imagenesUrls[Math.floor(Math.random() * data.imagenesUrls.length)]);
                    listItem.append(commentImage);

                    const commentInfo = $("<div>").addClass("comment-info");

                    const commentDescription = $("<div>").addClass("comment-description").text(comentario.descripcion);
                    commentInfo.append(commentDescription);

                    const commentDate = $("<div>").addClass("comment-date").text(comentario.fechaEnvio);
                    commentInfo.append(commentDate);

                    if (data.isAdmin) {
                        const deleteLink = $("<a>").attr("href", `/comentarios/eliminar/${comentario.id}`).attr("data-method", "get").addClass("delete-comment").text("Eliminar");
                        commentInfo.append(deleteLink);
                    }
                    listItem.append(commentInfo);
                    $("#comment-list").append(listItem);
                });

                // Mostrar el modal con los comentarios
                $("#comment-modal").modal("show");
            },
            error: function () {
                $("#comment-list").empty().text("No hay comentarios disponibles por el momento");
                $("#comment-modal").modal("show");
            }
        });
    });


    // eliminar comentario
    $(document).on("click", ".delete-comment", function (event) {
        event.preventDefault();
        const deleteUrl = $(this).attr("href");

        const comentarioId = $(this).closest(".comment-item").data("comentario-id");

        $.ajax({
            url: deleteUrl,
            type: "GET",
            success: function (response) {
                $(`.comment-item[data-comentario-id="${comentarioId}"]`).remove();
            },
            error: function (error) {
            }
        });
    });



    // Agregar el evento de envío del formulario para crear el comentario
    $("form[action='/comentarios/crear']").on("submit", function (event) {
        event.preventDefault();

        const descripcion = $("input[name='descripcion']").val();
        const idPublicacion = $("#idPublicacionInput").val();

        // Realizar la solicitud AJAX para crear el comentario
        $.ajax({
            url: "/comentarios/crear",
            type: "POST",
            data: { idPublicacion, descripcion },
            success: function (data) {
                const listItem = $("<li>").addClass("comment-item");

                const commentImage = $("<img>").attr("src", "/" + data.imagenesUrls[Math.floor(Math.random() * data.imagenesUrls.length)]);
                listItem.append(commentImage);

                const commentInfo = $("<div>").addClass("comment-info");

                const commentDescription = $("<div>").addClass("comment-description").text(data.comentario.descripcion);
                commentInfo.append(commentDescription);

                const fechaISO = data.comentario.fechaEnvio;
                const fecha = new Date(fechaISO);
                const fechaFormateada = `${fecha.getFullYear()}-${(fecha.getMonth() + 1).toString().padStart(2, "0")}-${fecha.getDate().toString().padStart(2, "0")}`;

                const commentDate = $("<div>").addClass("comment-date").text(fechaFormateada);
                commentInfo.append(commentDate);

                listItem.append(commentInfo);

                $("#comment-list").append(listItem);

            }
        });
    });


   

    // Agregar el evento de clic al botón de cerrar para cerrar el modal
    $("#comment-modal .modal-header button").on("click", function () {
        $("#comment-modal").modal("hide");
    });
});



