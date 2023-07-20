import { useState } from 'react'
import { useMutation, useQuery } from 'react-query'
import { toastr } from 'react-redux-toastr'

import { useAuth } from '@/hooks/useAuth'

import { RatingService } from '@/services/rating.service'

import { toastError } from '@/utils/toast-error'

export const useRateMovie = (movieId: string) => {
	const [rating, setRating] = useState<number>(0)
	const [isSent, setIsSent] = useState<boolean>(false)

	const { user } = useAuth()

	const { refetch } = useQuery(
		['your movie rating', movieId],
		() => RatingService.getByUserMovie(movieId),
		{
			onSuccess: ({ data }) => {
				setRating(data)
			},
			onError(error) {
				toastError(error, 'Get rating')
			},
			enabled: !!movieId && !!user,
		}
	)

	const { mutateAsync } = useMutation(
		'set rating movie',
		({ value }: { value: number }) => RatingService.setRating(movieId, value),
		{
			onSuccess() {
				toastr.success('Rate movie', 'You have successfully rated!')

				setIsSent(true)
				refetch()

				setTimeout(() => {
					setIsSent(false)
				}, 2400)
			},

			onError(error) {
				toastError(error, 'Rate movie')
			},
		}
	)

	const handleClick = async (nextValue: number) => {
		setRating(nextValue)
		await mutateAsync({ value: nextValue })
	}

	return { isSent, rating, handleClick }
}
