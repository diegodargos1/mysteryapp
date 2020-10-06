import React, { useState, useEffect } from "react";

import CardFlip from "react-native-card-flip";
import StarRating from "react-native-star-rating";
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
  Animated,
} from "react-native";

import { AdMobInterstitial } from "expo-ads-admob";

import api from "../services/api";

export default function RandomCard({ navigation }) {
  const [starCount, setStarCount] = useState(0);
  const [_title, setTitle] = useState("");
  const [_category, setCategory] = useState("");
  const [_resolution, setResolution] = useState("");
  const [_mystery, setMystery] = useState("");
  const [mystery_id, setMystery_id] = useState("");
  const [userId, setUserId] = useState("");
  const [language, setLanguage] = useState("");

  let [opacity] = useState(new Animated.Value(0));
  let [cardOpacity] = useState(new Animated.Value(1));
  const cardImg = [
    require(`../assets/backcard-1.png`),
    require(`../assets/backcard-2.png`),
  ];

  useEffect(() => {
    async function showAds() {
      const ads = await AsyncStorage.getItem("ads");
      if (!ads) {
        AsyncStorage.setItem("ads", "1");
        if (Platform.OS === "ios") {
          AdMobInterstitial.setAdUnitID(
            "ca-app-pub-6563320699543673/3700977952"
          );
        } else if (Platform.OS === "android") {
          AdMobInterstitial.setAdUnitID(
            "ca-app-pub-6563320699543673/8575112252"
          );
        }

        await AdMobInterstitial.requestAdAsync({
          servePersonalizedAds: true,
        });
        await AdMobInterstitial.showAdAsync();
      } else {
        await AsyncStorage.removeItem("ads");
      }
    }
    showAds();

    AsyncStorage.getItem("user_id").then((user) => {
      if (!user) {
        navigation.navigate("Login");
      }
      async function getCard() {
        const lang = await AsyncStorage.getItem("language");
        const res = await api.get("/mystery", {
          params: { language: lang },
        });
        const { title, category, resolution, mystery, _id } = res.data;
        setTitle(title.toUpperCase());
        setCategory(category);
        setResolution(sentenceCase(resolution));
        setMystery(sentenceCase(mystery));
        setMystery_id(_id);
        setUserId(user);

        let rating = await api.get("/rating", {
          params: { mystery_id: _id },
        });
        rating.data = Math.round(rating.data);
        setStarCount(rating.data);
        Animated.timing(opacity, {
          toValue: 1,
          duration: 2000,
        }).start();
      }

      getCard();
    });
  }, []);

  async function handleLike() {
    const res = await api.post(
      "/rating",
      { mystery_id, rating: 1 },
      {
        headers: { user_id: userId },
      }
    );
    alert(res.data.msg);
  }
  async function handleDisLike() {
    const res = await api.post(
      "/rating",
      { mystery_id, rating: 0 },
      {
        headers: { user_id: userId },
      }
    );
    alert(res.data.msg);
  }

  function sentenceCase(input, lowercaseBefore) {
    input = input === undefined || input === null ? "" : input;
    if (lowercaseBefore) {
      input = input.toLowerCase();
    }
    return input
      .toString()
      .replace(/(^|\. *)([a-z])/g, function (match, separator, char) {
        return separator + char.toUpperCase();
      });
  }

  function nextCard() {
    navigation.push("RandomCard");
  }
  function homePage() {
    navigation.navigate("Dashboard");
  }
  return (
    <KeyboardAvoidingView
      style={styles.container}
      enable={Platform.OS === "ios"}
      behavior="padding"
    >
      <View style={[styles.cardButton]}>
        <View style={[styles.nextCard]}>
          <TouchableOpacity onPress={homePage} style={styles.button}>
            <View style={styles.buttonTextBack}>
              <Image
                style={{ height: 50, width: 50 }}
                source={require("../assets/backward.png")}
              />
              <Text>Home Page</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={[styles.nextCard]}>
          <TouchableOpacity onPress={nextCard} style={styles.button}>
            <View style={styles.buttonText}>
              <Text>Next Card</Text>
              <Image
                style={{ height: 50, width: 50 }}
                source={require("../assets/forward.png")}
              />
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <Animated.View style={(styles.cardMenu, { opacity: opacity })}>
        <View style={styles.cardLine}>
          <CardFlip
            style={cardstyles.cardContainer}
            ref={(card) => {
              this.card = card;
            }}
          >
            <TouchableOpacity
              activeOpacity={1}
              style={[cardstyles.card]}
              onPress={() => {
                this.card.flip();
                Animated.timing(cardOpacity, {
                  toValue: 0,
                  duration: 1000,
                }).start();
              }}
            >
              <Image
                source={require("../assets/frontcard-2.png")}
                style={[styles.cardImg]}
              />
              <View style={[styles.cardInputTitle]}>
                <Text style={styles.title}>{_title}</Text>
              </View>
              <View
                style={{
                  marginTop: 103,
                  marginLeft: 40,
                  position: "absolute",
                  width: 38,
                }}
              >
                <Text style={{ textAlign: "center" }}>{starCount}%</Text>
              </View>
              <View style={styles.cardLable}>
                <Text style={[styles.searchTitle, styles.headerMyst]}>
                  {_category} Mystery Resolution
                </Text>
                <Text style={[styles.searchTitle, styles.contentMyst]}>
                  {_resolution}
                </Text>
              </View>
              <Animated.Image
                source={cardImg[Math.floor(Math.random() * cardImg.length)]}
                style={[styles.cardImg, { opacity: cardOpacity }]}
              />
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={1}
              style={[cardstyles.card]}
              onPress={() => this.card.flip()}
            >
              <Image
                source={require("../assets/frontcard-1.png")}
                style={[styles.cardImg]}
              />
              <View style={[styles.cardInputTitle]}>
                <Text style={styles.title}>{_title}</Text>
              </View>
              <View
                style={{
                  marginTop: 103,
                  marginLeft: 40,
                  position: "absolute",
                  width: 38,
                }}
              >
                <Text style={{ textAlign: "center" }}>{starCount}%</Text>
              </View>
              <View style={styles.cardLable}>
                <Text style={[styles.searchTitle, styles.headerMyst]}>
                  {_category} Mystery
                </Text>
                <Text style={[styles.searchTitle, styles.contentMyst]}>
                  {_mystery}
                </Text>
              </View>
            </TouchableOpacity>
          </CardFlip>
        </View>
      </Animated.View>
      <View style={[styles.cardButton, { justifyContent: "center" }]}>
        <View
          style={[
            styles.nextCard,
            {
              backgroundColor: "white",
              justifyContent: "center",
              width: "30%",
              opacity: 0.8,
            },
          ]}
        >
          <TouchableOpacity onPress={handleDisLike} style={styles.button}>
            <View>
              <Image
                style={{ height: 50, width: 50 }}
                source={require("../assets/unlike.png")}
              />
            </View>
          </TouchableOpacity>
        </View>
        <View
          style={[
            styles.nextCard,
            {
              backgroundColor: "white",
              justifyContent: "center",
              width: "30%",
              opacity: 0.8,
            },
          ]}
        >
          <TouchableOpacity onPress={handleLike} style={styles.button}>
            <View>
              <Image
                style={{ height: 50, width: 50 }}
                source={require("../assets/like.png")}
              />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const cardstyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF",
  },
  cardContainer: {
    width: 359,
    height: 536,
  },
  card: {
    width: 359,
    height: 536,
    borderRadius: 5,
    shadowColor: "rgba(0,0,0,0.5)",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.5,
  },
  card1: {
    backgroundColor: "#FE474C",
  },
  card2: {
    backgroundColor: "#FEB12C",
  },
  label: {
    lineHeight: 470,
    textAlign: "center",
    fontSize: 55,
    fontFamily: "System",
    color: "#ffffff",
    backgroundColor: "transparent",
  },
});

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
    backgroundColor: "black",
  },
  blackBackGround: {
    height: "100%",
    width: "100%",
    position: "absolute",
    backgroundColor: "black",
    opacity: 0.5,
  },
  cardMenu: { flexDirection: "column" },
  card: {
    marginHorizontal: 20,
    flexDirection: "column",
    alignItems: "center",
  },

  cardInputTitle: {
    alignSelf: "center",
  },

  title: {
    fontWeight: "bold",
    alignSelf: "center",
    flexDirection: "column",
    display: "flex",
    marginTop: 35,
  },
  cardLine: {
    flexDirection: "column",
    alignSelf: "flex-start",
    marginHorizontal: 10,
  },
  headerMyst: {
    marginTop: 15,
    maxWidth: 100,
    textAlign: "center",
  },
  contentMyst: {
    marginTop: 30,
    paddingHorizontal: 20,
    textAlign: "center",
  },
  cardLable: {
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    marginTop: 40,
    marginHorizontal: 20,
  },
  cardImg: {
    position: "absolute",
  },
  cardButton: {
    flexDirection: "row",
    flexWrap: "wrap",
    width: "100%",
    marginVertical: 15,
  },
  nextCard: {
    flexDirection: "row",
    width: "40%",
    height: 60,
    marginHorizontal: "5%",
    backgroundColor: "white",
    borderRadius: 4,
    alignContent: "center",
    alignItems: "center",
    opacity: 0.8,
  },

  buttonText: {
    alignContent: "center",
    alignItems: "center",
    flexDirection: "row",
    alignSelf: "center",
    width: "100%",
    paddingHorizontal: 35,
  },
  buttonTextBack: {
    alignContent: "center",
    alignItems: "center",
    flexDirection: "row",
    alignSelf: "center",
    width: "100%",
    paddingHorizontal: 10,
  },
});
