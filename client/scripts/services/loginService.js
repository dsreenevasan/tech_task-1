(function () {
    'use strict';

    angular
        .module('web')
        .factory('LoginService', LoginService);

    LoginService.$inject = ['$http','$rootScope', 'ConfigService'];
    function LoginService($http,$rootScope, ConfigService) {

        var authServer = "http://shinigami.kurukshetra.org.in";
        var service = {};
        service.Login = Login;
        service.Register = Register;
        service.ForgotPassword = ForgotPassword;
        service.ResetPassword = ResetPassword;
        service.GetStates = GetStates;
        service.GetColleges = GetColleges;
        service.ReferSA = ReferSA;
        return service;

        function Login(params) {
            return $http.post(ConfigService.ShinigamiURI() + '/web/api/login', params).then(handleSuccess, handleRemoteError);
        }

        function Register(params) {
            console.log("params - " + params);
            return $http.post(ConfigService.ShinigamiURI() + '/web/api/registration', params).then(handleSuccess, handleRemoteError);
        }

        function ForgotPassword(params) {
            console.log("params - " + params);
            /*return $http.post(ConfigService.ShinigamiURI() + '/web/api/forgotPassword', params).then(handleSuccess, handleRemoteError);*/
            return $http.post(ConfigService.LoginURI() + '/generateResetToken', params).then(handleSuccess, handleRemoteError);
        }

        function ResetPassword(params) {
            console.log("params - " + params);
            return $http.post(ConfigService.ShinigamiURI() + '/web/api/resetPassword', params).then(handleSuccess, handleRemoteError);
        }

        function ReferSA(params) {
            return $http.post(ConfigService.ShinigamiURI() + '/web/api/verifySA', params).then(handleSuccess, handleRemoteError);
        }

        function GetStates(params) {
            console.log("params - " + params);
            /*return $http.get("https://api.myjson.com/bins/1diai1", params).then(handleSuccess, handleRemoteError);*/
            return $http.get("https://gist.githubusercontent.com/saimageshvar/d4339242f9142ab0ee04114967c40335/raw/67936e6b21d47965531f5737e03e8ae5e3fb0215/districts.json", params).then(handleSuccess, handleRemoteError);
        }

        function GetColleges(params) {
            console.log("params - " + params);
            /*return $http.get("https://api.myjson.com/bins/ts07r", params).then(handleSuccess, handleRemoteError);*/
            return $http.get("https://gist.githubusercontent.com/saimageshvar/61f384b6fbb8a5f2b83d58c45ffd7334/raw/16b2c2e43470b01f7b598008dbd53f5964cce5c4/colleges.json", params).then(handleSuccess, handleRemoteError);
        }

        function handleRemoteError(data) {
            return data;
        }

        function handleSuccess(data) {
            return data;
        };

    }
})();