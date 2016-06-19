/**
 * Created by Esleider A Tafur on 7/06/2016.
 */
var rest = function(){
    "use strict";
     return {
        _setEmail: function(email){
            localStorage.setItem("email", email)
        },
        _getEmail: function(){
            return localStorage.getItem("email");
        },
        _setIdUsuario: function (idUsuario) {
            localStorage.setItem('idUsuario', idUsuario);
        },
        _getIdUsuario: function () {
            return localStorage.idUsuario;
        },
        _setToken: function (token) {
            localStorage.setItem('token', token);
        },
        _getToken: function () {
            return localStorage.token;
        },
        _setNombreCompleto: function (nombre_completo) {
            localStorage.setItem('nombre_completo',nombre_completo);
        },
        _getNombreCompleto: function () {
            return localStorage.nombre_completo;
        },
        _getUrl: function() {
            return "http://www.parkingcontrolapp.co/Restaurante_master/public/api";
        },
        _setIdRestaurante: function(idRestaurante){
            localStorage.setItem('idRestaurante', idRestaurante);
        },
        _getIdRestaurante: function () {
            return localStorage.idRestaurante;
        },
        _getUrlImgProductos: function(){
            return "http://www.parkingcontrolapp.co/Restaurante_master/public/productos/";
        },
        _setIdAsistencia: function (idAsistencia) {
            localStorage.idAsistencia = idAsistencia;
        },
        _getIdAsistencia: function () {
            return localStorage.idAsistencia;
        },
        _setIdRol: function(idRol){
            localStorage.idRol = idRol;
        },
        _getIdRol: function(){
            return parseInt(localStorage.idRol);
        }
    };
}();
