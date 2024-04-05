import QRCodeSvg from 'react-native-qrcode-svg'

import { colors } from '@/styles/colors'

interface QRCodeProps {
  value: string
  size: number
}

export function QRCode({ value, size }: QRCodeProps) {
  return (
    <QRCodeSvg 
      value={value} 
      size={size} 
      color={colors.white}
      backgroundColor="transparent"
    />
  )
}