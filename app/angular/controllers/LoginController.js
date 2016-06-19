/**
 * Created by Ricardo on 28/05/2016.
 */
(function(angular, rest,undefined) {
    "use strict";
    var app = angular.module('myApp');

        app.controller('LoginController', LoginController);
        app.controller('RecuperarPass', RecuperarPass);

        function LoginController(LoginService, $scope){
            $scope.user = {};
            $scope.usuario = {};

            $scope.login = function () {
                var promisePost;
                console.log($scope.user);
                promisePost = LoginService.loginUsuario($scope.user);
                promisePost.then(
                    function (pl) {
                        var respuesta = pl.data;
                        if(respuesta.error === false){
                            $scope.usuario = respuesta.datos;
                            rest._setToken(respuesta.token);
                            rest._setIdUsuario($scope.usuario.idUsuario);
                            rest._setNombreCompleto($scope.usuario.nombres + " " + $scope.usuario.apellidos);
                            rest._setIdRol($scope.usuario.idRol);
                            location.href = "/#/registrarVenta";
                        }
                        else{
                            alert(respuesta.mensaje);
                        }
                    },
                    function (errorPl) {
                        console.log(JSON.stringify(errorPl));
                    }
                );
            };


        }

        function RecuperarPass($scope){
            $scope.user={
                email:""
            };
        }

})(angular, rest);