import { View } from 'react-native'

import { Welcome } from '@/components/welcome'
import { Steps } from '@/components/steps'
import { Button } from '@/components/button'
import { router } from 'expo-router'

export default function Index() {
  return (
    <View style={{ flex: 1, padding: 40, gap: 30 }}>
      <Welcome />

      <Steps />

      <Button onPress={() => router.navigate('/home')}>
        <Button.Title>Começar agora!</Button.Title>
      </Button>
    </View>
  )
}
