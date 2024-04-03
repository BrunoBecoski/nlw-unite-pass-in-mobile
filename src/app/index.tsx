import { StatusBar, StyleSheet, Text, View } from 'react-native'

export default function Home() {
  return (
    <View style={styles.container}>
      <StatusBar
        backgroundColor="#00292E"
        barStyle="light-content"
      />
      <Text style={styles.title}>Hello NLW Unite</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#00292E',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: '#F48F56', 
    fontSize: 48,
    fontWeight: 'bold',
  }
})