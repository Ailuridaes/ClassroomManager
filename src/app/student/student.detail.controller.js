(function() {
    'use strict';

    angular
        .module('app')
        .controller('StudentDetailController', StudentDetailController);

    StudentDetailController.$inject = ['studentFactory', '$state', '$stateParams', 'projectFactory', 'assignmentFactory'];

    /* @ngInject */
    function StudentDetailController(studentFactory, $state, $stateParams, projectFactory, assignmentFactory) {
        var vm = this;
        vm.student = {};
        vm.editMode = false;
        vm.editingStudent = {};
        vm.projects = [];
        vm.toggleEdit = toggleEdit;
        vm.updateStudent = updateStudent;
        vm.deleteStudent = deleteStudent;
        vm.assignProject = assignProject;

        activate();

        function activate() {
            var studentId = $stateParams.studentId;
            studentFactory.getStudent(studentId).then(
                function(data) {
                    vm.student = data;
                },
                function(error) {

                }
            );

            projectFactory.getProjectList().then(
                function(data) {
                    vm.projects = data;
                }
            )
        }

        function toggleEdit() {
            if (!vm.editMode) {
                vm.editingStudent = angular.copy(vm.student);
            }
            vm.editMode = !vm.editMode;
        }

        function updateStudent() {
            studentFactory.updateStudent(vm.editingStudent).then(
                function() {
                    vm.student = vm.editingStudent;
                    vm.editMode = false;
                }
            );
        }

        function deleteStudent() {
            if (confirm("Are you sure you want to delete this student?")) {
                studentFactory.deleteStudent(vm.student).then(
                    function() {
                        $state.go('^.list');
                    }
                );
            }
        }

        function assignProject(project) {
            assignmentFactory.addAssignment(vm.student, project).then(
                function(assignment) {
                    assignment.project = project;
                    vm.student.assignments.push(assignment);
                }
            )
        }
    }
})();
