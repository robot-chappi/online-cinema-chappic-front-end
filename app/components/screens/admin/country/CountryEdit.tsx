import dynamic from 'next/dynamic'
import { FC } from 'react'
import { useForm } from 'react-hook-form'

import SkeletonLoader from '@/ui/SkeletonLoader'
import AdminNavigation from '@/ui/admin-navigation/AdminNavigation'
import Button from '@/ui/form-elements/Button'
import Field from '@/ui/form-elements/Field'
import SlugField from '@/ui/form-elements/SlugField/SlugField'
import formStyles from '@/ui/form-elements/admin-form.module.scss'
import Heading from '@/ui/heading/Heading'

import Meta from '@/utils/meta/Meta'
import { generateSlug } from '@/utils/string/generateSlug'

import { ICountryEditInput } from './country-edit.interface'
import { useCountryEdit } from './useCountryEdit'

const DynamicTextEditor = dynamic(
	() => import('@/ui/form-elements/TextEditor'),
	{ ssr: false }
)

const CountryEdit: FC = () => {
	const {
		handleSubmit,
		register,
		formState: { errors },
		setValue,
		getValues,
	} = useForm<ICountryEditInput>({
		mode: 'onChange',
	})

	const { isLoading, onSubmit } = useCountryEdit(setValue)

	return (
		<Meta title="Edit country">
			<AdminNavigation />
			<Heading title="Edit country" />
			<form onSubmit={handleSubmit(onSubmit)} className={formStyles.form}>
				{isLoading ? (
					<SkeletonLoader count={3} />
				) : (
					<>
						<div className={formStyles.fields}>
							<Field
								{...register('name', {
									required: 'Name is required!',
								})}
								placeholder="Name"
								error={errors.name}
							/>

							<SlugField
								register={register}
								error={errors.slug}
								generate={() => {
									setValue('slug', generateSlug(getValues('name')))
								}}
							/>
						</div>

						<Button>Update</Button>
					</>
				)}
			</form>
		</Meta>
	)
}

export default CountryEdit
