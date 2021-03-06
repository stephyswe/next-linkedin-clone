import { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'
import { handlePostState, useSSRPostsState } from '../atoms/postAtom'
import Input from './Input'
import Post from './Post'

function Feed({ posts }) {
  const [realtimePosts, setRealtimePosts] = useState([])
  const [handlePost, setHandlePost] = useRecoilState(handlePostState)
  const [useSSRPosts, setUseSSRPosts] = useRecoilState(useSSRPostsState)

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch('/api/posts', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      })

      const responseData = await response.json()
      setRealtimePosts(responseData)
      setHandlePost(false)
      setUseSSRPosts(false)
    }

    fetchPosts()
  }, [handlePost])

  return (
    <div className="max-w-lg pb-24 space-y-6">
      <Input />
      {/* posts */}
      {!useSSRPosts
        ? realtimePosts.map((post) => <Post key={post._id} post={post} />)
        : posts.map((post) => <Post key={post._id} post={post} />)}
    </div>
  )
}

export default Feed
