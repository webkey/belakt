'use strict';
var gulp             = require('gulp'),
    runSequence      = require('run-sequence'),
    sass             = require('gulp-sass'),
    sassGlob         = require('gulp-sass-glob'),
    bs               = require('browser-sync').create(),
    reload           = bs.reload,
    plumber          = require('gulp-plumber'),
    notify           = require("gulp-notify"),
    errorHandler     = require('gulp-error-handle'),
    concat           = require('gulp-concat'),
    babel            = require('gulp-babel'),
    postcss          = require('gulp-postcss'),
    autoprefixer     = require('autoprefixer'),
    cssnano          = require('cssnano'),
    gcmq             = require('gulp-group-css-media-queries'),
    concatCss        = require('gulp-concat-css'),
    sassLint         = require('gulp-sass-lint'),
    uglify           = require('gulp-uglifyjs'),
    del              = require('del'),
    rename           = require("gulp-rename"),
    imagemin         = require('gulp-imagemin'),
    pngquant         = require('imagemin-pngquant'),
    cache            = require('gulp-cache'),
    sourcemaps       = require('gulp-sourcemaps'),
    fileinclude      = require('gulp-file-include'),
    markdown         = require('markdown'),
    htmlbeautify     = require('gulp-html-beautify'),
    fs               = require('fs'),
    revts            = require('gulp-rev-timestamp'),
    eslint           = require('gulp-eslint'),
    watch            = require('gulp-watch');

var libsJsLink = [
  'node_modules/jquery/dist/jquery.min.js',
  'node_modules/svg4everybody/dist/svg4everybody.min.js',
  'node_modules/vanilla-lazyload/dist/lazyload.min.js',
  'node_modules/jquery-validation/dist/jquery.validate.min.js',
  'node_modules/select2/dist/js/select2.full.min.js',
  'node_modules/select2/dist/js/i18n/ru.js',
  'node_modules/object-fit-images/dist/ofi.min.js',
  'app/libs/js/jquery.accordion-simple.js',
  'app/libs/js/jquery.switch-class.js',
  'node_modules/swiper/dist/js/swiper.min.js',
  'node_modules/jquery-match-height/dist/jquery.matchHeight-min.js',
  'node_modules/tooltipster/dist/js/tooltipster.bundle.min.js',
  'node_modules/stickybits/dist/jquery.stickybits.min.js'
];

var libsCssLink = [
  'node_modules/select2/dist/css/select2.min.css',
  'node_modules/swiper/dist/css/swiper.min.css',
  'node_modules/tooltipster/dist/css/tooltipster.bundle.min.css'
];

var path = {
  'dist': 'dist'
};

gulp.task('html:compilation', function () {
  return gulp.src(['app/*.html'])
      .pipe(plumber())
      .pipe(fileinclude({
        basepath: 'app',
        filters: {
          markdown: markdown.parse
        }
      }))
      .pipe(gulp.dest('./' + path.dist));
});

gulp.task('html:production', function () {
  return gulp.src(['app/*.html'])
      .pipe(plumber())
      .pipe(fileinclude({
        basepath: 'app',
        filters: {
          markdown: markdown.parse
        }
      }))
      .pipe(htmlbeautify({
        "indent_size": 2,
        "max_preserve_newlines": 0
      }))
      .pipe(revts())
      .pipe(gulp.dest('./' + path.dist));
});

gulp.task('style:compilation', function () {
  var plugins = [
    autoprefixer(),
  ];
  return gulp.src('app/styles/*.+(scss|sass)')
      .pipe(plumber())
      .pipe(sourcemaps.init())
      .pipe(sassGlob())
      .pipe(sass({
        outputStyle: 'expanded',
        indentType: 'space',
        indentWidth: 2,
        precision: 3,
        linefeed: 'lf'
      }).on('error', sass.logError))
      .pipe(postcss(plugins))
      .pipe(sourcemaps.write('./'))
      .pipe(gulp.dest('./' + path.dist + '/css'))
});

gulp.task('styles:lint', function () {
  return gulp.src('app/**/*.+(scss|sass)')
      .pipe(sassLint({
        configFile: '.sass-lint.yml'
      }))
      .pipe(sassLint.format())
});

gulp.task('style:production', function () {
  var plugins = [
    autoprefixer(),
    cssnano({
      zindex: false,
      autoprefixer: {
        remove: false
      }
    })
  ];

  return gulp.src('app/styles/*.+(scss|sass)')
      .pipe(plumber())
      .pipe(sassGlob())
      .pipe(sass().on('error', sass.logError))
      .pipe(gcmq())
      .pipe(postcss(plugins))
      .pipe(gulp.dest('./' + path.dist + '/css'));
});

gulp.task('cssLibs:merge', function () {
  if(libsCssLink.length) {
    return gulp.src(libsCssLink)
        .pipe(concatCss('libs.min.css'))
        .pipe(gulp.dest(path.dist + '/libs/css'));
  }
});

gulp.task('cssLibs:production', function () {
  var plugins = [
    cssnano({
      zindex: false,
      autoprefixer: {
        remove: false
      }
    })
  ];
  if(libsCssLink.length) {
    return gulp.src(libsCssLink)
        .pipe(concatCss('libs.min.css'))
        .pipe(postcss(plugins))
        .pipe(gulp.dest(path.dist + '/libs/css'));
  }
});

gulp.task('jsLibs:merge', function () {
  if(libsJsLink.length) {
    return gulp.src(libsJsLink)
        .pipe(concat('libs.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest(path.dist + '/libs/js'));
  }
});

const jsFiles = [
  'app/scripts/app.js',
  'app/blocks/**/*.js',
  'app/scripts/common/**/*.js',
  'app/scripts/init.js'
];
gulp.task('scripts', function () {
  return gulp.src(jsFiles)
      .pipe(plumber({
        errorHandler: function(err) {
          notify.onError({
            title: "Error ---> JS",
            message: "<%= error.message %>"
          })(err);
        }
      }))
      .pipe(sourcemaps.init())
      .pipe(babel())
      .pipe(concat('app.min.js'))
      .pipe(sourcemaps.write('.'))
      .pipe(gulp.dest(path.dist + '/js'));
});
gulp.task('scripts:lint', () => {
  gulp.src(jsFiles)
      .pipe(eslint({ configFile: '.eslintrc'}))
      .pipe(eslint.format())
      .pipe(eslint.failAfterError());
});
gulp.task('scripts:production', ['scripts:lint'], function () {
  return gulp.src(jsFiles)
      .pipe(babel())
      .pipe(uglify())
      .pipe(concat('app.min.js'))
      .pipe(gulp.dest(path.dist + '/js'));
});

gulp.task('copyFavicons', function () {
  return gulp.src('app/favicons/**/*', { dot: true })
      .pipe(gulp.dest(path.dist));
});

gulp.task('copyResources', function () {
  return gulp.src('app/resources/**/*', { dot: true })
      .pipe(gulp.dest(path.dist));
});

gulp.task('copyImages:blocks', function () {
  return gulp.src(['app/blocks/**/icons/**/*'])
      .pipe(rename({dirname: ''}))
      .pipe(gulp.dest(path.dist + '/images'));
});

gulp.task('copyImages', ['copyImages:blocks'], function () {
  return gulp.src('app/images/**/*')
      .pipe(cache(imagemin({
        interlaced: true,
        progressive: true,
        optimizationLevel: 7, // from 0 to 7
        use: [pngquant()]
      })))
      .pipe(gulp.dest(path.dist + '/images'));
});

gulp.task('bs', function () {
  bs.init({
    files: ['dist/**/*'],
    server: {
      baseDir: "./" + path.dist
    },
    open: false,
    notify: false
  });
});

gulp.task('watch', ['bs', 'html:compilation', 'style:compilation', 'styles:lint', 'cssLibs:merge', 'jsLibs:merge', 'copyFavicons', 'copyResources', 'scripts', 'copyImages'], function () {
  global.watch = true;

  watch(['app/libs/css/*.js', 'gulpfile.js'], () => runSequence('cssLibs:merge', bs.reload));
  watch(['app/libs/js/*.js', 'gulpfile.js'], () => runSequence('jsLibs:merge', bs.reload));
  watch('app/{styles,blocks}/**/*.scss', () => {
    runSequence(['style:compilation', 'styles:lint'], () => bs.reload('css/app.min.css'));
  });
  watch(['app/{scripts,blocks}/**/*.js'], () => {
    runSequence(['scripts'], () => bs.reload('js/app.min.js'));
  });
  watch(['app/blocks/**/*.html', 'app/*.html'], () => runSequence('html:compilation', bs.reload));
  watch('app/favicons/**/*', () => runSequence('copyFavicons', bs.reload));
  watch('app/resources/**/*', () => runSequence('copyResources', bs.reload));
  watch('app/images/**/*', () => runSequence('copyImages', bs.reload));
});

gulp.task('default', ['watch']);

/**
 * Create Production
 */

gulp.task('production', ['cleanDist', 'html:production', 'style:production', 'cssLibs:production', 'jsLibs:merge', 'copyFavicons', 'copyResources', 'scripts:production', 'scripts:lint', 'copyImages']);

gulp.task('cleanDist', function () {
  return del.sync([path.dist + '/']);
});

gulp.task('clearCache', function () {
  return cache.clearAll();
});