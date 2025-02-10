import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Image, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import * as ImagePicker from 'expo-image-picker';

const RegisterStudent = () => {
  const [name, setName] = useState('');
  const [studentId, setStudentId] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [profileImage, setProfileImage] = useState(null);

  // Request permission when the component mounts
  useEffect(() => {
    (async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission Required', 'Please grant gallery access to pick an image.');
      }
    })();
  }, []);

  const pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1, // Best quality
      });

      if (!result.canceled) {
        setProfileImage(result.assets[0]); // Store the first selected image
      }
    } catch (error) {
      console.log('Image Picker Error: ', error);
      Alert.alert('Error picking image. Please try again.');
    }
  };

  const registerStudent = () => {
    if (!name || !studentId || !phone || !email || !profileImage) {
      Alert.alert('Please fill all fields and select an image.');
      return;
    }

    let formData = new FormData();
    formData.append('name', name);
    formData.append('student_id', studentId);
    formData.append('phone', phone);
    formData.append('email', email);
    formData.append('profile_image', {
      uri: profileImage.uri,
      type: 'image/jpeg', // Adjust if needed
      name: 'profile.jpg',
    });

    axios.post('http://10.20.3.166:8000/api/students/', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
    .then(response => {
      Alert.alert('Student Registered Successfully!');
      // Clear fields
      setName('');
      setStudentId('');
      setPhone('');
      setEmail('');
      setProfileImage(null);
    })
    .catch(error => {
      console.error(error);
      Alert.alert('Error registering student.');
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register Student</Text>
      <TextInput placeholder="Name" value={name} onChangeText={setName} style={styles.input} />
      <TextInput placeholder="Student ID" value={studentId} onChangeText={setStudentId} style={styles.input} />
      <TextInput placeholder="Phone" value={phone} onChangeText={setPhone} style={styles.input} />
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} style={styles.input} />
      <Button title="Pick Profile Image" onPress={pickImage} />
      {profileImage && <Image source={{ uri: profileImage.uri }} style={styles.image} />}
      <Button title="Register" onPress={registerStudent} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 20, marginBottom: 10 },
  input: { borderWidth: 1, marginVertical: 10, padding: 8, borderRadius: 4 },
  image: { width: 100, height: 100, marginVertical: 10 },
});

export default RegisterStudent;
