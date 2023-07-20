import dynamic from 'next/dynamic'
import { FC } from 'react'

import Banner from '@/ui/banner/Banner'
import Gallery from '@/ui/gallery/Gallery'
import SubHeading from '@/ui/heading/SubHeading'

import Meta from '@/utils/meta/Meta'

import Error404 from '../../../../pages/404'
import { IMoviePage } from '../../../../pages/movie/[slug]'

import Content from './Content/Content'
import { useUpdateCountOpened } from './useUpdateCountOpened'

const DynamicPlayer = dynamic(() => import('@/ui/video-player/VideoPlayer'), {
	ssr: false,
})

const DynamicRateMovie = dynamic(() => import('./RateMovie/RateMovie'), {
	ssr: false,
})
const SingleMovie: FC<IMoviePage> = ({ movie, similarMovies }) => {
	// eslint-disable-next-line react-hooks/rules-of-hooks
	if (movie) useUpdateCountOpened(movie.slug)
	return movie ? (
		<Meta title={movie.title} description={`Watch ${movie.title}`}>
			<Banner
				image={movie.bigPoster}
				Detail={() => <Content movie={movie} />}
			/>

			<DynamicPlayer slug={movie.slug} videoSource={movie.videoUrl} />

			<div className="mt-12">
				<SubHeading title="Similar" />
				<Gallery items={similarMovies} />
			</div>

			<DynamicRateMovie slug={movie.slug} id={movie._id} />
		</Meta>
	) : (
		<Error404 />
	)
}

export default SingleMovie
