import { useEffect, useState } from 'react'
import Link from 'next/link'

import { getCategories } from '../services'

const Categories = () => {
  const [categories, setCategories] = useState([])

  useEffect(() => {
    getCategories().then((newCategories) => setCategories(newCategories))
  }, [])

  return (
    <div className="mb-8 rounded-lg bg-white p-8 shadow-lg">
      <h3 className="mb-8 border-b pb-4 text-xl font-semibold">Categories</h3>
      <div className="max-h-20 overflow-y-auto">
        {categories.map((category) => (
          <Link href={`/category/${category.slug}`} key={category.slug}>
            <span className="mb-3 block cursor-pointer pb-3">
              {category.name}
            </span>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Categories
