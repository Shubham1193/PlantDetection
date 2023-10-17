import React, { useState, useEffect } from 'react';
import { View, Image, StyleSheet, TextInput, TouchableOpacity ,ScrollView} from 'react-native';
import { db } from './config';
import { collection, getDocs } from '@firebase/firestore';
import { Avatar, Button, Card, Text } from 'react-native-paper';


export default function Plants({ navigation }) {
    const [data, setData] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    const ref = collection(db, 'plants');

    useEffect(() => {
        const fetchData = async () => {
            const querySnapshot = await getDocs(ref);
            const newData = [];

            querySnapshot.forEach((doc) => {
                newData.push({ id: doc.id, ...doc.data() });
            });

            setData(newData);
        };

        fetchData();
    }, []);

    const filteredData = data.filter((item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    // const Stack = createStackNavigator();
    return (
        <View style={styles.container}>
            <TextInput
                style={styles.searchBox}
                placeholder="Search..."
                onChangeText={(text) => setSearchQuery(text)}
            />
            <ScrollView contentContainerStyle={styles.container}>
            {filteredData.map((item) => (
                <TouchableOpacity key={item.id}
                style={styles.cardContainer}
                onPress={() =>
                  navigation.navigate('PlantDetailsScreen', {
                    name: item.name,
                    info: item.info,
                    image: item.image,
                  })
                } >
                    <Card style={styles.card}>
                        <Card.Cover source={{ uri: item.image }} style={styles.cardImage} />
                        <Card.Content>
                            <Text style={styles.cardTitle}>{item.name}</Text>
                            <Text style={styles.cardInfo}>{item.info}</Text>
                        </Card.Content>
                    </Card>
                </TouchableOpacity>
                
            ))}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    // container: {
    //     flex: 1,
    //     backgroundColor: '#f5f5f5', // Background color
    // },
    searchBox: {
        margin: 10,
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        backgroundColor: '#fff', // Background color
    },
   
});
