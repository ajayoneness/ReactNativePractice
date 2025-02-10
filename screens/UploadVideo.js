// UploadVideo.js
import React, { useState } from 'react';
import { View, Text, Button, Alert, StyleSheet } from 'react-native';
import axios from 'axios';
import * as ImagePicker from 'react-native-image-picker';

const UploadVideo = () => {
  const [video, setVideo] = useState(null);

  const pickVideo = () => {
    ImagePicker.launchImageLibrary({ mediaType: 'video' }, (response) => {
      if (response.didCancel) {
        console.log('User cancelled video picker');
      } else if (response.errorMessage) {
        console.log('VideoPicker Error: ', response.errorMessage);
      } else {
        const asset = response.assets[0];
        setVideo(asset);
      }
    });
  };

  const uploadVideo = () => {
    if (!video) {
      Alert.alert('Please select a video.');
      return;
    }
    let formData = new FormData();
    formData.append('video', {
      uri: video.uri,
      type: video.type,
      name: video.fileName || 'attendance_video.mp4',
    });

    axios.post('http://10.20.3.166:8000/api/attendance/upload/', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
    .then(response => {
      Alert.alert('Attendance Marked', JSON.stringify(response.data.students));
      setVideo(null);
    })
    .catch(error => {
      console.error(error);
      Alert.alert('Error uploading video.');
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Upload Attendance Video</Text>
      <Button title="Pick Video" onPress={pickVideo} />
      {video && (
        <Text style={styles.info}>Selected: {video.fileName}</Text>
      )}
      <Button title="Upload Video" onPress={uploadVideo} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 20, marginBottom: 10 },
  info: { marginVertical: 10 }
});

export default UploadVideo;
