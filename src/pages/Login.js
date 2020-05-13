import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  AsyncStorage,
} from "react-native";

import api from "../services/api";
import logo from "../assets/logo.png";

export default function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  useEffect(() => {
    AsyncStorage.getItem("user_id").then((user) => {
      if (user) {
        navigation.navigate("Dashboard");
      }
    });
  }, []);

  async function handleSubmit() {
    const res = await api.post("/login", { email, pass });
    const { _id } = res.data;

    if (_id == undefined) {
      alert(res.data);
    } else {
      await AsyncStorage.setItem("user_id", _id);

      navigation.navigate("Dashboard");
    }
  }

  async function handleSignup() {
    navigation.navigate("Register");
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      enable={Platform.OS === "ios"}
      behavior="padding"
    >
      <Image
        source={require("../assets/background.png")}
        style={styles.backgroundImg}
      />
      <View style={styles.form}>
        <Image source={logo} style={styles.logo} />
        <Text style={styles.label}>E-mail</Text>
        <TextInput
          style={styles.input}
          placeholder="Your email"
          placeholderTextColor="#999"
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          value={email}
          onChangeText={setEmail}
        />
        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          placeholder="******"
          placeholderTextColor="#999"
          textContentType="password"
          secureTextEntry={true}
          autoCapitalize="none"
          autoCorrect={false}
          value={pass}
          onChangeText={setPass}
        />
        <TouchableOpacity onPress={handleSubmit} style={styles.button}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <View style={styles.linkView}>
          <Text onPress={handleSignup} style={styles.link}>
            Register
          </Text>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  backgroundImg: {
    height: 1000,
    position: "absolute",
    resizeMode: "cover",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  form: {
    paddingHorizontal: 30,
    marginTop: 30,
    backgroundColor: "#FFFFFF",
    borderRadius: 4,
    paddingBottom: 20,
    paddingTop: 20,
  },
  label: {
    fontWeight: "bold",
    color: "#444",
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    paddingHorizontal: 20,
    fontSize: 16,
    color: "#444",
    height: 44,
    marginBottom: 20,
    borderRadius: 2,
  },
  button: {
    height: 42,
    backgroundColor: "#f05a5b",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 2,
  },
  buttonText: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 16,
  },
  linkView: {
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
    color: "blue",
  },
  link: {
    color: "blue",
  },
});
