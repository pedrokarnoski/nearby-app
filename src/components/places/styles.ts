import { StyleSheet } from 'react-native'
import { colors, fontFamily } from '@/styles/theme'

export const s = StyleSheet.create({
  container: {
    backgroundColor: colors.gray[100],
  },
  content: {
    gap: 8,
    padding: 20,
    paddingBottom: 60,
  },
  indicator: {
    width: 64,
    height: 4,
    backgroundColor: colors.gray[300],
  },
  title: {
    color: colors.gray[600],
    fontSize: 14,
    fontFamily: fontFamily.medium,
    marginBottom: 12,
  },
})
