
/* IMPORT */

import * as _ from 'lodash';
import * as applescript from 'applescript';
import * as path from 'path';
import * as vscode from 'vscode';
import Utils from './utils';

/* COMMANDS */

async function open () {

  const repopath = await Utils.repo.getPath ();

  if ( !repopath ) return vscode.window.showErrorMessage ( 'You have to open a git project before being able to open it in Ship' );

  const git = Utils.repo.getGit ( repopath ),
        nameGitHub = await Utils.repo.getGitHubName ( git ),
        name = nameGitHub || _.last ( repopath.split ( path.sep ) );

  const openScript = `
    tell application "Ship"
      reopen
      activate
    end tell
    tell application "System Events"
      keystroke "d" using {command down} # Jump to item...
      keystroke "${name}"
      keystroke return
    end tell
  `;

  applescript.execString ( openScript );

}

/* EXPORT */

export {open};
