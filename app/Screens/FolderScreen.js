import React, { useState } from 'react';

import {SSRProvider} from '@react-aria/ssr'; 
import { NativeBaseProvider, IconButton, Actionsheet, useDisclose, Center, Button, Modal, FormControl, Input, Box, Icon, Image } from 'native-base';

import Ionicons from 'react-native-vector-icons/Ionicons';
import colours from '../config/colours.js';
import { Keyboard } from 'react-native';

import ScrollData from './ScrollData';


function FolderScreen({ route, navigation }) {
    const [fileModalVisible, setFileModalVisible] = React.useState(false);
    const initialRef = React.useRef(null);
    const finalRef = React.useRef(null);

    const { Item } = route.params;
    const [listData, setListData] = useState(Item.childSets);
    const [numChildren, setNumChildren] = useState(Item.numChildren);

    const [creatingFolder, setCreatingFolder] = useState(false);

    let fileModalText = "";

    const {
        isOpen,
        onOpen,
        onClose
    } = useDisclose();

    return (
        <SSRProvider>
            <NativeBaseProvider>
                <Center flex={1} px="3" bg={colours.secondary}>
                    <Box _dark={{
                    bg: colours.secondary
                }} flex={1} safeAreaTop maxW="400px" w="100%">
                        <IconButton maxHeight={42} bg={colours.secondary} onPress={onOpen} icon={<Icon as={Ionicons} name="add-circle-outline" size='4xl' color={colours.secondarytext} />} />
                        <ScrollData navigation={navigation} listData={listData} setListData={setListData} numChildren={numChildren} setNumChildren={setNumChildren} />
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
                                        numChildren: 0,
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
                                        numChildren: 0,
                                        isFolder: creatingFolder,
                                        terms: [],
                                        description: "",
                                        };
                                    }

                                    listData.push(newFile)
                                    setListData(listData)

                                    setNumChildren(numChildren+1)
                                    console.log(numChildren)

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

export default FolderScreen;