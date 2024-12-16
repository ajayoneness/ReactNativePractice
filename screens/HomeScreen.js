// screens/HomeScreen.js
import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import Card from './Card'; 



const HomeScreen = ({ navigation }) => {
  
  const cardData = [
    {
      title: 'Card Title 1',
      description: 'This is the description for the first card.',
      image: 'https://static.vecteezy.com/system/resources/thumbnails/031/412/184/small/ai-generated-ai-generative-outdoor-nature-adventure-forest-walk-path-road-adventures-background-graphic-art-photo.jpg',
    },
    {
      title: 'Card Title 2',
      description: 'This is the description for the second card.',
      image: 'https://static.vecteezy.com/system/resources/thumbnails/031/412/584/small/ai-generated-ai-generative-outdoor-nature-landsacpe-forest-tree-road-highway-path-landscape-background-graphic-art-photo.jpg',
    },
    {
      title: 'Card Title 3',
      description: 'This is the description for the third card.',
      image: 'https://st2.depositphotos.com/4317479/6367/i/450/depositphotos_63672331-stock-photo-carpathian-mountain-valley.jpg',
    },
    {
      title: 'Card Title 4',
      description: 'This is the description for the first card.',
      image: 'https://static.vecteezy.com/system/resources/thumbnails/031/412/184/small/ai-generated-ai-generative-outdoor-nature-adventure-forest-walk-path-road-adventures-background-graphic-art-photo.jpg',
    },
    {
      title: 'Card Title 5',
      description: 'This is the description for the second card.',
      image: 'https://static.vecteezy.com/system/resources/thumbnails/031/412/584/small/ai-generated-ai-generative-outdoor-nature-landsacpe-forest-tree-road-highway-path-landscape-background-graphic-art-photo.jpg',
    },
    {
      title: 'Card Title 6',
      description: 'This is the description for the third card.',
      image: 'https://st2.depositphotos.com/4317479/6367/i/450/depositphotos_63672331-stock-photo-carpathian-mountain-valley.jpg',
    },
  ];

  const handleCardPress = (title, description, image) => {
    // Navigate to the Detail screen and pass the card details
    navigation.navigate('Detail', { title, description, image });
  };

  return (
    <ScrollView style={styles.container}>
      {cardData.map((card, index) => (
        <Card
          key={index}
          title={card.title}
          description={card.description}
          image={card.image}
          onPress={() => handleCardPress(card.title, card.description, card.image)} // Pass the card data
        />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 2,
    backgroundColor: '#f5f5f5',
    paddingTop: 20,
  },
});

export default HomeScreen;
