module.banner = '/*!\n<%= pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %>\nCopyright (c) <%= pkg.contributors %>\n<%= pkg.license %> Software License.\n*/\n';


var Routes = {};
Routes.port = '8711';

module.exports = function(grunt) {

	grunt
		.initConfig({
			pkg : grunt.file.readJSON('package.json'),
			'revision-count' : {
				options : {
					property : 'revisioncount',
					ref : 'HEAD'
				}
			},
			concat : {
				options : {
					banner : module.banner
				},
				dist_raw : {
					dest : 'dist/betajs-simulator-raw.js',
					src : [
						'src/fragments/begin.js-fragment',
						'dist/betajs-simulator-templates.js',
						'demos/components/**/*.js',
						'src/simulator/**/*.js',
						'src/fragments/end.js-fragment',
						'src/config/config.js'
					]
				},
				dist_scoped : {
					dest : 'dist/betajs-simulator.js',
					src : [ 'vendors/scoped.js',
						'dist/betajs-simulator-noscoped.js'
					]
				},
				dist_scss: {
					dest: 'dist/betajs-simulator.scss',
					src: [
						'src/global/**/*.scss',
						'src/**/*.scss',
						'demos/**/*.scss'
					]
				}
			},
			sass: {
				dist: {
					files: {
						'dist/betajs-simulator.css': 'dist/betajs-simulator.scss'
					}
				}
			},
			preprocess : {
				options : {
					context : {
						MAJOR_VERSION : '<%= revisioncount %>',
						MINOR_VERSION : (new Date()).getTime()
					}
				},
				dist : {
					src : 'dist/betajs-simulator-raw.js',
					dest : 'dist/betajs-simulator-noscoped.js'
				}
			},
			clean : {
				raw: "dist/betajs-simulator-raw.js",
				templates: "dist/betajs-simulator-templates.js"
			},
			uglify : {
				options : {
					banner : module.banner
				},
				dist : {
					files : {
						'dist/betajs-simulator-noscoped.min.js' : [ 'dist/betajs-simulator-noscoped.js' ],
						'dist/betajs-simulator.min.js' : [ 'dist/betajs-simulator.js' ]
					}
				}
			},
			jshint : {
				options: {
					es5: false,
					es3: true
				},
				source : [ "./src/**/*.js"],
				dist : [ "./dist/betajs-simulator-noscoped.js", "./dist/betajs-simulator.js" ],
				gruntfile : [ "./Gruntfile.js" ],
				tests: [  ]
			},
			wget : {
				dependencies : {
					options : {
						overwrite : true
					},
					files : {
						"./vendors/jquery-hashchange.js" : "http://cdn.rawgit.com/cowboy/jquery-hashchange/master/jquery.ba-hashchange.js",
						"./vendors/scoped.js" : "https://raw.githubusercontent.com/betajs/betajs-scoped/master/dist/scoped.js",
						"./vendors/beta.js" : "https://raw.githubusercontent.com/betajs/betajs/master/dist/beta.js",
						"./vendors/betajs-ui.js" : "https://raw.githubusercontent.com/betajs/betajs-ui/master/dist/betajs-ui.js",
						"./vendors/beta-browser-noscoped.js" : "https://raw.githubusercontent.com/betajs/betajs-browser/master/dist/beta-browser-noscoped.js",
						"./vendors/betajs-dynamics-noscoped.js" : "https://raw.githubusercontent.com/betajs/betajs-dynamics/master/dist/betajs-dynamics-noscoped.js",
						"./vendors/betajs-dynamics-components-noscoped.js" : "https://raw.githubusercontent.com/betajs/betajs-dynamics-components/master/dist/betajs-dynamics-components-noscoped.js",
						"./vendors/betajs-dynamics-components.css" : "https://raw.githubusercontent.com/betajs/betajs-dynamics-components/master/dist/betajs-dynamics-components.css",
						"./vendors/jquery-1.9.closure-extern.js" : "https://raw.githubusercontent.com/google/closure-compiler/master/contrib/externs/jquery-1.9.js"
					}
				}
			},
			shell : {
				tests: {
					command: "open tests/tests.html"
				}
			},
			cssmin: {
				target: {
					files: {
						'dist/betajs-simulator.css.min': 'dist/betajs-simulator.css'
					}
				}
			},
			jsdoc : {
				dist : {
					src : [ './README.md', './src/*/*.js' ],
					options : {
						destination : 'docs',
						template : "node_modules/grunt-jsdoc/node_modules/ink-docstrap/template",
						configure : "./jsdoc.conf.json",
						tutorials: "./docsrc/tutorials",
						recurse: true
					}
				}
			},
			connect: {
				server: {
					options: {
						port: Routes.port,
						base: '.',
						keepalive: true,
						open: {
							target: 'http://localhost:' + Routes.port + '/tests/tests.html'
						}
					}
				}
			},
			template : {
				"readme" : {
					options : {
						data: {
							indent: "",
							framework: grunt.file.readJSON('package.json')
						}
					},
					files : {
						"README.md" : ["readme.tpl"]
					}
				}
			},
			betajs_templates: {
				dist: {
					files: {
						"dist/betajs-simulator-templates.js": [
							"src/**/*.html",
							"demos/**/*.html"
						]
					},
					options: {
						namespace: 'BetaJS.Simulator.Dynamics.Templates'
					}
				}
			},
			watch: {
				scripts: {
					files: ['src/**/*.js', 'src/**/*.scss', 'src/**/*.html', 'demos/**/*.js', 'demos/**/*.scss', 'demos/**/*.html'],
					tasks: ['default'],
					options: {
						spawn: false,
						livereload: 1337
					}
				}
			}
		});

	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-git-revision-count');
	grunt.loadNpmTasks('grunt-preprocess');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-wget');
	grunt.loadNpmTasks('grunt-closure-tools');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-node-qunit');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-jsdoc');
	grunt.loadNpmTasks('grunt-shell');
	grunt.loadNpmTasks('grunt-template');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-betajs-templates');

	grunt.registerTask('default', [ 'revision-count', "betajs_templates", 'concat:dist_raw', 'concat:dist_scss', 'sass:dist',
		'preprocess', 'clean:raw', 'clean:templates', /*"cssmin",*/ 'concat:dist_scoped'/*, 'uglify'*/ ]);
	grunt.registerTask('qunit', [ 'connect' ]);
	grunt.registerTask('lint', [ 'jshint:source', 'jshint:dist',
		'jshint:gruntfile', "jshint:tests" ]);
	grunt.registerTask('check', [ 'lint', 'qunit' ]);
	grunt.registerTask('dependencies', [ 'wget:dependencies' ]);
	grunt.registerTask('readme', [ 'template:readme' ]);
	grunt.registerTask('server',[
		'connect'
	]);

};