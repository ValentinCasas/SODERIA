
document.addEventListener('DOMContentLoaded', () => {
    const cambiarContrasenaBtns = document.querySelectorAll('#cambiarContrasenaBtn');

    cambiarContrasenaBtns.forEach((btn) => {
        btn.addEventListener('click', () => {
            const usuarioId = btn.dataset.usuarioId;
            const camposContrasena = document.getElementById(`camposContrasena-${usuarioId}`);

            camposContrasena.style.display = camposContrasena.style.display === 'none' ? 'block' : 'none';
        });
    });

});




document.addEventListener('DOMContentLoaded', () => {
    const cambiarContrasenaBtns = document.querySelectorAll('#abrirInputsBtn');

    cambiarContrasenaBtns.forEach((btn) => {
        btn.addEventListener('click', () => {
            const usuarioId = btn.dataset.usuarioId;
            const camposContrasena = document.getElementById(`campos-${usuarioId}`);

            camposContrasena.style.display = camposContrasena.style.display === 'none' ? 'block' : 'none';

            btn.textContent = camposContrasena.style.display === 'none' ? 'Abrir' : 'Cerrar';
        });
    });

});