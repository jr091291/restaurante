/**
 * Created by Adrian on 01/06/2016.
 */
(function (angular, rest, undefined) {
    'use strict';

    angular.module('myApp').service('LoginService', LoginService);

    function LoginService($http){
        this.loginUsuario = function(credenciales){
            console.log(credenciales);
            var req = $http.post(rest._getUrl() + '/Authenticate', credenciales);
            return req;
        };
    }

})(angular, rest);
