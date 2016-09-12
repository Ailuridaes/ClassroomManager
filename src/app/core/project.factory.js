(function() {
    'use strict';

    angular
        .module('app')
        .factory('projectFactory', projectFactory);

    projectFactory.$inject = ['$http', 'projectUrl'];

    /* @ngInject */
    function projectFactory($http, projectUrl) {
        var service = {
            getProjectList: getProjectList,
            getProject: getProject,
            getProjectCount: getProjectCount,
            addProject: addProject,
            updateProject: updateProject,
            deleteProject: deleteProject
        };

        return service;

        function getProjectList() {
            return $http({
                method: 'GET',
                url: projectUrl,
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

        function getProject(projectId) {
            return $http({
                method: 'GET',
                url: projectUrl + '/' + projectId,
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

        function getProjectCount() {
            return $http({
                method: 'GET',
                url: projectUrl + '/count',
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

        function addProject(project) {
            return $http({
                method: 'POST',
                url: projectUrl,
                headers: {
                  'Accept': 'application/json'
                },
                data: project
            }).then(
                function(res) {
                    // returns added project
                    var project = angular.fromJson(res.data);
                    // initialize assignments array for counting functions
                    project.assignments = [];
                    return project;
                }, function(res) {
                    return res.data.message;
                    // has data.message AND res.statusText on 405 (not allowed)
                }
            );
        }

        function updateProject(project) {
            return $http({
                method: 'PUT',
                url: projectUrl + "/" + project.projectId,
                headers: {
                  'Accept': 'application/json'
                },
                data: project
            }).then(
                function(res) {
                    return;
                }, function(res) {
                    return res.statusText;
                    // res is 404 Not Found if projectId does not exist, Bad Request if invalid project
                }
            );
        }

        function deleteProject(project) {
            return $http({
                method: 'DELETE',
                url: projectUrl + "/" + project.projectId,
                headers: {
                  'Accept': 'application/json'
                }
            }).then(
                function(res) {
                    // returns deleted project
                    return angular.fromJson(res.data);
                }, function(res) {
                    return res.statusText;
                    // res is 404 Not Found if projectId does not exist
                }
            );
        }

    }
})();
