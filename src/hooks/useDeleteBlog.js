import { useMutation, useQueryClient } from '@tanstack/react-query'
import blogService from '../services/blogs'

const useDeleteBlog = (notify) => {
  const queryClient = useQueryClient()
  const { mutate } = useMutation({
    mutationFn: blogService.remove,
    onSuccess: (_,  blogId ) => {
      queryClient.setQueryData(['blogs'], (blogs) => {
        return blogs.filter(blog => blog.id !== blogId)
      })
      notify('The blog has been removed')
    },
    onError: async (error) => {
      notify(error.response.data.error, true)
    }
  })

  return [{ deleteBlog: mutate } ]
}

export default useDeleteBlog
