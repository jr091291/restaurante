/**
 * Created by Esleider A Tafur on 15/06/2016.
 */
(function(angular, rest, undefined){
    'use strict';
    var app = angular.module('myApp');
    app.controller('FormUserController', FormUserController);

    function FormUserController($scope, UserServices, UserGlobalServices, $mdToast) {

        $scope.usuarios = UserGlobalServices;

        // funcion para enviar por metodo post los datos
        // de un usuario para persistir en la base de datos.
        $scope.crearUsuario = function () {

            $scope.usuarios.usuario.idUsuario=rest._getIdUsuario();
            $scope.usuarios.usuario.idRestaurante=rest._getIdRestaurante();
            var promiseGet = UserServices.crear($scope.usuarios.usuario);
            promiseGet.then(
                function (pl) {
                    var respuesta = pl.data;
                    if(respuesta.error === false){
                        console.log(respuesta.datos);
                        $scope.usuarios.lista.push(respuesta.datos);
                        console.log($scope.usuarios.lista);
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

        $scope.editarUsuario = function () {
            var promiseGet = UserServices.editar($scope.usuarios.usuario);
            promiseGet.then(
                function (pl) {
                    var respuesta = pl.data;
                    if(respuesta.error === false){
                        $scope.showSimpleToast(respuesta.mensaje);
                        console.log(respuesta.datos);
                        _actualizarLista(respuesta.datos.idUsuario, respuesta.datos);
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

            $scope.usuarios.usuario.identificacion = null;
            $scope.usuarios.usuario.nombres = null;
            $scope.usuarios.usuario.apellidos = null;
            $scope.usuarios.usuario.email = null;
            $scope.usuarios.usuario.idRol = null;
            $scope.usuarios.usuario.idUsuario = null;
        };

        function _actualizarLista(idUsuario, usuarioDatos) {
            var usuariosArray = $scope.usuarios.lista;

            for (var i = 0; i < usuariosArray.length; i++) {
                if (usuariosArray[i].idUsuario === idUsuario) {
                    usuariosArray[i] = usuarioDatos;
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
