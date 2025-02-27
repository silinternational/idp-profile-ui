const fs = require('fs')

function deepMerge(target, source) {
  for (const key in source) {
    if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
      target[key] = deepMerge(target[key] || {}, source[key])
    } else {
      target[key] = source[key]
    }
  }
  return target
}

const [, , baseFile, customFile] = process.argv

if (!fs.existsSync(baseFile) || !fs.existsSync(customFile)) {
  console.error('❌ File missing, not merging:', baseFile, customFile)
  process.exit(0)
}

const baseData = JSON.parse(fs.readFileSync(baseFile, 'utf8'))
const customData = JSON.parse(fs.readFileSync(customFile, 'utf8'))
const mergedData = deepMerge(baseData, customData)

fs.writeFileSync(baseFile, JSON.stringify(mergedData, null, 2))
console.log('✅ Merged:', customFile, 'into', baseFile)
