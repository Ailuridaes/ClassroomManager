(function() {
    'use strict';

    angular
        .module('app')
        .factory('assignmentFactory', assignmentFactory);

    assignmentFactory.$inject = ['$http', '$q', 'assignmentUrl'];

    /* @ngInject */
    function assignmentFactory($http, $q, assignmentUrl) {
        var service = {
            addAssignment: addAssignment,
            getAssignmentCount: getAssignmentCount,
            updateAssignment: updateAssignment,
            deleteAssignment: deleteAssignment
        };

        return service;

        function addAssignment(student, project) {
            var assignment = {
                studentId: student.studentId,
                projectId: project.projectId
            }

            var defer = $q.defer();

            $http({
                method: 'POST',
                url: assignmentUrl,
                headers: {
                  'Accept': 'application/json'
                },
                data: angular.toJson(assignment)
            }).then(
                function(res) {
                    // returns added assignment
                    var assignment = angular.fromJson(res.data);
                    defer.resolve(assignment);
                }, function(res) {
                    defer.reject(res);
                }
            );
            return defer.promise;
        }

        function getAssignmentCount() {
            var defer = $q.defer();

            $http({
                method: 'GET',
                url: assignmentUrl + '/count',
                headers: {
                  'Accept': 'application/json'
                }
            }).then(
                function(res) {
                    defer.resolve(res.data);
                }, function(res) {
                    defer.reject(res);
                }
            );

            return defer.promise;
        }

        function updateAssignment(assignment) {
            var assignmentToSend = {
                studentId: assignment.studentId,
                projectId: assignment.projectId,
                grade: assignment.grade
            }
            var defer = $q.defer();

            $http({
                method: 'PUT',
                url: assignmentUrl,
                headers: {
                  'Accept': 'application/json'
                },
                data: assignmentToSend
            }).then(
                function(res) {
                    defer.resolve();
                }, function(res) {
                    defer.reject(res.statusText);
                    // res is 404 Not Found if assignmentId does not exist, Bad Request if invalid assignment
                }
            );

            return defer.promise;
        }

        function deleteAssignment(assignment) {
            var assignmentToSend = {
                studentId: assignment.studentId,
                projectId: assignment.projectId,
                grade: assignment.grade
            }

            var defer = $q.defer();

            $http({
                method: 'DELETE',
                url: assignmentUrl,
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
                },
                data: assignmentToSend
            }).then(
                function(res) {
                    // returns deleted assignment
                    defer.resolve(angular.fromJson(res.data));
                }, function(res) {
                    defer.reject(res.statusText);
                    // res is 404 Not Found if assignment does not exist
                }
            );

            return defer.promise;
        }
    }
})();
