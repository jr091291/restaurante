/**
 * Created by Ricardo on 02/06/2016.
 */
(function(angular, rest, undefined){
    "use strict";
    angular
        .module('myApp')
        .controller('TemplateController',function ($scope,$mdDialog, $timeout, $mdSidenav, RestaurantesServices) {

            $scope.usuario = rest._getNombreCompleto();
            $scope.restaurantes = [];
            $scope.idRol = rest._getIdRol();

            $scope.openLeftMenu = function() {
                $mdSidenav('left').toggle();
            };

            $scope.selectRestaurant= function(restaurante,ev) {
                rest._setIdRestaurante(restaurante.idRestaurante);
                $mdDialog.show($mdDialog.alert()
                        .title(restaurante.nombreRestaurante)
                        .textContent('Restaurante Seleccionado.')
                        .ok('Aceptar')
                        .targetEvent(ev)
                );
                location.href = "/#/registrarVenta";
            };

            $scope.logout = function () {
                location.href = "/#/login";
            };


            $scope.navBarMenu =[
                {
                    title:  "Gestionar Mi Cuenta",
                    id: 1,
                    items: [
                        {
                            id: 1,
                            text:"Cambiar Password",
                            icon:"lock",
                            link:"/cambiarContrasena"
                        }
                    ]
                },
                {
                    title:  "Gestion De Movimientos",
                    id: 3,
                    items: [
                        {
                            id: 4,
                            text:"Registro De Ventas",
                            icon:"shopping_cart",
                            link:"/registrarVenta"
                        },
                        /*{
                         text:"Registro De Gastos",
                         icon:"save",
                         link:"/gastos"
                         },
                         {
                         text:"Reportes",
                         icon:"save",
                         link:"/save"
                         }*/
                    ]
                },
                {
                    title:  "Gestion De Empleados",
                    id: 4,
                    items: [
                        {
                            id: 6,
                            text: "Registro de Asistencia",
                            icon: "content_paste",
                            link: "/asistencia"
                        },
                        {
                            id: 5,
                            text:"Gestionar Empleados",
                            icon:"people",
                            link:"/gestionUsuarios"
                        },
                        {
                            id: 7,
                            text:"Gestionar Roles",
                            icon:"group_add",
                            link:"/gestionRoles"
                        }
                    ]
                },
                {
                    title:  "Gestion De Productos",
                    id: 2,
                    items: [
                        {
                            id: 2,
                            text:"Gestionar Productos",
                            icon:"restaurant_menu",
                            link:"/gestionProductos"
                        },
                        {
                            id: 3,
                            text:"Gestionar Tipo de Almuerzos",
                            icon:"assignment_late",
                            link:"/gestionTipoAlmuerzos"
                        }
                    ]
                },
                {
                    title:  "Gestion De Restaurantes",
                    id: 5,
                    items: [
                        {
                            id: 8,
                            text:"Gestionar Restaurante",
                            icon:"restaurant",
                            link:"/gestionRestaurante"
                        }
                    ]
                }
            ];

            __init();

            function __init(){
                if(rest._getToken() === undefined){
                    location.href = "/#/login";
                }
                else{
                    if(rest._getIdRol() === 1){
                        __listadoRestaurantessAdmin();
                    }
                }
            }

            function __listadoRestaurantessAdmin(){
                var promiseGet = RestaurantesServices.listadoRestaurantessAdmin();
                promiseGet.then(
                    function (pl) {
                        var respuesta = pl.data;
                        if(respuesta.error === false){
                            $scope.restaurantes = respuesta.datos;
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

        });
})(angular, rest);