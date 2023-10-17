// app.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Plants from './plants';
import PlantDetailsScreen from './PlantDetailsScreen';
// import Predict from './Predict';
// import './ImagePickerComponent'
import ImagePickerComponent from './ImagePickerComponent';
import Main from './Image'

const Stack = createStackNavigator();

export default function App() {
  return (
    // <Predict/>
    <ImagePickerComponent />
    // <Main />
    
    // <Main/>
    // <NavigationContainer>
    //   <Stack.Navigator initialRouteName="Plants">
    //     <Stack.Screen name="Plants" component={Plants} />
    //     <Stack.Screen name="PlantDetailsScreen" component={PlantDetailsScreen} />
    //   </Stack.Navigator>
    // </NavigationContainer>
    
  );
}
