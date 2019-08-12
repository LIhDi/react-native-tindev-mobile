import React, {useState, useEffect} from 'react'
import { KeyboardAvoidingView, Platform, StyleSheet, Image, TextInput, Text, TouchableOpacity } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'

import logo from '../assets/logo.png'
import api from '../services/api';

export default function Login({ navigation }) {
  const [user, setUser] = useState('')

  useEffect(() => {
    AsyncStorage.getItem('user').then(user => {
      if (user) {
        navigation.navigate('Main', {user})
      }
    })
  }, [])

  async function handleLogin() {
    const response = await api.post('/devs', {username: user})
    const { _id } = response.data

    await AsyncStorage.setItem('user', _id)

    navigation.navigate('Main', { user:_id })
  }
  return (
    <KeyboardAvoidingView
        style={styles.container}
        behavior="padding"
        enabled={Platform.OS === 'ios'}>
      <Image source={logo} />
      <TextInput
        value={user}
        onChangeText={setUser}
        autoCapitalize="none"
        autoCorrect={false}
        style={styles.input}
        placeholderTextColor="#999"
        placeholder="Digite seu usuário do GitHub"
      />
      <TouchableOpacity onPress={handleLogin} style={styles.button}>
        <Text style={styles.buttonText}>Enviar</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30
  },
  input: {
    height: 46,
    alignSelf: 'stretch',
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 4,
    marginTop: 20,
    paddingHorizontal: 15
  },
  button: {
    height: 46,
    alignSelf: 'stretch',
    backgroundColor: '#DF4723',
    justifyContent: 'center',
    marginTop: 10,
    alignItems: 'center',
    borderRadius: 4,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold'
  }
})