// screens/ResultScreen.js
import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const ResultScreen = ({ route, navigation }) => {
  const { score } = route.params;
  let resultMessage = '';
  let resultColor = '';

  if (score >= 8) {
    resultMessage = 'Excellent! You scored high!';
    resultColor = 'green';
  } else if (score >= 5) {
    resultMessage = 'Good job! You passed!';
    resultColor = 'blue';
  } else {
    resultMessage = 'Better luck next time!';
    resultColor = 'red';
  }

  return (
    <View style={styles.container}>
      <Text style={[styles.result, { color: resultColor }]}>{resultMessage}</Text>
      <Text style={styles.result}>Your Score: {score} / 10</Text>
      <Button title="Try Again" onPress={() => navigation.navigate('Quiz')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  result: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default ResultScreen;
