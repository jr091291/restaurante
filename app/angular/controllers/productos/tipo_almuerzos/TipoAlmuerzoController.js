/**
 * Created by Esleider A Tafur on 16/06/2016.
 */
(function (angular,rest, undefined){
    'use strict';

    angular
        .module('myApp')
            .controller('TipoAlmuerzoController', TipoAlmuerzoController);

    function TipoAlmuerzoController($scope, TipoAlmuerzoServices, TipoAlmuerzoGlobalServices, $controller)
    {
        $controller('DialogOptionsController',{$scope : $scope});

        $scope.URL_FORM_CREATE = 'views/productos/tipo_almuerzos/forms/tipoAlmuerzoCrearForm.html';
        $scope.URL_FORM_EDIT = 'views/productos/tipo_almuerzos/forms/tipoAlmuerzoEditarForm.html';

        $scope.tiposAlmuerzo =TipoAlmuerzoGlobalServices;

        $scope.showCreate = function (ev) {
            $scope.showContent(ev, $scope.URL_FORM_CREATE);
        };

        $scope.showEdit = function (ev, tipoAlmuerzo) {
            $scope.showContent(ev, $scope.URL_FORM_EDIT);
            $scope.tiposAlmuerzo.tipoAlmuerzo.idTipoAlmuerzo = tipoAlmuerzo.idTipoAlmuerzo;
            $scope.tiposAlmuerzo.tipoAlmuerzo.nombreTipoAlmuerzo = tipoAlmuerzo.nombreTipoAlmuerzo;
            $scope.tiposAlmuerzo.tipoAlmuerzo.activo = tipoAlmuerzo.activo;
            $scope.tiposAlmuerzo.tipoAlmuerzo.idRestaurante = tipoAlmuerzo.idRestaurante;
        };

        function __listadoTipoAlmuerzos(){
            var promiseGet = TipoAlmuerzoServices.listadoTipoAlmuerzo();
            promiseGet.then(
                function (pl) {
                    var respuesta = pl.data;
                    if(respuesta.error === false){
                        $scope.tiposAlmuerzo.lista = respuesta.datos;
                    }
                    else{
                        alert(respuesta.mensaje);
                    }
                }
            );
        }

        __listadoTipoAlmuerzos();
    }
})(angular, rest);
