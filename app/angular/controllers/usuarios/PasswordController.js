/*
 * Created by Adrian on 14/06/2016.
*/
(function(angular, rest, undefined){

    'use strict';
    angular
        .module('myApp')
            .controller('PasswordController', PasswordController);

    function PasswordController($scope,UserServices)
    {
        $scope.usuario = {};

        $scope.cambiarPassword = function () {
            if($scope.usuario.newPassword === $scope.usuario.newPassword2){
                __cambiarPassword();
            }
            else{
                alert("Las contraseñas no coinciden");
            }
        };

        $scope.crearUsuario = function () {
            $scope.usuario.idUsuario=rest._getIdUsuario();
            $scope.usuario.idRestaurante=rest._getIdRestaurante();

            var promisePost = UserServices.crear($scope.usuario);
            promisePost.then(
                function (pl) {
                    var respuesta = pl.data;
                    if(respuesta.error === false){
                        $scope.showSimpleToast(respuesta.mensaje);
                        $scope.usuario = {};
                        $scope.$apply(
                            function(){
                                $scope.usuarios.push($scope.usuario);
                            }
                        );
                        console.log($scope.usuarios);
                        $scope.limpiarForm();
                    }
                    else{
                        $scope.showSimpleToast(respuesta.mensaje);
                    }
                },
                function (plError){
                    console.log(JSON.stringify(plError));
                }
            );
        };

        function __cambiarPassword()
        {
            var promisePost = UserServices.cambiarPassword($scope.usuario);
            promisePost.then(
                function (pl) {
                    var respuesta = pl.data;
                    if(respuesta.error === false){
                        alert(respuesta.mensaje);
                        $scope.usuario = {};
                    }
                    else{
                        alert(respuesta.mensaje);
                    }
                },
                function (errorPl) {
                    console.log(JSON.stringify(errorPl));
                }
            );
        }
    }
})(angular, rest);