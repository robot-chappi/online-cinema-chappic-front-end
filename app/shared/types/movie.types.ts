import { TypeMaterialIconName } from './icon.types'

export interface IGenre {
	_id: string
	name: string
	slug: string
	description: string
	icon: TypeMaterialIconName
}

export interface ICountry {
	_id: string
	name: string
	slug: string
}

export interface IParameters {
	year: number
	duration: number
}

export interface IActor {
	_id: string
	photo: string
	name: string
	countMovies: number
	slug: string
}

export interface IMovie {
	_id: string
	poster: string
	bigPoster: string
	title: string
	parameters: IParameters
	genres: IGenre[]
	actors: IActor[]
	countries: ICountry[]
	countOpened: number
	videoUrl: string
	rating: number
	slug: string
}
