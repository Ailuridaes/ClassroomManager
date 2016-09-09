(function() {
    'use strict';

    angular
        .module('app', ['ui.router', 'toastr'])
        .config(appConfig);

        appConfig.$inject = ["$urlRouterProvider", "$stateProvider"];

        function appConfig($urlRouterProvider, $stateProvider) {
            $urlRouterProvider.otherwise('dashboard');

            $stateProvider.state('dashboard', {
                url: '/dashboard',
                controller: 'DashboardController as dashboard',
                templateUrl: 'app/dashboard/dashboard.html'
            });

            $stateProvider.state('student', {
                url: '/student',
                abstract: true,
                template: '<div ui-view></div>'
            })
                .state('student.list', {
                    url: '/list',
                    controller: 'StudentListController as studentList',
                    templateUrl: 'app/student/student.list.html'
                })
                .state('student.detail', {
                    url: '/:studentId',
                    controller: 'StudentDetailController as studentDetail',
                    templateUrl: 'app/student/student.detail.html'
                });

            $stateProvider.state('project', {
                url: '/project',
                abstract: true,
                template: '<div ui-view></div>'
            })
                .state('project.list', {
                    url: '/list',
                    controller: 'ProjectListController as projectList',
                    templateUrl: 'app/project/project.list.html'
                })
                .state('project.detail', {
                    url: '/:projectId',
                    controller: 'ProjectDetailController as projectDetail',
                    templateUrl: 'app/project/project.detail.html'
                });
        }
})();
