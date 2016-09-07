(function() {
    'use strict';

    angular
        .module('app')
        .controller('DashboardController', DashboardController);

    DashboardController.$inject = [''];

    /* @ngInject */
    function DashboardController() {
        var vm = this;

        activate();

        function activate() {

        }
    }
})();
