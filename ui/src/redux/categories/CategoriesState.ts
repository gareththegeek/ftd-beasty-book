import Category from './Category'

export default interface CategoriesState {
    all: Category[]
    lookup: { [id: string]: Category }
}
