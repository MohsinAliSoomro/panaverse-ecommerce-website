import { type SchemaTypeDefinition } from 'sanity'

import blockContent from './schemas/blockContent'
import products from './schemas/product'
import category from './schemas/category'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [products, category, blockContent],
}
