/**
 * Created by Ricardo on 05/06/2016.
 */

(function (angular, rest,undefined) {
    'use strict';

    var app = angular.module('myApp');
    app.service('AlmuerzosServices', AlmuerzosServices);

    function AlmuerzosServices($http)
    {
        this.listadoAlmuerzos = function(){
            return $http.get(rest._getUrl() + '/ListadoAlmuerzos?token=' + rest._getToken());
        };

        this.registrarAlmuerzoSinImagen = function(almuerzo)
        {
            almuerzo.idUsuario = rest._getIdUsuario();
            almuerzo.idRestaurante = rest._getIdRestaurante();
            almuerzo.imagen = null;
            return $http.post(rest._getUrl() + '/CrearAlmuerzo?token=' + rest._getToken(), almuerzo);
        };

        this.registrarAlmuerzoConImagen = function (almuerzo) {
            var formData = new FormData();
            formData.append("acompanamiento", almuerzo.acompanamiento);
            formData.append("precio", almuerzo.precio);
            formData.append("idTipoAlmuerzo", almuerzo.idTipoAlmuerzo);
            formData.append("idRestaurante", rest._getIdRestaurante());
            formData.append("idUsuario", rest._getIdUsuario());
            formData.append("descripcion", almuerzo.descripcion);
            formData.append("imagen", almuerzo.imagen);
           return $http.post(rest._getUrl() + '/CrearAlmuerzo?token=' + rest._getToken(), formData, {
               headers:{
                   'Content-type': undefined
               },
               transformRequest: angular.identity
           });
        };

        this.actualizarAlmuerzo = function (almuerzo)
        {
            var formData = new FormData();
            console.log(almuerzo.imagen);
            formData.append("idAlmuerzo", almuerzo.idAlmuerzo);
            formData.append("acompanamiento", almuerzo.acompanamiento);
            formData.append("precio", almuerzo.precio);
            formData.append("idTipoAlmuerzo", almuerzo.idTipoAlmuerzo);
            formData.append("idRestaurante", rest._getIdRestaurante());
            formData.append("idUsuario", rest._getIdUsuario());
            formData.append("descripcion", almuerzo.descripcion);
            formData.append("imagen", almuerzo.imagen);
            return $http.post(rest._getUrl() + '/ActualizarAlmuerzo?token=' + rest._getToken(), formData, {
                headers:{
                    'Content-type': undefined
                },
                transformRequest: angular.identity
            });
        };

        this.actualizarAlmuerzoSinImagen = function (almuerzo)
        {
            almuerzo.idUsuario = rest._getIdUsuario();
            almuerzo.idRestaurante = rest._getIdRestaurante();
            almuerzo.imagen = null;
            console.log(almuerzo);
            return $http.post(rest._getUrl() + '/ActualizarAlmuerzo?token=' + rest._getToken(), almuerzo);
        };

    }

})(angular, rest);