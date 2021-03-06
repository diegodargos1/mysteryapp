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
import languageJson from "../json/lang.json";

export default function Howto({ navigation }) {
  const [language, setLanguage] = useState("");
  let languageParam = navigation.getParam("languageParam");

  useEffect(() => {
    AsyncStorage.multiGet(["user_id", "language"]).then(([user, lang]) => {
      // if (!user) {
      //   navigation.navigate("Login");
      // }
      if (!lang[1] || lang[1] == "eng") {
        AsyncStorage.setItem("language", "eng");
        setLanguage(languageJson.Howto.eng);
      } else if (lang[1] == "pt-br") {
        setLanguage(languageJson.Howto.ptBr);
      }
    });
  }, [languageParam]);

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
        <Text style={styles.label}>{language.title}:</Text>
        <Text style={styles.label}>{language.text}</Text>

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
