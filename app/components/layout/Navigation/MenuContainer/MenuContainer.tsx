import { FC } from 'react'

import Menu from './Menu'
import CountryMenu from './countries/CountryMenu'
import GenreMenu from './genres/GenreMenu'
import { firstMenu, userMenu } from './menu.data'

const MenuContainer: FC = () => {
	return (
		<div>
			<Menu menu={firstMenu} />
			<GenreMenu />
			<CountryMenu />
			<Menu menu={userMenu} />
		</div>
	)
}

export default MenuContainer
