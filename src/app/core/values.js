(function() {
    'use strict';

    angular
        .module('app')
        .value('apiUrl', "http://localhost:61175/api")
        .value('studentUrl', "http://localhost:61175/api/students");
})();
