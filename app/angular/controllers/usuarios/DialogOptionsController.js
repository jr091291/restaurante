/*
 * Created by Esleider A Tafur on 8/06/2016.
 */
(function(angular, undefined){
    'use strict';

    angular
        .module('myApp')
            .controller('DialogOptionsController', DialogOptionsController);

    function DialogOptionsController($scope, $mdDialog, $mdMedia)
    {
        $scope.customFullscreen = $mdMedia('xs') || $mdMedia('sm');

        $scope.showConfirm = function(ev) {
            var confirm = $mdDialog.confirm()
                .title('Será dado de baja este usuario')
                .textContent('El usuario no podrá acceder al sistema despues. ¿Seguro de realizar la acción?')
                .ariaLabel('Lucky day')
                .targetEvent(ev)
                .ok('Seguro')
                .cancel('Retractarme');

            $mdDialog.show(confirm);
        };

        //cuadro de dialogo con componentes personalizados
        $scope.showContent = function(ev,pathContent) {
            var useFullScreen = ($mdMedia('gt-lg') || $mdMedia('xl'))  && $scope.customFullscreen;

            $mdDialog.show({
                controller: DialogController,
                templateUrl:pathContent,
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose:false,
                fullscreen: useFullScreen
            });
        };

    }

    function DialogController($scope, $mdDialog) {
        $scope.hide = function() {
            $mdDialog.hide();
        };
        $scope.cancel = function(action) {
            $mdDialog.cancel(action);
        };
        $scope.answer = function(answer) {
            $mdDialog.hide(answer);
        };
    }
})(angular);