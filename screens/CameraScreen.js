import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { Camera, useCameraDevices } from 'react-native-vision-camera';

const CameraScreen = () => {
  const [hasPermission, setHasPermission] = useState(false);
  const [isCameraReady, setIsCameraReady] = useState(false);

  const devices = useCameraDevices();
  const device = devices.front || devices.back; // use front camera by default

  // Request camera permissions when the component mounts
  useEffect(() => {
    const requestPermission = async () => {
      const permission = await Camera.requestCameraPermission();
      setHasPermission(permission === 'authorized');
    };

    requestPermission();
  }, []);

  if (device == null) {
    return <Text>Loading camera...</Text>;
  }

  const handleCameraReady = () => {
    setIsCameraReady(true);
  };

  return (
    <View style={styles.container}>
      {hasPermission ? (
        <Camera
          style={styles.camera}
          device={device}
          isActive={isCameraReady}
          onInitialized={handleCameraReady}
        />
      ) : (
        <Text>No access to camera</Text>
      )}
      <View style={styles.bottomControls}>
        <Button
          title="Capture"
          onPress={() => {
            if (isCameraReady) {
              // Add your capture functionality here
              console.log('Capture button pressed');
            }
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  camera: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  bottomControls: {
    marginBottom: 20,
    alignItems: 'center',
  },
});

export default CameraScreen;
