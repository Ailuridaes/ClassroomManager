(function() {
    'use strict';

    angular
        .module('app')
        .controller('DashboardController', DashboardController);

    DashboardController.$inject = ['studentFactory', 'projectFactory', 'assignmentFactory', 'toastr'];

    /* @ngInject */
    function DashboardController(studentFactory, projectFactory, assignmentFactory, toastr) {
        var vm = this;
        vm.projectCount;


        activate();

        function activate() {
            studentFactory.getStudentCount().then(
                function(studentCount) {
                    vm.studentCount = studentCount;
                },
                function(res) {
                    if (res.status == -1) {
                        toastr.error("Could not retrieve data.", "Error!");
                    } else {
                        toastr.error(res.statusText, "Error!");
                    }
                }
            );

            projectFactory.getProjectCount().then(
                function(projectCount) {
                    vm.projectCount = projectCount;
                },
                function(res) {
                    if (res.status == -1) {
                        toastr.error("Could not retrieve data.", "Error!");
                    } else {
                        toastr.error(res.statusText, "Error!");
                    }
                }
            );

            assignmentFactory.getAssignmentCount().then(
                function(assignmentCount) {
                    vm.assignmentCount = assignmentCount;
                },
                function(res) {
                    if (res.status == -1) {
                        toastr.error("Could not retrieve data.", "Error!");
                    } else {
                        toastr.error(res.statusText, "Error!");
                    }
                }
            );
        }
    }
})();
