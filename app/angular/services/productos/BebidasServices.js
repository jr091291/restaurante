/**
 * Created by Adrian on 01/06/2016.
 */
(function (angular, rest, undefined) {
    'use strict';

    var app = angular.module('myApp');
    app.service('BebidasServices', BebidasServices);

    function BebidasServices($http){
        this.listadoBebidas = function(){
            var req = $http.get(rest._getUrl() + '/ListadoBebidas?token=' + rest._getToken());
            return req;
        };

        this.registrarBebidaConImagen = function (bebida) {
            var formData = new FormData();
            formData.append("nombreBebida", bebida.nombreBebida);
            formData.append("precio", bebida.precio);
            formData.append("idRestaurante", rest._getIdRestaurante());
            formData.append("idUsuario", rest._getIdUsuario());
            formData.append("descripcion", bebida.descripcion);
            formData.append("tamano", bebida.tamano);
            formData.append("imagen", bebida.imagen);
            return $http.post(rest._getUrl() + '/CrearBebida?token=' + rest._getToken(), formData, {
                headers:{
                    'Content-type': undefined
                },
                transformRequest: angular.identity
            });
        };

        this.registrarBebidaSinImagen = function (bebida) {
            bebida.idUsuario = rest._getIdUsuario();
            bebida.idRestaurante = rest._getIdRestaurante();
            bebida.imagen = null;
            var req = $http.post(rest._getUrl() + '/CrearBebida?token=' + rest._getToken(), bebida);
            return req;
        };

        this.actualizarBebida = function (bebida) {
            var formData = new FormData();
            formData.append("idBebida", bebida.idBebida);
            formData.append("nombreBebida", bebida.nombreBebida);
            formData.append("precio", bebida.precio);
            formData.append("idRestaurante", rest._getIdRestaurante());
            formData.append("idUsuario", rest._getIdUsuario());
            formData.append("descripcion", bebida.descripcion);
            formData.append("tamano", bebida.tamano);
            formData.append("imagen", bebida.imagen);
            return $http.post(rest._getUrl() + '/ActualizarBebida?token=' + rest._getToken(), formData, {
                headers:{
                    'Content-type': undefined
                },
                transformRequest: angular.identity
            });
        };

        this.actualizarBebidaSinImagen = function (bebida) {
            bebida.idUsuario = rest._getIdUsuario();
            bebida.idRestaurante = rest._getIdRestaurante();
            bebida.imagen = null;
            console.log(bebida);
            var req = $http.post(rest._getUrl() + '/ActualizarBebida?token=' + rest._getToken(), bebida);
            return req;
        };
    }

})(angular,rest);