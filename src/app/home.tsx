import { useEffect, useState } from 'react'
import { Alert, View, Text } from 'react-native'

import MapView, { Marker, Callout } from 'react-native-maps'

import { api } from '@/api/api'
import { Categories, type CategoriesProps } from '@/components/categories'
import type { PlaceProps } from '@/components/place'
import { Places } from '@/components/places'

import { colors, fontFamily } from '@/styles/theme'
import { router } from 'expo-router'

type MarketProps = PlaceProps & {
  latitude: number
  longitude: number
}

const location = {
  latitude: -23.561187293883442,
  longitude: -46.656451388116494,
}

export default function Home() {
  const [categories, setCategories] = useState<CategoriesProps>([])
  const [markets, setMarkets] = useState<MarketProps[]>([])
  const [category, setCategory] = useState('')
  // const [location, setLocation] = useState<Region | null>(null)

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

  async function fetchMarkets() {
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

  // async function getCurrentLocation() {
  //   try {
  //     const { status } = await Location.requestForegroundPermissionsAsync()

  //     if (status !== 'granted') {
  //       Alert.alert(
  //         'Permissão negada',
  //         'Permita o acesso à localização para usar o app.'
  //       )
  //       return
  //     }

  //     const {
  //       coords: { latitude, longitude },
  //     } = await Location.getCurrentPositionAsync()

  //     setLocation({
  //       latitude,
  //       longitude,
  //       latitudeDelta: 0.01,
  //       longitudeDelta: 0.01,
  //     })
  //   } catch (error) {
  //     console.error(error)
  //     Alert.alert('Localização', 'Não foi possível obter a localização atual.')
  //   }
  // }

  useEffect(() => {
    fetchCategories()
    // getCurrentLocation()
  }, [])

  useEffect(() => {
    fetchMarkets()
  }, [category])

  return (
    <View style={{ flex: 1 }}>
      <Categories
        data={categories}
        selected={category}
        onSelect={setCategory}
      />

      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      >
        <Marker
          identifier="current"
          coordinate={{
            latitude: location.latitude,
            longitude: location.longitude,
          }}
          image={require('@/assets/location.png')}
        />
        {markets.map(market => (
          <Marker
            key={market.id}
            identifier={market.id}
            coordinate={{
              latitude: market.latitude,
              longitude: market.longitude,
            }}
            image={require('@/assets/pin.png')}
          >
            <Callout
              onPress={() => {
                router.navigate(`/market/${market.id}`)
              }}
            >
              <View>
                <Text
                  style={{
                    fontSize: 14,
                    color: colors.gray[600],
                    fontFamily: fontFamily.medium,
                  }}
                >
                  {market.name}
                </Text>
                <Text
                  style={{
                    fontSize: 12,
                    color: colors.gray[600],
                    fontFamily: fontFamily.regular,
                  }}
                >
                  {market.address}
                </Text>
              </View>
            </Callout>
          </Marker>
        ))}
      </MapView>

      <Places data={markets} />
    </View>
  )
}
