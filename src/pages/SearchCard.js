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
  ScrollView,
  AsyncStorage,
} from "react-native";
import RNPickerSelect from "react-native-picker-select";
import SearchedCards from "../components/SearchedCards";
import Menu, { menuStyle } from "../components/Menu";
import api from "../services/api";
import languageJson from "../json/lang.json";

export default function SearchCard({ navigation }) {
  const [search, setSearch] = useState("");
  const [result, setResult] = useState([]);
  const [category, setCategory] = useState("");
  const [language, setLanguage] = useState("");
  useEffect(() => {
    AsyncStorage.getItem("language").then((lang) => {
      if (!lang || lang == "eng") {
        AsyncStorage.setItem("language", "eng");
        setLanguage(languageJson.Search.eng);
      } else if (lang == "pt-br") {
        setLanguage(languageJson.Search.ptBr);
      }
    });
  }, []);

  async function handleSearch() {
    const title = search;
    const res = await api.get("/listmystery", {
      params: { title, category },
    });

    if (!res.data.status) {
      alert(res.data.msg);
      setResult([]);
    } else {
      if (!res.data.data.length) {
        alert(language.notFound);
      }
      setResult(res.data.data);
    }
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
        <View style={[menuStyle.menu, styles.cardColumn]}>
          <View style={styles.cardInput}>
            <Text style={styles.searchTitle}>{language.search}:</Text>
            <TextInput
              style={styles.input}
              placeholder={language.title}
              placeholderTextColor="#999"
              value={search}
              onChangeText={setSearch}
            />
          </View>
          <View style={styles.cardInput}>
            <Text style={styles.searchTitle}>{language.category}:</Text>
            <View style={[styles.input, styles.selectBox]}>
              <RNPickerSelect
                value={category}
                onValueChange={setCategory}
                placeholder={{
                  label: language.category,
                  value: "",
                }}
                items={[
                  { label: language.horror, value: "Horror" },
                  { label: language.detective, value: "Detective" },
                  { label: language.funny, value: "Funny" },
                ]}
              />
            </View>
          </View>
          <TouchableOpacity onPress={handleSearch} style={styles.button}>
            <Text style={styles.buttonText}>{language.btnSearch}</Text>
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView contentContainerStyle={styles.cardMenu}>
        <View style={styles.cardRow}>
          {result.map((t) => {
            return <SearchedCards cardData={t} key={t} />;
          })}
        </View>
      </ScrollView>
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
  logo: {
    height: 50,
    width: 50,
  },
  title: {
    marginHorizontal: 30,
  },
  menu: {
    flexWrap: "wrap",
    flexDirection: "row",
    width: "90%",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingHorizontal: 30,
    marginTop: 40,
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
    marginLeft: 10,
    borderRadius: 2,
    width: 150,
    alignSelf: "flex-end",
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
  cardMenu: {
    flexDirection: "column",
    marginVertical: 20,
  },
  cardColumn: {
    flexDirection: "column",
    alignSelf: "flex-start",
    marginHorizontal: 10,
    marginTop: 20,
  },
  cardLine: {
    flexDirection: "row",
    alignSelf: "flex-start",
    marginHorizontal: 10,
  },
  cardInput: {
    marginHorizontal: 20,
    marginTop: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "flex-end",
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
  searchTitle: {
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  cardRow: {
    display: "flex",
    flexDirection: "column",
    flexWrap: "wrap",
    width: "100%",
  },
  selectBox: {
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "flex-end",
  },
});
