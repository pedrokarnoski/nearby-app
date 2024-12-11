import { Alert, View } from 'react-native'

import { api } from '@/api/api'
import { useEffect, useState } from 'react'
import { Categories, type CategoriesProps } from '@/components/categories'

export default function Home() {
  const [categories, setCategories] = useState<CategoriesProps>([])
  const [category, setCategory] = useState('')

  async function fetchCategories() {
    try {
      const { data } = await api.get('/categories')

      setCategories(data)
      setCategory(data[0].name)
    } catch (error) {
      console.error(error)

      Alert.alert('Categorias', 'Não foi possível carregar as categorias.')
    }
  }

  useEffect(() => {
    fetchCategories()
  }, [])

  return (
    <View style={{ flex: 1 }}>
      <Categories
        data={categories}
        selected={category}
        onSelect={setCategory}
      />
    </View>
  )
}
