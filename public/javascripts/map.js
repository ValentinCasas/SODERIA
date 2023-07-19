document.addEventListener("DOMContentLoaded", function () {
    var map = L.map("map").setView([-33.302143, -66.336844], 13);
    var lastMarker = null;

    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(map);

    function obtenerUbicacionInicial() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {
                var lat = position.coords.latitude.toFixed(8);
                var lng = position.coords.longitude.toFixed(8);

                var latInput = document.getElementById("Latitud");
                var lngInput = document.getElementById("Longitud");
                latInput.value = lat;
                lngInput.value = lng;

                map.setView([lat, lng], 13);

                if (lastMarker !== null) {
                    lastMarker.remove();
                }

                var marker = L.marker([lat, lng]).addTo(map);
                lastMarker = marker;
            });
        }
    }

    obtenerUbicacionInicial();

    function onMapClick(e) {
        var latInput = document.getElementById("Latitud");
        var lngInput = document.getElementById("Longitud");

        var lat = e.latlng.lat.toFixed(8);
        var lng = e.latlng.lng.toFixed(8);

        latInput.value = lat;
        lngInput.value = lng;

        if (lastMarker !== null) {
            lastMarker.remove();
        }

        var marker = L.marker([lat, lng]).addTo(map);
        lastMarker = marker;
    }

    map.on("click", onMapClick);
});
