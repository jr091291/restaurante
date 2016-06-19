/**
 * Created by Sandra Suarez on 06/06/2016.
 */
(function(angular,rest, undefined){
    "use strict";

    angular
        .module('myApp')
            .controller('VentasController', VentasController);

    function VentasController($scope, $mdDialog,AlmuerzosServices, BebidasServices, DesayunosServices, PorcionesServices, VentasServices) {

        $scope.urlImagen = rest._getUrlImgProductos();
        $scope.filtro = '';
        $scope.productos = {
            "idRestaurante": rest._getIdRestaurante(),
            "cliente": "",
            "idUsuario": rest._getIdUsuario(),
            "productos": [ ]
        };

        $scope.categories = [
            {value:'all'       ,name:'Todos Los Productos'},
            {value:'almuerzos' ,name:'Almuerzos'},
            {value:'bebidas'   ,name:'Bebidas'  },
            {value:'desayunos' ,name:'Desayunos'},
            {value:'porciones' ,name:'Porciones'}
        ];

        $scope.selectedCategory ="all";
        $scope.almuerzos = [];
        $scope.desayunos = [];
        $scope.bebidas = [];
        $scope.porciones = [];
        $scope.producto = {};
        $scope.cantidad = 1;
        $scope.cliente = "";
        $scope.total = 0;

        $scope.registrarVenta = function() {
            var promisePost = VentasServices.registrarVenta($scope.productos);
            promisePost.then(
                function (pl) {
                    var respuesta = pl.data;
                    if(respuesta.error === false){
                        alert(respuesta.mensaje);
                        $scope.productos = {
                            "idRestaurante": rest._getIdRestaurante(),
                            "cliente": "",
                            "idUsuario": rest._getIdUsuario(),
                            "productos": []
                        };
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

        $scope.addAlmuerzos = function (almuerzo) {
            var index = __indexProducto(almuerzo.idAlmuerzo);
            if (index > -1) {
                __RestarTotal($scope.productos.productos[index].total);
                $scope.productos.productos.splice(index, 1);
            }
            else {
                $scope.producto.idProducto = almuerzo.idAlmuerzo;
                $scope.producto.nombreProducto = almuerzo.acompanamiento;
                $scope.producto.precio = almuerzo.precio;
                if(almuerzo.cantidad === undefined){
                    almuerzo.cantidad = 1;
                }
                $scope.producto.cantidad = almuerzo.cantidad;
                $scope.producto.total = parseInt($scope.producto.precio) * parseInt($scope.producto.cantidad);
                $scope.productos.productos.push($scope.producto);
                __SumarTotal();
                $scope.producto = {};
            }
            console.log($scope.productos.productos);
        };

        $scope.addBebidas = function (bebida) {
            var index = __indexProducto(bebida.idBebida);
            if(index > -1){
                __RestarTotal($scope.productos.productos[index].total);
                $scope.productos.productos.splice(index, 1);
            }
            else{
                $scope.producto.idProducto = bebida.idBebida;
                $scope.producto.nombreProducto = bebida.nombreBebida;
                $scope.producto.precio = bebida.precio;
                if(bebida.cantidad === undefined){
                    bebida.cantidad = 1;
                }
                $scope.producto.cantidad = bebida.cantidad;
                $scope.producto.total = $scope.producto.precio * $scope.producto.cantidad;
                $scope.productos.productos.push($scope.producto);
                __SumarTotal();
                $scope.producto = {};
            }
            console.log($scope.productos.productos);
        };

        $scope.addDesayunos = function (desayuno) {
            var index = __indexProducto(desayuno.idDesayuno);
            if(index > -1){
                __RestarTotal($scope.productos.productos[index].total);
                $scope.productos.productos.splice(index, 1);
            }
            else{
                $scope.producto.idProducto = desayuno.idDesayuno;
                $scope.producto.nombreProducto = desayuno.nombreDesayuno;
                $scope.producto.precio = desayuno.precio;
                if(desayuno.cantidad === undefined){
                    desayuno.cantidad = 1;
                }
                $scope.producto.cantidad = desayuno.cantidad;
                $scope.producto.total = $scope.producto.precio * $scope.producto.cantidad;
                $scope.productos.productos.push($scope.producto);
                __SumarTotal();
                $scope.producto = {};
            }
            console.log($scope.productos.productos);
        };

        $scope.addPorciones = function (porcion) {
            var index = __indexProducto(porcion.idPorcion);
            if(index > -1){
                __RestarTotal($scope.productos.productos[index].total);
                $scope.productos.productos.splice(index, 1);
            }
            else{
                $scope.producto.idProducto = porcion.idPorcion;
                $scope.producto.nombreProducto = porcion.nombrePorcion;
                $scope.producto.precio = porcion.precio;
                if(porcion.cantidad === undefined){
                    porcion.cantidad = 1;
                }
                $scope.producto.cantidad = porcion.cantidad;
                $scope.producto.total = $scope.producto.precio * $scope.producto.cantidad;
                $scope.productos.productos.push($scope.producto);
                __SumarTotal();
                $scope.producto = {};
            }
            console.log($scope.productos.productos);
        };

        $scope.calcularTotal = function(){
            __SumarTotal();
        };

        $scope.changeCantidad = function(id, cantidad, precio){
            var index = __indexProducto(id);
            if(index > -1){
                $scope.productos.productos[index].cantidad = cantidad;
                $scope.productos.productos[index].total = parseInt(cantidad) * parseInt(precio);
                console.log($scope.productos.productos);
                __SumarTotal();
            }
        };

        __init();

        function __init(){
            if(rest._getToken() === undefined){
                location.href = "/#/login";
            }
            else{
                if(rest._getIdRestaurante() === undefined && rest._getIdRol() === 1){
                    alert("Debe Seleccionar un Restaurante");
                }
                else{
                    if(rest._getIdRol() === 1 || rest._getIdRol() === 2){
                        __getAlmuerzos();
                        __getBebidas();
                        __getDesayunos();
                        __getPorciones();
                    }
                }
            }
        }

        function __SumarTotal(){
            $scope.total = 0;
            for(var i in $scope.productos.productos){
                $scope.total = parseInt($scope.total) + $scope.productos.productos[i].total;
            }
            console.log($scope.total);
        }

        function __RestarTotal(total){
            $scope.total = parseInt($scope.total) - parseInt(total);
        }

        function __indexProducto(idProducto){
            for(var i in $scope.productos.productos){
                if($scope.productos.productos[i].idProducto === idProducto){
                    return i;
                }
            }
        }

        function __getDesayunos(){
            var promiseGet = DesayunosServices.listadoDesayunos();
            promiseGet.then(
                function (pl) {
                    var respuesta = pl.data;
                    if(respuesta.error === false){
                        $scope.desayunos = respuesta.datos;
                        console.log($scope.desayunos);
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

        function __getBebidas(){
            var promiseGet = BebidasServices.listadoBebidas();
            promiseGet.then(
                function (pl) {
                    var respuesta = pl.data;
                    if(respuesta.error === false){
                        $scope.bebidas = respuesta.datos;
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

        function __getPorciones(){
            var promiseGet = PorcionesServices.ListadoPorciones();
            promiseGet.then(
                function (pl) {
                    var respuesta = pl.data;
                    if(respuesta.error === false){
                        $scope.porciones = respuesta.datos;
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

        function __verificarDatos(){
            for(var i in $scope.productos.productos){
                if($scope.productos.productos[i].cantidad === null){
                    return true;
                }
            }
            return false;
        }

        $scope.showFactura = function(ev) {
            if(__verificarDatos()){
                alert("Verifique que el Campo Cantidad no este vacio");
            }
            else{
                $mdDialog.show({
                    targetEvent: ev,
                    locals:{
                        productos: $scope.productos,
                        total: $scope.total,
                        bebidas: $scope.bebidas,
                        almuerzos: $scope.almuerzos,
                        porciones: $scope.porciones,
                        desayunos: $scope.desayunos
                    },
                    controller: function($scope, productos, total, desayunos, almuerzos, porciones, bebidas){
                        $scope.productos = productos;
                        $scope.efectivo = "";
                        $scope.cambio = "";
                        $scope.iva = 0;
                        $scope.subtotal = angular.copy(total);
                        $scope.total = total + (total * $scope.iva);
                        $scope.almuerzos = almuerzos;
                        $scope.bebidas = bebidas;
                        $scope.porciones = porciones;
                        $scope.desayunos = desayunos;

                        $scope.changeEfectivo = function(){
                            $scope.cambio = parseInt($scope.efectivo) - parseInt($scope.total);
                        };

                        function __desCheck(){
                            for(var i in $scope.almuerzos){
                                $scope.almuerzos[i].active = false;
                                $scope.almuerzos[i].cantidad = "";
                            }
                            for(var j in $scope.porciones){
                                $scope.porciones[j].active = false;
                                $scope.porciones[j].cantidad = "";
                            }
                            for(var k in $scope.desayunos){
                                $scope.desayunos[k].active = false;
                                $scope.desayunos[k].cantidad = "";
                            }
                            for(var l in $scope.bebidas){
                                $scope.bebidas[l].active = false;
                                $scope.bebidas[l].cantidad = "";
                            }
                        }

                        $scope.cancel = function(){
                            $mdDialog.cancel();
                        };

                        $scope.registrarVenta = function() {
                            if($scope.cambio < 0){
                                alert("Error, ingrese un efectivo mayor o igual al total");
                            }
                            else{
                                var promisePost = VentasServices.registrarVenta($scope.productos);
                                promisePost.then(
                                    function (pl) {
                                        var respuesta = pl.data;
                                        if(respuesta.error === false){
                                            alert(respuesta.mensaje);
                                            $scope.productos = {
                                                "idRestaurante": rest._getIdRestaurante(),
                                                "cliente": "",
                                                "idUsuario": rest._getIdUsuario(),
                                                "productos": []
                                            };
                                            $scope.total = "";
                                            $scope.subtotal = "";
                                            $scope.cambio = "";
                                            $scope.efectivo = "";
                                            __desCheck();
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
                        };
                    },
                    templateUrl: "views/ventas/factura.html",
                    parent: angular.element(document.body),
                    clickOutsideToClose: true
                });
            }
        };
    }



})(angular, rest);