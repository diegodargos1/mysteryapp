import React, { useState, useEffect } from "react";

import CardFlip from "react-native-card-flip";
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

import Menu, { menuStyle } from "./Menu";
import api from "../services/api";

export default function Card({ card }) {
  const [_title, setTitle] = useState("");
  const [_category, setCategory] = useState("");
  const [_resolution, setResolution] = useState("");
  const [_mystery, setMystery] = useState("");
  const [mystery_id, setMystery_id] = useState("");

  useEffect(() => {
    AsyncStorage.getItem("user_id").then(user => {
      if (!user) {
        navigation.navigate("Login");
      }
      async function getCard() {
        const { title, category, resolution, mystery, _id } = card;
        setTitle(title.toUpperCase());
        setCategory(category);
        setResolution(sentenceCase(resolution));
        setMystery(sentenceCase(mystery));
        setMystery_id(_id);
      }

      getCard();
    });
  }, []);

  function sentenceCase(input, lowercaseBefore) {
    input = input === undefined || input === null ? "" : input;
    if (lowercaseBefore) {
      input = input.toLowerCase();
    }
    return input
      .toString()
      .replace(/(^|\. *)([a-z])/g, function(match, separator, char) {
        return separator + char.toUpperCase();
      });
  }

  const styles = StyleSheet.create({
    backgroundImg: {
      height: 1000,
      position: "absolute",
      resizeMode: "cover"
    },
    container: {
      flex: 1,
      justifyContent: "flex-start",
      alignItems: "center"
    },
    cardMenu: {
      flexDirection: "column"
    },
    card: {
      marginHorizontal: 20,
      flexDirection: "column",
      alignItems: "center"
    },
    cardImg: {
      height: 100,
      width: 100
    },
    category: {
      marginHorizontal: 20,
      marginVertical: 5,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      alignSelf: "center"
    },
    cardInput: {
      marginHorizontal: 20,
      marginVertical: 5,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      alignSelf: "flex-start"
    },
    cardInputTitle: {
      alignSelf: "center"
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
      width: 150
    },
    selectBox: {
      alignItems: "center",
      justifyContent: "center"
    },
    box: {
      height: 150
    },
    title: {
      fontWeight: "bold",
      alignSelf: "center",
      flexDirection: "column",
      display: "flex"
    },
    cardLine: {
      display: card.display,
      flexDirection: "column",
      alignSelf: "flex-start",
      marginHorizontal: 10
    },
    button: {
      marginVertical: 10,
      height: 42,
      backgroundColor: "#f05a5b",
      justifyContent: "center",
      alignItems: "center",
      alignSelf: "center",
      borderRadius: 2
    },
    buttonText: {
      paddingHorizontal: 20,
      color: "#FFF",
      fontWeight: "bold",
      fontSize: 16
    },
    cardButton: {
      flexDirection: "row",
      flexWrap: "wrap"
    },
    saveButton: {
      width: "35%",
      alignSelf: "flex-end"
    },
    resetButton: {
      width: "35%",
      alignSelf: "flex-start",
      alignItems: "flex-start"
    },
    linkBtn: {
      marginVertical: 10,
      height: 42,
      justifyContent: "center",
      alignItems: "center",
      alignSelf: "center",
      borderRadius: 2
    },
    link: {
      color: "blue",
      paddingHorizontal: 20,
      fontSize: 16
    },
    cardImg: {
      height: "100%",
      width: "100%"
    }
  });

  return (
    <View style={styles.cardLine}>
      <View style={[styles.cardInput, styles.cardInputTitle]}>
        <Text style={styles.title}>{_title}</Text>
      </View>
      <View style={styles.category}>
        <Text style={styles.searchTitle}>Category: {_category}</Text>
      </View>
      <CardFlip
        style={cardstyles.cardContainer}
        ref={card => {
          this.card = card;
        }}
      >
        <TouchableOpacity
          activeOpacity={1}
          style={[cardstyles.card, cardstyles.card1]}
          onPress={() => this.card.flip()}
        >
          <View style={styles.cardLable}>
            <Image
              source={require("../assets/backcard.png")}
              style={styles.cardImg}
            />

            <View style={styles.cardInput}>
              <Text style={styles.searchTitle}>Mystery: {_mystery}</Text>
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={1}
          style={[cardstyles.card, cardstyles.card2]}
          onPress={() => this.card.flip()}
        >
          <View style={styles.cardInput}>
            <Text style={styles.searchTitle}>Resolution:{_resolution}</Text>
          </View>
        </TouchableOpacity>
      </CardFlip>
    </View>
  );
}

const cardstyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  cardContainer: {
    width: 320,
    height: 470
  },
  card: {
    width: 320,
    height: 470,
    backgroundColor: "#FE474C",
    borderRadius: 5,
    shadowColor: "rgba(0,0,0,0.5)",
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.5
  },
  card1: {
    backgroundColor: "#FE474C"
  },
  card2: {
    backgroundColor: "#FEB12C"
  },
  label: {
    lineHeight: 470,
    textAlign: "center",
    fontSize: 55,
    fontFamily: "System",
    color: "#ffffff",
    backgroundColor: "transparent"
  }
});
