/**
 * Created by Esleider A Tafur on 15/06/2016.
 */
(function (angular, rest,undefined) {
    'use strict';

    angular.module('myApp')
        .service('RolServices', RolServices);

    function RolServices($http){
        this.crear = function (Rol) {
            var respuesta = $http.post(rest._getUrl() + '/CrearRol?token=' + rest._getToken(),Rol);
            return respuesta;
        };

        this.editar = function (Rol) {
            var respuesta = $http.post(rest._getUrl() + '/ActualizarRol?token=' + rest._getToken(),Rol);
            return respuesta;
        };

        this.listar = function () {
            var respuesta = $http.get(rest._getUrl() + '/ListadoRoles/idUsuario/'+ rest._getIdUsuario() +'/idRestaurante/'+ rest._getIdRestaurante() +'?token=' + rest._getToken());
            return respuesta;
        };
    }

})(angular, rest);