/**
 * Created by Esleider A Tafur on 9/06/2016.
 */
(function (angular,rest,undefined){
    'use strict';

    angular
        .module('myApp')
            .controller('UsuariosController', UsuariosController);

    function UsuariosController($scope, UserServices, UserGlobalServices, $controller)
    {
        $controller('DialogOptionsController',{$scope : $scope});

        $scope.URL_FORM_CREATE = 'views/usuarios/forms/usuarioCrearForm.html';
        $scope.URL_FORM_EDIT = 'views/usuarios/forms/usuarioEditarForm.html';

        $scope.usuarios =UserGlobalServices;

        $scope.showCreate = function (ev) {
            $scope.showContent(ev, $scope.URL_FORM_CREATE);
        };

        $scope.showEdit = function (ev, usuario)
        {
            $scope.showContent(ev, $scope.URL_FORM_EDIT);
            $scope.usuarios.usuario.identificacion = usuario.identificacion;
            $scope.usuarios.usuario.nombres = usuario.nombres;
            $scope.usuarios.usuario.apellidos = usuario.apellidos;
            $scope.usuarios.usuario.email = usuario.email;
            $scope.usuarios.usuario.idRol = usuario.idRol;
            $scope.usuarios.usuario.idUsuario = usuario.idUsuario;
        };

        function __listadoUsuarios()
        {
            var promiseGet = UserServices.listar(1);
            promiseGet.then(
                function (pl) {
                    var respuesta = pl.data;
                    if(respuesta.error === false){
                        $scope.usuarios.lista = respuesta.datos;
                    }
                    else{
                        alert(respuesta.mensaje);
                    }
                }
            );
        }

        __listadoUsuarios();
    }
})(angular, rest);
