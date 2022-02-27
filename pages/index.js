import Head from 'next/head'
import { PostCard, Categories, PostWidget } from '../components'
import { getPosts } from '../services'
import { FeaturedPosts } from '../section'

export default function Home({ posts }) {
  return (
    <>
      <Head>
        <title>Abel Blog | Homepage</title>
        <meta name="author" content="Abel Julio" />
        <meta name="description" content="Abel Blog Homepage" />
        <meta name="keywords" content="Abel Julio, Abel Blog" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="container mx-auto mb-8 px-3 md:px-10">
        <FeaturedPosts />
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="col-span-1 lg:col-span-8">
            {posts.map((post) => (
              <PostCard post={post.node} key={post.node.title} />
            ))}
          </div>
          <div className="col-span-1 lg:col-span-4">
            <div className="relative top-4 lg:sticky">
              <PostWidget />
              <Categories />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export async function getStaticProps() {
  const posts = (await getPosts()) || []

  return {
    props: { posts },
  }
}
