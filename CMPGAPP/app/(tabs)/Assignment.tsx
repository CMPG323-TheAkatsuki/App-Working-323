import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, ActivityIndicator, Alert } from 'react-native';
import { json } from 'express';

const assignment = {
title: 'Assignment 1',
description: 'Write a 500-word essay on a topic of your choice',
dueDate: '2021-09-30T23:59:59.999Z',
};

import { RouteProp } from '@react-navigation/native';

type AssignmentRouteProp = RouteProp<{ params: { assignmentId: string } }, 'params'>;

export default function ViewAssignmentScreen({ route }: { route: AssignmentRouteProp }) {
  const { assignmentId } = route.params;  // Get the assignment ID passed via navigation
  const [assignment, setAssignment] = useState<{ title: string; description: string; dueDate: string } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch assignment data from backend
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
    marginBottom: 20,
  },
  description: {
    fontSize: 18,
    marginBottom: 10,
  },
  dueDate: {
    fontSize: 16,
    color: 'gray',
  },
  errorMessage: {
    fontSize: 18,
    color: 'red',
  },
});
