import { Text, View } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import dayjs from 'dayjs'
import { tv } from 'tailwind-variants'

import { EventAttendeeType } from '@/store/attendee-store'
import { colors } from '@/styles/colors'
import { Button } from './button'
import { router } from 'expo-router'

interface EventAttendeeProps {
  event: EventAttendeeType
}

const text = tv({
  base: 'font-bold text-2xl',

  variants: {
    isCheckIn: {
      true: 'text-green-300',
      false: 'text-orange-500',
    },
  },
  
  defaultVariants: {
    isCheckIn: false,
  }
})

export function EventAttendee({ event }: EventAttendeeProps) {
  const { title, slug, details, checkIn, startDate, endDate } = event

  return (
    <View className="my-6 px-6">
      <View>
        <Text className={text({ isCheckIn: checkIn })}>{title}</Text>
        <Text className="text-gray-200">{slug}</Text>
      </View>

      <Text className="text-zinc-100 text-lg my-4">{details}</Text>

      <View className="flex-row justify-between items-center mb-4">
        <Button 
          title="Ver tíquete"
          onPress={ () => router.navigate(`/ticket/${slug}`)}
        >
          <MaterialIcons
            name="check-box-outline-blank"
            size={24}
            color={colors.green[200]}
          />
        </Button>
  
        <View className="flex-row items-center">
          <Text className="text-zinc-300 italic font-black text-xl">
            {dayjs(startDate).format('DD/MM/YY')}
          </Text>

          <Text className={text({ isCheckIn: checkIn })}> {'-'} </Text>

          <Text className="text-zinc-300 italic font-black text-lg">
            {dayjs(endDate).format('DD/MM/YY')}
          </Text>
        </View>
      </View>
    </View>
  )
}