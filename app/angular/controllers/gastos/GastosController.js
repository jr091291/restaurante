/**
 * Created by Esleider A Tafur on 13/06/2016.
 */
(function(angular, rest,undefined){
    'use strict';

    angular
        .module('myApp')
            .controller('GastosController', GastosController);

    function GastosController($scope,GastoServices, GastoGlobalServices,$controller) {
        $controller('DialogOptionsController',{$scope : $scope});

        $scope.URL_FORM_CREATE = 'views/gastos/forms/gastosCrearForm.html';
        $scope.URL_FORM_EDIT = 'views/gastos/forms/gastosEditarForm.html';

        $scope.usuarios = GastoGlobalServices;

        $scope.showCreate = function (ev) {
            $scope.showContent(ev, $scope.URL_FORM_CREATE);
        };

        $scope.showEdit = function (ev, gasto) {
            $scope.showContent(ev, $scope.URL_FORM_EDIT);
            $scope.gastos.gasto.idGasto = gasto.idGasto;
            $scope.gastos.gasto.descripcionGasto = gasto.descripcionGasto;
            $scope.gastos.gasto.costo = gasto.costo;
        };

        var _listadoGasto = function(){
            var promiseGet = GastoServices.listar();
            promiseGet.then(
                function (pl) {
                    var respuesta = pl.data;
                    if(respuesta.error === false){
                        $scope.gastos.lista = respuesta.datos;
                    }
                    else{
                        alert(respuesta.mensaje);
                    }
                }
            );
        };

        _listadoGasto();
    }
})(angular, rest);