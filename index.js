#! /usr/bin/env node

const {program} = require('commander')
const {converterMain} = require('./converter.js')

program
    .command('convert <mdDir>')
    .description('converts .md files in mdDir to .html and puts them into html-files. ' +
        'It has to be a direct child of the directory where you executed the command',)
    .action(function () {
        converterMain(process.argv[3], 'html', 'pages');
    });

program.parse(process.argv);