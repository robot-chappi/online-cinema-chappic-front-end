import CountryList from '@/screens/admin/countries/CountryList'

import { NextPageAuth } from '@/shared/types/auth.types'

const CountryListPage: NextPageAuth = () => {
	return <CountryList />
}

CountryListPage.isOnlyAdmin = true

export default CountryListPage
