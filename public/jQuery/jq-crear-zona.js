const form = document.getElementById('formZona');
const tbody = document.getElementById('tbodyZonas');
const cantidadZona = document.getElementById('cantidadZona');

function agregarZonaATabla(zona) {
    const newRow = document.createElement('tr');
    newRow.setAttribute('data-zona-id', zona.id);
    newRow.innerHTML = `
        <td>${zona.nombre}</td>
        <td><a href="" class="btn btn-dark">editar</a></td>
        <td>
            <form action="/zona/eliminar/${zona.id}?_method=DELETE" method="post">
                <input  type="submit" value="Borrar" class="btn-delete-zona btn btn-danger">
            </form>
        </td>
    `;

    let cantidadZonaInt = parseInt(cantidadZona.textContent) + 1;

    cantidadZona.textContent = cantidadZonaInt;
    tbody.appendChild(newRow);
}

form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const nombreInput = document.getElementById('nombreInput');
    const nombre = nombreInput.value;

    const response = await fetch('/zona/agregar', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nombre }),
    });

    if (response.ok) {
        const data = await response.json();
        const zona = data.zona;

        // Agregar la nueva zona a la tabla
        agregarZonaATabla(zona);

        // Clear the input field after adding the zone
        nombreInput.value = '';
    }
});

$(document).ready(function () {
    // Capturar el evento de clic en el botón "Borrar" delegando desde el elemento padre tbody
    $('tbody').on('click', '.btn-delete-zona', async function (event) {
        event.preventDefault(); // Prevenir el comportamiento predeterminado del formulario
        event.stopPropagation(); // Detener la propagación del evento para evitar conflictos

        // Obtener la URL de acción del formulario
        const deleteUrl = $(this).closest('form').attr('action');
        const currentRow = $(this).closest('tr'); // Obtener la fila actual

        // Realizar la petición DELETE al servidor
        try {
            const response = await fetch(deleteUrl, {
                method: 'DELETE',
            });

            if (response.ok) {
                let cantidadZonaInt = parseInt(cantidadZona.textContent) - 1;

                cantidadZona.textContent = cantidadZonaInt;
                currentRow.remove();
            } else {

            }
        } catch (error) {

        }
    });
});










const formDireccion = document.getElementById('formDireccion');
const tbodyDireccion = document.getElementById('tbodyDireccion');
const cantidadDireccion = document.getElementById('cantidadDireccion');

function agregarDireccionATabla(direccion) {
    const newRow = document.createElement('tr');
    newRow.setAttribute('data-direccion-id', direccion.id);
    newRow.innerHTML = `
        <td>${direccion.nombre}</td>
        <td><a href="" class="btn btn-dark">editar</a></td>
        <td>
            <form action="/direccion/eliminar/${direccion.id}?_method=DELETE" method="post">
                <input  type="submit" value="Borrar" class="btn-delete-direccion btn btn-danger">
            </form>
        </td>
    `;
    let cantidadDireccionInt = parseInt(cantidadDireccion.textContent) + 1;

    cantidadDireccion.textContent = cantidadDireccionInt;
    tbodyDireccion.appendChild(newRow);
}

formDireccion.addEventListener('submit', async (event) => {
    event.preventDefault();
    const nombreInputDireccion = document.getElementById('nombreInputDireccion');
    const nombre = nombreInputDireccion.value;

    const response = await fetch('/direccion/agregar', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nombre }),
    });

    if (response.ok) {
        const data = await response.json();
        const direccion = data.direccion;

        // Agregar la nueva zona a la tabla
        agregarDireccionATabla(direccion);

        // Clear the input field after adding the zone
        nombreInputDireccion.value = '';
    }
});

$(document).ready(function () {
    // Capturar el evento de clic en el botón "Borrar" delegando desde el elemento padre tbody
    $('tbody').on('click', '.btn-delete-direccion', async function (event) {
        event.preventDefault(); // Prevenir el comportamiento predeterminado del formulario
        event.stopPropagation(); // Detener la propagación del evento para evitar conflictos

        // Obtener la URL de acción del formulario
        const deleteUrl = $(this).closest('form').attr('action');
        const currentRow = $(this).closest('tr'); // Obtener la fila actual

        // Realizar la petición DELETE al servidor
        try {
            const response = await fetch(deleteUrl, {
                method: 'DELETE',
            });

            if (response.ok) {
                let cantidadDireccionInt = parseInt(cantidadDireccion.textContent) - 1;

                cantidadDireccion.textContent = cantidadDireccionInt;
                currentRow.remove();
            } else {

            }
        } catch (error) {

        }
    });
});




const formEnlistar = document.getElementById('formEnlistar');
const tbodyZonaDireccion = document.getElementById('tbodyZonaDireccion');
const cantidadZonaDireccion = document.getElementById('cantidadZonaDireccion');

function agregarZonaDireccionATabla(zonaDireccion) {
    const newRow = document.createElement('tr');
    newRow.setAttribute('data-zonaDireccion-id', zonaDireccion.id);
    newRow.innerHTML = `
        <td>${zonaDireccion.Zona.nombre}</td>
        <td>${zonaDireccion.Direccion.nombre}</td>
        <td><a href="" class="btn btn-dark">editar</a></td>
        <td>
            <form action="/zona/eliminar-zonaDireccion/${zonaDireccion.id}?_method=DELETE" method="post">
                <input  type="submit" value="Borrar" class="btn-delete-zonaDireccion btn btn-danger">
            </form>
        </td>
    `;
    let cantidadZonaDireccionInt = parseInt(cantidadZonaDireccion.textContent) + 1;

    cantidadZonaDireccion.textContent = cantidadZonaDireccionInt;
    tbodyZonaDireccion.appendChild(newRow);
}



formEnlistar.addEventListener('submit', async (event) => {
    event.preventDefault();
    const enlistarZonaSelect = document.getElementById('enlistarZonaSelect');
    const enlistarDireccionSelect = document.getElementById('enlistarDireccionSelect');
    const idZona = enlistarZonaSelect.value;
    const idDireccion = enlistarDireccionSelect.value;

    const response = await fetch('/zona/enlistar', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ idZona, idDireccion }),
    });

    if (response.ok) {
        const data = await response.json();
        const zonaDireccion = data.zonaDireccion;

        // Agregar la nueva zona a la tabla
        agregarZonaDireccionATabla(zonaDireccion);

    }
});


$(document).ready(function () {
    // Capturar el evento de clic en el botón "Borrar" delegando desde el elemento padre tbody
    $('tbody').on('click', '.btn-delete-zonaDireccion', async function (event) {
        event.preventDefault(); // Prevenir el comportamiento predeterminado del formulario
        event.stopPropagation(); // Detener la propagación del evento para evitar conflictos

        // Obtener la URL de acción del formulario
        const deleteUrl = $(this).closest('form').attr('action');
        const currentRow = $(this).closest('tr'); // Obtener la fila actual

        // Realizar la petición DELETE al servidor
        try {
            const response = await fetch(deleteUrl, {
                method: 'DELETE',
            });

            if (response.ok) {
                let cantidadZonaDireccionInt = parseInt(cantidadZonaDireccion.textContent) - 1;

                cantidadZonaDireccion.textContent = cantidadZonaDireccionInt;
                currentRow.remove();
            } else {

            }
        } catch (error) {

        }
    });
});