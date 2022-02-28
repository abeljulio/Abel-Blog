import { useEffect, useState } from 'react'
import Link from 'next/link'
import moment from 'moment'

import { getRecentPosts, getSimilarPosts } from '../services'

const PostWidget = ({ categories, slug }) => {
  const [relatedPosts, setRelatedPosts] = useState([])

  useEffect(() => {
    if (slug) {
      getSimilarPosts(categories, slug).then((result) => {
        setRelatedPosts(result)
      })
    } else {
      getRecentPosts().then((result) => {
        setRelatedPosts(result)
      })
    }
  }, [slug])

  if (!relatedPosts.length) return null

  return (
    <div className="mb-4 max-h-80 rounded-lg bg-white p-8 shadow-lg">
      <h3 className="mb-8 border-b pb-4 text-xl font-semibold">
        {slug ? 'Related Posts' : 'Recent Posts'}
      </h3>
      <div className="max-h-40 overflow-y-auto">
        {relatedPosts.map((post) => (
          <div key={post.title} className="mb-4 flex w-full items-center">
            <div className="w-16 flex-none">
              <img
                src={post.featuredImage.url}
                alt={post.title}
                className="h-[60px] w-[60px] rounded-full object-cover align-middle"
              />
            </div>
            <div className="ml-4 flex-grow">
              <p className="text-xs text-gray-500">
                {moment(post.createdAt).format('MMM DD, YYYY')}
              </p>
              <Link
                href={`/post/${post.slug}`}
                key={post.title}
                className="text-base"
              >
                {post.title}
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default PostWidget
