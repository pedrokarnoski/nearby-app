import { StyleSheet } from 'react-native'
import { colors, fontFamily } from '@/styles/theme'

export const s = StyleSheet.create({
  container: {
    paddingVertical: 12,
    paddingHorizontal: 32,
    paddingBottom: 0,
    borderTopStartRadius: 20,
    borderTopEndRadius: 20,
    backgroundColor: colors.gray[100],
  },
  name: {
    fontSize: 20,
    fontFamily: fontFamily.bold,
    color: colors.gray[600],
  },
  description: {
    marginTop: 8,
    fontSize: 16,
    fontFamily: fontFamily.regular,
    color: colors.gray[500],
  },
  group: {
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: colors.gray[200],
    paddingVertical: 16,
  },
  title: {
    fontSize: 14,
    fontFamily: fontFamily.regular,
    color: colors.gray[500],
    marginBottom: 8,
  },
  rule: {
    fontSize: 14,
    paddingVertical: 4,
    fontFamily: fontFamily.regular,
    color: colors.gray[500],
  },
})
