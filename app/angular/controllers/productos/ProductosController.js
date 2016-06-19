/**
 * Created by Adrian on 12/06/2016.
 */

/**
 * Created by Adrian on 12/06/2016.
 */

(function(angular, rest, undefined) {
    "use strict";
    var app = angular.module('myApp');

    app.controller('ProductosController', ProductosController);

    function ProductosController($scope, $mdDialog, AlmuerzosServices, BebidasServices, DesayunosServices, TipoAlmuerzoServices, PorcionesServices){
        /*Declaración de array de objetos*/
        $scope.almuerzos = [];
        $scope.desayunos = [];
        $scope.bebidas = [];
        $scope.porciones = [];
        $scope.tipos = [];

        /*Declaración de variables*/
        $scope.errorAlmuerzos = false;
        $scope.errorDesayunos = false;
        $scope.errorBebidas = false;
        $scope.errorPorciones = false;
        $scope.filtro = "";
        $scope.urlImagen = rest._getUrlImgProductos();

        /*Function que se ejecuta al cargar el Controller*/
        __init();

        var editAlmuerzoController = function($scope,almuerzo, tipos ,AlmuerzosServices){
            $scope.almuerzo = almuerzo;
            $scope.tipos = tipos;

            $scope.editarAlmuerzo = function(almuerzo) {
                __actualizarAlmuerzo(almuerzo);
            };

            $scope.cancel = function(){
                $mdDialog.cancel();
            };

            function __actualizarAlmuerzo(){
                var promisePost;
                alert($scope.almuerzo.idTipoAlmuerzo);
                if($scope.almuerzo.imagenUpdate === undefined){
                    promisePost = AlmuerzosServices.actualizarAlmuerzoSinImagen($scope.almuerzo);
                }
                else{
                    $scope.almuerzo.imagen = $scope.almuerzo.imagenUpdate;
                    promisePost = AlmuerzosServices.actualizarAlmuerzo($scope.almuerzo);
                }
                promisePost.then(
                    function (pl) {
                        var respuesta = pl.data;
                        if(respuesta.error === false){
                            alert(respuesta.mensaje);
                            $scope.almuerzos.splice($scope.index, 1);
                            $scope.almuerzos.push(respuesta.datos);
                            $scope.almuerzo = {};
                        }
                        else{
                            alert(respuesta.mensaje);
                        }
                    },
                    function(errorPl){
                        console.log(JSON.stringify(errorPl));
                    }
                );
            }
        };

        var editBebidaController = function($scope, bebida, BebidasServices){
            $scope.bebidaUpdate = bebida;

            $scope.editarBebida = function() {
                __actualizarBebida();
            };

            $scope.cancel = function(){
                $mdDialog.cancel();
            };

            function __actualizarBebida(){
                var promisePost;
                if($scope.bebidaUpdate.imagenUpdate === undefined){
                    promisePost = BebidasServices.actualizarBebidaSinImagen($scope.bebidaUpdate);
                    console.log("Entro aqui");
                }
                else{
                    $scope.bebidaUpdate.imagen = $scope.bebidaUpdate.imagenUpdate;
                    promisePost = BebidasServices.actualizarBebida($scope.bebidaUpdate);
                }
                promisePost.then(
                    function (pl) {
                        var respuesta = pl.data;
                        if(respuesta.error === false){
                            alert(respuesta.mensaje);
                            $scope.bebidas.splice($scope.index, 1);
                            $scope.bebidas.push(respuesta.datos);
                            console.log(respuesta);
                        }
                        else{
                            alert(respuesta.mensaje);
                        }
                    },
                    function(errorPl){
                        console.log(JSON.stringify(errorPl));
                    }
                );
            }
        };

        var editDesayunoController = function($scope, desayuno, DesayunosServices){
            $scope.desayunoUpdate = desayuno;

            $scope.editarDesayuno = function() {
                __actualizarDesayuno();
            };

            $scope.cancel = function(){
                $mdDialog.cancel();
            };

            function __actualizarDesayuno(){
                var promisePost;
                if($scope.desayunoUpdate.imagenUpdate === undefined){
                    promisePost = DesayunosServices.actualizarDesayunoSinImagen($scope.desayunoUpdate);
                }
                else{
                    $scope.desayunoUpdate.imagen = $scope.desayunoUpdate.imagenUpdate;
                    promisePost = DesayunosServices.actualizarDesayuno($scope.desayunoUpdate);
                }
                promisePost.then(
                    function (pl) {
                        var respuesta = pl.data;
                        if(respuesta.error === false){
                            alert(respuesta.mensaje);
                            $scope.desayunos.splice($scope.index, 1);
                            $scope.desayunos.push(respuesta.datos);
                            console.log(respuesta);
                        }
                        else{
                            alert(respuesta.mensaje);
                        }
                    },
                    function(errorPl){
                        console.log(JSON.stringify(errorPl));
                    }
                );
            }

        };

        var editPorcionController = function($scope, porcion, PorcionesServices){
            $scope.porcionUpdate = porcion;

            $scope.editarPorcion = function() {
                __actualizarPorcion();
            };

            $scope.cancel = function(){
                $mdDialog.cancel();
            };
            function __actualizarPorcion() {
                var promisePost;
                if($scope.porcionUpdate.imagenUpdate === undefined){
                    promisePost = PorcionesServices.actualizarPorcionSinImagen($scope.porcionUpdate);
                }
                else{
                    $scope.porcionUpdate.imagen = $scope.porcionUpdate.imagenUpdate;
                    promisePost = PorcionesServices.actualizarPorcion($scope.porcionUpdate);
                }
                promisePost.then(
                    function (pl) {
                        var respuesta = pl.data;
                        if(respuesta.error === false){
                            alert(respuesta.mensaje);
                            $scope.porciones.splice($scope.index, 1);
                            $scope.porciones.push(respuesta.datos);
                            console.log(respuesta);
                        }
                        else{
                            alert(respuesta.mensaje);
                            $scope.errorPorcion = respuesta.error;
                        }
                    },
                    function(errorPl){
                        console.log(JSON.stringify(errorPl));
                    }
                );
            }
        };

        var registarProductController = function($scope,tipos, AlmuerzosServices, BebidasServices, DesayunosServices){
            $scope.almuerzo = {};
            $scope.bebida = {};
            $scope.desayuno = {};
            $scope.porcion = {};
            $scope.tipos = tipos;

            $scope.registarAlmuerzo = function() {
                __registrarAlmuerzo();
            };

            $scope.registarBebida = function() {
                __registrarBebida();
            };

            $scope.registarDesayuno = function() {
                __registrarDesayuno();
            };

            $scope.ChangeTipo = function (almuerzo, nombreTipoAlmuerzo) {
                almuerzo.nombreTipoAlmurzo = nombreTipoAlmuerzo;
            };

            $scope.cancel = function(){
                $mdDialog.cancel();
            };

            function __registrarAlmuerzo(){
                var promisePost = AlmuerzosServices.registrarAlmuerzo($scope.almuerzo);
                promisePost.then(
                    function (pl) {
                        var respuesta = pl.data;
                        console.log(respuesta);
                    },
                    function(errorPl){
                        console.log(JSON.stringify(errorPl));
                    }
                );
            }

            function __registrarBebida(){
                var promisePost = BebidasServices.registrarBebida($scope.bebida);
                promisePost.then(
                    function (pl) {
                        var respuesta = pl.data;
                        console.log(respuesta);
                    },
                    function(errorPl){
                        console.log(JSON.stringify(errorPl));
                    }
                );
            }

            function __registrarDesayuno(){
                var promisePost = DesayunosServices.registrarDesayuno($scope.desayuno);
                promisePost.then(
                    function (pl) {
                        var respuesta = pl.data;
                        console.log(respuesta);
                    },
                    function(errorPl){
                        console.log(JSON.stringify(errorPl));
                    }
                );
            }
        };

        /*Funciones con $scope*/
        $scope.showCreateProduct = function($event){
            __showDialog(registarProductController, "views/productos/createProduct.html", $event,
                {
                    tipos: $scope.tipos,
                    AlmuerzosServices: AlmuerzosServices,
                    BebidasServices: BebidasServices,
                    DesayunosServices: DesayunosServices,
                    TipoAlmuerzoServices: TipoAlmuerzoServices,
                    PorcionesServices:PorcionesServices
                });
        };

        /*
         * gestion modales productos
         */
        $scope.showEditAlmuerzo = function(almuerzo, $event) {
            __showDialog(editAlmuerzoController, "views/productos/form/edit/almuerzosForm.html", $event,
                {
                    almuerzo: almuerzo,
                    tipos: $scope.tipos,
                    AlmuerzosServices: AlmuerzosServices
                }
            );

        };

        $scope.showEditBebida = function(bebida, $event) {
            __showDialog(editBebidaController, "views/productos/form/edit/bebidasForm.html",$event,
                {
                    bebida: bebida,
                    BebidasService: BebidasServices
                }
            );
        };

        $scope.showEditDesayuno = function(desayuno, $event) {
            __showDialog(editDesayunoController, "views/productos/form/edit/desayunosForm.html", $event,
                {
                    desayuno:desayuno,
                    DesayunosServices:DesayunosServices
                }
            );
        };

        $scope.showEditPorciones = function(porcion, $event) {
            __showDialog(editPorcionController,"views/productos/form/edit/porcionesForm.html", $event,
                {
                    porcion:porcion,
                    PorcionesServices:PorcionesServices
                }
            );
        };


        /*Las funciones que no hagan el uso de $scope que empiecen por __*/
        function __init(){
            __getAlmuerzos();
            __getBebidas();
            __getDesayunos();
            __getPorciones();
            __tipos();
        }

        function __showDialog(controller, templateUrl, $event, locals){
            $mdDialog.show({
                locals: locals,
                controller:controller,
                targetEvent: $event,
                templateUrl: templateUrl,
                parent: angular.element(document.body),
                clickOutsideToClose: true
            });
        }

        function __tipos(){
            var promiseGet = TipoAlmuerzoServices.listadoTipoAlmuerzo();
            promiseGet.then(
                function (pl) {
                    var respuesta = pl.data;
                    if(respuesta.error === false){
                        $scope.tipos = respuesta.datos;
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

        function __getAlmuerzos(){
            var promiseGet = AlmuerzosServices.listadoAlmuerzos();
            promiseGet.then(
                function (pl) {
                    var respuesta = pl.data;
                    if(respuesta.error === false){
                        $scope.almuerzos = respuesta.datos;
                        console.log(respuesta.datos);
                    }
                    else{
                        alert(respuesta.mensaje);
                        $scope.errorAlmuerzos = respuesta.error;
                    }
                },
                function (errorPl) {
                    console.log(JSON.stringify(errorPl));
                }
            );
        }

        function __getDesayunos(){
            var promiseGet = DesayunosServices.listadoDesayunos();
            promiseGet.then(
                function (pl) {
                    var respuesta = pl.data;
                    if(respuesta.error === false){
                        $scope.desayunos = respuesta.datos;
                        console.log(respuesta.datos);
                    }
                    else{
                        alert(respuesta.mensaje);
                        $scope.errorDesayunos = respuesta.error;
                    }
                },
                function (errorPl) {
                    console.log(JSON.stringify(errorPl));
                }
            );
        }

        function __getBebidas(){
            var promiseGet = BebidasServices.listadoBebidas();
            promiseGet.then(
                function (pl) {
                    var respuesta = pl.data;
                    if(respuesta.error === false){
                        $scope.bebidas = respuesta.datos;
                        console.log(respuesta.datos);
                    }
                    else{
                        alert(respuesta.mensaje);
                        $scope.errorBebidas = respuesta.error;
                    }
                },
                function (errorPl) {
                    console.log(JSON.stringify(errorPl));
                }
            );
        }

        function __getPorciones(){
            var promiseGet = PorcionesServices.ListadoPorciones();
            promiseGet.then(
                function (pl) {
                    var respuesta = pl.data;
                    if(respuesta.error === false){
                        $scope.porciones = respuesta.datos;
                        console.log(respuesta.datos);
                    }
                    else{
                        alert(respuesta.mensaje);
                        $scope.errorPorciones = respuesta.error;
                    }
                },
                function (errorPl) {
                    console.log(JSON.stringify(errorPl));
                }
            );
        }
    }


})(angular, rest);
