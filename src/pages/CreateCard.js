import React, { useState, useEffect } from "react";
import RNPickerSelect from "react-native-picker-select";
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
import languageJson from "../json/lang.json";

export default function CreateCard({ navigation }) {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [resolution, setResolution] = useState("");
  const [mystery, setMystery] = useState("");
  const [user_id, setUser] = useState("");
  const [language, setLanguage] = useState("");
  useEffect(() => {
    AsyncStorage.getItem("language").then((lang) => {
      if (!lang || lang == "eng") {
        AsyncStorage.setItem("language", "eng");
        setLanguage(languageJson.Create.eng);
      } else if (lang == "pt-br") {
        setLanguage(languageJson.Create.ptBr);
      }
    });
    async function session() {
      const user = await AsyncStorage.getItem("user_id").then((user) => {
        if (!user) {
          //navigation.navigate("Login");
        }
        return user;
      });

      await setUser(user);
    }

    session();
  }, []);

  function handleSelect(e) {
    setCategory(e);
  }

  async function handleSave() {
    const res = await api.post(
      "/mystery",
      {
        title,
        category,
        resolution,
        mystery,
      },
      {
        headers: { user_id, language },
      }
    );
    const { data, msg, status } = res.data;

    if (status == 1) {
      await setTitle("");
      await setCategory(null);
      await setResolution("");
      await setMystery("");
    }
    alert(msg);
  }

  async function handleReset() {
    await setTitle("");
    await setCategory(null);
    await setResolution("");
    await setMystery("");
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
        <View style={[menuStyle.menu, styles.cardLine]}>
          <View style={[styles.cardInput, styles.cardInputTitle]}>
            <Text style={styles.title}>{language.title}</Text>
          </View>
          <View style={styles.cardInput}>
            <Text style={styles.searchTitle}>{language.cardTitle}:</Text>
            <TextInput
              style={styles.input}
              placeholder={language.cardTitle}
              placeholderTextColor="#999"
              value={title}
              onChangeText={setTitle}
            />
          </View>
          <View style={styles.cardInput}>
            <Text style={styles.searchTitle}>{language.category}:</Text>
            <View style={[styles.input, styles.selectBox]}>
              <RNPickerSelect
                value={category}
                onValueChange={handleSelect}
                placeholder={{
                  label: "Category",
                  value: "",
                }}
                items={[
                  { label: "Horror", value: "Horror" },
                  { label: "Detective", value: "Detective" },
                  { label: "Funny", value: "Funny" },
                ]}
              />
            </View>
          </View>
          <View style={styles.cardInput}>
            <Text style={styles.searchTitle}>{language.mystery}:</Text>
            <TextInput
              style={[styles.input, styles.box]}
              placeholder={language.mystery + "..."}
              placeholderTextColor="#999"
              value={mystery}
              onChangeText={setMystery}
              multiline={true}
              numberOfLines={4}
            />
          </View>
          <View style={styles.cardInput}>
            <Text style={styles.searchTitle}>{language.resolution}:</Text>
            <TextInput
              style={[styles.input, styles.box]}
              placeholder={language.resolution + "..."}
              placeholderTextColor="#999"
              value={resolution}
              onChangeText={setResolution}
              multiline={true}
              numberOfLines={4}
            />
          </View>
          <View style={[styles.cardButton]}>
            <View style={[styles.resetButton]}>
              <TouchableOpacity onPress={handleReset} style={styles.linkBtn}>
                <Text style={styles.link}>{language.reset}</Text>
              </TouchableOpacity>
            </View>
            <View style={[styles.saveButton]}>
              <TouchableOpacity onPress={handleSave} style={styles.button}>
                <Text style={styles.buttonText}>{language.save}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
      <View style={styles.cardMenu}></View>
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
  cardMenu: {
    flexDirection: "column",
  },
  card: {
    marginHorizontal: 20,
    flexDirection: "column",
    alignItems: "center",
  },
  cardImg: {
    height: 100,
    width: 100,
  },
  cardInput: {
    marginHorizontal: 20,
    marginVertical: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "flex-end",
  },
  cardInputTitle: {
    alignSelf: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    paddingHorizontal: 20,
    fontSize: 16,
    color: "#444",
    height: 44,
    marginLeft: 10,
    borderRadius: 2,
    width: 150,
  },
  selectBox: {
    alignItems: "center",
    justifyContent: "center",
  },
  box: {
    height: 150,
  },
  title: {
    fontWeight: "bold",
    alignSelf: "center",
    flexDirection: "column",
    display: "flex",
  },
  cardLine: {
    flexDirection: "column",
    alignSelf: "flex-start",
    marginHorizontal: 10,
  },
  button: {
    marginVertical: 10,
    height: 42,
    backgroundColor: "#f05a5b",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    borderRadius: 2,
  },
  buttonText: {
    paddingHorizontal: 20,
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 16,
  },
  cardButton: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  saveButton: {
    width: "35%",
    alignSelf: "flex-end",
  },
  resetButton: {
    width: "35%",
    alignSelf: "flex-start",
    alignItems: "flex-start",
  },
  linkBtn: {
    marginVertical: 10,
    height: 42,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    borderRadius: 2,
  },
  link: {
    color: "blue",
    paddingHorizontal: 20,
    fontSize: 16,
  },
});
