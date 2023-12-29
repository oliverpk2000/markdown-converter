#! /usr/bin/env node

const {program} = require('commander')
const {main} = require('./converter.js')

program
    .command('convert <mdDir>')
    .description('converts .md files in mdDir to .html and puts them into html-files. ' +
        'mdDir has to be a directory directly under where you executed the program',)
    .action(function () {
        main(process.argv[3], 'html', 'pages');
    });

program.parse(process.argv);