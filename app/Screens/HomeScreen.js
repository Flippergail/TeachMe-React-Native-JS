import 'react-native-gesture-handler';
import React, { useState } from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import { StyleSheet, StatusBar, View, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeBaseProvider, IconButton, Actionsheet, useDisclose, Center, Button, Modal, FormControl, Input, Box, Icon, Image } from 'native-base';

import { SwipeListView } from 'react-native-swipe-list-view';

import {SSRProvider} from '@react-aria/ssr'; 
import { Keyboard } from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';
import colours from '../config/colours.js';

import SetPage from './SetScreen';
import SetSettingsPage from './SetSettingsScreen';

import FolderPage from './FolderScreen';
import FolderSettingsPage from './FolderSettingsScreen';

import ScrollData from './ScrollData';


let data = [{
  key: '0',
  Name: 'Maths',
  IconUrl: 'https://d29fhpw069ctt2.cloudfront.net/photo/7125/preview/174a24d3-7f7e-4401-9882-6cd7460da7fd_1280x1280.jpg',
  terms: [],
  isFolder: false,
  description: "",
}, {
  key: '1',
  Name: 'Chemistry',
  IconUrl: 'https://www.pngitem.com/pimgs/m/154-1547044_chemistry-icon-png-png-download-biology-chemistry-science.png',
  childSets: [
    {
      key: '0',
      Name: 'Bonding',
      IconUrl: 'https://tse1.mm.bing.net/th?id=OIP.obfWC0XjnIkHs9O2j1pi5AHaHa&pid=Api',
      terms: [],
      isFolder: false,
      description: "",
    },{
      key: '1',
      Name: 'Metals',
      IconUrl: 'https://tse1.mm.bing.net/th?id=OIP.obfWC0XjnIkHs9O2j1pi5AHaHa&pid=Api',
      terms: [],
      isFolder: false,
      description: "metals bonding and structure revision",
    },{
      key: '2',
      Name: 'Non-Metals',
      IconUrl: 'https://tse1.mm.bing.net/th?id=OIP.obfWC0XjnIkHs9O2j1pi5AHaHa&pid=Api',
      terms: [],
      isFolder: false,
      description: "non-metals bonding and structure revision",
    }
  ],
  FolderParentLevel: "Parent",
  isFolder: true,
  description: "",
}, {
  key: '2',
  Name: 'Geography',
  IconUrl: 'https://cdn2.iconfinder.com/data/icons/back-to-school-17/128/schoolsetflat-17-512.png',
  childSets: [
    {
      key: '0',
      Name: 'Maps',
      IconUrl: 'https://tse1.mm.bing.net/th?id=OIP.obfWC0XjnIkHs9O2j1pi5AHaHa&pid=Api',
      terms: [],
      isFolder: false,
      description: "compass bearings and calculating distances",
    },{
      key: '1',
      Name: 'Rivers',
      IconUrl: 'https://tse1.mm.bing.net/th?id=OIP.obfWC0XjnIkHs9O2j1pi5AHaHa&pid=Api',
      terms: [],
      isFolder: false,
      description: "types of rivers and information about them",
    }
  ],
  FolderParentLevel: "Parent",
  isFolder: true,
  description: "",
}, {
  key: '3',
  Name: 'Latin',
  IconUrl: 'https://tse1.mm.bing.net/th?id=OIP.obfWC0XjnIkHs9O2j1pi5AHaHa&pid=Api',
  terms: [],
  isFolder: false,
  description: "",
}, {
  key: '4',
  Name: 'History',
  IconUrl: 'https://cdn1.iconfinder.com/data/icons/school-64/512/school-education-study-learn-11-512.png',
  terms: [],
  isFolder: false,
  description: "",
},{
  key: '5',
  Name: 'Biology',
  IconUrl: 'https://cdn1.iconfinder.com/data/icons/school-64/512/school-education-study-learn-09-1024.png',
  terms: [],
  isFolder: false,
  description: "",
}];


const Stack = createStackNavigator();

function HomeScreen() {
  return(
    <Stack.Navigator initialRouteName='HomePage' >
      <Stack.Screen name="HomePage" component={HomePage} options={{'headerShown': false}} />  
      <Stack.Screen name="FolderPage" component={FolderPage} options={({route}) => ({ headerBackImage:()=>(<NativeBaseProvider><View style={{width: 44, height: 44, left: 5, bottom: 8}}><Image flex={1} source={require("../assets/CustomBackButton.png")} alt="Image Failed To Load" /></View></NativeBaseProvider>), headerBackTitleVisible:false ,title: route.params.Item.Name, headerTitleStyle: {color: colours.text}, headerStyle: { height: 85, backgroundColor: colours.primary }})}/>
      <Stack.Screen name="SetPage" component={SetPage} options={({route}) => ({ headerBackImage:()=>(<NativeBaseProvider><View style={{width: 44, height: 44, left: 5, bottom: 8}}><Image flex={1} source={require("../assets/CustomBackButton.png")} alt="Image Failed To Load" /></View></NativeBaseProvider>), headerBackTitleVisible:false ,title: route.params.Item.Name, headerTitleStyle: {color: colours.text}, headerStyle: { height: 85, backgroundColor: colours.primary }})}/>
    </Stack.Navigator>
  )
}

  
function HomePage() {
  const [fileModalVisible, setFileModalVisible] = React.useState(false);
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  const [listData, setListData] = useState(data);

  const [creatingFolder, setCreatingFolder] = useState(false);
  
  const {
      isOpen,
      onOpen,
      onClose
  } = useDisclose();

  const navigation = useNavigation();
  let fileModalText = "";
  return (
    <SSRProvider>
      <NativeBaseProvider>
        <Center flex={1} px="3" bg={colours.secondary}>
          <Box _dark={{
          bg: colours.secondary
        }} flex={1} safeAreaTop maxW="400px" w="100%">
            <IconButton bottom={1} maxHeight={33} bg={colours.secondary} onPress={onOpen} icon={<Icon as={Ionicons} name="add-circle-outline" size='4xl' color={colours.secondarytext} />} />
            <ScrollData navigation={navigation} listData={listData} setListData={setListData} />
          </Box>
        </Center>

        <Center>
          <Actionsheet isOpen={isOpen} onClose={onClose} size="full">
              <Actionsheet.Content>
                  <Actionsheet.Item onPress={()=>{setFileModalVisible(true); setCreatingFolder(false)}} startIcon={<Icon as={Ionicons} name="albums-outline" color={colours.secondarytext} mr="1" size="6" />}>
                  New Set
                  </Actionsheet.Item>
                  <Actionsheet.Item onPress={()=>{setFileModalVisible(true); setCreatingFolder(true)}} startIcon={<Icon as={Ionicons} color={colours.secondarytext} mr="1" size="6" name="folder-outline" />}>
                  New Folder
                  </Actionsheet.Item>
                  <Actionsheet.Item onPress={onClose} p={3} startIcon={<Icon as={Ionicons} color={colours.secondarytext} mr="1" size="5" name="close-outline"/>}>
                  Cancel
                  </Actionsheet.Item>
              </Actionsheet.Content>
          </Actionsheet>
        </Center>

        <Center px="3">
            <Modal isOpen={fileModalVisible} onClose={() => setFileModalVisible(false)} initialFocusRef={initialRef} finalFocusRef={finalRef}>
                <Modal.Content>
                    <Modal.CloseButton />
                    <Modal.Header>Name New {creatingFolder ? "Folder" : "Set"}</Modal.Header>
                    <Modal.Body>
                        <FormControl>
                            <FormControl.Label>Name</FormControl.Label>
                            <Input clearTextOnFocus={true} ref={initialRef} onChangeText={text=>{fileModalText=text}} />
                        </FormControl>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button.Group space={2}>
                            <Button variant="ghost" colorScheme={colours.secondary} onPress={() => {
                                setFileModalVisible(false);
                                Keyboard.dismiss();
                            }}>
                                Cancel
                            </Button>

                            <Button onPress={() => {
                              onClose()
                              setFileModalVisible(false);
                              Keyboard.dismiss();

                              FileKeyCount = listData.length;

                              let newFile = null
                              if (creatingFolder) {
                                // file needs childSets list
                                newFile = {
                                  key: FileKeyCount.toString(),
                                  Name: fileModalText,
                                  IconUrl: 'https://tse1.mm.bing.net/th?id=OIP.obfWC0XjnIkHs9O2j1pi5AHaHa&pid=Api',
                                  childSets: [],
                                  FolderParentLevel: "Parent",
                                  isFolder: creatingFolder,
                                  description: "",
                                };
                              } else {
                                newFile = {
                                  // file needs terms list
                                  key: FileKeyCount.toString(),
                                  Name: fileModalText,
                                  IconUrl: 'https://tse1.mm.bing.net/th?id=OIP.obfWC0XjnIkHs9O2j1pi5AHaHa&pid=Api',
                                  isFolder: creatingFolder,
                                  terms: [],
                                  description: "",
                                };
                              }

                              listData.push(newFile)
                              setListData(listData)
                              
                              data = listData

                              if (creatingFolder) {
                                navigation.push('FolderPage', {Item: newFile});
                              } else {
                                navigation.push('SetPage', {Item: newFile});
                              }
                            }}>
                                Save
                            </Button>
                        </Button.Group>
                    </Modal.Footer>
                </Modal.Content>
            </Modal>
        </Center>
      </NativeBaseProvider>
    </SSRProvider>
  );
}

export default HomeScreen;