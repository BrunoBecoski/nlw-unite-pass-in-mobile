import { Text, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import dayjs from "dayjs"

import { colors } from "@/styles/colors";

interface EventProps {
  event: {
    id: string,
    slug: string,
    title: string,
    details: string,
    startDate: Date,
    endDate: Date,
    checkIn: boolean,
  }
}

export function Event({ event }: EventProps) {
  const { slug, title, details, startDate, endDate, checkIn } = event

  return (
    <View className="my-6 px-6">
      <View>
        <Text className="font-bold text-2xl text-orange-500">{title}</Text>
        <Text className="text-gray-200">{slug}</Text>
      </View>

      <Text className="text-zinc-100 text-lg my-4">{details}</Text>

      <View className="flex-row justify-between">

        {
          checkIn ? (
            <View className="flex-row items-center gap-2">
              <MaterialCommunityIcons
                name={checkIn ? "checkbox-blank-outline" : "checkbox-outline"}
                size={24}
                color={colors.orange[500]}
                />
              <Text className="text-orange-500 text-xl font-semibold">Check-in </Text>
            </View>
            
          ) : (
            <View className="flex-row items-center gap-2">
              <MaterialCommunityIcons
                name={checkIn ? "checkbox-blank-outline" : "checkbox-outline"}
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