import { getAdminUrl } from 'config/url.config'
import { useRouter } from 'next/router'
import { SubmitHandler, UseFormSetValue } from 'react-hook-form'
import { useMutation, useQuery } from 'react-query'
import { toastr } from 'react-redux-toastr'

import { CountryService } from '@/services/country.service'

import { getKeys } from '@/utils/object/getKeys'
import { toastError } from '@/utils/toast-error'

import { ICountryEditInput } from './country-edit.interface'

export const useCountryEdit = (
	setValue: UseFormSetValue<ICountryEditInput>
) => {
	const { push, query } = useRouter()

	const countryId = String(query.id)

	const { isLoading } = useQuery(
		['country', countryId],
		() => CountryService.getById(countryId),
		{
			onSuccess: ({ data }) => {
				getKeys(data).forEach((key) => {
					setValue(key, data[key])
				})
			},
			onError(error) {
				toastError(error, 'Get country')
			},
			enabled: !!query.id,
		}
	)

	const { mutateAsync } = useMutation(
		'update country',
		(data: ICountryEditInput) => CountryService.update(countryId, data),
		{
			onSuccess() {
				toastr.success('Update country', 'update was successful')
				push(getAdminUrl('countries'))
			},

			onError(error) {
				toastError(error, 'Update country')
			},
		}
	)

	const onSubmit: SubmitHandler<ICountryEditInput> = async (data) => {
		await mutateAsync(data)
	}

	return { onSubmit, isLoading }
}
