var _ = require('./gulp-config.json');
var $ =  require('gulp-load-plugins')();
var gulp = require('gulp');
var debug = require('gulp-debug');
var wiredep = require('wiredep').stream;
var stylish =  require('jshint-stylish');
var runSequence = require('run-sequence').use(gulp);
var browserSync =  require('browser-sync').create();


var addExcludes = function(path){
    return _.exclude.concat(path);
};

/*
 *  Creando el servidor para desarrollo
 */
gulp.task('serve', function() {
    browserSync.init({
        server: {
            baseDir: _.serve.prod_dir,
            open: "local",
            browser: ["google chrome", "firefox"],
            notify: true,
            timestamps: true,
            host: _.serve.host
        }
    });
});

/*
 *  Creando el servidor para produccion
 */
gulp.task('serve:start', function() {
    browserSync.init({
        server: {
            baseDir: _.serve.desp_dir,
            open: "local",
            browser: ["google chrome", "firefox"],
            notify: true,
            timestamps: true,
            host: _.serve.host
        }
    });
});

/*
 * Procesar Archivos jade
 */
gulp.task('jade', function () {
    return gulp.src(_.base_app + "/**/*jade")
        .pipe($.jade({
            pretty: true
        }))
        .pipe(gulp.dest(_.serve.prod_dir));
})


/*
 * Procesar Archivos sass
 */

gulp.task('sass', function() {
    return gulp.src(addExcludes(_.dir.stylesheet + '**/*.sass', _.dir.stylesheet + '**/*.scss'))
        .pipe($.sass.sync(
            {outputStyle: 'expanded'})
            .on('error', $.sass.logError))
        .pipe($.autoprefixer({
            browsers:['> 5%','iOS 7','ie 6-8','last 2 versions']}))
        .pipe(gulp.dest(_.dest.stylesheet));
});

/*
*  Copiar archivos carpeta dest y folders
*/
gulp.task('copy:files', function() {
    var root = _.base_app;
    gulp.src(addExcludes([root + "/**/*.js", root + "/**/*.css" ,root + "/**/*.html" ,root +"/**/*.ico"]))
        .pipe(gulp.dest(_.serve.prod_dir))
});

/*
*   Minificar Imagenes
**/
gulp.task('imagenes', function () {
    return gulp.src([ _.dir.public + "imagen/*.*", _.dir.public + "imagen/**/*.*"])
        .pipe($.imagemin())
        .pipe(gulp.dest(_.dest.public + "imagen"));
});

/*
* Inyectar contenido js y css al index
**/
gulp.task('inject:all', function(){
    runSequence('inject:scripts','inject:css','inject:bower');
});

gulp.task('inject:scripts', function() {
    return gulp.src('index.html', {cwd: _.serve.prod_dir})
        .pipe($.inject(
            gulp.src(addExcludes(_.dest.angular + "**/*.js"))
                .pipe($.angularFilesort()), {
                name: 'angular',
                relative:true
                //ignorePath: './app'
            }))
        .pipe($.inject(
            gulp.src(addExcludes(_.dest.importants))
                .pipe($.angularFilesort()), {
                name: 'importants',
                relative:true
                //ignorePath: './app'
            }))
        .pipe($.inject(
            gulp.src(addExcludes(_.dest.script + "**/*.js")),
            {relative:true}
        ))
        .pipe(gulp.dest(_.serve.prod_dir));
});

gulp.task('inject:css', function() {
    return gulp.src('index.html', {cwd: _.serve.prod_dir})
        .pipe($.inject(
            gulp.src(addExcludes(_.dest.stylesheet + "**/*.css")),
            {relative:true}
        ))
        .pipe(gulp.dest(_.serve.prod_dir));
});

gulp.task('inject:bower', function () {
    gulp.src('index.html', {cwd: _.serve.prod_dir})
        .pipe(wiredep())
        .pipe(gulp.dest(_.serve.prod_dir));
});


/*
* genera modulo para el manejo de templates
**/
var templateCache = require('gulp-angular-templatecache');
gulp.task('templates', function() {
    gulp.src(_.dir.view + '**/*.html')
        .pipe(templateCache({
            root: 'views/',
            module: 'app.templates',
            standalone: true
        }))
        .pipe(gulp.dest(_.dir.angular + "modules"));
});

/*
 * Automatizando recarga del navegador
 */
gulp.task('watch', function() {
    gulp.watch(['./app/**/*.jade'], ['jade','inject:all', browserSync.reload]);
    gulp.watch(['./app/stylesheets/**/*.sass'], ["sass",'inject:all', browserSync.reload]);
    gulp.watch(['./app/**/*.js'], ['copy:files','inject:all','jshint', browserSync.reload]);
    gulp.watch(['./bower.json'], ['inject:bower',browserSync.reload]);
});


/*
* Busca errores en el JS y nos los muestra en el terminal
*/

gulp.task('jshint', function() {
    return gulp.src(_.jsShint)
        .pipe($.jshint('.jshintrc'))
        .pipe($.jshint.reporter('jshint-stylish'))

});

/*
* tareas de despiegue app
**/
gulp.task('compress', function() {
    gulp.src('index.html', {cwd: _.serve.prod_dir})
        .pipe($.useref())
        .pipe($.if('*.js', $.uglify({mangle: false })))
        .pipe($.if('*.css', $.minifyCss()))
        .pipe(gulp.dest(_.serve.desp_dir));
});


/*
 * Elimina el CSS que no es utilizado para reducir el peso del archivo
 */
gulp.task('uncss', function() {
    gulp.src(_.serve.prod_dir + '/public/**/*.min.css')
        .pipe($.uncss({
            html: 'index.html'
        }))
        .pipe(gulp.dest(_.serve.desp_dir +"/public"));
});

/*
 * Copiar vistas minificadas para despliegue
 **/
gulp.task('minify:html', function() {
    return gulp.src(_.serve.prod_dir + '/**/*.html')
        .pipe($.htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest(_.serve.desp_dir))
});


/*
 * Copiar css minificadas para despliegue
 **/
gulp.task('minify:css', function() {
    return gulp.src(_.serve.prod_dir + '/views/**/*.css')
        .pipe($.minifyCss())
        .pipe(gulp.dest(_.serve.desp_dir + "/views"))
});

/*
 * Copiar imagenes minificadas para despliegue
 **/
gulp.task('minify:css', function() {
    return gulp.src(_.serve.prod_dir + '/views/**/*.css')
        .pipe($.minifyCss())
        .pipe(gulp.dest(_.serve.desp_dir + "/views"))
});

gulp.task('imagenes:desp', function () {
    return gulp.src([ _.dir.public + "imagen/*.*", _.dir.public + "imagen/**/*.*"])
        .pipe($.imagemin())
        .pipe(gulp.dest(_.serve.desp_dir + "/public/imagen"));
});

/*
 * Compilar archivos para desarrollo
 **/
gulp.task('build',function(){
    runSequence('jade', 'sass','copy:files');
    setTimeout(function(){
        runSequence('inject:all', 'imagenes');
    }, 5000);
});

/*
* compilar app en para producción
* */
 gulp.task('compile', function() {
     runSequence( 'minify:html','minify:css','imagenes:desp', 'compress','uncss','serve:start');
 });

/*
*Correr aplicacion
 */
gulp.task("start",function(){
    runSequence("build");
    setTimeout(function(){
        runSequence("compile");
    }, 12000)

});

/*
* compilar app entorno local
*/
gulp.task('default', function(){
    runSequence('build');
    setTimeout(function(){
        runSequence('serve');
        setTimeout(function(){
            runSequence('jshint', 'watch');
        },11000)
    },10000);
});


