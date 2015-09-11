module.exports = function(grunt) {

  grunt.initConfig({
    
    //config and credential
    pkg: grunt.file.readJSON('package.json'),
    credential: grunt.file.readJSON('.credential.json'),

    jshint: {
      files: ['Gruntfile.js', 'src/**/*.js', 'test/**/*.js'],
      options: {
        globals: {
          jQuery: true
        }
      }
    },
    watch: {
      files: ['<%= jshint.files %>'],
      tasks: ['jshint']
    },
    copy: {
      scripts: {
        expand:true,
        cwd: './src',
        src: './*.js',
        dest: './test/scripts'
      },
      style_sheets: {
        expand:true,
        cwd: '.src',
        src: './*.css',
        dest: './test/style_sheets'
      }
    },


    build_index_page: {
      widget_html: "./src/presenter.html",
      container_file: "./template/container.html",
      dest: "./test/index.html"
    },
    submit_widget: {
      widget_html: "./src/presenter.html",
      widget_style: "./src/presenter.css",
      widget_script: "./src/presenter.js",
      name: '<%= pkg.name %>',
      author_email: '<%= pkg.author.email %>',
      auth_email: '<%= credential.user_email %>',
      auth_pw: '<%= credential.password %>'
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('freelog-widgetscript');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmtasks('grunt-http');

  grunt.registerTask('default', ['jshint']);

};
