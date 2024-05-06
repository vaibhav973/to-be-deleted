'use strict';
const exec = require('child_process').exec;
// Just to be sure we are in the right directory, before runnig any git
// command we get into the directory where this script was called from
const path = 'cd ' + process.cwd() + ';';
const async = require('async');
// See https://git-scm.com/book/en/v2/Git-Basics-Viewing-the-Commit-History
// List of git commands needed to execute to get given data
const commands = {
  name: 'git remote show origin -n | grep h.URL | sed "s/.*://;s/.git$//"',
  authorDate: 'git --no-pager log --pretty=format:"%ad" -n1',
  authorDateRelative: 'git --no-pager log --pretty=format:"%ar" -n1',
  author: 'git --no-pager log --pretty=format:"%an <%ae>" -n1',
  authors: 'git log --all --format=\'%aN <%cE>\' | sort -u',
  repository: 'git config --get remote.origin.url',
  branch: 'git branch | grep "*"',
  branches: 'git branch',
  shaShort: 'git rev-parse --short HEAD',
  sha: 'git rev-parse HEAD',
  subject: 'git --no-pager log --pretty=format:"%s" -n1'
};

// This function executes git command and add the data to the final object
const execGitCommand = function(responseObject, command, cb) {
  var response;
  exec(path + commands[command], function(error, stdout, stderr) {
    if (error) {
      if (!responseObject.errors) {
        responseObject.errors = [];
      }
      responseObject.errors.push('Command failed ' + command);
    }
    // Response lines are separated with new line sign, so we remove them
    // (from the begining and the end) using trim() function, then, if asnwer
    // has multi lines, we create an array out of what left
    response = stdout.trim().split('\n');

    // We don't want asterix char in current branch name
    response = response.map(function(el){
      return el.replace('* ', '');
    });
    // When answer has only one line, we don't need an Array
    if (response.length === 1) {
      response = response.pop();
    }

    responseObject[command] = response;

    // async.each callback
    cb();
  });
};

function filterValid(responseObject, value) {
  if (!commands[value]) {
    if (!responseObject.errors) {
      responseObject.errors = [];
    }
    responseObject.errors.push('No valid definitions in giti for ' + value);
  }
  return !!commands[value];
}
/* Main function
 Create a unique responseObject and return it when all async are done.
  */
const gitInfo = function(gitDataToGet, cb) {
  /* if called with param that must be the callback
    and we assume we want all commands.
   */
  if (!cb) {
    cb = gitDataToGet;
    gitDataToGet = Object.keys(commands);
  }
  // If first parameter is not an array, make one (with just 1 element)
  if (gitDataToGet && !Array.isArray(gitDataToGet)) {
    gitDataToGet = [gitDataToGet];
  }

  // this object will be sent to callback, with all the answers
  const responseObject = {};
  // We don't want to execute a command that wasn't defined before
  const filtered = gitDataToGet.filter(filterValid.bind(null, responseObject));
  if (filtered.length===0) {
    cb(new Error(JSON.stringify(responseObject.errors)), responseObject);
  } else {
    // Execute all the commands in the same time
    async.each(filtered, execGitCommand
      .bind(null, responseObject), function(err) {
      // And run callback with results when finished
      cb(err, responseObject);
    });
  }

};

module.exports = gitInfo;
