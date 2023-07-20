import { GetStaticProps, NextPage } from 'next'

import CountryCollections from '@/components/screens/collections/CountryCollections'
import { ICollection } from '@/components/screens/collections/collections.interface'

import { CountryService } from '@/services/country.service'

import Error404 from './404'

const CountriesPage: NextPage<{ collections: ICollection[] }> = ({
	collections,
}) => {
	return collections ? (
		<CountryCollections collections={collections || []} />
	) : (
		<Error404 />
	)
}

export const getStaticProps: GetStaticProps = async () => {
	try {
		const { data: collections } = await CountryService.getCollections()
		return {
			props: {
				collections,
			},
			revalidate: 60,
		}
	} catch (error) {
		return {
			notFound: true,
		}
	}
}

export default CountriesPage
