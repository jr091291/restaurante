/**
 * Created by Esleider A Tafur on 12/06/2016.
 */
(function (angular, undefined) {
    'use strict';

    angular.module('myApp')
        .factory('UserGlobalServices', UserGlobalServices);

    function UserGlobalServices(){
        return{
            usuario:{
                nombres:null,
                apellidos:null,
                email:null,
                identificacion:null,
                idUsuario:null,
                idRol:null,
                nombreRol:null,
                idRestaurante:null
            },
            lista:[]
            
        };
    }

})(angular);