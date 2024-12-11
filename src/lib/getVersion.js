import fetchVersions from './fetchVersions.js'

const getVersion = async (pkg, requestedVersion) => {
  let versions
  try {
    versions = await fetchVersions(pkg)
  } catch (e) {
    throw new Error(e.message)
  }

  const versionToUse = requestedVersion || versions[versions.length - 1]

  if (versions.includes(versionToUse)) {
    return [versionToUse]
  }
  return []
}

export default getVersion
