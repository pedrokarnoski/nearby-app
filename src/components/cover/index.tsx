import { ImageBackground, View } from 'react-native'
import { s } from './styles'
import { router } from 'expo-router'
import { IconArrowLeft } from '@tabler/icons-react-native'

import { Button } from '@/components/button'

type CoverProps = {
  image: string
}

export function Cover({ image }: CoverProps) {
  return (
    <ImageBackground source={{ uri: image }} style={s.container}>
      <View style={s.header}>
        <Button style={{ width: 40, height: 40 }} onPress={() => router.back()}>
          <Button.Icon icon={IconArrowLeft} />
        </Button>
      </View>
    </ImageBackground>
  )
}
