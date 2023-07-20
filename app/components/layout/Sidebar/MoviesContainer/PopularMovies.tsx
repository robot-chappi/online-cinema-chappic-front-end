import { FC } from 'react'
import { useQuery } from 'react-query'

import SkeletonLoader from '@/ui/SkeletonLoader'

import { MovieService } from '@/services/movie.service'

import MovieList from './MovieList'

const PopularMovies: FC = () => {
	const { isLoading, data: popularMovies } = useQuery(
		'popular movies in sidebar',
		() => MovieService.getMostPopularMovies(),
		{
			select: (data) =>
				data.slice(0, 3).map((item) => ({
					...item,
					countries: item.countries.slice(0, 2),
					genres: item.genres.slice(0, 2),
				})),
		}
	)

	return isLoading ? (
		<div className="mt-11">
			<SkeletonLoader count={3} className="h-28 mb-4" />
		</div>
	) : (
		<MovieList
			link="/trending"
			movies={popularMovies || []}
			title="Popular Movies"
		/>
	)
}

export default PopularMovies
