/**
 * Created by Adrian on 14/06/2016.
 */

(function (angular, rest, undefined) {
    'use strict';

    angular.module('myApp').service('VentasServices', VentasServices);

    function VentasServices($http){

        this.registrarVenta = function(productos){
            console.log(productos);
            return  $http.post(rest._getUrl() + '/CrearDetalleFactura?token=' + rest._getToken(), productos);
        };
    }

})(angular, rest);
