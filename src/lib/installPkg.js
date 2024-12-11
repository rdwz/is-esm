import { exec } from 'node:child_process'
import { promisify } from 'node:util'

const execPromise = promisify(exec)

// Function to check if a command exists in the shell
const isCommandAvailable = async (command) =>
	!!(await execPromise(`command -v ${command} 2>/dev/null`))

// Function to determine the best available package manager
const getPreferredPackageManager = async () => {
	const packageManager = (await isCommandAvailable('bun'))
		? 'bun'
		: (await isCommandAvailable('pnpm'))
			? 'pnpm'
			: // (await isCommandAvailable('yarn')) ? 'yarn' :
				'npm'
	// console.log(`Using package manager: ${packageManager}`)
	return packageManager
}

// Build the appropriate install command
const buildInstallCommand = (pkg, version, prefix, packageManager) => {
	switch (packageManager) {
		case 'bun':
			return `cd ${prefix} && bun install ${pkg}@${version}`
		case 'pnpm':
			return `pnpm install --prefix ${prefix} ${pkg}@${version}`
		// case 'yarn':
		//   return `cd ${prefix} && yarn add ${pkg}@${version}`
		default: // npm
			return `npm install --prefix ${prefix} ${pkg}@${version}`
	}
}

// Install the package using the best package manager
const installPkg = async (pkg, version, tmpDirName) => {
	const packageManager = await getPreferredPackageManager()
	const installCommand = buildInstallCommand(
		pkg,
		version,
		tmpDirName,
		packageManager,
	)
	// console.log(`Installing ${pkg}@${version} with: ${installCommand}`)
	await execPromise(installCommand, {
		stdio: ['ignore'],
	})
}

export default installPkg
