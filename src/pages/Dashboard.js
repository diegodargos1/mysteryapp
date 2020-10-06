import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  AsyncStorage,
} from "react-native";

import Menu, { menuStyle } from "../components/Menu";
import languageJson from "../json/lang.json";

export default function Dashboard({ navigation }) {
  const [language, setLanguage] = useState("");
  let languageParam = navigation.getParam("languageParam");

  useEffect(() => {
    AsyncStorage.multiGet(["user_id", "language"]).then(([user, lang]) => {
      // if (!user) {
      //   //navigation.navigate("Login");
      // }
      if (!lang[1] || lang[1] == "eng") {
        AsyncStorage.setItem("language", "eng");
        setLanguage(languageJson.Dashboard.eng);
      } else if (lang[1] == "pt-br") {
        setLanguage(languageJson.Dashboard.ptBr);
      }
    });
  }, [languageParam]);

  function handleSearch() {
    navigation.navigate("SearchCard");
  }

  function handleCreate() {
    navigation.navigate("CreateCard");
  }
  function handleRandom() {
    navigation.navigate("RandomCard");
  }
  function handleMyCards() {
    navigation.navigate("MyCards");
  }
  function handleHowto() {
    navigation.navigate("Howto");
  }
  function handleSettings() {
    navigation.navigate("Settings");
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
        {/* <TouchableOpacity onPress={handleSearch}>
          <View style={[menuStyle.menu, styles.cardColumn, { width: 170 }]}>
            <Text>{language.search}</Text>
            <Image
              source={require("../assets/card.png")}
              style={styles.cardImg}
            />
          </View>
        </TouchableOpacity> */}
        <TouchableOpacity onPress={handleRandom}>
          <View style={[menuStyle.menu, styles.cardColumn, { width: 170 }]}>
            <Text>{language.random}</Text>
            <Image
              source={require("../assets/card.png")}
              style={styles.cardImg}
            />
          </View>
        </TouchableOpacity>
      </View>
      {/* <View style={styles.cardMenu}>
        <View style={[menuStyle.menu, styles.cardLine]}>
          <TouchableOpacity onPress={handleCreate}>
            <View style={[styles.card, { width: 110 }]}>
              <Text>{language.create}</Text>
              <Image
                source={require("../assets/card2.png")}
                style={styles.cardImg}
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleMyCards}>
            <View style={[styles.card, { width: 110 }]}>
              <Text>{language.myCard}</Text>
              <Image
                source={require("../assets/card2.png")}
                style={styles.cardImg}
              />
            </View>
          </TouchableOpacity>
        </View>
      </View> */}
      <View style={styles.cardMenu}>
        <TouchableOpacity onPress={handleHowto}>
          <View style={[menuStyle.menu, styles.cardColumn, { width: 170 }]}>
            <Text>{language.howTo}</Text>
            <Image
              source={require("../assets/card2.png")}
              style={styles.cardImg}
            />
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.cardMenu}>
        <TouchableOpacity onPress={handleSettings}>
          <View style={[menuStyle.menu, styles.cardColumn, { width: 170 }]}>
            <Text>{language.settings}</Text>
            <Image
              source={require("../assets/card3.png")}
              style={styles.cardImg}
            />
          </View>
        </TouchableOpacity>
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
  cardMenu: {
    flexDirection: "row",
  },
  cardColumn: {
    flexDirection: "column",
    alignSelf: "flex-start",
    marginHorizontal: 10,
  },
  cardLine: {
    flexDirection: "row",
    alignSelf: "flex-start",
    marginHorizontal: 10,
  },
  card: {
    marginHorizontal: 20,
    flexDirection: "column",
    alignItems: "center",
  },
  cardImg: {
    // height: 100,
    // width: 100
  },
});
