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
  AsyncStorage
} from "react-native";

import logo from "../assets/logo.png";
import api from "../services/api";

export default function Register({ navigation }) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [pass, setPass] = useState("");

  async function handleSubmit() {
    const res = await api.post("/register", {
      email,
      pass,
      name,
      confirmPass
    });
    const { _id } = res.data;

    if (_id == undefined) {
      alert(res.data);
    } else {
      await AsyncStorage.setItem("user", _id);

      navigation.navigate("Login");
    }
  }

  async function handleSignup() {
    navigation.navigate("Login");
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
        <Text style={styles.label}>Name*</Text>
        <TextInput
          style={styles.input}
          placeholder="Your Name"
          placeholderTextColor="#999"
          autoCapitalize="words"
          value={name}
          onChangeText={setName}
        />
        <Text style={styles.label}>E-mail*</Text>
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
        <Text style={styles.label}>Password*</Text>
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
        <Text style={styles.label}>Confirm Password*</Text>
        <TextInput
          style={styles.input}
          placeholder="******"
          placeholderTextColor="#999"
          textContentType="password"
          secureTextEntry={true}
          autoCapitalize="none"
          autoCorrect={false}
          value={confirmPass}
          onChangeText={setConfirmPass}
        />
        <TouchableOpacity onPress={handleSubmit} style={styles.button}>
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>
        <View style={styles.linkView}>
          <Text onPress={handleSignup} style={styles.link}>
            Go back
          </Text>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  backgroundImg: {
    height: 1000,
    position: "absolute"
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  form: {
    paddingHorizontal: 30,
    marginTop: 30,
    backgroundColor: "#FFFFFF",
    borderRadius: 4,
    paddingBottom: 20,
    paddingTop: 20
  },
  label: {
    fontWeight: "bold",
    color: "#444",
    marginBottom: 8
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    paddingHorizontal: 20,
    fontSize: 16,
    color: "#444",
    height: 44,
    marginBottom: 20,
    borderRadius: 2
  },
  button: {
    height: 42,
    backgroundColor: "#f05a5b",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 2
  },

  buttonText: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 16
  },
  linkView: {
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
    color: "blue"
  }
});
