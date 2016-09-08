(function() {
    'use strict';

    angular
        .module('app')
        .controller('StudentDetailController', StudentDetailController);

    StudentDetailController.$inject = ['studentFactory', '$state', '$stateParams'];

    /* @ngInject */
    function StudentDetailController(studentFactory, $state, $stateParams) {
        var vm = this;
        vm.student = {};
        vm.editMode = false;
        vm.editingStudent = {};
        vm.toggleEdit = toggleEdit;
        vm.updateStudent = updateStudent;
        vm.deleteStudent = deleteStudent;

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
    }
})();
