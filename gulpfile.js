var gulp = require('gulp'),
	ejs = require('gulp-ejs'),
	browserify = require('browserify'),
	tslint = require('gulp-tslint'),
	tsify = require('tsify'),
	source = require('vinyl-source-stream'),
	sass = require('gulp-sass');

//////////////////////////////////////////////////////
// html
//////////////////////////////////////////////////////
gulp.task('html', function() {
	gulp.src('src/index.html.ejs')
		.pipe(ejs({
			msg: 'Hello Gulp!'
		}, undefined, {ext: ''}))
		.pipe(gulp.dest('target'));
});

gulp.task('html:watch', function() {
	gulp.watch('src/index.html.ejs', ['html']);
});

//////////////////////////////////////////////////////
// typescript
// inspired by http://www.vrdmn.com/2016/07/getting-started-with-typescript.html
//////////////////////////////////////////////////////
gulp.task('lint-ts', function () {
	return gulp.src('src/**/*.ts')
		.pipe(tslint({
			formatter: 'verbose'
		}))
		.pipe(tslint.report());
});
gulp.task('ts', ['lint-ts'], function () {
	return browserify({
		entries: ['src/index.ts']
	})
		.plugin(tsify)
		.bundle()
		.pipe(source('index.js'))
		.pipe(gulp.dest('target'));
});
gulp.task('ts:watch', function() {
	gulp.watch('src/**/*.ts', ['ts']);
});

//////////////////////////////////////////////////////
// json
//////////////////////////////////////////////////////
gulp.task('json', function () {
	gulp
		.src('src/_json/**/*.json')
		.pipe(gulp.dest('target/json'));
});

gulp.task('json:watch', function() {
	gulp.watch('src/**/*.json', ['json']);
});

//////////////////////////////////////////////////////
// css
//////////////////////////////////////////////////////
gulp.task('scss', function() {
	return gulp.src('src/index.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(gulp.dest('target'))
});

gulp.task('scss:watch', function() {
	gulp.watch('src/**/*.scss', ['scss']);
});

//////////////////////////////////////////////////////
// main scripts
//////////////////////////////////////////////////////
gulp.task('default', ['html', 'ts', 'json', 'scss']);
gulp.task('watch', ['default', 'html:watch', 'ts:watch', 'json:watch', 'scss:watch']);