/**
 * Created by Esleider A Tafur on 13/06/2016.
 */
(function (angular, undefined) {
    'use strict';

    angular.module('myApp')
        .service('GastoGlobalServices', GastoGlobalServices);

    function GastoGlobalServices(){
        return{
            descripcion:null,
            costo:null
        };
    }

})(angular);