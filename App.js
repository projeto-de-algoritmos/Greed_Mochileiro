import { StatusBar } from 'expo-status-bar';
import { ImageBackground, StyleSheet, Text, View } from 'react-native';
import Home from './app/components/Home/Home';
import background from './assets/background.png';

export default function App() {
  return (
    <ImageBackground source={background} resizeMode="cover" style={{
      flex: 1,
      justifyContent: "center"
    }}>
      <View style={styles.container}>
        <Home />
        <StatusBar style="auto" />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
