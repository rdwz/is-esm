import fetchVersions from './fetchVersions.js'

const getVersion = async (pkg, requestedVersion) => {
	let versions
	try {
		versions = await fetchVersions(pkg)
	} catch (e) {
		throw new Error(e.message)
	}

	let versionToUse = requestedVersion
	if (!requestedVersion) {
		versionToUse = 'latest'
	}

	if (versions.includes(versionToUse) || versionToUse === 'latest') {
		return [versionToUse]
	}
	return []
}

export default getVersion
