/**
 * Typescript 2.3.2 now not support ES6 dynamic import, use `_import` replace and in webpack replace it with `import`
 */
declare function _import (request: string): Promise<any>;
