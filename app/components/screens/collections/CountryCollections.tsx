import { FC } from 'react'

import Description from '@/components/ui/heading/Description'
import Heading from '@/components/ui/heading/Heading'

import Meta from '@/utils/meta/Meta'

import styles from './Collections.module.scss'
import CountryCollectionItem from './CountryCollectionItem'
import { ICollection } from './collections.interface'

const title = 'Country collections'
const description = 'In this section you will find all countries on our site'

const CountryCollections: FC<{ collections: ICollection[] }> = ({
	collections,
}) => {
	return (
		<Meta title={title} description={description}>
			<Heading title={title} className={styles.heading} />
			<Description text={description} className={styles.description} />

			<section className={styles.collections}>
				{collections.map((c) => (
					<CountryCollectionItem key={c._id} collection={c} />
				))}
			</section>
		</Meta>
	)
}

export default CountryCollections
