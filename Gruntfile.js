module.exports = function(grunt) {

    // Wordpress details
    var wp_theme    = 'https://github.com/user/repository/archive/master.zip';
    var wp_user     = 'user';
    var wp_pass     = 'pass';
    var wp_folder   = 'project-folder';
    var wp_url      = 'http://localhost/' + wp_folder;
    var wp_title    = 'Project Title';
    var wp_email    = 'me@example.com';

    // Database details
    var wp_db_name  = 'db-name';
    var wp_db_host  = 'localhost';
    var wp_db_user  = 'user';
    var wp_db_pass  = 'pass';
    var wp_version  = '4.0';

 // Project configuration.

    require('time-grunt')(grunt);

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
                
        // Shell access (for wp-cli)

        shell: {
            wpcreatedirs: {
                command: [
                    'mkdir wp-content',
                    'mkdir wp-content/themes',
                    'mkdir wp-content/plugins',
                    'cd wp-content',
                    'touch index.php',
                    'echo "<?php\r\n// Silence is golden." >> index.php'
                ].join('&&')
            },
            wpinstall: {
                command: 'wp core download --path=wordpress --locale=en_GB --version='+ wp_version
            },
            // Create a database for the WP install
            wpdatabasecreate: {
                command: 'mysqladmin -h '+ wp_db_host +' -u '+ wp_db_user +' -p'+ wp_db_pass +' create '+ wp_db_name
            },
            //create wp-config.php and create database tables
            wpconfig: {
                command: [
                    // Set up wp-config
                    "wp core config --dbname="+ wp_db_name +" --dbuser="+ wp_db_user +" --dbpass="+ wp_db_pass +" --dbhost="+ wp_db_host +" --extra-php='define(\"WP_DEBUG\",true);\ndefine(\"WP_CONTENT_DIR\", dirname(__FILE__). \"/wp-content\" );\ndefine(\"WP_CONTENT_URL\",\"http://\". $_SERVER[\"HTTP_HOST\"]. \"/"+ wp_folder +"/wp-content\");'",
                    // Move wp-config to parent dir
                    'mv wordpress/wp-config.php wp-config.php',
                    // Create Database tables
                    'wp core install --url='+ wp_url +' --title="'+ wp_title +'" --admin_user='+ wp_user +' --admin_password='+ wp_pass +' --admin_email='+ wp_email,
                    // Add custom dir structure
                    'wp option update home ' + wp_url,
                    'wp option update siteurl ' + wp_url + '/wordpress'
                ].join('&&')
            },
            //install and activate a theme
            wpthemes: {
                command: [
                    // Install theme
                   'wp theme install ' + wp_theme,
                   // Activate theme
                   'wp theme activate Flexbones-master'
                ].join('&&')
            },
            // DEBUG ONLY, avoid using if possible
            wpreset: {
                command: [
                    //rm wordpress
                    'rm -rf wordpress',
                    //rm wp-config
                    'rm wp-config.php',
                    //rm wp-content
                    'rm -rf wp-content',
                    //delete db
                    'mysqladmin -h '+ wp_db_host +' -u '+ wp_db_user +' -p'+ wp_db_pass +' drop '+ wp_db_name
                ].join('&&')
            },
            openinbrowser: {
                command: 'open ' + wp_url
            }
        }
    });

    // Load the plugin that provides thetask.
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-shell');

    // Default task(s).
    grunt.registerTask('setup', ['shell:wpinstall','shell:wpcreatedirs','shell:wpdatabasecreate','shell:wpconfig','shell:wpthemes','shell:openinbrowser']);
    grunt.registerTask('undo', ['shell:wpreset']);
};
