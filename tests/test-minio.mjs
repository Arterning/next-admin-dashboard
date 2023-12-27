/**
 * bun run test-minio.mjs is success
 * if you use node, you should run 
 * node --experimental-modules test-minio.mjs
 * but it still error : can not find modules..
 */

import putMinioFile from '../app/lib/minio'
import { sum } from '../app/lib/utils'

  
// putMinioFile(fileObject)

const result = sum(12,32)
console.log(result);