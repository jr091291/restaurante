/**
 * Created by Esleider A Tafur on 13/06/2016.
 */

(function (angular, rest, undefined) {
    'use strict';

    angular.module('myApp')
        .service('UserServices', UserServices);
    
    function UserServices($http){
        this.crear = function (Usuario) {
            var respuesta = $http.post(rest._getUrl() + '/CrearUsuario?token=' + rest._getToken(),Usuario);
            return respuesta;
        };

        this.editar = function (Usuario) {
            var respuesta = $http.post(rest._getUrl() + '/ActualizarUsuario?token=' + rest._getToken(),Usuario);
            return respuesta;
        };
        
        this.listar = function (idRestaurante) {
            var respuesta = $http.get(rest._getUrl() + '/ListadoUsuarios/idUsuario/' + rest._getIdUsuario() + '/idRestaurante/' + idRestaurante +'?token=' + rest._getToken());
            return respuesta;
        };
    }

})(angular, rest);