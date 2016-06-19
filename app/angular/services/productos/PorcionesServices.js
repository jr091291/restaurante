/**
 * Created by Adrian on 13/06/2016.
 */

(function (angular, rest, undefined) {
    'use strict';

    var app = angular.module('myApp');
    app.service('PorcionesServices', PorcionesServices);

    function PorcionesServices($http){

        this.ListadoPorciones = function(){
            return $http.get(rest._getUrl() + '/ListadoPorciones?token=' + rest._getToken());
        };

        this.registrarPorcionConImagen = function (porcion) {
            var formData = new FormData();
            formData.append("nombrePorcion", porcion.nombrePorcion);
            formData.append("precio", porcion.precio);
            formData.append("idRestaurante", rest._getIdRestaurante());
            formData.append("idUsuario", rest._getIdUsuario());
            formData.append("descripcion", porcion.descripcion);
            formData.append("imagen", porcion.imagen);
            return $http.post(rest._getUrl() + '/CrearPorcion?token=' + rest._getToken(), formData, {
                headers:{
                    'Content-type': undefined
                },
                transformRequest: angular.identity
            });
        };

        this.registrarPorcionSinImagen = function (porcion) {
            porcion.idUsuario = rest._getIdUsuario();
            porcion.idRestaurante = rest._getIdRestaurante();
            porcion.imagen = null;
            console.log(porcion);
            var req = $http.post(rest._getUrl() + '/CrearPorcion?token=' + rest._getToken(), porcion);
            return req;
        };

        this.actualizarPorcion = function (porcion) {
            var formData = new FormData();
            console.log(porcion.imagen);
            formData.append("idPorcion", porcion.idPorcion);
            formData.append("nombrePorcion", porcion.nombrePorcion);
            formData.append("precio", porcion.precio);
            formData.append("idRestaurante", rest._getIdRestaurante());
            formData.append("idUsuario", rest._getIdUsuario());
            formData.append("descripcion", porcion.descripcion);
            formData.append("imagen", porcion.imagen);
            return $http.post(rest._getUrl() + '/ActualizarPorcion?token=' + rest._getToken(), formData, {
                headers:{
                    'Content-type': undefined
                },
                transformRequest: angular.identity
            });
        };

        this.actualizarPorcionSinImagen = function (porcion) {
            porcion.idUsuario = rest._getIdUsuario();
            porcion.idRestaurante = rest._getIdRestaurante();
            porcion.imagen = null;
            console.log(porcion);
            var req = $http.post(rest._getUrl() + '/ActualizarPorcion?token=' + rest._getToken(), porcion);
            return req;
        };

    }

})(angular, rest);
