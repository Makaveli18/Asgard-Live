/**
 * Batch Image Upload Script for Asgard Tattoo Portfolio
 *
 * Usage:
 *   node scripts/upload-images.cjs                    - Scan public/images/Portfolio and upload new images
 *   node scripts/upload-images.cjs --csv data.csv     - Upload from CSV file
 *
 * CSV Format (columns):
 *   file_name, url, description, category
 *
 * Example CSV row:
 *   viking-sleeve-tattoo.jpg, https://asgard-tattoo.com/images/Portfolio/norse/viking-sleeve-tattoo.jpg, Norse sleeve tattoo with Odin and ravens on upper arm, norse
 *
 * Valid categories: realism, fine-line, norse, blackwork, neo-traditional, custom-fine-art, abstract, ornamental, studio-bts
 */

require('dotenv').config()
const { createClient } = require('@supabase/supabase-js')
const fs = require('fs')
const path = require('path')

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

const VALID_CATEGORIES = [
  'realism', 'fine-line', 'norse', 'blackwork',
  'neo-traditional', 'custom-fine-art', 'abstract',
  'ornamental', 'studio-bts'
]

const FOLDER_TO_CATEGORY = {
  'realism': 'realism',
  'fine line': 'fine-line',
  'norse': 'norse',
  'blackwork': 'blackwork',
  'neo-traditional': 'neo-traditional',
  'custom fine art': 'custom-fine-art',
  'abstract': 'abstract',
  'ornamental': 'ornamental',
  'studio-bts': 'studio-bts'
}

function walkDir(dir, fileList = []) {
  fs.readdirSync(dir, { withFileTypes: true }).forEach(dirent => {
    const fullPath = path.join(dir, dirent.name)
    if (dirent.isDirectory()) {
      walkDir(fullPath, fileList)
    } else if (/\.(jpe?g|png|gif|webp)$/i.test(dirent.name)) {
      fileList.push(path.relative(path.join(__dirname, '../public/images'), fullPath))
    }
  })
  return fileList
}

function detectCategory(relPath) {
  const parts = relPath.replace(/\\/g, '/').split('/')
  if (parts[0] !== 'Portfolio') return null
  const folderName = parts[1]
  return FOLDER_TO_CATEGORY[folderName] || null
}

function generateDescription(fileName) {
  const name = fileName
    .replace(/\.(jpg|jpeg|png|webp|gif)$/i, '')
    .replace(/[-_]/g, ' ')
    .replace(/\d+$/g, '')
    .trim()
  return name.charAt(0).toUpperCase() + name.slice(1)
}

async function uploadFromDirectory() {
  const BASE_DIR = path.join(__dirname, '../public/images/Portfolio')
  const BASE_URL = 'https://asgard-tattoo.com/images'

  if (!fs.existsSync(BASE_DIR)) {
    console.error('Portfolio directory not found:', BASE_DIR)
    process.exit(1)
  }

  console.log('Scanning:', BASE_DIR)
  const allFiles = walkDir(BASE_DIR)
  // Only portfolio images (relative paths start with Portfolio/)
  const files = allFiles.filter(f => f.startsWith('Portfolio'))
  console.log(`Found ${files.length} portfolio images`)

  // Get existing file names to avoid duplicates
  const { data: existing } = await supabase.from('images').select('file_name')
  const existingNames = new Set((existing || []).map(r => r.file_name))

  let added = 0
  let skipped = 0

  for (const relPath of files) {
    const fileName = path.basename(relPath)

    if (existingNames.has(fileName)) {
      skipped++
      continue
    }

    const fileUrl = `${BASE_URL}/${relPath.replace(/\\/g, '/')}`
    const category = detectCategory(relPath)

    const { error } = await supabase.from('images').insert([{
      file_name: fileName,
      url: fileUrl,
      description: generateDescription(fileName),
      category: category,
      metadata: { category: 'portfolio' }
    }])

    if (error) {
      console.error('  FAIL:', fileName, error.message)
    } else {
      console.log('  OK:', fileName, `[${category}]`)
      added++
    }
  }

  console.log(`\nDone: ${added} added, ${skipped} skipped (already exist)`)
}

async function uploadFromCSV(csvPath) {
  if (!fs.existsSync(csvPath)) {
    console.error('CSV file not found:', csvPath)
    process.exit(1)
  }

  const content = fs.readFileSync(csvPath, 'utf-8')
  const lines = content.split('\n').filter(l => l.trim())

  // Skip header row if present
  const startIdx = lines[0].toLowerCase().includes('file_name') ? 1 : 0

  let added = 0
  let errors = 0

  for (let i = startIdx; i < lines.length; i++) {
    const cols = lines[i].split(',').map(c => c.trim())

    if (cols.length < 4) {
      console.error(`  Line ${i + 1}: not enough columns, skipping`)
      errors++
      continue
    }

    const [fileName, url, description, category] = cols

    if (category && !VALID_CATEGORIES.includes(category)) {
      console.error(`  Line ${i + 1}: invalid category "${category}", skipping`)
      errors++
      continue
    }

    const { error } = await supabase.from('images').insert([{
      file_name: fileName,
      url: url,
      description: description || generateDescription(fileName),
      category: category || null,
      metadata: { category: 'portfolio' }
    }])

    if (error) {
      console.error(`  FAIL line ${i + 1}:`, error.message)
      errors++
    } else {
      console.log(`  OK: ${fileName} [${category}]`)
      added++
    }
  }

  console.log(`\nDone: ${added} added, ${errors} errors`)
}

async function main() {
  const args = process.argv.slice(2)

  if (args.includes('--csv')) {
    const csvIdx = args.indexOf('--csv')
    const csvPath = args[csvIdx + 1]
    if (!csvPath) {
      console.error('Usage: node upload-images.cjs --csv <path-to-csv>')
      process.exit(1)
    }
    await uploadFromCSV(csvPath)
  } else {
    await uploadFromDirectory()
  }
}

main()
