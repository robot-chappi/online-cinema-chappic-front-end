import { FC } from 'react'

import SkeletonLoader from '@/ui/SkeletonLoader'

import Menu from '../Menu'

import { usePopularCountries } from './usePopularCountry'

const CountryMenu: FC = () => {
	const { isLoading, data } = usePopularCountries()

	return isLoading ? (
		<div className="mx-11 mb-6">
			<SkeletonLoader count={5} className="h-7 mt-6" />
		</div>
	) : (
		<Menu menu={{ title: 'Collections by country', items: data || [] }} />
	)
}

export default CountryMenu
