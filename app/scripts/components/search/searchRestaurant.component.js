(function() {
    'use strict';

    const GooglePlaces = function(input) {
        this.placeSelected;

        this.autocomplete = new google.maps.places.Autocomplete(input);

        this.autocomplete.addListener('place_changed', () => {
            const place = this.autocomplete.getPlace();

            if (place) {
                this.placeSelected = {
                    "geolocation": {
                        "lat": place.geometry.location.lat(),
                        "lng": place.geometry.location.lng()
                    },
                    "address": place.formatted_address
                }
            }
        });

        this.getPlaceSelected = () => {
            return (this.placeSelected) ? this.placeSelected : undefined;
        };
    };

    function fetchGooglePlaces($http) {
        return $http.get('https://maps.googleapis.com/maps/api/place/autocomplete/json?input=Bogot&types=geocode&language=en&key=AIzaSyAnryrOEJo4N_L225rxRLQaKUziXsWHxjY')
            .then((response) => {
                return response.data;
            })
    }

    function controller($http) {
        let model = this;
        let googlePlaces;

        model.$onInit = function() {
            let input = document.getElementById('city');
            googlePlaces = new GooglePlaces(input);

            googlePlaces.autocomplete.addListener('place_changed', function() {
                console.log('This is my place : ', googlePlaces.getPlaceSelected());
                model.selectedPlace = googlePlaces.getPlaceSelected();
            });
        };

        model.selectedPlace = 'Narnia';
    }

    function placeChanged() {
        console.log('place_changed...', this);
    }

    angular.module('restaurantApp')
        .component('searchRestaurant', {
            templateUrl: '/scripts/components/search/search.html',
            controllerAs: 'model',
            controller: ['$http', controller]
        });
}());