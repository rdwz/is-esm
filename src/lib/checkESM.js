import { readFileSync } from 'node:fs'
import { join } from 'node:path'

const checkESM = (pkg, tmpDirName) => {
	const packageJsonPath = join(tmpDirName, 'node_modules', pkg, 'package.json')
	let packageJson

	try {
		packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf-8'))
	} catch (error) {
		throw new Error(`Unable to read package.json for ${pkg}`)
	}

	return (
		packageJson.type === 'module' ||
		packageJson.exports ||
		packageJson.imports ||
		packageJson.module
	)
}

export default checkESM
