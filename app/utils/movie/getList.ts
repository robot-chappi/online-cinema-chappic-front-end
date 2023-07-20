export const getListEach = (index: number, length: number, name: string) =>
	index + 1 === length ? name : name + ', '

interface IArrayItem {
	name: string
}

export const getList = (array: IArrayItem[]) =>
	array.map((i) => i.name).join(', ')
