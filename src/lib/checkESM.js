import { rollup } from 'rollup'
import nodeResolve from '@rollup/plugin-node-resolve'
import { join } from 'node:path'

const checkESM = async (pkg, entryFile) => {
  let isESM = false

  const moduleExists = (pkg) => ({
    name: 'module-exists',
    load(id) {
      if (id.includes(join('node_modules', pkg))) {
        isESM = true
      }
    },
  })

  await rollup({
    input: entryFile,
    plugins: [
      nodeResolve({ modulesOnly: true }),
      moduleExists(pkg),
    ],
    onwarn: () => {},
  })

  return isESM
}

export default checkESM
