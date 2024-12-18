import { Text, View } from 'react-native'
import { s } from './styles'
import { IconMapPin, IconPhone, IconTicket } from '@tabler/icons-react-native'

import { Info } from '@/components/info'

export type DetailsProps = {
  name: string
  description: string
  address: string
  phone: string
  coupons: number
  rules: {
    id: string
    description: string
  }[]
}

type DataProps = {
  data: DetailsProps
}

export function Details({ data }: DataProps) {
  return (
    <View style={s.container}>
      <View style={s.group}>
        <Text style={s.name}>{data.name}</Text>
        <Text style={s.description}>{data.description}</Text>
      </View>
      <View style={s.group}>
        <Text style={s.title}>Informações:</Text>
        <Info
          icon={IconTicket}
          description={`${data.coupons} cupons disponíveis`}
        />
        <Info icon={IconMapPin} description={data.address} />
        <Info icon={IconPhone} description={data.phone} />
      </View>

      <View style={s.group}>
        <Text style={s.title}>Regulamento:</Text>
        {data.rules.map(rule => (
          <Text key={rule.id} style={s.rule}>
            {`\u2022 ${rule.description}`}
          </Text>
        ))}
      </View>
    </View>
  )
}
