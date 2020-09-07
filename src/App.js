import React from 'react';
import {
  View,
  KeyboardAvoidingView,
  Image,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  Animated,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';

import Logo from './assets/logo.png'

const styles = StyleSheet.create({
  background: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#191919"
  },
  containerLogo: {
    flex: 1,
    justifyContent: "center",
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: '90%',
    paddingBottom: 50,
  },
  input: {
    backgroundColor: "#FFF",
    width: '90%',
    marginBottom: 15,
    color: "#222",
    fontSize: 17,
    borderRadius: 7,
    padding: 10,
  },
  btnSubmit: {
    backgroundColor: "#35AAFF",
    width: '90%',
    height: 45,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 7,
  },
  btnSubmitText: {
    color: "#FFF",
    fontSize: 18,
  },
  btnRegister: {
    marginTop: 10,
  },
  btnRegisterText: {
    color: "#FFF",
  },
});

const App = () => {
  const [offset] = React.useState(new Animated.ValueXY({ x: 0, y: 80 }));
  const [opacity] = React.useState(new Animated.Value(0));
  const [logo] = React.useState(new Animated.ValueXY({ x: 130, y: 155 }));

  React.useEffect(() => {
    keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', keyboardDidShow);
    keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', keyboardDidHide);

    Animated.parallel([
      Animated.spring(offset.y, {
        toValue: 0,
        speed: 4,
        bounciness: 20,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      })
    ]).start();
  }, [])

  function keyboardDidShow() {
    Animated.parallel([
      Animated.timing(logo.x, {
        toValue: 55,
        duration: 100,
        useNativeDriver: false,
      }),
      Animated.timing(logo.y, {
        toValue: 65,
        duration: 100,
        useNativeDriver: false,
      }),
    ]).start();
  }

  function keyboardDidHide() {
    Animated.parallel([
      Animated.timing(logo.x, {
        toValue: 130,
        duration: 100,
        useNativeDriver: false,
      }),
      Animated.timing(logo.y, {
        toValue: 155,
        duration: 100,
        useNativeDriver: false,
      }),
    ]).start();
  }


  return (
    <KeyboardAvoidingView
      style={styles.background}
      behavior={Platform.OS == "ios" ? "padding" : "height"}
    >
      <View style={styles.containerLogo}>
        <Animated.Image
          source={Logo}
          style={{
            width: logo.x,
            height: logo.y,
          }}
        />
      </View>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Animated.View
          style={[
            styles.container,
            {
              opacity: opacity,
              transform: [
                { translateY: offset.y }
              ]
            }
          ]}
        >
          <TextInput
            style={styles.input}
            placeholder='Email'
            autoCorrect={false}
            onChangeText={() => { }}
          />
          <TextInput
            style={styles.input}
            placeholder='Senha'
            autoCorrect={false}
            onChangeText={() => { }}
          />

          <TouchableOpacity style={styles.btnSubmit}>
            <Text style={styles.btnSubmitText}>Acessar</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.btnRegister}>
            <Text style={styles.btnRegisterText}>Criar conta gratuita</Text>
          </TouchableOpacity>
        </Animated.View>

      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  )
}

export default App;