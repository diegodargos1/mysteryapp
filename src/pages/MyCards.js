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
import SearchedCards from "../components/SearchedCards";
import Menu, { menuStyle } from "../components/Menu";
import api from "../services/api";

export default function MyCards({ navigation }) {
  const [result, setResult] = useState([]);

  useEffect(() => {
    async function session() {
      const user = await AsyncStorage.getItem("user_id").then((user) => {
        if (!user) {
          //navigation.navigate("Login");
        }
        return user;
      });

      const res = await api.get("/mymystery", {
        params: { user_id: user },
      });

      setResult(res.data.data);
    }

    session();
  }, []);

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
      <ScrollView contentContainerStyle={styles.cardMenu}>
        <View style={styles.cardRow}>
          {result.map((t) => {
            return <SearchedCards cardData={t} key={t._id} />;
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
    backgroundColor: "black",
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
  cardRow: {
    display: "flex",
    flexDirection: "column",
    flexWrap: "wrap",
    width: "100%",
  },
});
