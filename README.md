## Getting Started

Tested and built using 

### Dependencies

Grunt.js 0.4.5. [Link](http://gruntjs.com/)
wp-cli [Link](http://wp-cli.org/)

#### WP CLI 

In order to use the Wordpress Comand Line Interface you must first update your **PATH** as described on the WP-CLI website. This allows you to use the `wp` command throughout grunt-wordpress-scaffolding. **This is required.**

#### MAMP

MAMP users need to add **PHP** and **MYSQL** to their .bash_profile. It should look something like this:

```
export PATH="$PATH: /Applications/MAMP/bin/php/php5.5.10/bin"
export PATH=$PATH:/Applications/MAMP/Library/bin
```

### Setup

First run `npm-install` to download the dependencies. Then you will need to open up the gruntfile and fill out the variables as required. Please note that we use a custom directory structure placing wp-content outside the wordpress directory. We do this internally in order to completely seperate our code from Wordpress.

Once the Grunfile has all the correct information open a terminal window, `cd` into your project directory and run `grunt setup`.