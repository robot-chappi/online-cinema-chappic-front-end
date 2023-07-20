import cn from 'classnames'
import parse from 'html-react-parser'
import { FC } from 'react'

interface IDescription {
	text: string
	className?: string
}

const Description: FC<IDescription> = ({ text, className }) => {
	return (
		<div
			className={cn('text-lg font-light text-white text-opacity-60', className)}
		>
			{parse(text)}
		</div>
	)
}

export default Description
