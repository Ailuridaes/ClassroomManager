(function() {
    'use strict';

    angular
        .module('app')
        .controller('ProjectDetailController', ProjectDetailController);

    ProjectDetailController.$inject = ['projectFactory', '$state', '$stateParams'];

    /* @ngInject */
    function ProjectDetailController(projectFactory, $state, $stateParams) {
        var vm = this;
        vm.project = {};
        vm.editMode = false;
        vm.editingProject = {};
        vm.toggleEdit = toggleEdit;
        vm.updateProject = updateProject;
        vm.deleteProject = deleteProject;

        activate();

        function activate() {
            var projectId = $stateParams.projectId;
            projectFactory.getProject(projectId).then(
                function(data) {
                    vm.project = data;
                },
                function(error) {

                }
            );
        }

        function toggleEdit() {
            if (!vm.editMode) {
                vm.editingProject = angular.copy(vm.project);
            }
            vm.editMode = !vm.editMode;
        }

        function updateProject() {
            projectFactory.updateProject(vm.editingProject).then(
                function() {
                    vm.project = vm.editingProject;
                    vm.editMode = false;
                }
            );
        }

        function deleteProject() {
            if (confirm("Are you sure you want to delete this project?")) {
                projectFactory.deleteProject(vm.project).then(
                    function() {
                        $state.go('^.list');
                    }
                );
            }
        }
    }
})();
