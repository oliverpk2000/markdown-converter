#! /usr/bin/env node

const {program} = require('commander')
const {main} = require('./converter.js')
const {scan} = require('./scan.js');

program
    .command('convert <mdDir>')
    .description('converts .md files in mdDir to .html and puts them into html-files. ' +
        'It has to be a direct child of the directory where you executed the command')
    .action(function () {
        main(process.argv[3], 'html', 'pages');
    });

program
    .command('scan <mdDir>')
    .description('scans to see if everything was generated. Argument mdDir necessary to check against .md files')
    .action(function () {
        scan(process.argv[3], 'html', 'pages');
    })

program.parse(process.argv);