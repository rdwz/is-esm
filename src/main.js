import { rm } from 'node:fs/promises'
import { join as pathJoin } from 'node:path'
import ora from 'ora'
import checkESM from './lib/checkESM.js'
import getVersion from './lib/getVersion.js'
import initTempDir from './lib/initTempDir.js'
import installPkg from './lib/installPkg.js'

/**
 * Main function of the CLI.
 *
 * @param {string} pkg - Package name to check.
 * @param {string} [userVersion] - Version of the package to check.
 *
 * @returns {Promise<void>}
 */
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

	const versionToUse =
		fetchedVersions[0] === 'latest' && !userVersion
			? 'latest'
			: fetchedVersions[0]
	spinner.text = `Fetching ${pkg}@${versionToUse}`

	const indexName = 'index.js'
	const tmpDirName = initTempDir(pkg, indexName)

	try {
		await installPkg(pkg, versionToUse, tmpDirName)
	} catch (e) {
		spinner.fail('Unable to fetch the package')
		process.exit(0)
	}

	const entryFile = pathJoin(tmpDirName, indexName)

	try {
		if (checkESM(pkg, tmpDirName)) {
			spinner.succeed('Yes')
		} else {
			spinner.warn('No')
		}
	} catch {
		spinner.fail('Unable to detect the module format')
		process.exit(0)
	}

	await rm(tmpDirName, { recursive: true, force: true })
}

export default main
