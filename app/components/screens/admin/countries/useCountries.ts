import { getAdminUrl } from 'config/url.config'
import { useRouter } from 'next/router'
import { ChangeEvent, useMemo, useState } from 'react'
import { useMutation, useQuery } from 'react-query'
import { toastr } from 'react-redux-toastr'

import { ITableItem } from '@/ui/admin-table/AdminTable/admin-table.interface'

import { useDebounce } from '@/hooks/useDebounce'

import { CountryService } from '@/services/country.service'

import { toastError } from '@/utils/toast-error'

export const useCountries = () => {
	const [searchTerm, setSearchTerm] = useState<string>('')
	const debouncedSearch = useDebounce(searchTerm, 500)

	const { push } = useRouter()

	const queryData = useQuery(
		['countries list', debouncedSearch],
		() => CountryService.getAll(debouncedSearch),
		{
			select: ({ data }) =>
				data.map(
					(country): ITableItem => ({
						_id: country._id,
						editUrl: getAdminUrl(`country/edit/${country._id}`),
						items: [country.name, country.slug],
					})
				),

			onError: (error) => {
				toastError(error, 'Country list')
			},
		}
	)

	const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(e.target.value)
	}

	const { mutateAsync: deleteAsync } = useMutation(
		'delete country',
		(countryId: string) => CountryService.delete(countryId),
		{
			onError: (error) => {
				toastError(error, 'Delete country')
			},

			onSuccess: () => {
				toastr.success('Delete country', 'Delete was successful')
				queryData.refetch()
			},
		}
	)

	const { mutateAsync: createAsync } = useMutation(
		'create country',
		() => CountryService.create(),
		{
			onError: (error) => {
				toastError(error, 'Create country')
			},

			onSuccess: ({ data: _id }) => {
				toastr.success('Create country', 'Create was successful')
				push(getAdminUrl(`country/edit/${_id}`))
			},
		}
	)

	return useMemo(
		() => ({
			handleSearch,
			...queryData,
			searchTerm,
			deleteAsync,
			createAsync,
		}),
		[queryData, searchTerm, deleteAsync, createAsync]
	)
}
