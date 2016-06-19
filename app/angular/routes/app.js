/**
 * Created by Ricardo on 24/05/2016.
 */
(function (angular,rest, undefined) {
    'use strict';
    var modulo = angular.module('myApp',
        ['ngRoute','ngAria','ngMaterial','ngMessages', 'ngResource']);

    modulo.config(
        function($routeProvider, $locationProvider) {
            $locationProvider.html5Mode({
                enabled: true,
                requireBase: false
            });

            $routeProvider.when('/', {
                redirectTo: "/login"
            }).
            when('/cambiarContrasena', {
                templateUrl: "views/login/partials/cambiarContrasena.html"
            }).
            when('/gestionProductos', {
                templateUrl: "views/productos/productos.html"
            }).
            when('/login', {
                templateUrl: 'views/login/login.html'
            }).
            when('/registrarVenta',{
                templateUrl: 'views/ventas/ventas.html'
            }).
            when('/gestionUsuarios', {
                templateUrl: 'views/usuarios/gestionUsuarios.html'
            }).
            when('/registrarVenta',{
                templateUrl: 'views/ventas/ventas.html'
            }).
            when('/gestionRestaurante', {
                templateUrl: "views/restaurantes/gestionRestaurantes.html"
            }).
            when('/asistencia',{
                templateUrl: 'views/asistencia/asistencia.html'
            }).
            when('/gastos',{
                templateUrl: 'views/gastos/gestionGastos.html'
            }).
            when('/gestionRoles', {
                templateUrl: 'views/roles/gestionRoles.html'
            }).
            when('/gestionTipoAlmuerzos', {
                templateUrl: "views/productos/tipo_almuerzos/gestionTiposAlmuerzos.html"
            }).
            otherwise({
                redirectTo: '/'
            });
        }
    );

})(angular, rest,undefined);