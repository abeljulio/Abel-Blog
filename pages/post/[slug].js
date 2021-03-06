import { useRouter } from 'next/router'
import Head from 'next/head'

import { getPosts, getPostDetails } from '../../services'
import {
  PostDetail,
  Categories,
  PostWidget,
  Author,
  Comments,
  CommentsForm,
  Loader,
} from '../../components'

const PostDetails = ({ post }) => {
  const router = useRouter()

  if (router.isFallback) return <Loader />

  return (
    <>
      <Head>
        <title>Abel Blog | {post.title}</title>
        <meta name="author" content={post.author} />
        <meta name="description" content={post.excerpt} />
        <meta
          name="keywords"
          content={`Abel Blog ${post.title}, ${post.title}`}
        />
      </Head>
      <div className="container mx-auto mb-8 px-3 md:px-10">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="col-span-1 lg:col-span-8">
            <PostDetail post={post} />
            <Author author={post.author} />
            <CommentsForm slug={post.slug} />
            <Comments slug={post.slug} />
          </div>
          <div className="col-span-1 lg:col-span-4">
            <div className="relative top-4 lg:sticky">
              <PostWidget
                slug={post.slug}
                categories={post.categories.map((category) => category.slug)}
              />
              <Categories />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default PostDetails

export async function getStaticProps({ params }) {
  const data = await getPostDetails(params.slug)

  return {
    props: { post: data },
  }
}

export async function getStaticPaths() {
  const posts = await getPosts()

  return {
    paths: posts.map(({ node: { slug } }) => ({ params: { slug } })),
    fallback: true,
  }
}
