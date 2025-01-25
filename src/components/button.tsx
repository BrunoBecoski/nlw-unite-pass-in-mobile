import { ActivityIndicator, Text, TouchableOpacity, TouchableOpacityProps, View } from 'react-native'
import { tv, type VariantProps } from 'tailwind-variants'

import { MaterialIconsTypes } from '../@types/MaterialIcons'
import { Icon } from './icon'

const button = tv({
  variants: {
    variant: {
      default: 'w-full h-14 px-6 flex-row gap-4 items-center justify-center rounded-lg disabled:opacity-95',
      icon: 'h-12',
    },

    size: {
      full: 'w-full',
      auto: 'w-auto',
      flex: 'flex-1',
    },

    color: {
      orange: 'bg-orange-500',
      green: 'bg-green-300',
      none: 'bg-none'
    },

    disabled: {
      true: 'opacity-50',
      false: 'opacity-100',
    }
  },
  
  defaultVariants: {
    variant: 'default',
    size: 'full',
    color: 'orange',
    disabled: false,
  }
})

interface ButtonProps extends TouchableOpacityProps, VariantProps<typeof button> {
  title?: string;
  icon?: MaterialIconsTypes 
  isLoading?: boolean;
}

function Button({ variant, title, size, color, children, isLoading = false, ...props }: ButtonProps) {
  return (
    <TouchableOpacity
      disabled={isLoading}
      activeOpacity={0.7}
      {...props}
    >
      <View className={button({ variant, size, color, disabled: isLoading })}>
        {isLoading 
          ?
            <ActivityIndicator
              className="text-green-900"
            />
          :
            children
          }
        </View>
      </TouchableOpacity>
  )
}

interface ButtonTitleProps {
  title: string
}

function ButtonTitle({ title }: ButtonTitleProps) {
  return (
    <Text className="text-green-900 text-base font-bold uppercase">
      {title}
    </Text>
  )
}

interface ButtonIconProps {
  icon: MaterialIconsTypes
  color?: 'orange' | 'green' | 'red' | 'black' 
  size?: 20 | 24 | 32
}

function ButtonIcon({ icon, color = 'black', size = 20 }: ButtonIconProps) {
  return (
    <Icon
      color={color}
      name={icon}
      size={size}
    />
  )
}

Button.Title = ButtonTitle
Button.Icon = ButtonIcon

export { Button }