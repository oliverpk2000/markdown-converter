#! /usr/bin/env node

const {program} = require('commander')
const {main} = require('./converter.js')

program
    .command('convert <ogDir> <indexDir> <subDir>')
    .description('converts .md files in the ogDir to .html and puts them in the subDir, ' +
        'then creates an index.html in the indexDir. ' +
        'All directories have to be in the same directory and where you execute the command')
    .action(function () {
        main(process.argv[3], process.argv[4], process.argv[5]);
    });

program.parse(process.argv);