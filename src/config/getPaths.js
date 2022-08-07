import { join } from 'path';

function getPaths({ cwd }) {
    const absPagesPath = join(cwd, 'src/pages');
    return {
        pagesPath: 'src/pages',
        absSrcPath: join(absPagesPath, '../'),
        absPagesPath
    };
}

export default getPaths;
