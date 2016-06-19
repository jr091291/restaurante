/**
 * Created by Esleider A Tafur on 16/06/2016.
 */

(function (angular, rest, undefined){
    'use strict';
    angular
        .module('myApp')
            .controller('FormTipoAlmuerzoController', FormTipoAlmuerzoController);

    function FormTipoAlmuerzoController($scope, TipoAlmuerzoServices, TipoAlmuerzoGlobalServices, $mdToast)
    {
       $scope.tiposAlmuerzo = TipoAlmuerzoGlobalServices;

       $scope.crearTipoAlmuerzo = function ()
       {
            $scope.tiposAlmuerzo.tipoAlmuerzo.idRestaurante=rest._getIdRestaurante();
            $scope.tiposAlmuerzo.tipoAlmuerzo.idUsuario=rest._getIdUsuario();
            console.log( $scope.tiposAlmuerzo.tipoAlmuerzo);
            var promiseGet = TipoAlmuerzoServices.registrarTipoAlmuerzo($scope.tiposAlmuerzo.tipoAlmuerzo);
            promiseGet.then(
                function (pl) {
                    var respuesta = pl.data;
                    if(respuesta.error === false){
                        $scope.tiposAlmuerzo.lista.push(respuesta.datos);
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

       $scope.limpiarForm = function ()
       {
            $scope.tiposAlmuerzo.tipoAlmuerzo.idTipoAlmuerzo = null;
            $scope.tiposAlmuerzo.tipoAlmuerzo.nombreTipoAlmuerzo = null;
            $scope.tiposAlmuerzo.tipoAlmuerzo.activo = null;
            $scope.tiposAlmuerzo.tipoAlmuerzo.idRestaurante = null;

       };

        // Toast para mostrar respuestas
       $scope.showSimpleToast = function(message) {
            $mdToast.show(
                $mdToast.simple()
                    .textContent(message)
                    .position('top right')
                    .hideDelay(3000)
            );
       };
    }
})(angular, rest);