const gulp = require('gulp');
const jshint = require('gulp-jshint');
const jscs = require('gulp-jscs');
const nodemon = require('gulp-nodemon');

gulp.task('style', () => {
    return gulp.src([
        './config/*.js',
        './routes/*.js',
        './*.js'
    ])
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish', {
        verbose: true
    }))
    .pipe(jscs())
    .pipe(jscs.reporter());
});

gulp.task('develop', () => {
    let stream = nodemon({
        script: './server.js',
        tasks: ['style']
    })
    .on('restart', () => console.log('Reiniciando...'))
    .on('crash', () => {
        console.log('A aplicação quebrou');
        stream.emit('restart', 10);
    })
});
