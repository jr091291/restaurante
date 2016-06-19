/**
 * Created by Esleider A Tafur on 9/06/2016.
 */
(function (angular, rest, undefined){
    'use strict';

    angular.module('myApp')
        .controller('RolesController', RolesController);

    function RolesController($scope, RolServices, RolGlobalServices, $controller)
    {
        $controller('DialogOptionsController',{$scope : $scope});

        $scope.URL_FORM_CREATE = 'views/roles/forms/rolCrearForm.html';
        $scope.URL_FORM_EDIT = 'views/roles/forms/rolEditarForm.html';

        $scope.roles =RolGlobalServices;

        $scope.showCreate = function (ev) {
            $scope.showContent(ev, $scope.URL_FORM_CREATE);
        };

        $scope.showEdit = function (ev, rol) {

            $scope.showContent(ev, $scope.URL_FORM_EDIT);
            console.log(rol);
            $scope.roles.rol.idRol = rol.idRol;
            $scope.roles.rol.nombreRol = rol.nombreRol;
            $scope.roles.rol.pago = rol.pago;
            $scope.roles.rol.idUsuario = rest._getIdUsuario();
            $scope.roles.rol.idRestaurante = rest._getIdRestaurante();
        };

        function __listadoRoles(){
            var promiseGet = RolServices.listar();
            promiseGet.then(
                function (pl) {
                    var respuesta = pl.data;
                    if(respuesta.error === false){
                        $scope.roles.lista = respuesta.datos;
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