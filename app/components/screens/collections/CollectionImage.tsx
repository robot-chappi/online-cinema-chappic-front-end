import Image from 'next/image'
import { FC } from 'react'

import { ICollection } from './collections.interface'

const CollectionImage: FC<{ collection: ICollection }> = ({
	collection: { image, title },
}) => {
	return <Image alt={title} src={image} fill sizes="1000px" draggable={false} />
}

export default CollectionImage
