(function() {
    'use strict';

    function fetchGooglePlaces($http) {
        return $http.get('https://maps.googleapis.com/maps/api/place/autocomplete/json?input=Bogot&types=geocode&language=en&key=AIzaSyAnryrOEJo4N_L225rxRLQaKUziXsWHxjY')
            .then((response) => {
                return response.data;
            })
    }

    function geolocate() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position) {
                var geolocation = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };
                var circle = new google.maps.Circle({
                    center: geolocation,
                    radius: position.coords.accuracy
                });
                autocomplete.setBounds(circle.getBounds());
            });
        }
    }

    // [START region_fillform]
    function fillInAddress() {
        // Get the place details from the autocomplete object.
        var place = autocomplete.getPlace();

        for (var component in componentForm) {
            document.getElementById(component).value = '';
            document.getElementById(component).disabled = false;
        }

        // Get each component of the address from the place details
        // and fill the corresponding field on the form.
        for (var i = 0; i < place.address_components.length; i++) {
            var addressType = place.address_components[i].types[0];
            if (componentForm[addressType]) {
                var val = place.address_components[i][componentForm[addressType]];
                document.getElementById(addressType).value = val;
            }
        }
    }

    // [END region_fillform]

    function controller($http) {
        let model = this;

        model.$onInit = function() {
            let input = document.getElementById('city');
            //map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
            model.autocomplete = new google.maps.places.Autocomplete(input);
        };

        model.showSuggestedCities = function() {
            console.log('Changing...', model.city);
        };

    }

    angular.module('restaurantApp')
        .component('searchRestaurant', {
            templateUrl: '/scripts/components/search/search.html',
            controllerAs: 'model',
            controller: ['$http', controller]
        });
}());