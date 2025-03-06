import { ScrollView, Text, TouchableOpacity, View } from "react-native"

interface RadioGroupProps {
  values: string[],
  currentValue: string | undefined,
  setCurrentValue: (value: string | undefined) => void
}

export function RadioGroup({ values, currentValue, setCurrentValue }: RadioGroupProps) {
  function handlePress(value: string) {
    if (value === currentValue) {
      setCurrentValue(undefined)
    } else {
      setCurrentValue(value)
    }
  }

  return (
    <ScrollView
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      className="h-20" 
      contentContainerClassName="flex flex-row items-center justify-center gap-6 px-6"
    >
      {values.map(value =>
        <TouchableOpacity onPress={() => handlePress(value)} key={value} activeOpacity={.8}>
          <View className={`
              px-4 py-2 border rounded-md flex items-center justify-center
              ${currentValue === value 
                ? 'border-green-500 ' 
                : 'border-white '
              }
            `}>
            <Text className={`
              font-medium text-base
              ${currentValue === value
                ? 'text-green-500'
                : 'text-white'
              }
            `}>
              {value}
            </Text>
          </View>
        </TouchableOpacity>
      )}
    </ScrollView> 
  )
}