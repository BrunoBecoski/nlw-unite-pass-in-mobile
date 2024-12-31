import { Text, View } from "react-native";
import { Button } from "./button";

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
    <View className="py-4"> 
      <View className="mb-4">
        <Text className="text-zinc-50 font-bold text-3xl">{title}</Text>
        <Text className="text-zinc-300">{slug}</Text>
      </View>
      <Text className="text-zinc-100 text-xl">{details}</Text>

      {
        checkIn ? (
          <Button title="Confirmado" disabled/>
        ): (
          <Button title="Confirmar" />
        )
      }
    </View>
  )
}