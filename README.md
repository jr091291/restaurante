# AngularJS Generator Basic Proyect (BETA)

Esta es una plantilla básica para el desarrollo de una aplicación angular, donde puedes automatizar tareas, utilizar angular material, jquery, sass, y jade, para agilizar el desarrollo de aplicaciones web para el cliente, desarrollada por José Ricardo Pedraza, estudiante de ingeniería de sistemas de la universidad popular del cesar.

Ustede puede:
  - crear archivos .jade que compilan automaticamente
  - cerar arrchivos .sass que compilan automaticamente
  - congigurar las rutas de los directorios para tareas automatizadas

###COMPONENTES DEL PROYECTO

	1. SASS              -V^x.x.x	compilador CSS
	2. JADE              -V^1.1.0	compilador de plantillas HTML
	3. ANGULARJS         -V^1.5.5	framework MVC para el front-end 
	4. ANGULAR-MATERIAL  -V^1.0.9 	framework CSS MATERIAL DESING
	5. JQUERY 			 -V^2.2.4 	libreria para manejo del DOM
	6. GULP              -V^3.9.1 	automatizador de tareas

### Version
0.0.5
  
### Estructura de directorios
  /angular-generator              DIRECORIO RAIZ DEL PROYECTO	
	   /app                         DIRECTORIO BASE PARA EL DESARROLLO 
	       /angular                 DIRECTORIO PARA ANGULAR		
	           /controllers		    DIRECORIO PARA LOS CONTROLADORES
	           /models 	   		    DIRECORIO PARA LOS MODELOS
	           /modules			    DIRECORIO PARA MODULOS DE ANGULAR
	           /routes 			    DIRECORIO PARA LAS ANGULAR ROUTES
	           /service 			DIRECORIO PARA LOS SERVICES
	       /lib				        DIRECORIO DEPENDENCIAS BOWER (AUTOGENERADO)
	       /public					DIRECORIO PARA ARCHIVOS PUBLICOS
	           /images				DIR IMAGENES
			   /javascript			DIR ARCHIVOS  .JS
			   /stylesheet			DIR ARCHIVOS [.CSS || .SASS ]
		  /views					DIRECORIO PARA LAS VISTAS [.JADE || HTML]
			    /layout             DIRECTORIO PARA LAYOUTS
    	        home.jade           ARCHIVO PAGINA DE INICIO
     /dist                          DIRECTORIO DE DESPLIEGUE (AUTOGENERADO VER DOC)
        /public                     DIRECTORIO PUBLICO DE LA APLICACION (AUTOGENERADO)
            styles.min.css          HOJA DE ESTILOS (OPTIMIZADA)
            libs.min.js             SCRIPTS DE DEPENDENCIA (OPTIMIZADA)
            app.min.js              SCRIPS DE LA APLICACION (OPTIMIZADA)
        /views                      DIRECTORIO DE VISTAS
        index.html                  DIRECTORIO DE INICIO
     .gitignore				      ARCHIVO CONFIGURACION GIT
     .bowerrc               ARCHIVO DE CONFIGURACION BOWER
     .jshintrc              ARCHIVO CONFIGURACION VALIDADOR DE CODIGO JS 
     bower.json 				    ARCHIVO DEPENDENCIAS PARA BOWER
     favicon.ico  			        ARCHIVO FAVICON DE LA APLICACION
     gulp-config.json 		        ARCHIVO CONFIGURACION DE GULP
     gulpfile.js 				    ARCHIVO DE TAREAS
     index.html 				    PAGINA DE INICIO DE LA APLICACION
     package.json 		        	ARCHIVO DE CONFIGURACION DEPENDENCIAS NODE.JS
     README.md				        --



### Tech

* [Sass]               - compilador CSS
* [Gulp]               - automatizador de tareas
* [node.js]            - evented I/O for the backend
* [Jade]               - compilador de plantillas HTML
* [jQuery]             - libreria para manejo del DOM
* [AngularJS]          - HTML enhanced for web apps!
* [Angular-Material]   - framework CSS MATERIAL DESING

Se agrego compatibilidad con JsHint
*[JsHint]              - inspector de codigo js
### Instalación

Angular-generator Basic requiere [Node.js](https://nodejs.org/) v4+ y [Bower.io](http://bower.io/) v1.7., [Git](https://git-scm.com/) , [Npm](https://www.npmjs.com/) para correr.

Usted puede necesitar tener instalado:
```sh
$ npm install -g bower
$ npm i -g gulp
```

```sh
$ git clone https://github.com/jr091291/angular-generator.git 
$ bower install
$ npm install
```

### EJECUCIÓN
ejecutar: 
- para desarrollo Local
```sh
$ gulp
```
- para produccion
```sh
$ gulp start
```

### COLABORADORES

 - jose ricardo pedraza

License
----

ISC


[//]: # (These are reference links used in the body of this note and get stripped out when the markdown processor does its job. There is no need to format nicely because it shouldn't be seen. Thanks SO - http://stackoverflow.com/questions/4823468/store-comments-in-markdown-syntax)

   [git-repo-url]: <https://github.com/jr091291/angular-generator.git>
   [node.js]: <http://nodejs.org>
   [jQuery]: <http://jquery.com>
   [AngularJS]: <http://angularjs.org>
   [Gulp]: <http://gulpjs.com>
   [jade]: <http://jade-lang.com>
   [Sass]: <http://sass-lang.com/>
   [Angular-Material]: <https://material.angularjs.org/latest/>
   [JsHint]: <http://jshint.com/>