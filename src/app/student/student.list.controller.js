(function() {
    'use strict';

    angular
        .module('app')
        .controller('StudentListController', StudentListController);

    StudentListController.$inject = ['studentFactory'];

    /* @ngInject */
    function StudentListController(studentFactory) {
        var vm = this;
        vm.students = [];
        vm.newStudent = {};
        vm.submitStudent = submitStudent;

        activate();

        function activate() {
            studentFactory.getStudentList().then(
                function(students){
                    vm.students = students;
                }
            )
        }

        function addStudent(student) {
            return studentFactory.addStudent(student).then(
                function(student) {
                    vm.students.push(student);
                }
            );
        }

        function submitStudent() {
            addStudent(vm.newStudent).then(
                function() {
                    vm.newStudent = {};
                }
            );
        }

    }
})();
