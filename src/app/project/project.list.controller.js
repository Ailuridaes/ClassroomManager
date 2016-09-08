(function() {
    'use strict';

    angular
        .module('app')
        .controller('ProjectListController', ProjectListController);

    ProjectListController.$inject = ['projectFactory'];

    /* @ngInject */
    function ProjectListController(projectFactory) {
        var vm = this;
        vm.projects = [];
        vm.newProject = {};
        vm.submitProject = submitProject;

        activate();

        function activate() {
            projectFactory.getProjectList().then(
                function(projects){
                    vm.projects = projects;
                }
            )
        }

        function addProject(project) {
            return projectFactory.addProject(project).then(
                function(project) {
                    vm.projects.push(project);
                }
            );
        }

        function submitProject() {
            addProject(vm.newProject).then(
                function() {
                    vm.newProject = {};
                }
            );
        }
    }
})();
