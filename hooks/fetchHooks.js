import { useQuery } from '@tanstack/react-query'
import * as api from '../api/users'

export const useFetchUser = (activePage) => {
    return useQuery({
        queryKey: ['users', activePage],
        queryFn: () => api.getUsers(activePage),
        keepPreviousData: true
    })
}

export const useFetchUserId = (id) => {
    return useQuery(['user', id], () => api.getUser(id))
}

