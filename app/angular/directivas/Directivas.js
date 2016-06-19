/**
 * Created by Adrian on 13/06/2016.
 */

(function (angular, undefined) {
    'use strict';

    var app = angular.module('myApp');

    app.directive('fileModel', fileModel);
    app.directive('focusMe', focusMe);

    function fileModel($parse){
        return{
            restrict: 'A',
            link: function(scope, element, attrs){
                var model = $parse(attrs.fileModel);
                var modelSetter = model.assign;

                element.bind("change", function () {
                    scope.$apply(function () {
                        modelSetter(scope, element[0].files[0]);
                    });
                });
            }
        };
    }

    function focusMe() {
        return {
            link: function(scope, element, attrs) {
                scope.$watch(attrs.focusMe, function(value) {
                    if(value === true) {
                        element[0].focus();
                        element[0].select();
                    }
                });
            }
        };
    }
})(angular);
