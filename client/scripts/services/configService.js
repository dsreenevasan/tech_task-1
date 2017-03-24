(function () {
    'use strict';

    angular
        .module('web')
        .factory('ConfigService', ConfigService);

    ConfigService.$inject = ['$http','$rootScope'];
    function ConfigService($http,$rootScope) {
        var service={};
        var server = {
            "local": "localhost",
            "cms" : "enct29fa5ae.kurukshetra.org.in",
            "shinigami" : "shinigami.kurukshetra.org.in",
            "login": "login.kurukshetra.org.in",
            "port": "8080"
        };
        service.BaseURI = BaseURI;
        service.CmsURI = CmsURI;
        service.ShinigamiURI = ShinigamiURI;
        service.LoginURI = LoginURI;
        return service;

        function BaseURI()
        {
            return "http://"+server.cms;
        }

        function CmsURI()
        {
            return "http://"+server.cms;
        }

        function ShinigamiURI()
        {
            return "http://"+server.shinigami;
        }

        function LoginURI()
        {
            return "http://"+server.login;
        }

    }
})();