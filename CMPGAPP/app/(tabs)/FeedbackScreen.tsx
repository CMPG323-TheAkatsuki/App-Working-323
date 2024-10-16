import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, SafeAreaView, Alert, ActivityIndicator } from 'react-native';

export default function FeedbackScreen({ route }) {
  const { assignmentId } = route.params;  // Get the assignment ID passed via navigation
  const [assignment, setAssignment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [feedback, setFeedback] = useState('');

  useEffect(() => {
    // Fetch assignment data from the backend
    const fetchAssignment = async () => {
      try {
        const response = await fetch(`https://your-server-url.com/api/assignments/${assignmentId}`);
        const data = await response.json();

        if (response.ok) {
          setAssignment(data);
        } else {
          Alert.alert('Error', 'Failed to load assignment details');
        }
      } catch (error) {
        Alert.alert('Error', 'Something went wrong');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchAssignment();
  }, [assignmentId]);

  const handleFeedbackSubmit = async () => {
    if (feedback === '') {
      Alert.alert('Error', 'Please enter your feedback');
      return;
    }

    try {
      const response = await fetch(`https://your-server-url.com/api/feedback`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          assignmentId,
          feedback,
        }),
      });

      if (response.ok) {
        Alert.alert('Success', 'Feedback submitted successfully!');
        setFeedback('');  // Clear feedback input
      } else {
        Alert.alert('Error', 'Failed to submit feedback');
      }
    } catch (error) {
      Alert.alert('Error', 'Something went wrong');
      console.error(error);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#1E90FF" />
      </View>
    );
  }

  if (!assignment) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.errorMessage}>Assignment not found</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>{assignment.title}</Text>
      <Text style={styles.description}>{assignment.description}</Text>
      <Text style={styles.dueDate}>Due: {new Date(assignment.dueDate).toLocaleDateString()}</Text>

      <TextInput
        style={styles.feedbackInput}
        placeholder="Enter your feedback here"
        multiline
        numberOfLines={4}
        value={feedback}
        onChangeText={setFeedback}
        textAlignVertical="top"  // Make multiline input start at the top
      />

      <TouchableOpacity style={styles.submitButton} onPress={handleFeedbackSubmit}>
        <Text style={styles.submitText}>Submit Feedback</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F5F5F5',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 18,
    marginBottom: 10,
  },
  dueDate: {
    fontSize: 16,
    color: 'gray',
    marginBottom: 20,
  },
  feedbackInput: {
    height: 100,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginBottom: 20,
    backgroundColor: '#FFF',
  },
  submitButton: {
    backgroundColor: '#1E90FF',
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  submitText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  errorMessage: {
    fontSize: 18,
    color: 'red',
  },
});
