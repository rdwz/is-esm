import { exec } from 'node:child_process'
import { promisify } from 'node:util'

const execPromise = promisify(exec)

const fetchVersions = async (pkg) => {
  if (!pkg) throw new Error('Empty package name given as argument')
    const { stdout, stderr } = await execPromise(`npm show ${pkg} versions --json`)
    if (/Registry returned 404 for GET on|404 Not found|code E404/.test(stderr)) {
      throw new Error("The package you were looking for doesn't exist.")
    }
    return JSON.parse(stdout)
}

export default fetchVersions
