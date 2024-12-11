import getVersion from './lib/getVersion.js'
import initTempDir from './lib/initTempDir.js'
import installPkg from './lib/installPkg.js'
import checkESM from './lib/checkESM.js'
import ora from 'ora'
import { sync } from 'rimraf'
import { join } from 'node:path'

const main = async (pkg, userVersion) => {
  const spinner = ora({ stream: process.stdout })
  spinner.text = `Fetching ${pkg}`
  spinner.start()

  let fetchedVersions
  try {
    fetchedVersions = await getVersion(pkg, userVersion)
  } catch (e) {
    spinner.fail(`Unable to fetch the package ${pkg} stats: ${e.message}`)
    process.exit(0)
  }

  if (fetchedVersions.length === 0) {
    spinner.fail(`Unable to find version ${userVersion} of ${pkg}`)
    process.exit(0)
  }

  const versionToUse = fetchedVersions[0]
  spinner.text = `Fetching ${pkg}@${versionToUse}...`

  const indexName = 'index.js'
  const tmpDirName = initTempDir(pkg, indexName)

  try {
    await installPkg(pkg, versionToUse, tmpDirName)
  } catch (e) {
    spinner.fail('Unable to fetch the package')
    process.exit(0)
  }

  const entryFile = join(tmpDirName, indexName)

  try {
    if (await checkESM(pkg, entryFile)) {
      spinner.succeed('Yes')
    } else {
      spinner.warn('No')
    }
  } catch {
    spinner.fail('Unable to detect the module format')
    process.exit(0)
  }

  sync(tmpDirName)
}

export default main
