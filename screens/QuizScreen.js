import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Alert } from 'react-native';

const QuizScreen = ({ navigation }) => {
  const totalTime = 20; // Total time in seconds (set it to your desired time, e.g., 600 for 10 minutes)
  const [timer, setTimer] = useState(totalTime);
  const [selectedAnswers, setSelectedAnswers] = useState(Array(10).fill(null)); // Store answers
  const [quizCompleted, setQuizCompleted] = useState(false);

  const questions = [
    { question: 'Question 1', options: ['Option A', 'Option B', 'Option C', 'Option D'], correctAnswer: 'Option A' },
    { question: 'Question 2', options: ['Option A', 'Option B', 'Option C', 'Option D'], correctAnswer: 'Option B' },
    { question: 'Question 3', options: ['Option A', 'Option B', 'Option C', 'Option D'], correctAnswer: 'Option C' },
    { question: 'Question 4', options: ['Option A', 'Option B', 'Option C', 'Option D'], correctAnswer: 'Option D' },
    { question: 'Question 5', options: ['Option A', 'Option B', 'Option C', 'Option D'], correctAnswer: 'Option A' },
    { question: 'Question 6', options: ['Option A', 'Option B', 'Option C', 'Option D'], correctAnswer: 'Option B' },
    { question: 'Question 7', options: ['Option A', 'Option B', 'Option C', 'Option D'], correctAnswer: 'Option C' },
    { question: 'Question 8', options: ['Option A', 'Option B', 'Option C', 'Option D'], correctAnswer: 'Option D' },
    { question: 'Question 9', options: ['Option A', 'Option B', 'Option C', 'Option D'], correctAnswer: 'Option A' },
    { question: 'Question 10', options: ['Option A', 'Option B', 'Option C', 'Option D'], correctAnswer: 'Option B' },
  ];

  useEffect(() => {
    // Timer logic
    if (timer > 0 && !quizCompleted) {
      const interval = setInterval(() => {
        setTimer(prevTime => prevTime - 1);
      }, 1000);

      return () => clearInterval(interval);
    } else if (timer === 0) {
      // Timer ends, auto submit the quiz
      handleSubmit();
    }
  }, [timer, quizCompleted]);

  const handleAnswerSelection = (questionIndex, answer) => {
    const updatedAnswers = [...selectedAnswers];
    updatedAnswers[questionIndex] = answer;
    setSelectedAnswers(updatedAnswers);
  };

  const handleSubmit = () => {
    setQuizCompleted(true);
    const score = selectedAnswers.reduce((score, answer, index) => {
      if (answer === questions[index].correctAnswer) score++;
      return score;
    }, 0);
    navigation.navigate('Result', { score });
  };

  const handleManualSubmit = () => {
    Alert.alert(
      "Submit Quiz",
      "Are you sure you want to submit the quiz?",
      [
        { text: "Cancel" },
        { text: "Submit", onPress: handleSubmit },
      ]
    );
  };

  // Reset quiz when returning back to QuizScreen
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      // Reset the state when the screen is focused (user returns back to the quiz)
      setTimer(totalTime); // Reset the timer
      setSelectedAnswers(Array(10).fill(null)); // Reset the selected answers
      setQuizCompleted(false); // Reset quiz completion state
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.timer}>Time Left: {Math.floor(timer / 60)}:{timer % 60}</Text>
      
      {/* ScrollView to make the page scrollable */}
      <ScrollView style={styles.scrollContainer}>
        {questions.map((question, index) => (
          <View key={index} style={styles.questionContainer}>
            <Text style={styles.question}>{question.question}</Text>
            {question.options.map(option => (
              <TouchableOpacity
                key={option}
                style={[
                  styles.optionButton,
                  selectedAnswers[index] === option ? styles.selectedOption : {},
                ]}
                onPress={() => handleAnswerSelection(index, option)}
              >
                <Text style={styles.optionText}>{option}</Text>
              </TouchableOpacity>
            ))}
          </View>
        ))}
      </ScrollView>

      <TouchableOpacity style={styles.submitButton} onPress={handleManualSubmit}>
        <Text style={styles.submitButtonText}>Submit Quiz</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f9f9f9', // Light gray background for a professional look
  },
  timer: {
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 20,
    fontWeight: 'bold', // Bold font for timer
    color: '#333', // Darker color for timer text
  },
  scrollContainer: {
    marginBottom: 20,
    backgroundColor: '#fff', // White background for scroll container
    borderRadius: 10, // Rounded corners for a modern look
    shadowColor: '#000', // Shadow for depth
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5, // Android shadow effect
  },
  questionContainer: {
    marginBottom: 20,
    padding: 10, // Padding for question container
    backgroundColor: '#f9f9f9', // Light gray background for question container
    borderRadius: 5, // Rounded corners for a modern look
    shadowColor: '#000', // Shadow for depth
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.4,
    shadowRadius: 1,
    elevation: 2, // Android shadow effect
  },
  question: {
    fontSize: 18,
    marginBottom: 10,
    fontWeight: 'bold', // Bold font for question
    color: '#333', // Darker color for question text
  },
  optionButton: {
    backgroundColor: '#3498db', // Blue background for options
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    shadowColor: '#000', // Shadow for depth
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.4,
    shadowRadius: 1,
    elevation: 2, // Android shadow effect
  },
  selectedOption: {
    backgroundColor: '#2ecc71', // Green background for selected options
  },
  optionText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold', // Bold font for option text
  },
  submitButton: {
    backgroundColor: '#e74c3c', // Red background for submit button
    padding: 15,
    borderRadius: 5,
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center', // Center the text vertically
    shadowColor: '#000', // Shadow for depth
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5, // Android shadow effect
  },
  submitButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold', // Bold font for submit button text
  },
});

export default QuizScreen;
