import { useEffect, useRef, useState } from 'react'
import { Alert, Modal, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'

import { router, useLocalSearchParams } from 'expo-router'

import { api } from '@/api/api'

import { Loading } from '@/components/loading'
import { Cover } from '@/components/cover'
import { Details, type DetailsProps } from '@/components/details'
import { Coupon } from '@/components/coupon'
import { Button } from '@/components/button'
import { CameraView, useCameraPermissions } from 'expo-camera'

type DataProps = DetailsProps & {
  cover: string
}

export default function Market() {
  const { id } = useLocalSearchParams()

  const [market, setMarket] = useState<DataProps | null>(null)
  const [coupon, setCoupon] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isVisibleCamera, setIsVisibleCamera] = useState(false)
  const [isFetchingCoupon, setIsFetchingCoupon] = useState(false)

  const [_, requestPermission] = useCameraPermissions()

  const qrLock = useRef(false)

  async function fetchMarket() {
    try {
      const { data } = await api.get(`/markets/${id}`)

      setMarket(data)
    } catch (error) {
      console.error(error)
      Alert.alert('Local', 'Não foi possível carregar o local.', [
        { text: 'OK', onPress: () => router.back() },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  async function handleOpenCamera() {
    try {
      const { granted } = await requestPermission()

      if (!granted) {
        Alert.alert('Permissão', 'A permissão de câmera é necessária.')
        return
      }

      qrLock.current = false
      setIsVisibleCamera(true)
    } catch (error) {
      console.error(error)
      Alert.alert('Erro', 'Não foi possível abrir a câmera.')
    }
  }

  async function getCoupon(id: string) {
    try {
      setIsFetchingCoupon(true)

      const { data } = await api.patch(`/coupons/${id}`)

      setCoupon(data.coupon)

      Alert.alert('Cupom', `Cupom de desconto: ${data.coupon}`)
    } catch (error) {
      console.error(error)
      Alert.alert('Cupom', 'Não foi possível ler o QR Code.')
    } finally {
      setIsFetchingCoupon(false)
    }
  }

  function handleUseCoupon(id: string) {
    setIsVisibleCamera(false)

    Alert.alert(
      'Cupom',
      'Não é possível reutilizar um cupom já resgatado. Deseja realmente resgatar o cupom?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Resgatar', onPress: () => getCoupon(id) },
      ]
    )
  }

  useEffect(() => {
    fetchMarket()
  }, [id, coupon])
  console.log(id)
  if (isLoading) {
    return <Loading />
  }

  return (
    <View style={{ flex: 1 }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Cover image={market?.cover ?? ''} />

        {market && <Details data={market} />}

        {coupon && <Coupon code="CUPOM10" />}
      </ScrollView>

      <View style={{ padding: 32 }}>
        <Button onPress={handleOpenCamera}>
          <Button.Title>Ler QR Code</Button.Title>
        </Button>
      </View>

      <Modal style={{ flex: 1 }} visible={isVisibleCamera}>
        <CameraView
          style={{ flex: 1 }}
          facing="back"
          onBarcodeScanned={({ data }) => {
            if (data && !qrLock.current) {
              qrLock.current = true

              setTimeout(() => {
                handleUseCoupon(data)
              }, 1000)
            }
          }}
        />

        <View style={{ position: 'absolute', bottom: 32, left: 32, right: 32 }}>
          <Button
            onPress={() => setIsVisibleCamera(false)}
            isLoading={isFetchingCoupon}
          >
            <Button.Title>Voltar</Button.Title>
          </Button>
        </View>
      </Modal>
    </View>
  )
}
