/**
 * Created by Esleider A Tafur on 16/06/2016.
 */
(function (angular, undefined) {
    'use strict';

    angular.module('myApp')
        .factory('TipoAlmuerzoGlobalServices', TipoAlmuerzoGlobalServices);

    function TipoAlmuerzoGlobalServices(){
        return{
            tipoAlmuerzo:{
                idTipoAlmuerzo: null,
                nombreTipoAlmuerzo: null,
                idRestaurante: null,
                idUsuario: null,
                activo: null
            },
            lista:[]

        };
    }

})(angular);