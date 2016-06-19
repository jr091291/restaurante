/**
 * Created by Esleider A Tafur on 15/06/2016.
 */
(function (angular, undefined) {
    'use strict';

    angular.module('myApp')
        .factory('RolGlobalServices', RolGlobalServices);

    function RolGlobalServices(){
        return{
            rol:{
                idRol:null,
                nombreRol:null,
                pago:null,
                activo:null,
                idUsuario:null,
                idRestaurante:null
            },
            lista:[]

        };
    }

})(angular);