/**
 * Created by Esleider A Tafur on 16/06/2016.
 */
(function(angular, rest, undefined){

    'use strict';

    angular
        .module('myApp')
            .controller('FormGastoController', FormGastoController);

    function FormGastoController($scope, GastoServices, GastoGlobalServices, $mdToast) {

        $scope.gastos = GastoGlobalServices;

        $scope.crearGasto = function ()
        {
            $scope.gastos.gasto.idUsuario = rest._getIdUsuario();
            $scope.gastos.gasto.idRestaurante = rest._getIdRestaurante();
            var promiseGet = GastoServices.crear($scope.gastos.gasto);
            promiseGet.then(
                function (pl) {
                    var respuesta = pl.data;
                    if(respuesta.error === false){
                        console.log(respuesta.datos);
                        $scope.gastos.lista.push(respuesta.datos);
                        console.log($scope.gastos.lista);
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

        $scope.editarGasto = function ()
        {
            var promiseGet = GastoServices.editar($scope.gastos.gasto);
            promiseGet.then(
                function (pl) {
                    var respuesta = pl.data;
                    if(respuesta.error === false){
                        $scope.showSimpleToast(respuesta.mensaje);
                        console.log(respuesta.datos);
                        __actualizarLista(respuesta.datos.idGasto, respuesta.datos);
                        $scope.limpiarForm();
                    }
                    else{
                        $scope.showSimpleToast(respuesta.mensaje);
                        $scope.limpiarForm();
                    }
                }
            );

        };

        $scope.limpiarForm = function()
        {
            $scope.gastos.gasto.idGasto=null;
            $scope.gastos.gasto.descripcionGasto=null;
            $scope.gastos.gasto.costo=null;
            $scope.gastos.gasto.idUsuario=null;
            $scope.gastos.gasto.idRestaurante=null;

        };

        function __actualizarLista(id, Datos)
        {
            var gastos = $scope.gastos.lista;
            for (var i = 0; i < gastos.length; i++) {
                if (gastos[i].idGastos === id) {
                    gastos[i] = Datos;
                    break;
                }
            }
        }

        $scope.showSimpleToast = function(message)
        {
            $mdToast.show(
                $mdToast.simple()
                    .textContent(message)
                    .position('top right')
                    .hideDelay(3000)
            );
        };
    }
})(angular, rest);