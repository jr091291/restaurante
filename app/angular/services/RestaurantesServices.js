/**
 * Created by Adrian on 16/06/2016.
 */

(function (angular, rest, undefined) {
    'use strict';

    angular.module('myApp')
        .service('RestaurantesServices', RestaurantesServices);

    function RestaurantesServices($http){

        this.listadoRestaurantessAdmin = function(){
            return $http.get(rest._getUrl() + '/ListaRestaurantesAdmin/idUsuario/'+ rest._getIdUsuario() +'?token=' + rest._getToken());

        };

        this.ActualizarRestaurante = function(restaurante){
            restaurante.idUsuario = rest._getIdUsuario();
            return $http.post(rest._getUrl() + '/ActualizarRestaurante?token=' + rest._getToken(), restaurante);
        };
    }

})(angular, rest);