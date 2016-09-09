(function() {
    'use strict';

    angular
        .module('app')
        .factory('studentFactory', studentFactory);

    studentFactory.$inject = ['$http', 'studentUrl'];

    /* @ngInject */
    function studentFactory($http, studentUrl) {
        var service = {
            getStudentList: getStudentList,
            getStudent: getStudent,
            getStudentCount: getStudentCount,
            addStudent: addStudent,
            updateStudent: updateStudent,
            deleteStudent: deleteStudent
        };

        return service;

        function getStudentList() {
            return $http({
                method: 'GET',
                url: studentUrl,
                headers: {
                  'Accept': 'application/json'
                }
            }).then(
                function(res) {
                    return res.data;
                }, function(res) {
                    return res.statusText;
                }
            );
        }

        function getStudent(studentId) {
            return $http({
                method: 'GET',
                url: studentUrl + '/' + studentId,
                headers: {
                  'Accept': 'application/json'
                }
            }).then(
                function(res) {
                    return angular.fromJson(res.data);
                }, function(res) {
                    return res.statusText;
                }
            );
        }

        function getStudentCount() {
            return $http({
                method: 'GET',
                url: studentUrl + '/count',
                headers: {
                  'Accept': 'application/json'
                }
            }).then(
                function(res) {
                    return res.data;
                }, function(res) {
                    return res.statusText;
                }
            );
        }

        function addStudent(student) {
            return $http({
                method: 'POST',
                url: studentUrl,
                headers: {
                  'Accept': 'application/json'
                },
                data: student
            }).then(
                function(res) {
                    // returns added student
                    var student = angular.fromJson(res.data);
                    // initialize assignments array for counting functions
                    student.assignments = [];
                    return student;
                }, function(res) {
                    return res.data.message;
                    // has data.message AND res.statusText on 405 (not allowed)
                }
            );
        }

        function updateStudent(student) {
            return $http({
                method: 'PUT',
                url: studentUrl + "/" + student.studentId,
                headers: {
                  'Accept': 'application/json'
                },
                data: student
            }).then(
                function(res) {
                    return;
                }, function(res) {
                    return res.statusText;
                    // res is 404 Not Found if studentId does not exist, Bad Request if invalid student
                }
            );
        }

        function deleteStudent(student) {
            return $http({
                method: 'DELETE',
                url: studentUrl + "/" + student.studentId,
                headers: {
                  'Accept': 'application/json'
                }
            }).then(
                function(res) {
                    // returns deleted task
                    return angular.fromJson(res.data);
                }, function(res) {
                    return res.statusText;
                    // res is 404 Not Found if studentId does not exist
                }
            );
        }

    }
})();
