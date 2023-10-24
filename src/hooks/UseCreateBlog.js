import { useMutation, useQueryClient } from '@tanstack/react-query'
import blogService from '../services/blogs'

const useCreateBlog = (notify, user) => {
  const queryClient = useQueryClient()
  const { mutateAsync } = useMutation({
    mutationFn: blogService.create,
    onSuccess: (createdBlog) => {
      const message = `A new blog ${createdBlog.title} by ${user.name} added`
      notify(message)
      queryClient.invalidateQueries({ queryKey: ['blogs'] })
    },
    onError: async (error) => {
      notify(error.response.data.error, true)
    }
  })

  return [{ createBlog: mutateAsync } ]
}

export default useCreateBlog
