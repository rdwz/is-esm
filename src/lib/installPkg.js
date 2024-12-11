import { exec } from 'node:child_process'
import { promisify } from 'node:util'

const execPromise = promisify(exec)

const buildInstallCommand = (pkg, version, prefix) => {
  return `npm install --prefix ${prefix} ${pkg}@${version}`
}

const installPkg = async (pkg, version, tmpDirName) => {
    await execPromise(buildInstallCommand(pkg, version, tmpDirName), {
      stdio: ['ignore'],
    })
}

export default installPkg
