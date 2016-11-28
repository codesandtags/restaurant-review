angular.module('restaurantApp')
    .component('searchRestaurant', {
        templateUrl: '../../views/search.html',
        controller: function SearchController() {
            this.message = 'Sparta';
        }
    });