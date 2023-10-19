import { useMutation, useQueryClient } from '@tanstack/react-query'
import blogService from '../services/blogs'

const useUpdateBlogLikes = (notify) => {
  const queryClient = useQueryClient()
  const { mutate } = useMutation({
    mutationFn: blogService.updateLikes,
    onSuccess: (updatedBlog, { blogId }) => {
      queryClient.setQueryData(['blogs'], (blogs) => {
        return blogs.map(blog => blog.id === blogId ? updatedBlog : blog)
      })
    },
    onError: async (error) => {
      notify(error.message, true)
    }
  })

  return [{ likeBlog: mutate } ]
}

export default useUpdateBlogLikes
