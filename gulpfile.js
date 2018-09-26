"use strict";

var gulp = require("gulp");
var sass = require("gulp-sass");
var browserSync = require("browser-sync").create();
var autoprefixer = require("gulp-autoprefixer");
var useref = require("gulp-useref");
var uglify = require("gulp-uglify");
var gulpIf = require("gulp-if");
var cssnano = require("gulp-cssnano");
var imagemin = require("gulp-imagemin");
var cache = require("gulp-cache");
var del = require("del");
var runSequence = require("run-sequence");

var paths = {
  dist: "./dist",
  app: "./app/"
};

paths.scss = paths.app + "scss/**/*.scss";
paths.html = paths.app + "*.html";
paths.js = paths.app + "js/**/*.js";
paths.images = paths.app + "images/**/*.+(png|jpg|gif|svg||jpeg)";
paths.css = paths.app + "css";

paths.imageOutput = paths.dist + "/images";

gulp.task("images", function() {
  return gulp
    .src(paths.images)
    .pipe(cache(imagemin()))
    .pipe(gulp.dest(paths.imageOutput));
});

gulp.task("sass", function() {
  return gulp
    .src(paths.scss)
    .pipe(sass().on("error", sass.logError))
    .pipe(autoprefixer())
    .pipe(gulp.dest(paths.css))
    .pipe(browserSync.reload({ stream: true }));
});

gulp.task("sass:watch", function() {
  gulp.watch(paths.scss, ["sass"]);
});

gulp.task("browserSync", function() {
  browserSync.init({
    server: {
      baseDir: "app"
    }
  });
});

gulp.task("watch", ["browserSync", "sass"], function() {
  gulp.watch(paths.scss, ["sass"]);
  gulp.watch(paths.html, browserSync.reload);
  gulp.watch(paths.js, browserSync.reload);
});

gulp.task("useref", function() {
  return gulp
    .src(paths.html)
    .pipe(useref())
    .pipe(gulpIf("*.js", uglify()))
    .pipe(gulpIf("*.css", cssnano()))
    .pipe(gulp.dest(paths.dist));
});

gulp.task("clean:dist", function() {
  return del.sync("dist");
});

gulp.task("cache:clear", function(cb) {
  return cache.clearAll(cb);
});

gulp.task("build", function(cb) {
  runSequence("clean:dist", ["sass", "useref", "images"], cb);
});

gulp.task("default", function(cb) {
  runSequence(["sass", "browserSync", "watch"], cb);
});
