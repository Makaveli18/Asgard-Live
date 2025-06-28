require('dotenv').config()
const { createClient } = require('@supabase/supabase-js')
const fs   = require('fs')
const path = require('path')

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

// Recursively walk a directory and collect files
function walkDir(dir, fileList = []) {
  fs.readdirSync(dir, { withFileTypes: true }).forEach(dirent => {
    const fullPath = path.join(dir, dirent.name)
    if (dirent.isDirectory()) {
      walkDir(fullPath, fileList)
    } else if (/\.(jpe?g|png|gif|webp)$/i.test(dirent.name)) {
      // store relative path from public/images
      fileList.push(path.relative(path.join(__dirname, '../public/images'), fullPath))
    }
  })
  return fileList
}

async function main() {
  const BASE_DIR = path.join(__dirname, '../public/images')
  const BASE_URL = 'https://asgard-tattoo.com/images'

  console.log('Scanning for images in:', BASE_DIR)
  const files = walkDir(BASE_DIR)
  console.log(`Found ${files.length} images:`)
  console.log(files)

  if (files.length === 0) {
    console.error('⚠️ No images detected under public/images!')
    process.exit(1)
  }

  for (const relPath of files) {
    const fileUrl = `${BASE_URL}/${relPath.replace(/\\/g, '/')}`
    const fileName = path.basename(relPath)
    const { error } = await supabase
      .from('images')
      .insert([{
        file_name:   fileName,
        url:         fileUrl,
        description: '',
        metadata:    { category: relPath.split(path.sep)[0] }
      }])

    if (error) console.error('❌', relPath, error.message)
    else          console.log('✅', relPath)
  }
}

main()
