(function() {
    'use strict';

    const COUSINE_TYPES = [
        {
            'id': 'mexican',
            'label': 'Mexican Food'
        },
        {
            'id': 'italian',
            'label': 'Italian Food'
        },
        {
            'id': 'american',
            'label': 'American Food'
        },
        {
            'id': 'vegetarian',
            'label': 'Vegetarian Food'
        },
        {
            'id': 'colombian',
            'label': 'Colombian Food'
        },
        {
            'id': 'peruvian',
            'label': 'Peruvian Food'
        },
    ];

    const GooglePlaces = function(input) {
        this.placeSelected;

        this.autocomplete = new google.maps.places.Autocomplete(input);

        this.autocomplete.addListener('place_changed', () => {
            const place = this.autocomplete.getPlace();

            if (place) {
                this.placeSelected = {
                    'geolocation': {
                        'lat': place.geometry.location.lat(),
                        'lng': place.geometry.location.lng()
                    },
                    'address': place.formatted_address
                };
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
            });
    }

    function controller($http) {
        let model = this;
        let googlePlaces;

        model.$onInit = function() {
            let input = document.getElementById('city');
            model.selectedPlace = '';
            model.cousineTypes = COUSINE_TYPES;

            googlePlaces = new GooglePlaces(input);

            googlePlaces.autocomplete.addListener('place_changed', function() {
                console.log('This is my place : ', googlePlaces.getPlaceSelected());
                console.log('Model', model);
                model.selectedPlace = googlePlaces.getPlaceSelected();
            });
        };

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