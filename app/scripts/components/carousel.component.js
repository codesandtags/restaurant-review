angular.module('restaurantApp').component('carouselApp', {
    templateUrl: '../../views/carousel.html',
    controller: function carouselController() {
        this.carouselId = 'restaurantCarousel';
        this.items = [{
            id: 1,
            title: 'Glass',
            description: 'This is Sparta!',
            classAlign: 'text-xs-left',
            textButton: 'Buy food',
            targetButton: '/',
            isActive: true
        }, {
            id: 2,
            title: 'Glass',
            description: 'This is Sparta!',
            classAlign: 'text-xs-left',
            textButton: 'Buy food',
            targetButton: '/',
            isActive: false
        }, {
            id: 3,
            title: 'Glass',
            description: 'This is Sparta!',
            classAlign: 'text-xs-left',
            textButton: 'Buy food',
            targetButton: '/',
            isActive: false
        }];
    }
});