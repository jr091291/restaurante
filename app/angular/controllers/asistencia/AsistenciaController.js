/**
 * Created by Sandra Suarez on 06/06/2016.
 */
(function(angular, rest, undefined){
    "use strict";

    angular
        .module('myApp')
            .controller('AsistenciaController', AsisteciaController);

    function AsisteciaController($scope, AsistenciasServices)
    {
        $scope.addAllEmpleados = function () {
            $scope.listaAsistencia = {
                "idUsuario": rest._getIdUsuario(),
                "idAsistencia": rest._getIdAsistencia(),
                "empleados": []
            };
            for(var i in $scope.empleados){
                    if($scope.selectAll === true){
                        $scope.empleado = {};
                        $scope.empleado.idUsuario = $scope.empleados[i].idUsuario;
                        $scope.empleado.pago = $scope.empleados[i].pago;
                        $scope.listaAsistencia.empleados.push($scope.empleado);
                    }
                    $scope.empleados[i].active = $scope.selectAll;
            }
        };

        $scope.addEmpleado = function (empleado) {
            var index = __getEmpleado(empleado.idUsuario);
            if(index > -1){
                if($scope.listaAsistencia.empleados.length === $scope.empleados.length){
                    $scope.selectAll = false;
                }
                $scope.listaAsistencia.empleados.splice(index, 1);
            }
            else{
                $scope.empleado = {};
                $scope.empleado.idUsuario = empleado.idUsuario;
                $scope.empleado.pago = empleado.pago;
                $scope.listaAsistencia.empleados.push($scope.empleado);
            }
            console.log($scope.listaAsistencia);
        };

        $scope.registrarAsistencia = function()
        {
            __registrarAsistencia(function(){
                __ListadoAsistenciaEmpleados();
            });
        };

        $scope.updatePago = function (empleado)
        {
            var index = __getEmpleado(empleado.idUsuario);
            if(index > -1){
                $scope.listaAsistencia.empleados[index].pago = empleado.pago;
            }
            console.log($scope.listaAsistencia.empleados[index].pago);
        };

        __init();

        function __init()
        {
            __CrearFichaDeAsistencia();
            __inicializarVariables();
        }

        function __inicializarVariables()
        {
            $scope.empleados = [];
            $scope.listaAsistencia = {
                "idUsuario": rest._getIdUsuario(),
                "idAsistencia": rest._getIdAsistencia(),
                "empleados": []
            };
            $scope.selectAll = false;
            $scope.searchEmpleado = '';
        }

        function __CrearFichaDeAsistencia()
        {
            if(rest._getIdAsistencia() === undefined || rest._getIdAsistencia() === null){
                var promisePost = AsistenciasServices.CrearFichaDeAsistencia();
                promisePost.then(
                    function (pl) {
                        var respuesta = pl.data;
                        if(respuesta.error === false){
                            alert(respuesta.mensaje);
                            rest._setIdAsistencia(respuesta.datos.idAsistencia);
                            __ListadoAsistenciaEmpleados();
                        }
                        else{
                            alert(respuesta.mensaje);
                        }
                    },
                    function (errorPl) {
                        console.log(JSON.stringify(errorPl));
                    }
                );
            }
            else{
                __ListadoAsistenciaEmpleados();
            }
        }

        function __ListadoAsistenciaEmpleados()
        {
            var promiseGet = AsistenciasServices.ListadoAsistenciaEmpleados();
            promiseGet.then(
                function (pl) {
                    var respuesta = pl.data;
                    if(respuesta.error === false){
                        $scope.empleados = [];
                        $scope.empleados = respuesta.datos;
                        __inhabilitarInput();
                        $scope.listaAsistencia = {
                            "idUsuario": rest._getIdUsuario(),
                            "idAsistencia": rest._getIdAsistencia(),
                            "empleados": []
                        };
                    }
                    else{
                        alert(respuesta.mensaje);
                    }
                },
                function (errorPl) {
                    console.log(JSON.stringify(errorPl));
                }
            );
        }

        function __inhabilitarInput(){
            for(var i in $scope.empleados){
                if ($scope.empleados.hasOwnProperty(i)) {
                    $scope.empleados[i].active = false;
                }
            }
        }

        function __getEmpleado(idUsuario)
        {
            for(var i in $scope.listaAsistencia.empleados){
                if ($scope.listaAsistencia.empleados.hasOwnProperty(i)) {
                    if ($scope.listaAsistencia.empleados[i].idUsuario === idUsuario) {
                        return i;
                    }
                }
            }
        }

        function __registrarAsistencia(callback)
        {
            var promisePost = AsistenciasServices.RegistrarAsistenciaEmpleado($scope.listaAsistencia);
            promisePost.then(
                function (pl) {
                    var respuesta = pl.data;
                    if(respuesta.error === false){
                        alert(respuesta.mensaje);
                        if(typeof callback ===  'function') {
                            callback();
                        }
                    }
                    else{
                        alert(respuesta.mensaje);
                    }
                },
                function (errorPl) {
                    console.log(JSON.stringify(errorPl));
                }
            );
        }
    }
})(angular, rest);
