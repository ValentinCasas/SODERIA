document.addEventListener('DOMContentLoaded', () => {
    const cambiarCamposBtns = document.querySelectorAll('#abrirInputsBtn');
  
    cambiarCamposBtns.forEach((btn) => {
        btn.addEventListener('click', () => {
            const productoId = btn.dataset.productoId;
            const campos = document.getElementById(`campos-${productoId}`);
  
            campos.style.display = campos.style.display === 'none' ? 'block' : 'none';
            btn.textContent = campos.style.display === 'none' ? 'Abrir' : 'Cerrar';
        });
    });
  
  });