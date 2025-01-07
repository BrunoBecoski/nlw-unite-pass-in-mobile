import { Text, View } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import dayjs from 'dayjs'

import { colors } from '@/styles/colors'

type EventAttendee = {
  title: string,
  slug: string,
  details: string,
  checkIn: boolean,
  endDate: Date,
  startDate: Date,
}

interface EventProps {
  event: EventAttendee
}

export function Event({ event }: EventProps) {

  if ('checkIn' in event) {
    const { title, slug, details, checkIn, startDate, endDate } = event

    return (
      <View className="my-6 px-6">
        <View>
          <Text className="font-bold text-2xl text-orange-500">{title}</Text>
          <Text className="text-gray-200">{slug}</Text>
        </View>

        <Text className="text-zinc-100 text-lg my-4">{details}</Text>

        <View className="flex-row justify-between items-center">

          {
            checkIn ? (
              <View className="flex-row items-center gap-2">
                <MaterialIcons
                  name={checkIn ? "check-box-outline-blank" : "check-box"}
                  size={24}
                  color={colors.orange[500]}
                />
                <Text className="text-orange-500 text-xl font-semibold">Check-in </Text>
              </View>

            ) : (
              <View className="flex-row items-center gap-2">
                <MaterialIcons
                  name={checkIn ? "check-box-outline-blank" : "check-box"}
                  size={24}
                  color={colors.green[200]}
                />
                <Text className="text-green-200 text-xl font-semibold">Check-in </Text>
              </View>
            )
          }

          <View className="flex-row items-center">
            <Text className="text-zinc-300 italic font-black text-xl">
              {dayjs(startDate).format('DD/MM/YY')}
            </Text>

            <Text className="text-orange-500 italic font-black text-2xl"> {'-'} </Text>

            <Text className="text-zinc-300 italic font-black text-lg">
              {dayjs(endDate).format('DD/MM/YY')}
            </Text>
          </View>
        </View>
      </View>
    )
  }
}