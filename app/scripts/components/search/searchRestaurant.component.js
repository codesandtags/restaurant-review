angular.module('restaurantApp')
    .component('searchRestaurant', {
        templateUrl: 'search.html',
        controller: function SearchController() {

            this.showSugestions = function() {
                console.log('Changing...' + $scope.city);
            }
        }
    });