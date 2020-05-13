import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { withNavigation } from "react-navigation";

function SearchedCards({ navigation, cardData }) {
  function handleClick() {
    navigation.navigate("Card", { cardData });
  }
  return (
    <TouchableOpacity onPress={handleClick}>
      <View style={styles.card}>
        <Text>{cardData.title.toUpperCase()}</Text>
        <Image source={require("../assets/card.png")} style={styles.cardImg} />
      </View>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  card: {
    borderRadius: 4,
    marginBottom: 10,
    paddingHorizontal: 20,
    paddingVertical: 20,
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "#FFFFFF"
  }
});

export default withNavigation(SearchedCards);
