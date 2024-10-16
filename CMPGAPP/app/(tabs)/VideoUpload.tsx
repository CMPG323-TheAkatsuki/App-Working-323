import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity, Alert } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';

export default function UploadVideoScreen() {
  const [videoUri, setVideoUri] = useState(null);

  const chooseVideo = () => {
    const options = {
      mediaType: 'video',
      includeBase64: false,
    };

    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled video picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.assets) {
        setVideoUri(response.assets[0].uri);
      }
    });
  };

  const uploadVideo = async () => {
    if (!videoUri) {
      Alert.alert('Error', 'Please select a video to upload');
      return;
    }

    const formData = new FormData();
    formData.append('video', {
      uri: videoUri,
      type: 'video/mp4', // Change this based on the video type
      name: 'video.mp4', // Set the name of the file
    });

    try {
      const response = await fetch('https://your-server-url.com/api/upload', {
        method: 'POST',
        body: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.ok) {
        Alert.alert('Success', 'Video uploaded successfully!');
        setVideoUri(null); // Reset the video URI
      } else {
        Alert.alert('Error', 'Failed to upload video');
      }
    } catch (error) {
      Alert.alert('Error', 'Something went wrong while uploading the video');
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Upload Video</Text>

      <TouchableOpacity style={styles.button} onPress={chooseVideo}>
        <Text style={styles.buttonText}>{videoUri ? 'Change Video' : 'Select Video'}</Text>
      </TouchableOpacity>

      {videoUri && (
        <View style={styles.videoContainer}>
          <Text style={styles.videoText}>Selected Video: {videoUri}</Text>
        </View>
      )}

      <TouchableOpacity style={styles.uploadButton} onPress={uploadVideo}>
        <Text style={styles.uploadText}>Upload Video</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#1E90FF',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 5,
    marginBottom: 20,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18,
  },
  videoContainer: {
    marginBottom: 20,
  },
  videoText: {
    fontSize: 16,
    color: 'gray',
  },
  uploadButton: {
    backgroundColor: '#32CD32',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 5,
  },
  uploadText: {
    color: '#FFF',
    fontSize: 18,
  },
});
