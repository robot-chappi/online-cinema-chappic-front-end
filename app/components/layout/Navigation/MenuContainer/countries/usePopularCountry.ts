import { getCountryUrl } from 'config/url.config'
import { useQuery } from 'react-query'

import { CountryService } from '@/services/country.service'

import { IMenuItem } from '../menu.interface'

export const usePopularCountries = () => {
	const queryData = useQuery(
		'popular country menu',
		() => CountryService.getAll(),
		{
			select: ({ data }) =>
				data
					.map(
						(country) =>
							({
								link: getCountryUrl(country.slug),
								title: country.name,
							} as IMenuItem)
					)
					.splice(0, 4),
		}
	)

	return queryData
}
