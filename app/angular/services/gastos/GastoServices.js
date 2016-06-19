/**
 * Created by Esleider A Tafur on 13/06/2016.
 */
(function (angular, rest, undefined) {
    'use strict';

    angular.module('myApp')
        .service('GastoServices', GastoServices);

    function GastoServices($http){
        this.crear = function (Gasto) {
            var respuesta = $http.post(rest._getUrl() + '/CrearGasto',Gasto);
            return respuesta;
        };

        this.editar = function (Gasto) {
            var respuesta = $http.post(rest._getUrl() + '/ActualizarGasto?token=' + rest._getToken(),Gasto);
            return respuesta;
        };

        this.listar = function (idRestaurante) {
            var respuesta = $http.get(rest._getUrl() + '/ListadoGastos/idRestaurante/' + idRestaurante +'?token=' + rest._getToken());
            return respuesta;
        };
    }

})(angular, rest);