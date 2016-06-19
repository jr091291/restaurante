/**
 * Created by Adrian on 15/06/2016.
 */
/**
 * Created by Adrian on 01/06/2016.
 */
(function (angular, rest,undefined) {
    'use strict';

    angular.module('myApp').service('AsistenciasServices', AsistenciasServices);

    function AsistenciasServices($http){
        var datos = {};
        datos.idUsuario = rest._getIdUsuario();
        datos.idRestaurante = rest._getIdRestaurante();
        datos.idAsistencia = rest._getIdAsistencia();

        this.CrearFichaDeAsistencia = function () {
            return $http.post(rest._getUrl() + '/CrearAsistencia?token=' + rest._getToken() , datos);
        };

        this.ListadoAsistenciaEmpleados = function () {
            return $http.get(rest._getUrl() + '/ListadoAsistenciaEmpleados/idUsuario/'+ datos.idUsuario +'/idRestaurante/'+ datos.idRestaurante +'/idAsistencia/'+ datos.idAsistencia +'?token=' + rest._getToken());
        };

        this.RegistrarAsistenciaEmpleado = function(listaAsistencia){
            return $http.post(rest._getUrl() + '/CrearAsistenciaEmpleados?token=' + rest._getToken(), listaAsistencia);
        };
    }

})(angular, rest);
