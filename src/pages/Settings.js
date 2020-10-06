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
import RNPickerSelect from "react-native-picker-select";
import Menu, { menuStyle } from "../components/Menu";
import languageJson from "../json/lang.json";

export default function Settings({ navigation }) {
  const [language, setLanguage] = useState("");
  const [languageObj, setLanguageObj] = useState("");
  useEffect(() => {
    AsyncStorage.getItem("language").then((lang) => {
      if (!lang || lang == "eng") {
        AsyncStorage.setItem("language", "eng");
        setLanguage("eng");
        setLanguageObj(languageJson.Settings.eng);
      } else if (lang == "pt-br") {
        setLanguage(lang);
        setLanguageObj(languageJson.Settings.ptBr);
      }
    });
  }, [language]);

  async function handleLogout() {
    await AsyncStorage.removeItem("user_id");
    await AsyncStorage.removeItem("user_name");
    navigation.navigate("Login");
  }

  async function handleContact() {
    navigation.navigate("Contact");
  }
  async function handleAbout() {
    navigation.navigate("About");
  }
  async function handleLanguage(e) {
    setLanguage(e);
    await AsyncStorage.setItem("language", e);
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
      <View style={styles.cardMenu}>
        <View style={styles.menu}>
          <View style={styles.card}>
            <RNPickerSelect
              value={language}
              onValueChange={handleLanguage}
              placeholder={{
                label: "Select",
                value: "",
              }}
              placeholderTextColor="black"
              items={[
                { label: "English", value: "eng" },
                { label: "Portugues", value: "pt-br" },
              ]}
            />
          </View>
          <TouchableOpacity onPress={handleAbout}>
            <View style={styles.card}>
              <Text>{languageObj.about}</Text>
            </View>
          </TouchableOpacity>
          {/* <TouchableOpacity onPress={handleContact}>
            <View style={styles.card}>
              <Text>{languageObj.contact}</Text>
            </View>
          </TouchableOpacity> */}

          {/* <TouchableOpacity onPress={handleLogout}>
            <View style={styles.card}>
              <Text>{languageObj.logout}</Text>
            </View>
          </TouchableOpacity> */}
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
  menu: {
    flexWrap: "wrap",
    flexDirection: "column",
    width: "90%",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 30,
    marginTop: 20,
    backgroundColor: "#FFFFFF",
    borderRadius: 4,
    paddingBottom: 20,
    paddingTop: 20,
  },
  cardMenu: {
    flexDirection: "column",
  },
  cardColumn: {
    flexDirection: "column",
    alignSelf: "center",
    marginHorizontal: 10,
  },
  cardLine: {
    flexDirection: "column",
    alignSelf: "center",
    marginHorizontal: 10,
  },
  card: {
    marginVertical: 20,
    marginHorizontal: 20,
    flexDirection: "column",
    alignItems: "center",
  },
});
