// import React, { useState } from 'react';
// import {
//   SafeAreaView,
//   Image,
//   StatusBar,
//   StyleSheet,
//   Text,
//   Platform,
//   Dimensions,
//   useColorScheme,
//   View,
//   TouchableOpacity,
//   ImageBackground,
// } from 'react-native';
// import mime from 'mime'
// import axios from 'axios';
// import Config from 'react-native-config';
// // import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
// import { Colors } from 'react-native/Libraries/NewAppScreen';
// // import PermissionsService, {isIOS} from './Permissions';
// import * as ImagePicker from 'expo-image-picker';

// axios.interceptors.request.use(
//   async config => {
//     let request = config;
//     request.headers = {
//       'Content-Type': 'multipart/form-data',
//       Accept: 'application/json',
//     };
//     request.url = configureUrl(config.url);
//     return request;
//   },
//   error => error,
// );

// export const { height, width } = Dimensions.get('window');

// export const configureUrl = url => {
//   let authUrl = url;
//   if (url && url[url.length - 1] === '/') {
//     authUrl = url.substring(0, url.length - 1);
//   }
//   return authUrl;
// };

// export const fonts = {
//   Bold: { fontFamily: 'Roboto-Bold' },
// };

// const options = {
//   mediaType: 'photo',
//   quality: 1,
//   width: 256,
//   height: 256,
//   includeBase64: true,
// };

// const Main = () => {
//   const [result, setResult] = useState('');
//   const [label, setLabel] = useState('');
//   const isDarkMode = useColorScheme() === 'dark';
//   const [image, setImage] = useState('');
//   const backgroundStyle = {
//     backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
//   };

//   const openCamera = async () => {
//     const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
//     if (permissionResult.granted === false) {
//       alert('Camera permission is required to take a photo.');
//       return;
//     }
//     const result = await ImagePicker.launchCameraAsync(options);
//     if (!result.canceled) {
//       setImage(result.assets[0].uri);
//       const uri = result?.assets[0]?.uri;
//       // const path = Platform.OS !== 'ios' ? uri : 'file://' + uri;
//       // const pathh = fixFilePath(path);
//       getResult(result);

//     }
//   };

//   const openLibrary = async () => {
//     const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
//     if (permissionResult.granted === false) {
//       alert('Media Library permission is required to pick an image.');
//       return;
//     }
//     const result = await ImagePicker.launchImageLibraryAsync(options);
//     if (!result.canceled) {
//       setImage(result.assets[0].uri);
//       const uri = result?.assets[0]?.uri;
//       // const path = Platform.OS !== 'ios' ? uri : 'file://' + uri;
//       // //  getResult(path,result);
//       // const pathh = fixFilePath(path);
//       getResult(result);
//       // sendFile(pathh)
//     }
//   };
//   function fixFilePath(filePath) {
//     // Use regular expression to replace the first slash after "file:"
//     return filePath.replace(/^file:\/\//, 'file:/');
//   }

//   const clearOutput = () => {
//     setResult('');
//     setImage('');
//   };

  
// // const data = new FormData();
// // data.append('image', {
// //      uri: image.uri,
// //      name: image.uri.split('/').pop() // getting the text after the last slash which is the name of the image
// //     type: mime.getType(image.uri) // image.type returns 'image' but mime.getType(image.uri) returns 'image/jpeg' or whatever is the type

// // })


//   const getResult = async (image) => {
//     setImage(image.uri);
//     setLabel('Predicting...');
//     setResult('');
//     const params = {
//       uri: image.uri,
//       name: image.uri.split('/').pop(), // getting the text after the last slash which is the name of the image
//       type: mime.getType(image.uri) 
//     };

//     const res = await getPredication(params);
//     if (res?.data?.class) {
//       setLabel(res.data.class);
//       setResult(res.data.confidence);
//     } else {
//       setLabel('Failed to predict');
//     }
//   };

//   const getPredication = async (params) => {
//     return new Promise((resolve, reject) => {
//       var bodyFormData = new FormData();
//       bodyFormData.append('file', params);
//       const url = 'https://us-central1-trialapp-402019.cloudfunctions.net/predict';
//       axios.post(url, bodyFormData)
//         .then(response => {
//           resolve(response);
//         })
//         .catch(error => {
//           setLabel('Failed to predict.');
//           console.log('Error:', error);
//         });

//     }
//     )
//   };





//   return (
//     <View style={[backgroundStyle, styles.outer]}>
//       <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
//       <ImageBackground
//         blurRadius={10}
//         source={{ uri: 'background' }}
//         style={{ height: height, width: width }}
//       />
//       <Text style={styles.title}>{'Potato Disease \nPrediction App'}</Text>
//       <TouchableOpacity onPress={clearOutput} style={styles.clearStyle}>
//         <Image source={{ uri: 'clean' }} style={styles.clearImage} />
//       </TouchableOpacity>
//       {(image?.length && (
//         <Image source={{ uri: image }} style={styles.imageStyle} />
//       )) ||

//         null}
//       {(result && label && (
//         <View style={styles.mainOuter}>
//           <Text style={[styles.space, styles.labelText]}>
//             {'Label: \n'}
//             <Text style={styles.resultText}>{label}</Text>
//           </Text>
//           <Text style={[styles.space, styles.labelText]}>
//             {'Confidence: \n'}
//             <Text style={styles.resultText}>
//               {parseFloat(result).toFixed(2) + '%'}
//             </Text>
//           </Text>
//         </View>
//       )) ||
//         (image && <Text style={styles.emptyText}>{label}</Text>) || (
//           <Text style={styles.emptyText}>
//             Use below buttons to select a picture of a potato plant leaf.
//           </Text>
//         )}
//       <View style={styles.btn}>
//         <TouchableOpacity
//           activeOpacity={0.9}
//           onPress={openCamera}
//           style={styles.btnStyle}>
//           <Image source={{ uri: 'camera' }} style={styles.imageIcon} />
//         </TouchableOpacity>
//         <TouchableOpacity
//           activeOpacity={0.9}
//           onPress={openLibrary}
//           style={styles.btnStyle}>
//           <Image source={{ uri: 'gallery' }} style={styles.imageIcon} />
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   title: {
//     alignSelf: 'center',
//     position: 'absolute',
//     top: (Platform.OS == 'ios' && 35) || 10,
//     fontSize: 30,
//     ...fonts.Bold,
//     color: 'black',
//   },
//   clearImage: { height: 40, width: 40, tintColor: '#FFF' },
//   mainOuter: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     position: 'absolute',
//     top: height / 1.6,
//     alignSelf: 'center',
//   },
//   outer: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   btn: {
//     position: 'absolute',
//     bottom: 40,
//     justifyContent: 'space-between',
//     flexDirection: 'row',
//   },
//   btnStyle: {
//     backgroundColor: '#FFF',
//     opacity: 0.8,
//     marginHorizontal: 30,
//     padding: 20,
//     borderRadius: 20,
//   },
//   imageStyle: {
//     marginBottom: 50,
//     width: width / 1.5,
//     height: width / 1.5,
//     borderRadius: 20,
//     position: 'absolute',
//     borderWidth: 0.3,
//     borderColor: '#FFF',
//     top: height / 4.5,
//   },
//   clearStyle: {
//     position: 'absolute',
//     top: 100,
//     right: 30,
//     tintColor: '#FFF',
//     zIndex: 10,
//   },
//   space: { marginVertical: 10, marginHorizontal: 10 },
//   labelText: { color: '#FFF', fontSize: 20, ...fonts.Bold },
//   resultText: { fontSize: 32, ...fonts.Bold },
//   imageIcon: { height: 40, width: 40, tintColor: '#000' },
//   emptyText: {
//     position: 'absolute',
//     top: height / 1.6,
//     alignSelf: 'center',
//     color: '#FFF',
//     fontSize: 20,
//     maxWidth: '70%',
//     ...fonts.Bold,
//   },
// });

// export default Main;
