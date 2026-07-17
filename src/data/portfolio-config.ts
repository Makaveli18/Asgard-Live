export interface Subcategory {
  id: string
  title: string
}

export interface PortfolioCategory {
  id: string
  title: string
  subcategories: Subcategory[]
}

export const portfolioCategories: PortfolioCategory[] = [
  {
    id: 'realism',
    title: 'Realism',
    subcategories: [
      { id: 'animals', title: 'Animals' },
      { id: 'custom-ink', title: 'Custom Ink' },
      { id: 'portraits', title: 'Portraits' },
    ],
  },
  {
    id: 'fine-line',
    title: 'Fine Line',
    subcategories: [
      { id: 'floral', title: 'Floral' },
      { id: 'symbolic-iconic', title: 'Symbolic & Iconic' },
    ],
  },
  {
    id: 'norse',
    title: 'Norse & Viking',
    subcategories: [
      { id: 'dark-mythic', title: 'Dark Mythic' },
      { id: 'realistic-portraits', title: 'Realistic Portraits' },
    ],
  },
  {
    id: 'blackwork',
    title: 'Blackwork',
    subcategories: [
      { id: 'symbolic-minimal', title: 'Symbolic & Minimal' },
    ],
  },
  {
    id: 'neo-traditional',
    title: 'Neo-Traditional',
    subcategories: [
      { id: 'mythic', title: 'Mythic' },
      { id: 'pop-culture', title: 'Pop Culture' },
    ],
  },
  {
    id: 'custom-fine-art',
    title: 'Custom Fine Art',
    subcategories: [],
  },
  {
    id: 'abstract',
    title: 'Abstract',
    subcategories: [],
  },
  {
    id: 'ornamental',
    title: 'Ornamental',
    subcategories: [
      { id: 'mandala', title: 'Mandala' },
      { id: 'realism-dotwork', title: 'Realism & Dotwork' },
    ],
  },
  {
    id: 'studio-bts',
    title: 'Studio',
    subcategories: [],
  },
]

export const allCategoryIds = portfolioCategories.map((c) => c.id)

export function findCategory(categoryId?: string) {
  return portfolioCategories.find((c) => c.id === categoryId)
}

export function findSubcategory(categoryId: string, subcategoryId?: string) {
  const cat = findCategory(categoryId)
  if (!cat || !subcategoryId) return undefined
  return cat.subcategories.find((s) => s.id === subcategoryId)
}
