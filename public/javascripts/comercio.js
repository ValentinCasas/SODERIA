document.addEventListener("DOMContentLoaded", function () {
    var contenedoresMapa = document.querySelectorAll(".map-container");

    function inicializarMapa(mapContainer, lat, lng) {
        var mapa = L.map(mapContainer.querySelector("#map")).setView([lat, lng], 13);
        var marcador = L.marker([lat, lng]).addTo(mapa);
        var lastMarker = marcador; // Variable para almacenar el último marcador agregado al mapa

        L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
            maxZoom: 19,
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        }).addTo(mapa);

        function alHacerClicEnMapa(e) {
            var latInput = mapContainer.querySelector(".latitud");
            var lngInput = mapContainer.querySelector(".longitud");

            var lat = e.latlng.lat.toFixed(8);
            var lng = e.latlng.lng.toFixed(8);

            latInput.value = lat;
            lngInput.value = lng;

            mapa.removeLayer(lastMarker); // Eliminar el marcador anterior
            marcador = L.marker([lat, lng]).addTo(mapa); // Crear un nuevo marcador
            lastMarker = marcador; // Actualizar el último marcador
        }

        mapa.on("click", alHacerClicEnMapa);
    }

    function obtenerUbicacionInicial(contenedorMapa) {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (posicion) {
                var lat = posicion.coords.latitude.toFixed(8);
                var lng = posicion.coords.longitude.toFixed(8);

                var latInput = contenedorMapa.querySelector(".latitud");
                var lngInput = contenedorMapa.querySelector(".longitud");
                latInput.value = lat;
                lngInput.value = lng;

                inicializarMapa(contenedorMapa, lat, lng);
            });
        }
    }

    contenedoresMapa.forEach(function (contenedorMapa) {
        var lat = parseFloat(contenedorMapa.querySelector(".latitud").value);
        var lng = parseFloat(contenedorMapa.querySelector(".longitud").value);
        inicializarMapa(contenedorMapa, lat, lng);
    });

    obtenerUbicacionInicial(contenedoresMapa[0]); // Inicializar el mapa para la primera tarjeta
});