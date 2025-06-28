import React from 'react'
import { useParams } from 'react-router-dom'
import { useImages, ImageRecord } from '../hooks/useImages'
import { PortfolioGallery } from '../components/PortfolioGallery'

// your static category metadata
const categories = [
  { id: 'realism', title: 'Realism' },
  { id: 'fine-line', title: 'Fine Line' },
  { id: 'norse', title: 'Norse & Viking' },
  { id: 'blackwork', title: 'Blackwork' },
  { id: 'neo-traditional', title: 'Neo-Traditional' },
  { id: 'custom-fine-art', title: 'Custom Fine Art' },
  { id: 'abstract', title: 'Abstract' },
  { id: 'ornamental', title: 'Ornamental' },
  { id: 'studio-bts', title: 'Studio' },
] as const

type CategoryId = typeof categories[number]['id']

export default function Portfolio() {
  // 1️⃣ fetch all images from Supabase
  const { images, loading } = useImages()

  // 2️⃣ grab the ":category" param (if any)
  const { category } = useParams<{ category?: CategoryId }>()

  if (loading) {
    return <div className="p-6">Loading portfolio…</div>
  }

    // 3️⃣ build our allowed list (only accept real IDs)
  const allIds = categories.map((c) => c.id)
  const allowed: CategoryId[] =
    category && allIds.includes(category as CategoryId)
      ? [category as CategoryId]
      : allIds as CategoryId[]

  // 4️⃣ filter by metadata.category
  const filtered = images.filter((img) =>
   // cast the incoming string to our CategoryId
  allowed.includes(img.metadata.category as CategoryId)
  )

  // 5️⃣ map ImageRecord → { src, alt, filename }
  const galleryImages = filtered.map((r: ImageRecord) => ({
    src: r.url,
    alt: r.description ?? '',
    filename: r.file_name,
  }))

  return (
    <section className="p-6">
      <h1 className="text-3xl font-bold mb-6">Portfolio</h1>
      <PortfolioGallery images={galleryImages} />
    </section>
  )
}
