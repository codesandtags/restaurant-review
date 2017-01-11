'use strict';
// This gulpfile makes use of new JavaScript features.
// Babel handles this without us having to do anything. It just works.
// You can read more about the new JavaScript features here:
// https://babeljs.io/docs/learn-es2015/
import gulp from "gulp";
import del from "del";
import runSequence from "run-sequence";
import browserSync from "browser-sync";
import gulpLoadPlugins from "gulp-load-plugins";
import yargs from "yargs";
import file from "gulp-file";

const $ = gulpLoadPlugins();
const reload = browserSync.reload;
const argv = yargs.argv;

// Lint JavaScript
gulp.task('lint', () =>
    gulp.src([
        'app/scripts/**/*.js',
        '!app/scripts/vendor/**/*.js'
    ])
        .pipe($.eslint())
        .pipe($.eslint.format())
        .pipe($.if(!browserSync.active, $.eslint.failOnError()))
);

// Optimize images
gulp.task('images', () =>
    gulp.src('app/images/**/*')
        .pipe($.cache($.imagemin({
            progressive: true,
            interlaced: true
        })))
        .pipe(gulp.dest('dist/images'))
        .pipe($.size({title: 'images'}))
);

// Copy all files at the root level (app)
gulp.task('copy', () => {
        gulp.src([
            'app/*',
            '!app/*.html',
            'node_modules/apache-server-configs/dist/.htaccess',
        ], {
            dot: true
        }).pipe(gulp.dest('dist'))
            .pipe($.size({title: 'copy'}));

        // copy data for distribution
        gulp.src([
            'app/data/**'
        ]).pipe(gulp.dest('dist/data'));
    }
);

// Compile and automatically prefix stylesheets
gulp.task('styles', () => {
    const AUTOPREFIXER_BROWSERS = [
        'ie >= 10',
        'ie_mob >= 10',
        'ff >= 30',
        'chrome >= 34',
        'safari >= 7',
        'opera >= 23',
        'ios >= 7',
        'android >= 4.4',
        'bb >= 10'
    ];

    // For best performance, don't add Sass partials to `gulp.src`
    return gulp.src([
        'app/styles/**/*.scss',
        'app/styles/**/*.css'
    ])
        .pipe($.newer('.tmp/styles'))
        .pipe($.sourcemaps.init())
        .pipe($.sass({
            precision: 10
        }).on('error', $.sass.logError))
        .pipe($.autoprefixer(AUTOPREFIXER_BROWSERS))
        .pipe(gulp.dest('.tmp/styles'))
        // Concatenate and minify styles
        .pipe($.if('*.css', $.cssnano()))
        .pipe($.size({title: 'styles'}))
        .pipe($.sourcemaps.write('./'))
        .pipe(gulp.dest('dist/styles'));
});

gulp.task('copy-components', () => {
    gulp.src([
        './app/scripts/components/**/*.js',
    ])
        .pipe($.newer('.tmp/scripts/components'))
        .pipe($.sourcemaps.init())
        .pipe($.babel())
        .pipe($.uglify({preserveComments: 'some'}))
        .pipe($.size({title: 'components-scripts'}))
        .pipe($.sourcemaps.write())
        .pipe(gulp.dest('.tmp/scripts/components/'))
        .pipe(gulp.dest('dist/scripts/components/'));

    gulp.src([
        './app/scripts/components/**/*.html',
    ])
        .pipe($.htmlmin({
            removeComments: true,
            collapseWhitespace: true,
            collapseBooleanAttributes: true,
            removeAttributeQuotes: true,
            removeRedundantAttributes: true,
            removeEmptyAttributes: true,
            removeScriptTypeAttributes: true,
            removeStyleLinkTypeAttributes: true,
            removeOptionalTags: true
        }))
        .pipe($.size({title: 'components-html'}))
        .pipe(gulp.dest('.tmp/scripts/components/'))
        .pipe(gulp.dest('dist/scripts/components/'));
});


// Concatenate and minify JavaScript. Optionally transpiles ES2015 code to ES5.
// to enable ES2015 support remove the line `"only": "gulpfile.babel.js",` in the
// `.babelrc` file.
gulp.task('scripts', () =>
    gulp.src([
        // Note: Since we are not using useref in the scripts build pipeline,
        //       you need to explicitly list your scripts here in the right order
        //       to be correctly concatenated
        './app/scripts/app.js'
    ])
        .pipe($.newer('.tmp/scripts'))
        .pipe($.sourcemaps.init())
        .pipe($.babel())
        .pipe($.concat('main.min.js'))
        .pipe($.sourcemaps.write())
        .pipe($.uglify({preserveComments: 'some'}))
        // Output files
        .pipe($.size({title: 'scripts'}))
        .pipe($.sourcemaps.write('.'))
        .pipe(gulp.dest('.tmp/scripts'))
        .pipe(gulp.dest('dist/scripts'))
);

// Scan your HTML for assets & optimize them
gulp.task('html', () => {
    return gulp.src('app/**/*.html')
        .pipe($.useref({
            searchPath: '{.tmp,app}',
            noAssets: true
        }))

        // Minify any HTML
        .pipe($.if('*.html', $.htmlmin({
            removeComments: true,
            collapseWhitespace: true,
            collapseBooleanAttributes: true,
            removeAttributeQuotes: true,
            removeRedundantAttributes: true,
            removeEmptyAttributes: true,
            removeScriptTypeAttributes: true,
            removeStyleLinkTypeAttributes: true,
            removeOptionalTags: true
        })))
        // Output files
        .pipe($.if('*.html', $.size({title: 'html', showFiles: true})))
        .pipe(gulp.dest('dist'));
});

gulp.task('copy-vendor-files', () => {

    // Local vendor files
    gulp.src([
        './app/scripts/vendor/**',
    ])
        .pipe(gulp.dest('.tmp/scripts/vendors/'))
        .pipe(gulp.dest('dist/scripts/vendors/'));

    gulp.src([
        './app/styles/vendor/**',
    ])
        .pipe(gulp.dest('.tmp/styles/vendors/'))
        .pipe(gulp.dest('dist/styles/vendors/'));

    // Bower vendor files

    gulp.src([
        './bower_components/jquery/dist/jquery.min.js',
        './bower_components/bootstrap/dist/js/bootstrap.min.js',
        './bower_components/tether/dist/js/tether.min.js',
        './bower_components/angular/angular.min.js'
    ])
        .pipe(gulp.dest('.tmp/scripts/vendors/'))
        .pipe(gulp.dest('dist/scripts/vendors/'));

    gulp.src([
        './bower_components/bootstrap/dist/css/bootstrap.min.css',
        './bower_components/tether/dist/css/tether.min.css',
        './bower_components/components-font-awesome/css/font-awesome.min.css'
    ])
        .pipe(gulp.dest('.tmp/styles/vendors/'))
        .pipe(gulp.dest('dist/styles/vendors/'));

    gulp.src([
        './bower_components/components-font-awesome/fonts/fontawesome-webfont.woff',
        './bower_components/components-font-awesome/fonts/fontawesome-webfont.woff2',
        './bower_components/components-font-awesome/fonts/fontawesome-webfont.ttf',
        './bower_components/components-font-awesome/fonts/fontawesome-webfont.svg'
    ])
        .pipe(gulp.dest('.tmp/styles/fonts/'))
        .pipe(gulp.dest('dist/styles/fonts/'));

});

gulp.task('copy-data', () => {
    gulp.src([
        './app/data/**'
    ])
        .pipe(gulp.dest('.tmp/data/'))
        .pipe(gulp.dest('dist/data/'))
});

// Clean output directory
gulp.task('clean', () => del(['.tmp', 'dist/*', '!dist/.git'], {dot: true}));

// Watch files for changes & reload
gulp.task('serve', ['scripts', 'copy-components', 'copy-vendor-files', 'styles'], () => {
    browserSync({
        notify: false,
        // Customize the Browsersync console logging prefix
        logPrefix: 'RestaurantReviewer',
        // Allow scroll syncing across breakpoints
        scrollElementMapping: ['main', '.mdl-layout'],
        // Run as an https by uncommenting 'https: true'
        // Note: this uses an unsigned certificate which on first access
        //       will present a certificate warning in the browser.
        // https: true,
        server: ['.tmp', 'app'],
        port: 3000
    });

    gulp.watch(['app/**/*.html'], reload);
    gulp.watch(['app/styles/**/*.{scss,css}'], ['styles', reload]);
    gulp.watch(['app/scripts/**/*.js'], ['lint', 'scripts', 'copy-components', reload]);
    gulp.watch(['app/images/**/*'], reload);

    // Watch components
    gulp.watch(['app/scripts/components/**/*'], ['copy-components', reload]);
});

// Build and serve the output from the dist build
gulp.task('serve:dist', ['default'], () =>
    browserSync({
        notify: false,
        logPrefix: 'RestaurantReviewer',
        // Allow scroll syncing across breakpoints
        scrollElementMapping: ['main'],
        // Run as an https by uncommenting 'https: true'
        // Note: this uses an unsigned certificate which on first access
        //       will present a certificate warning in the browser.
        // https: true,
        server: 'dist',
        port: 3001
    })
);

// Build production files, the default task
gulp.task('default', ['clean'], cb =>
    runSequence(
        'styles',
        ['lint', 'html', 'scripts', 'copy-components', 'copy-vendor-files', 'images', 'copy'],
        //'copy-service-worker',
        cb
    )
);

gulp.task('copy-service-worker', cb =>
    gulp.src('app/service-worker.js')
        .pipe(gulp.dest('dist/'))
);

gulp.task('create-component', cb => {
    const componentName = argv.name;
    const moduleName = argv.module;
    const exampleCommand = 'e.g. gulp create-component --name myComponent --module myModule';

    if (!argv.name) throw new Error('The component name is needed. ' + exampleCommand);
    if (!argv.module) throw new Error('The component module is needed. ' + exampleCommand);

    let htmlTemplate = `<div><h2>${componentName}</h2></div>`;
    let javascriptTemplate =
    `(function() {
    angular.module('${moduleName}')
        .component('${componentName}', {
            templateUrl: '/scripts/components/${componentName}/${componentName}.html'
        });
}());`;

    let componentStructure = [
        {
            fileName: `${componentName}.html`,
            template: htmlTemplate
        }, {
            fileName: `${componentName}.component.js`,
            template: javascriptTemplate
        }];

    componentStructure.forEach((part) => {
        file(part.fileName, part.template, {src: true})
            .pipe(gulp.dest(`app/scripts/components/${componentName}`));
    });

});