import { dirSync } from 'tmp'
import { join } from 'node:path'
import { writeFileSync } from 'node:fs'

const initTempDir = (pkg, indexName) => {
  const tmpDir = dirSync()
  writeFileSync(join(tmpDir.name, 'package.json'), JSON.stringify({ name: "is-esm" }))

  const entryFile = join(tmpDir.name, indexName)
  writeFileSync(
    entryFile,
    `import * as isesm from "${pkg}";\nconsole.log(isesm);\n`,
  )

  return tmpDir.name
}

export default initTempDir
