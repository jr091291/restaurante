/**
 * Created by Ricardo on 05/06/2016.
 */

(function (angular, rest, undefined) {
    'use strict';

    var app = angular.module('myApp');
    app.service('TipoAlmuerzoServices', TipoAlmuerzoServices);

    function TipoAlmuerzoServices($http){
        this.listadoTipoAlmuerzo = function(){
            return $http.get(rest._getUrl() + '/ListadoTiposAlmuerzo?token=' + localStorage.token);
        };

        this.registrarTipoAlmuerzo= function (tipo) {
            return $http.post(rest._getUrl() + '/CrearTipoAlmuerzo?token=' + localStorage.token, tipo);
        };
    }

})(angular,rest);