import axios, { axiosClassic } from 'api/interceptors'
import { getCountriesUrl } from 'config/api.config'

import { ICountryEditInput } from '@/components/screens/admin/country/country-edit.interface'
import { ICollection } from '@/components/screens/collections/collections.interface'

import { ICountry } from '@/shared/types/movie.types'

export const CountryService = {
	async getAll(searchTerm?: string) {
		return axiosClassic.get<ICountry[]>(getCountriesUrl(''), {
			params: searchTerm
				? {
						searchTerm,
				  }
				: {},
		})
	},

	async getBySlug(slug: string) {
		return axiosClassic.get<ICountry>(getCountriesUrl(`/by-slug/${slug}`))
	},

	async getCollections() {
		return axiosClassic.get<ICollection[]>(getCountriesUrl('/collections'))
	},

	async getById(_id: string) {
		return axios.get<ICountryEditInput>(getCountriesUrl(`/${_id}`))
	},

	async create() {
		return axios.post<string>(getCountriesUrl('/'))
	},

	async update(_id: string, data: ICountryEditInput) {
		return axios.put<string>(getCountriesUrl(`/${_id}`), data)
	},

	async delete(_id: string) {
		return axios.delete<string>(getCountriesUrl(`/${_id}`))
	},
}
