/**
 * Created by Ricardo on 05/06/2016.
 */

(function (angular,rest, undefined) {
    'use strict';

    var app = angular.module('myApp');
    app.service('DesayunosServices', DesayunosServices);

    function DesayunosServices($http){
        this.listadoDesayunos = function(){
            return $http.get(rest._getUrl() + '/ListadoDesayunos?token=' + rest._getToken());
        };

        this.registrarDesayunoConImagen = function (desayuno) {
            var formData = new FormData();
            formData.append("nombreDesayuno", desayuno.nombreDesayuno);
            formData.append("precio", desayuno.precio);
            formData.append("idRestaurante", rest._getIdRestaurante());
            formData.append("idUsuario", rest._getIdUsuario());
            formData.append("descripcion", desayuno.descripcion);
            formData.append("imagen", desayuno.imagen);
            return $http.post(rest._getUrl() + '/CrearDesayuno?token=' + rest._getToken(), formData, {
                headers:{
                    'Content-type': undefined
                },
                transformRequest: angular.identity
            });
        };

        this.registrarDesayunoSinImagen = function (desayuno) {
            desayuno.idUsuario = rest._getIdUsuario();
            desayuno.idRestaurante = rest._getIdRestaurante();
            desayuno.imagen = null;
            var req = $http.post(rest._getUrl() + '/CrearDesayuno?token=' + rest._getToken(), desayuno);
            return req;
        };

        this.actualizarDesayuno = function (desayuno) {
            var formData = new FormData();
            console.log(desayuno.imagen);
            formData.append("idDesayuno", desayuno.idDesayuno);
            formData.append("nombreDesayuno", desayuno.nombreDesayuno);
            formData.append("precio", desayuno.precio);
            formData.append("idRestaurante", rest._getIdRestaurante());
            formData.append("idUsuario", rest._getIdUsuario());
            formData.append("descripcion", desayuno.descripcion);
            formData.append("imagen", desayuno.imagen);
            return $http.post(rest._getUrl() + '/ActualizarDesayuno?token=' + rest._getToken(), formData, {
                headers:{
                    'Content-type': undefined
                },
                transformRequest: angular.identity
            });
        };

        this.actualizarDesayunoSinImagen = function (desayuno) {
            desayuno.idUsuario = rest._getIdUsuario();
            desayuno.idRestaurante = rest._getIdRestaurante();
            desayuno.imagen = null;
            return $http.post(rest._getUrl() + '/ActualizarDesayuno?token=' + rest._getToken(), desayuno);
        };
    }

})(angular,rest);