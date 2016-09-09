(function() {
    'use strict';

    angular
        .module('app')
        .factory('assignmentFactory', assignmentFactory);

    assignmentFactory.$inject = ['$http', '$q', 'assignmentUrl'];

    /* @ngInject */
    function assignmentFactory($http, $q, assignmentUrl) {
        var service = {
            addAssignment: addAssignment
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
                    // initialize assignments array for counting functions
                    defer.resolve(assignment);
                }, function(res) {
                    defer.reject(res.data.message);
                }
            );

            return defer.promise;

        }
    }
})();
