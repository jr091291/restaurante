/**
 * Created by Esleider A Tafur on 15/06/2016.
 */

(function (angular, rest, undefined){
    'use strict';

    angular
        .module('myApp')
            .controller('FormRolController', FormRolController);

    function FormRolController($scope, RolServices, RolGlobalServices, $mdToast) {

        $scope.roles = RolGlobalServices;

        $scope.crearRol = function () {

            $scope.roles.rol.idUsuario=rest._getIdUsuario();
            $scope.roles.rol.idRestaurante=rest._getIdRestaurante();
            var promiseGet = RolServices.crear($scope.roles.rol);
            promiseGet.then(
                function (pl) {
                    var respuesta = pl.data;
                    if(respuesta.error === false){
                        $scope.roles.lista.push(respuesta.datos);
                        $scope.showSimpleToast(respuesta.mensaje);
                        $scope.limpiarForm();
                    }
                    else{
                        $scope.showSimpleToast(respuesta.mensaje);
                        $scope.limpiarForm();
                    }
                }
            );

        };

        $scope.editarRol = function () {
            var promiseGet = RolServices.editar($scope.roles.rol);
            promiseGet.then(
                function (pl) {
                    var respuesta = pl.data;
                    if(respuesta.error === false){
                        $scope.showSimpleToast(respuesta.mensaje);
                        _actualizarLista(respuesta.datos.idRol, respuesta.datos);
                        $scope.limpiarForm();
                    }
                    else{
                        $scope.showSimpleToast(respuesta.mensaje);
                        $scope.limpiarForm();
                    }
                }
            );

        };

        $scope.limpiarForm = function () {

            $scope.roles.rol.idRol = null;
            $scope.roles.rol.nombreRol = null;
            $scope.roles.rol.pago = null;
            $scope.roles.rol.activo = null;
            $scope.roles.rol.idUsuario = null;
            $scope.roles.rol.idRestaurante = null;

        };

        function _actualizarLista(id, Datos) {
            var Array = $scope.roles.lista;

            for (var i = 0; i < Array.length; i++) {
                if (Array[i].idRol === id) {
                    Array[i] = Datos;
                    break;
                }
            }
        }

        // Toast para mostrar respuestas
        $scope.showSimpleToast = function(message) {
            $mdToast.show(
                $mdToast.simple()
                    .textContent(message)
                    .position('top right')
                    .hideDelay(3000)
            );
        };
    }
})(angular, rest);