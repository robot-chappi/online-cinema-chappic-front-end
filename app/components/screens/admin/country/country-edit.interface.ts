import { ICountry } from '@/shared/types/movie.types'

export interface ICountryEditInput extends Omit<ICountry, '_id'> {}
