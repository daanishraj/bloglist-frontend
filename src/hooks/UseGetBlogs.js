import { useQuery } from '@tanstack/react-query'
import blogService from '../services/blogs'

const useGetBlogs = () => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['blogs'],
    queryFn: blogService.getAll,
    refetchOnWindowFocus: false
  })


  return [data, isLoading, isError, error]
}

export default useGetBlogs