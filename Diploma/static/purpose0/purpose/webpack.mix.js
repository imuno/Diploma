let mix = require('laravel-mix');

mix.setPublicPath('assets')
    .sass('resources/scss/purpose.scss', 'assets/css')
    .combine([
        'assets/libs/jquery/dist/jquery.min.js',
        'assets/libs/bootstrap/dist/js/bootstrap.bundle.min.js',
        'assets/libs/in-view/dist/in-view.min.js',
        'assets/libs/sticky-kit/dist/sticky-kit.min.js',
        'assets/libs/svg-injector/dist/svg-injector.min.js',
        'assets/libs/jquery.scrollbar/jquery.scrollbar.min.js',
        'assets/libs/jquery-scroll-lock/dist/jquery-scrollLock.min.js',
        'assets/libs/imagesloaded/imagesloaded.pkgd.min.js'
    ], 'assets/js/purpose.core.js')
    .combine([
        'resources/js/purpose/license.js',
        'resources/js/purpose/layout.js',
        'resources/js/purpose/init/*.js',
        'resources/js/purpose/custom/*.js',
        'resources/js/purpose/maps/*.js',
        'resources/js/purpose/libs/*.js',
        'resources/js/purpose/charts/*.js'
    ], 'assets/js/purpose.js');


// Options

mix.options({
    processCssUrls: false
});


// Live reload

mix.browserSync({
	browser: 'Google Chrome',
	proxy: false,
	server: {
		baseDir: './',
	},
	files: [
        '**/*.html',
        '**/*.js',
        '**/*.css'
    ]
});


// Production settings

if (mix.inProduction()) {

}
