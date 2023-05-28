import { ImageBackground, StyleSheet, View } from 'react-native';
import Home from './app/components/Home/Home';
import background from './assets/background.png';
import { PaperProvider } from 'react-native-paper';

export default function App() {
  return (
    <PaperProvider>
      <ImageBackground
        source={background}
        resizeMode="cover"
        style={{
          flex: 1,
          justifyContent: "center"
        }}
      >
        <View style={styles.container}>
          <Home />
        </View>
      </ImageBackground>
    </PaperProvider>
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
