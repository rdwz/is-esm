#!/usr/bin/env node

import main from './main.js'

const args = process.argv.slice(2)

const isNoColor = process.env.NO_COLOR

const fmt = (text, color) => {
	if (isNoColor) return text
	const colors = {
		bold: '\x1b[1m',
		red: '\x1b[31m',
		reset: '\x1b[0m',
	}
	return `${colors[color]}${text}${colors.reset}`
}

let pkg
let v

if (args.length === 1 && args[0].includes('@')) {
	const [name, version] = args[0].split('@')
	pkg = name
	v = version || 'latest'
} else if (args.length === 2) {
	;[pkg, v] = args
} else if (args.length === 1) {
	pkg = args[0]
} else {
	console.error(fmt('Error', 'red'), fmt('Missing or invalid argument', 'bold'))
	console.info('Usage: is-esm <pkg>[@version]')
	process.exit(1)
}

main(pkg, v).catch(console.error)
