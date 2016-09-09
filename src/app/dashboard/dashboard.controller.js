(function() {
    'use strict';

    angular
        .module('app')
        .controller('DashboardController', DashboardController);

    DashboardController.$inject = ['studentFactory', 'projectFactory', 'assignmentFactory'];

    /* @ngInject */
    function DashboardController(studentFactory, projectFactory, assignmentFactory) {
        var vm = this;
        vm.projectCount;


        activate();

        function activate() {
            studentFactory.getStudentCount().then(
                function(studentCount) {
                    vm.studentCount = studentCount;
                }
            );

            projectFactory.getProjectCount().then(
                function(projectCount) {
                    vm.projectCount = projectCount;
                }
            );

            assignmentFactory.getAssignmentCount().then(
                function(assignmentCount) {
                    vm.assignmentCount = assignmentCount;
                }
            );
        }
    }
})();
