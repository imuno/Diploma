const del = require('del');
const gulp = require('gulp');
const plumber = require('gulp-plumber');
const replace = require('gulp-replace');
const autoprefixer = require('gulp-autoprefixer');
const sass = require('gulp-sass');
const rtlcss = require('gulp-rtlcss');
const cleanCSS = require('gulp-clean-css');
const eslint = require('gulp-eslint');
const concat = require('gulp-concat');
const rename = require('gulp-rename');
const babel = require('gulp-babel');
const sourcemaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify');
const browserSync = require('browser-sync');

const { reload } = browserSync;
const Promise = require('promise');


/*-----------------------------------------------
|   Paths
-----------------------------------------------*/
// const CSS = 'pages/assets/css';
const JS = 'pages/assets/js';
const lib = 'pages/assets/lib';
const Paths = {
  HERE: './',
  PAGES: {
    FOLDER: 'pages',
    ALL: 'pages/**/*.*',
    HTML: 'pages/**/*.html',
  },
  JS: {
    ALL: 'js/**/*.js',
    BOOTSTRAP: [
      './js/bootstrap/util.js',
      './js/bootstrap/alert.js',
      './js/bootstrap/button.js',
      './js/bootstrap/carousel.js',
      './js/bootstrap/collapse.js',
      './js/bootstrap/dropdown.js',
      './js/bootstrap/modal.js',
      './js/bootstrap/tooltip.js',
      './js/bootstrap/popover.js',
      './js/bootstrap/scrollspy.js',
      './js/bootstrap/tab.js',
    ],
    SPARROW: ['js/sparrow/Utils.js', 'js/sparrow/!(Utils)*.js'],
    PLUGINS: ['js/plugins/imagesloaded.pkgd.js', 'js/plugins/TweenMax.js', 'js/plugins/ScrollToPlugin.js', 'js/plugins/CustomEase.js', 'js/plugins/DrawSVGPlugin.js', 'js/plugins/fontawesome-all.js'],
  },
  SCSS: {
    ALL: 'scss/**/*.scss',
    THEME: 'scss/theme.scss',
  },
  ASSETS: {
    ALL: 'pages/assets/**/*.*',
    FONTS: 'pages/assets/fonts/**/*.*',
    VIDEO: 'pages/assets/video/**/*.*',
    IMG: 'pages/assets/img/**/*.*',
    JS: 'pages/assets/js',
  },
  CSS: 'pages/assets/css',
  DEPENDENCIES: {
    jquery: {
      FROM: 'node_modules/jquery/dist/jquery.min.js',
      TO: JS,
    },
    popper: {
      FROM: 'node_modules/popper.js/dist/umd/popper.min.js',
      TO: JS,
    },
    prismjs: {
      FROM: ['node_modules/prismjs/prism.js', 'node_modules/prismjs/themes/prism.css'],
      TO: lib,
    },
    plyr: {
      FROM: 'node_modules/plyr/dist/**/*.*',
      TO: lib,
    },
    'typed.js': {
      FROM: 'node_modules/typed.js/lib/typed.js',
      TO: JS,
    },
    'loaders.css': {
      FROM: ['node_modules/loaders.css/loaders.min.css', 'node_modules/loaders.css/loaders.css.js'],
      TO: lib,
    },
    'jquery.mb.ytplayer': {
      FROM: ['node_modules/jquery.mb.ytplayer/dist/css/jquery.mb.YTPlayer.min.css', 'node_modules/jquery.mb.ytplayer/dist/jquery.mb.YTPlayer.min.js'],
      TO: lib,
    },
    'progressbar.js': {
      FROM: 'node_modules/progressbar.js/dist/progressbar.min.js',
      TO: JS,
    },
    'isotope-layout': {
      FROM: 'node_modules/isotope-layout/dist/isotope.pkgd.min.js',
      TO: lib,
    },
    'isotope-packery': {
      FROM: 'node_modules/isotope-packery/packery-mode.pkgd.min.js',
      TO: lib,
    },
    stickyfilljs: {
      FROM: 'node_modules/stickyfilljs/dist/stickyfill.min.js',
      TO: JS,
    },
    'jquery-countdown': {
      FROM: 'node_modules/jquery-countdown/dist/jquery.countdown.min.js',
      TO: JS,
    },
    rellax: {
      FROM: 'node_modules/rellax/rellax.min.js',
      TO: JS,
    },
    'owl.carousel': {
      FROM: ['node_modules/owl.carousel/dist/owl.carousel.js', 'node_modules/owl.carousel/dist/assets/owl.carousel.css'],
      TO: lib,
    },
    remodal: {
      FROM: 'node_modules/remodal/dist/**/*.*',
      TO: lib,
    },
    lightbox2: {
      FROM: 'node_modules/lightbox2/dist/**/*.*',
      TO: lib,
    },
    fancybox: {
      FROM: ['node_modules/@fancyapps/fancybox/dist/jquery.fancybox.min.css', 'node_modules/@fancyapps/fancybox/dist/jquery.fancybox.min.js'],
      TO: lib,
    },
    imagesloaded: {
      FROM: 'node_modules/imagesloaded/imagesloaded.pkgd.js',
      TO: 'js/plugins/',
    },
    'sticky-kit': {
      FROM: 'node_modules/sticky-kit/dist/**/*.*',
      TO: lib,
    },
    'semantic-ui-accordion': {
      FROM: ['node_modules/semantic-ui-accordion/accordion.min.css', 'node_modules/semantic-ui-accordion/accordion.min.js'],
      TO: lib,
    },
    'semantic-ui-transition': {
      FROM: ['node_modules/semantic-ui-transition/transition.min.css', 'node_modules/semantic-ui-transition/transition.min.js'],
      TO: lib,
    },
    'bootstrap-js': {
      FROM: 'node_modules/bootstrap/js/dist/!(index)*.js',
      TO: 'js/bootstrap',
    },
    'bootstrap-scss': {
      FROM: 'node_modules/bootstrap/scss/**/*.scss',
      TO: 'scss/bootstrap',
    },
    jtap: {
      FROM: 'node_modules/jtap/jquery.tap.js',
      TO: lib,
    },
  },
  GENERATED: [
    'js/bootstrap',
    'scss/bootstrap',
    'pages/assets/css',
    'pages/assets/js',
  ],
};


/*-----------------------------------------------
|   Cleaning
-----------------------------------------------*/
gulp.task('clean', () => del(Paths.GENERATED, { force: true }));


/*-----------------------------------------------
|   SCSS
-----------------------------------------------*/
gulp.task('scss', () => gulp.src(Paths.SCSS.THEME)
  .pipe(plumber())
  .pipe(sourcemaps.init())
  .pipe(sass({
    outputStyle: 'expanded',
  }).on('error', sass.logError))
  .pipe(autoprefixer({
    browsers: ['last 5 versions'],
    cascade: false,
  }))
  .pipe(sourcemaps.write('.'))
  .pipe(plumber.stop())
  .pipe(gulp.dest(Paths.CSS))
  .pipe(browserSync.stream()));

gulp.task('scss:min', () => gulp.src(Paths.SCSS.THEME)
  .pipe(plumber())
  .pipe(sourcemaps.init())
  .pipe(sass({
    outputStyle: 'expanded',
  }).on('error', sass.logError))
  .pipe(autoprefixer({
    browsers: ['last 5 versions'],
    cascade: false,
  }))
  .pipe(cleanCSS({ compatibility: 'ie9' }))
  .pipe(rename({ suffix: '.min' }))
  .pipe(sourcemaps.write('.'))
  .pipe(plumber.stop())
  .pipe(gulp.dest(Paths.CSS))
  .pipe(browserSync.stream()));

gulp.task('scss:rtl', () => gulp.src(Paths.SCSS.THEME)
  .pipe(plumber())
  .pipe(sourcemaps.init())
  .pipe(sass({
    outputStyle: 'expanded',
  }).on('error', sass.logError))
  .pipe(autoprefixer({
    browsers: ['last 5 versions'],
    cascade: false,
  }))
  .pipe(rtlcss()) // Convert to RTL.
  .pipe(rename({ suffix: '-rtl' })) // Append "-rtl" to the filename.
  .pipe(sourcemaps.write('.'))
  .pipe(plumber.stop())
  .pipe(gulp.dest(Paths.CSS))
  .pipe(browserSync.stream()));

gulp.task('scss:rtl:min', () => gulp.src(Paths.SCSS.THEME)
  .pipe(plumber())
  .pipe(sourcemaps.init())
  .pipe(sass({
    outputStyle: 'expanded',
  }).on('error', sass.logError))
  .pipe(autoprefixer({
    browsers: ['last 5 versions'],
    cascade: false,
  }))
  .pipe(rtlcss()) // Convert to RTL.
  .pipe(cleanCSS({ compatibility: 'ie9' }))
  .pipe(rename({ suffix: '-rtl.min' }))
  .pipe(sourcemaps.write('.'))
  .pipe(plumber.stop())
  .pipe(gulp.dest(Paths.CSS))
  .pipe(browserSync.stream()));


/*-----------------------------------------------
|   JavaScript
-----------------------------------------------*/
gulp.task('js:bootstrap', () => gulp.src(Paths.JS.BOOTSTRAP)
  .pipe(concat('bootstrap.js'))
  .pipe(replace(/^(export|import).*/gm, ''))
  .pipe(babel({
    compact: false,
    presets: [
      [
        'env', {
        modules: false,
        loose: true,
      },
      ],
    ],
    plugins: [
      process.env.PLUGINS && 'transform-es2015-modules-strip',
      '@babel/plugin-proposal-object-rest-spread',
    ].filter(Boolean),
  }))
  .pipe(gulp.dest(Paths.ASSETS.JS))
  .pipe(uglify())
  .pipe(rename({
    suffix: '.min',
  }))
  .pipe(gulp.dest(Paths.ASSETS.JS))
  .pipe(reload({ stream: true })));

gulp.task('js:sparrow', () => gulp.src(Paths.JS.SPARROW)
  .pipe(eslint({ fix: true }))
  .pipe(eslint.format())
  .pipe(eslint.failAfterError())
  .pipe(concat('theme.js'))
  .pipe(replace(/^(export|import).*/gm, ''))
  .pipe(babel({
    compact: false,
    presets: [
      [
        'env',
        {
          modules: false,
          loose: true,
        },
      ],
    ],
    plugins: [
      process.env.PLUGINS && 'transform-es2015-modules-strip',
      '@babel/plugin-proposal-object-rest-spread',
      'transform-strict-mode',
    ].filter(Boolean),
  }))
  .pipe(gulp.dest(Paths.ASSETS.JS))
  .pipe(uglify())
  .pipe(rename({
    suffix: '.min',
  }))
  .pipe(gulp.dest(Paths.ASSETS.JS))
  .pipe(reload({ stream: true })));

gulp.task('js:plugins', () => gulp.src(Paths.JS.PLUGINS)
  .pipe(concat('plugins.js'))
  .pipe(replace(/^(export|import).*/gm, ''))
  .pipe(babel({
    compact: false,
    presets: [
      [
        'env', {
        modules: false,
        loose: true,
      },
      ],
    ],
    plugins: [
      process.env.PLUGINS && 'transform-es2015-modules-strip',
      '@babel/plugin-proposal-object-rest-spread',
    ].filter(Boolean),
  }))
  .pipe(gulp.dest(Paths.ASSETS.JS))
  .pipe(uglify())
  .pipe(rename({
    suffix: '.min',
  }))
  .pipe(gulp.dest(Paths.ASSETS.JS))
  .pipe(reload({ stream: true })));

gulp.task('js', gulp.parallel('js:bootstrap', 'js:plugins', 'js:sparrow'));


/*-----------------------------------------------
|   Dependencies
-----------------------------------------------*/
gulp.task('copy:dependency', () => {
  const promises = Object.keys(Paths.DEPENDENCIES).map(item => new Promise((resolve, reject) => {
    gulp.src(Paths.DEPENDENCIES[item].FROM)
      .pipe(gulp.dest((Paths.DEPENDENCIES[item].TO === lib) ? `${Paths.DEPENDENCIES[item].TO}/${item}` : Paths.DEPENDENCIES[item].TO))
      .on('end', (err) => {
        if (err) {
          console.log(err);
          reject(err);
        } else {
          resolve();
        }
      });
  }));
  return Promise.all(promises);
});


/*-----------------------------------------------
|   Watching
-----------------------------------------------*/
gulp.task('watch', () => {
  gulp.watch(Paths.SCSS.ALL, gulp.series('scss'));

  gulp.watch(Paths.JS.SPARROW, gulp.series('js', (done) => {
    reload();
    done();
  }));

  gulp.watch(Paths.JS.PLUGINS, gulp.series('js', (done) => {
    reload();
    done();
  }));

  gulp.watch([Paths.PAGES.HTML, Paths.ASSETS.FONTS, Paths.ASSETS.VIDEO, Paths.ASSETS.IMG], (done) => {
    reload();
    done();
  });
});


/*-----------------------------------------------
|   Serve
-----------------------------------------------*/
gulp.task('serve', () => {
  browserSync.init({
    server: {
      baseDir: Paths.PAGES.FOLDER,
    },
    // proxy: '127.0.0.1:8010',
    port: 3000,
    open: true,
    notify: false,
  });
});


/*-----------------------------------------------
|   Starting everything
-----------------------------------------------*/
gulp.task('default', gulp.series('copy:dependency', 'scss', 'js', gulp.parallel('watch', 'serve')));
