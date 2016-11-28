angular.module('restaurantApp')
    .component('searchRestaurant', {
        templateUrl: '/scripts/components/search/search.html',
        controller: function SearchController() {

            this.showSugestions = function() {
                console.log('Changing...' + $scope.city);
            }
        }
    });