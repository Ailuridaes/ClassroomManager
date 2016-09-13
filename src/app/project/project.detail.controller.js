(function() {
    'use strict';

    angular
        .module('app')
        .controller('ProjectDetailController', ProjectDetailController);

    ProjectDetailController.$inject = ['projectFactory', '$state', '$stateParams', 'toastr', 'studentFactory', 'assignmentFactory'];

    /* @ngInject */
    function ProjectDetailController(projectFactory, $state, $stateParams, toastr, studentFactory, assignmentFactory) {
        var vm = this;
        vm.project = {};
        vm.editMode = false;
        vm.editingProject = {};
        vm.students = [];
        vm.toggleEdit = toggleEdit;
        vm.updateProject = updateProject;
        vm.deleteProject = deleteProject;
        vm.assignTo = assignTo;
        vm.updateAssignment = updateAssignment;
        vm.deleteAssignment = deleteAssignment;

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

            studentFactory.getStudentList().then(
                function(data) {
                    vm.students = data;
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

        function assignTo(student) {
            assignmentFactory.addAssignment(student, vm.project).then(
                function(assignment) {
                    assignment.student = student;
                    vm.project.assignments.push(assignment);
                },
                function(response) {
                    if (response.status == 409) {
                        toastr.warning('Student already assigned!')
                    } else {
                        toastr.warning('Could not add assignment.');
                    }
                }
            )
        }

        function updateAssignment(assignment) {
            assignmentFactory.updateAssignment(assignment).then(
                function() {
                    assignment.editMode = false;
                },
                function(response) {
                    toastr.warning('Could not update assignment.');
                }
            );
        }

        function deleteAssignment(assignment) {
            if (confirm("Are you sure you want to delete this assignment?")) {
                assignmentFactory.deleteAssignment(assignment).then(
                    function() {
                        var index = vm.project.assignments.indexOf(assignment);
                        return index > -1 ? vm.project.assignments.splice(index, 1) : [];
                    },
                    function(error) {
                        toastr.warning('Could not delete assignment.');
                    }
                );
            }
        }
    }
})();
