// AttendanceReport.js
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Button, Linking, StyleSheet } from 'react-native';
import axios from 'axios';

const AttendanceReport = () => {
  const [attendance, setAttendance] = useState([]);

  const fetchAttendance = () => {
    axios.get('http://10.20.3.166:8000/api/attendance/report/')
      .then(response => {
        setAttendance(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  };

  useEffect(() => {
    fetchAttendance();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text>{item.student.name} - {item.date}</Text>
      <Text>{item.timestamp}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Attendance Report</Text>
      <FlatList
        data={attendance}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
      <Button title="Download Excel" onPress={() => Linking.openURL('http://10.20.3.166:8000/api/attendance/export/excel/')} />
      <Button title="Download PDF" onPress={() => Linking.openURL('http://10.20.3.166:8000/api/attendance/export/pdf/')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 20, marginBottom: 10 },
  item: { borderBottomWidth: 1, marginVertical: 5, padding: 5 }
});

export default AttendanceReport;
