import CountryEdit from '@/screens/admin/country/CountryEdit'

import { NextPageAuth } from '@/shared/types/auth.types'

const CountryEditPage: NextPageAuth = () => {
	return <CountryEdit />
}

CountryEditPage.isOnlyAdmin = true

export default CountryEditPage
