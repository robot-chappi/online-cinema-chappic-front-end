import { getCountryUrl, getGenreUrl, getMovieUrl } from 'config/url.config'
import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'

import MaterialIcon from '@/ui/MaterialIcon'

import { IMovie } from '@/shared/types/movie.types'

import { getListEach } from '@/utils/movie/getList'

import styles from './MovieList.module.scss'

const MovieItem: FC<{ movie: IMovie }> = ({ movie }) => {
	return (
		<div className={styles.item}>
			<Link href={getMovieUrl(movie.slug)} legacyBehavior>
				<a>
					<Image
						width={65}
						height={97}
						src={movie.poster}
						alt={movie.title}
						draggable={false}
						priority
					/>
				</a>
			</Link>
			<div className={styles.info}>
				<div>
					<div className={styles.title}>{movie.title}</div>
					<div className={styles.genres}>
						{movie.genres.map((genre, idx) => (
							<Link
								key={genre._id}
								href={getGenreUrl(genre.slug)}
								legacyBehavior
							>
								<a>{getListEach(idx, movie.genres.length, genre.name)}</a>
							</Link>
						))}
					</div>
					<div className={styles.genres}>
						{movie.countries.map((country, idx) => (
							<Link
								key={country._id}
								href={getCountryUrl(country.slug)}
								legacyBehavior
							>
								<a>{getListEach(idx, movie.countries.length, country.name)}</a>
							</Link>
						))}
					</div>
				</div>
				<div className={styles.rating}>
					<MaterialIcon name="MdStarRate" />
					<span>{movie.rating.toFixed(1)}</span>
				</div>
			</div>
		</div>
	)
}

export default MovieItem
