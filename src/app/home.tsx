import { Alert, View } from 'react-native'

import { api } from '@/api/api'
import { useEffect, useState } from 'react'
import { Categories, type CategoriesProps } from '@/components/categories'
import { Place, type PlaceProps } from '@/components/place'
import { Places } from '@/components/places'

type MarketProps = PlaceProps & {}

export default function Home() {
  const [categories, setCategories] = useState<CategoriesProps>([])
  const [markets, setMarkets] = useState<MarketProps[]>([])
  const [category, setCategory] = useState('')

  async function fetchCategories() {
    try {
      const { data } = await api.get('/categories')

      setCategories(data)
      setCategory(data[0].id)
    } catch (error) {
      console.error(error)
      Alert.alert('Categorias', 'Não foi possível carregar as categorias.')
    }
  }

  async function fetchMakets() {
    try {
      if (!category) {
        return
      }

      const { data } = await api.get(`/markets/category/${category}`)

      setMarkets(data)
    } catch (error) {
      console.error(error)
      Alert.alert('Locais', 'Não foi possível carregar os locais.')
    }
  }

  useEffect(() => {
    fetchCategories()
  }, [])

  useEffect(() => {
    if (category) fetchMakets()
  }, [category])

  return (
    <View style={{ flex: 1, paddingVertical: 20 }}>
      <Categories
        data={categories}
        selected={category}
        onSelect={setCategory}
      />

      <Places data={markets} />
    </View>
  )
}
