/**
 * Created by Adrian on 16/06/2016.
 */

(function (angular, rest,undefined) {
    'use strict';

    angular.module('myApp')
        .service('CiudadesServices', CiudadesServices);

    function CiudadesServices($http){

        this.listadoCiudades = function(){
            var req = $http.get(rest._getUrl() + '/ListadoCiudades/idUsuario/' + rest._getIdUsuario() + '?token=' + rest._getToken());
            return req;
        };
    }

})(angular, rest);
