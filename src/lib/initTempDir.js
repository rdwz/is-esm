import { mkdtempSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'

const initTempDir = (pkg, indexName) => {
	const tmpDir = mkdtempSync(join(tmpdir(), 'is-esm-'))
	writeFileSync(
		join(tmpDir, 'package.json'),
		JSON.stringify({ name: 'is-esm' }),
	)

	const entryFile = join(tmpDir, indexName)
	writeFileSync(
		entryFile,
		`import * as isEsm from "${pkg}";\nconsole.log(isEsm);\n`,
	)

	return tmpDir
}

export default initTempDir
