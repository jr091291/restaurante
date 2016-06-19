/**
 * Created by Ricardo on 04/06/2016.
 */

(function(angular, undefined){
    "use strict";

    angular
        .module('myApp')
        .controller('DialogController', DialogController);

    // Fictitious Employee Editor to show how to use simple and complex dialogs.

    function DialogController($scope, $mdDialog) {
        $scope.showDialog = showDialog;
        $scope.cancel = closeDialog;

        function closeDialog() {
            $mdDialog.cancel();
        }

        function showDialog($event, templatePath) {
            $mdDialog.show({
                targetEvent: $event,
                templateUrl: templatePath,
                parent: angular.element(document.body),
                clickOutsideToClose: true
            });
        }
    }

})(angular);
