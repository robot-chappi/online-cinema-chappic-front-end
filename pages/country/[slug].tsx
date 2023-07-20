import { GetStaticPaths, GetStaticProps, NextPage } from 'next'

import Catalog from '@/components/ui/catalog-movies/Catalog'

import { ICountry, IMovie } from '@/shared/types/movie.types'

import { CountryService } from '@/services/country.service'
import { MovieService } from '@/services/movie.service'

import Error404 from '../404'

interface ICountryPage {
	movies: IMovie[]
	country: ICountry | undefined
}

const CountryPage: NextPage<ICountryPage> = ({ movies, country }) => {
	return country ? (
		<Catalog movies={movies || []} title={country.name} />
	) : (
		<Error404 />
	)
}

export const getStaticPaths: GetStaticPaths = async () => {
	try {
		const { data: countries } = await CountryService.getAll()
		const paths = countries.map((c) => ({
			params: { slug: c.slug },
		}))

		return { paths, fallback: 'blocking' }
	} catch (error) {
		return {
			paths: [],
			fallback: false,
		}
	}
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
	try {
		const { data: country } = await CountryService.getBySlug(
			String(params?.slug)
		)

		const { data: movies } = await MovieService.getByCountries([country._id])
		return {
			props: {
				movies,
				country,
			},
			revalidate: 60,
		}
	} catch (error) {
		return {
			notFound: true,
		}
	}
}

export default CountryPage
