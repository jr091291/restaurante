/**
 * Created by Esleider A Tafur on 9/06/2016.
 */
(function(angular, rest, undefined){

    'use strict';

    angular
        .module('myApp')
            .controller('RoleController', RoleController);

    function RoleController($scope, $timeout,RoleServices)
    {
        $scope.rolSeleccionado={};
        $scope.roles = [];

        $scope.cargarRoles = function () {
            return $timeout(__listadoRoles,650);
        };

        function __listadoRoles(){
            var promiseGet = RoleServices.listar();
            promiseGet.then(
                function (pl) {
                    var respuesta = pl.data;
                    if(respuesta.error === false){
                        $scope.roles = respuesta.datos;
                    }
                    else{
                        alert(respuesta.mensaje);
                    }
                }
            );
        }
        __listadoRoles();
    }
})(angular, rest);
