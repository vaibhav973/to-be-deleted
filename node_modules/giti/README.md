# giti

Quick summary and informations about a git rep returning a js-json object.

originally based on git-info by [@michalbe](http://github.com/michalbe)

[![NPM][npm-icon] ][npm-url]

[![Travis CI][travis-ci-image] ][travis-ci-url]
[![Coverage Status](https://coveralls.io/repos/github/scherler/git-info/badge.svg?branch=master)](https://coveralls.io/github/scherler/git-info?branch=master)
[![Quality][quality-badge] ][quality-url]
[![dependencies][dependencies-image] ][dependencies-url]
[![devdependencies][devdependencies-image] ][devdependencies-url]

[npm-icon]: https://nodei.co/npm/giti.png?downloads=true
[npm-url]: https://npmjs.org/package/giti
[travis-ci-image]: https://travis-ci.org/scherler/git-info.svg?branch=master
[travis-ci-url]: https://travis-ci.org/scherler/git-info

[dependencies-image]: https://david-dm.org/scherler/git-info.png
[dependencies-url]: https://david-dm.org/scherler/git-info
[devdependencies-image]: https://david-dm.org/scherler/git-info/dev-status.png
[devdependencies-url]: https://david-dm.org/scherler/git-info#info=devDependencies

[quality-badge]: http://npm.packagequality.com/shield/giti.svg
[quality-url]: http://packagequality.com/#?package=giti

### How to use: ###
```
npm i giti -g
```

then either javascript:

```javascript
var gi = require('giti');

// First argument of the function can be a String
gi('name', function(err, result) {
  console.log(result); // { name: name-of-the-repo }
});

// Or Array of Strings
gi(['name', 'author'], function(err, result) {
  console.log(result); // { name: name-of-the-repo,
             // author: author of the repo }
});

// or nothing and we run all commands
gi(function(err, result) {
  console.log(result); 
});
```

or cli:
```bash
giti
{ sha: '962906a2ad46d6d40e40635baf0ec8f0a832e95b',
  shaShort: '962906a',
  branches: [ 'master', '  sha' ],
  branch: 'master',
  repository: 'git@github.com:scherler/git-info.git',
  authors: 
   [ 'Michal Budzynski <michal@virtualdesign.pl>',
     'Michał Budzyński <michal@virtualdesign.pl>',
     'Thorsten Scherler <scherler@gmail.com>' ],
  author: 'Thorsten Scherler <scherler@gmail.com>',
  authorDateRelative: '9 hours ago',
  authorDate: 'Thu Apr 28 16:08:09 2016 +0200',
  name: 'git-info',
  subject: '[master] do not throw an error but call the callback with it as a normal person would do. Doh' }

giti name author branches
{ author: 'Thorsten Scherler <scherler@gmail.com>',
  name: 'git-info',
  branches: [ 'master', '  sha' ] }

```

### API ###
Supported commands:
  * `author` - last author of the repo
  * `authors` - list of all the authors
  * `authorDate` - date of last commit
  * `authorDateRelative` - date of last commit
  * `name` - name of the repository
  * `repository` - address of the repo
  * `branch` - current branch
  * `branches` - all the branches in the repo
  * `subject` - the message of the last commit
