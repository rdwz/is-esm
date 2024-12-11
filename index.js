#!/usr/bin/env node

import main from './src/index.js'

// Parse command-line arguments
const args = process.argv.slice(2)
let pkg = args[0]
let userVersion = args[1]

// Handle scoped packages and versions
if (pkg?.includes('@')) {
  const parts = pkg.split('@')
  if (parts.length === 2) {
    pkg = parts[0]
    userVersion = parts[1]
  } else if (parts.length === 3) {
    pkg = `${parts[0]}@${parts[1]}`
    userVersion = parts[2]
  }
}

main(pkg, userVersion).catch(console.error)
