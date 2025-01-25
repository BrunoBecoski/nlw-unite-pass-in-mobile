import { MaterialIcons } from '@expo/vector-icons';

import { MaterialIconsTypes } from '../@types/MaterialIcons';
import { colors } from '@/styles/colors';

interface IconProps {
  name: MaterialIconsTypes
  color: 'orange' | 'green' | 'red' | 'black'
  size: 20 | 24 | 32
  className?: string
}

export function Icon({ name, color, size, className }: IconProps) {
  return (
    <MaterialIcons
      className={className}
      name={name}
      color={colors[color][500]}
      size={size}
    />
  )
}