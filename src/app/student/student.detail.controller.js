(function() {
    'use strict';

    angular
        .module('app')
        .controller('StudentDetailController', StudentDetailController);

    StudentDetailController.$inject = ['studentFactory', '$state', '$stateParams', 'toastr', 'projectFactory', 'assignmentFactory'];

    /* @ngInject */
    function StudentDetailController(studentFactory, $state, $stateParams, toastr, projectFactory, assignmentFactory) {
        var vm = this;
        vm.student = {};
        vm.editMode = false;
        vm.editingStudent = {};
        vm.projects = [];
        vm.toggleEdit = toggleEdit;
        vm.updateStudent = updateStudent;
        vm.deleteStudent = deleteStudent;
        vm.assignProject = assignProject;
        vm.updateAssignment = updateAssignment;
        vm.deleteAssignment = deleteAssignment;

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
            );
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
            if (!project) return;
            assignmentFactory.addAssignment(vm.student, project).then(
                function(assignment) {
                    assignment.project = project;
                    vm.student.assignments.push(assignment);
                },
                function(response) {
                    if (response.status == 409) {
                        toastr.warning('Project already assigned!')
                    } else {
                        toastr.warning('Could not add assignment.');
                    }
                }
            );
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
                        var index = vm.student.assignments.indexOf(assignment);
                        return index > -1 ? vm.student.assignments.splice(index, 1) : [];
                    },
                    function(error) {
                        toastr.warning('Could not delete assignment.');
                    }
                );
            }
        }
    }
})();
