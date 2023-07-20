import { useQuery } from 'react-query'

import { IOption } from '@/components/ui/select/select.interface'

import { CountryService } from '@/services/country.service'

import { toastError } from '@/utils/toast-error'

export const useAdminCountries = () => {
	const queryData = useQuery('list of country', () => CountryService.getAll(), {
		select: ({ data }) =>
			data.map(
				(country): IOption => ({
					label: country.name,
					value: country._id,
				})
			),

		onError: (error) => {
			toastError(error, 'Country list')
		},
	})

	return queryData
}
