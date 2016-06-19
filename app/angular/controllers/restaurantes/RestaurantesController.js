/**
 * Created by Ricardo on 14/06/2016.
 */

(function(angular,rest, undefined) {
    "use strict";
    var app = angular.module('myApp');

    app.controller('RestaurantesController', RestaurantesController);

    function RestaurantesController( $scope, $mdDialog, RestaurantesServices, CiudadesServices){
        /*Declaración de objetos*/
        $scope.restauranteUpdate = {};
        $scope.searchRestaurante ='';
        $scope.restaurantes = [];
        $scope.ciudades = [];

        /*Funciones con $scope*/
        $scope.showCreateRestaurante = function(ev){
            $mdDialog.show({
                locals: {
                    ciudades:$scope.ciudades
                },
                controller: ['$scope', 'ciudades', function($scope, ciudades) {
                        $scope.restaurante = {};
                        $scope.ciudades = ciudades;
                        $scope.cancel = function(){
                            $mdDialog.cancel();
                        };
                }],
                templateUrl: "views/restaurantes/form/registrar/restauranteForm.html",
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose:true
            });
        };

        $scope.showEditRestaurante = function(restaurante, ev) {
            $mdDialog.show({
                locals: {
                    restaurante: restaurante,
                    ciudades: $scope.ciudades,
                    restaurantes: $scope.restaurantes
                },
                controller: ['$scope', 'restaurante', 'ciudades', 'restaurantes', 'RestaurantesServices', function($scope, restaurante, ciudades, restaurantes, RestaurantesServices) {
                    $scope.restauranteUpdate = restaurante;
                    $scope.ciudades = ciudades;
                    $scope.restaurantes = restaurantes;
                    $scope.cancel = function(){
                        $mdDialog.cancel();
                    };

                    $scope.actualizarRestaurante = function(){
                        __actualizarRestaurante();
                    };

                    function __actualizarRestaurante(){
                        console.log($scope.restauranteUpdate);
                        var promisePost = RestaurantesServices.ActualizarRestaurante($scope.restauranteUpdate);
                        promisePost.then(
                            function (pl) {
                                var respuesta = pl.data;
                                if(respuesta.error === false){
                                    alert(respuesta.mensaje);
                                    var index = __indexRestaurante(respuesta.datos.idRestaurante);
                                    $scope.restaurantes.splice(index, 1);
                                    $scope.restaurantes.push(respuesta.datos);
                                    $scope.restauranteUpdate = {};
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

                    function __indexRestaurante(idRestaurante){
                        for(var i in $scope.restaurantes){
                            if($scope.restaurantes[i].idRestaurante === idRestaurante){
                                return i;
                            }
                        }
                    }
                }],
                templateUrl: "views/restaurantes/form/edit/restauranteForm.html",
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose:true
            });
        };

        __init();

        function __init(){
            __listadoRestaurantesAdmin();
            __listadoCiudades();
        }

        function __listadoRestaurantesAdmin(){
            var promiseGet = RestaurantesServices.listadoRestaurantessAdmin();
            promiseGet.then(
                function (pl) {
                    var respuesta = pl.data;
                    if(respuesta.error === false){
                        $scope.restaurantes = respuesta.datos;
                        console.log($scope.restaurantes);
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

        function __listadoCiudades(){
            var promiseGet = CiudadesServices.listadoCiudades();
            promiseGet.then(
                function (pl) {
                    var respuesta = pl.data;
                    if(respuesta.error === false){
                        $scope.ciudades = respuesta.datos;
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
