'use strict';
(function(){
    console.log('SearchController...');
    angular.module('restaurantApp', [])
        .controller('searchController', ['$scope', ($scope) => {
            $scope.searchButton = 'Search';
        }])
}());
