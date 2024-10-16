import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, SafeAreaView, ActivityIndicator, Alert } from 'react-native';

export default function AssignmentsScreen({ route }) {
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const { studentNumber } = route.params;  // Get student number from route params

  useEffect(() => {
    // Fetch assignments from backend
    const fetchAssignments = async () => {
      try {
        const response = await fetch(`https://your-server-url.com/api/assignments/${studentNumber}`);
        const data = await response.json();

        if (response.ok) {
          setAssignments(data);
        } else {
          Alert.alert('Error', 'Failed to load assignments');
        }
      } catch (error) {
        Alert.alert('Error', 'Something went wrong');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchAssignments();
  }, [studentNumber]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#1E90FF" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Your Assignments</Text>

      {assignments.length === 0 ? (
        <Text style={styles.noAssignmentsText}>No assignments found</Text>
      ) : (
        <FlatList
          data={assignments}
          keyExtractor={(item) => item._id}  // MongoDB document id
          renderItem={({ item }) => (
            <View style={styles.assignmentItem}>
              <Text style={styles.assignmentTitle}>{item.title}</Text>
              <Text style={styles.assignmentDescription}>{item.description}</Text>
              <Text style={styles.assignmentDueDate}>Due: {new Date(item.dueDate).toLocaleDateString()}</Text>
            </View>
          )}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noAssignmentsText: {
    fontSize: 18,
    color: 'gray',
    textAlign: 'center',
  },
  assignmentItem: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  assignmentTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  assignmentDescription: {
    fontSize: 14,
    marginVertical: 5,
  },
  assignmentDueDate: {
    fontSize: 12,
    color: 'gray',
  },
});
