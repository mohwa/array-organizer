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
      });
  }
});
