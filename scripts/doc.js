import { spawnSync } from 'child_process';
import path from 'path';
import documentation from 'documentation';
import streamArray from 'stream-array';
import vfs from 'vinyl-fs';

const filePaths = [path.resolve('lib/index.js')];

documentation.lint(filePaths, { shallow: true }).then(lintOutput => {
  if (lintOutput) {
    console.log(lintOutput);
    process.exit(1);
  } else {
    documentation
      .build(filePaths, { shallow: true })
      .then(documentation.formats.html)
      .then(output => {
        streamArray(output).pipe(vfs.dest('./docs'));

        const lastCommandArgs = [['pull'], ['commit', '-am', '"Update new doc"'], ['push', '--force']];

        lastCommandArgs.forEach(v => {
          const resultOfCommand = spawnSync('git', v, { stdio: 'inherit', shell: true });
          console.log(resultOfCommand.error, resultOfCommand.stdout);
        });
      });
  }
});
