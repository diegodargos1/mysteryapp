import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  AsyncStorage,
} from "react-native";
import { withNavigation } from "react-navigation";

import logo from "../assets/logo.png";
import settings from "../assets/settings.png";

function Menu({ navigation }) {
  function handleSettings() {
    navigation.navigate("Settings");
  }
  async function handleHome() {
    const lang = AsyncStorage.getItem("language");
    navigation.navigate("Dashboard", {
      languageParam: lang,
    });
  }
  return (
    <View style={styles.menu}>
      <TouchableOpacity onPress={handleHome}>
        <Image source={logo} style={styles.logo} />
      </TouchableOpacity>
      <View style={styles.titleLabel}>
        <Text style={styles.title}>THE MYSTERY</Text>
      </View>
      <TouchableOpacity onPress={handleSettings}>
        <Image source={settings} style={styles.settings} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  logo: {
    height: 50,
    width: 50,
  },
  titleLabel: {
    flex: 1,
  },
  title: {
    alignSelf: "center",
  },
  menu: {
    alignItems: "stretch",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 20,
    marginTop: 40,
    marginHorizontal: 20,
    backgroundColor: "#FFFFFF",
    borderRadius: 4,
    shadowOffset: { width: 10, height: 10 },
    shadowColor: "black",
    shadowOpacity: 1.0,
  },
  settings: {
    height: 20,
    width: 20,
  },
});

export const menuStyle = StyleSheet.create({
  menu: {
    alignItems: "stretch",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 20,
    marginTop: 40,
    marginHorizontal: 20,
    backgroundColor: "#FFFFFF",
    borderRadius: 4,
    shadowOffset: { width: 10, height: 10 },
    shadowColor: "black",
    shadowOpacity: 1.0,
  },
});

export default withNavigation(Menu);
