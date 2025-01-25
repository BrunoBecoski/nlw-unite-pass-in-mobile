import { Text, View } from 'react-native'
import dayjs from 'dayjs'

import { EventEventsType } from '@/app/events'
import { Button } from './button'

interface EventEventsProps {
  event: EventEventsType
  handleJoin: (event: EventEventsType) => void
}

export function EventEvents({ event, handleJoin }: EventEventsProps) {
  const { title, slug, details, attendees, maximumAttendees, startDate, endDate,  } = event

  return (
    <View className="my-6 px-6">
    <View>
      <Text className="font-bold text-2xl text-orange-500">{title}</Text>
      <Text className="text-gray-200">{slug}</Text>
    </View>

    <Text className="text-zinc-100 text-lg my-4">{details}</Text>

    <View className="flex-row justify-between items-center mb-4">

      <Text className="text-zinc-300 text-lg font-semibold">Participante(s): {attendees} de {maximumAttendees}</Text>

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

    <Button size="full" onPress={() => handleJoin(event)}>
      <Button.Title title="Participar do evento"/>
      <Button.Icon icon="add" />
    </Button>
  </View>
  )
}