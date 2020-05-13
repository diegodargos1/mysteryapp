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
import Menu, { menuStyle } from "../components/Menu";
import api from "../services/api";

export default function Contact({ navigation }) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [subject, setSubject] = useState("");
  const [text, setText] = useState("");

  async function handleSubmit() {
    const res = await api.post("/contact", {
      email,
      subject,
      name,
      text,
    });
    const { status } = res.data;

    if (status) {
      alert(res.data.msg);
      navigation.navigate("Dashboard");
    } else {
      alert(res.data.msg);
    }
  }
  function handleGoBack() {
    navigation.navigate("Dashboard");
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
      <Menu />
      <View style={styles.form}>
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
        <Text style={styles.label}>Subject*</Text>
        <TextInput
          style={styles.input}
          placeholder="Subject"
          placeholderTextColor="#999"
          autoCapitalize="none"
          autoCorrect={false}
          value={subject}
          onChangeText={setSubject}
        />
        <Text style={styles.label}>Text*</Text>
        <TextInput
          style={[styles.input, { height: 150 }]}
          placeholder="Text..."
          placeholderTextColor="#999"
          multiline={true}
          numberOfLines={4}
          value={text}
          onChangeText={setText}
        />
        <TouchableOpacity onPress={handleSubmit} style={styles.button}>
          <Text style={styles.buttonText}>Send</Text>
        </TouchableOpacity>
        <View style={styles.linkView}>
          <Text onPress={handleGoBack} style={styles.link}>
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
    position: "absolute",
    resizeMode: "cover",
  },
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  form: {
    width: "80%",
    marginHorizontal: 10,
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
});
