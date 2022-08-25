import React, { useState } from 'react';

import { StyleSheet, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeBaseProvider, Actionsheet, useDisclose, Center, Button, Modal, FormControl, Input, Box, Text, Pressable, IconButton, Icon, HStack, VStack, Spacer, Image } from 'native-base';
import { SwipeListView } from 'react-native-swipe-list-view';

import {SSRProvider} from '@react-aria/ssr'; 
import { Keyboard } from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';
import colours from '../config/colours.js';

let keyCount = 6;

let data = [{
  key: '1',
  setName: 'Maths',
  setIconUrl: 'https://tse1.mm.bing.net/th?id=OIP.obfWC0XjnIkHs9O2j1pi5AHaHa&pid=Api',
  isFolder: false,
  itemNumber: 104,
  description: "",
}, {
  key: '2',
  setName: 'Chemistry',
  setIconUrl: 'https://tse1.mm.bing.net/th?id=OIP.obfWC0XjnIkHs9O2j1pi5AHaHa&pid=Api',
  isFolder: true,
  itemNumber: 2,
  description: "",
}, {
  key: '3',
  setName: 'Geography',
  setIconUrl: 'https://tse1.mm.bing.net/th?id=OIP.obfWC0XjnIkHs9O2j1pi5AHaHa&pid=Api',
  isFolder: true,
  itemNumber: 5,
  description: "",
}, {
  key: '4',
  setName: 'Latin',
  setIconUrl: 'https://tse1.mm.bing.net/th?id=OIP.obfWC0XjnIkHs9O2j1pi5AHaHa&pid=Api',
  isFolder: false,
  itemNumber: 97,
  description: "",
}, {
  key: '5',
  setName: 'History',
  setIconUrl: 'https://tse1.mm.bing.net/th?id=OIP.obfWC0XjnIkHs9O2j1pi5AHaHa&pid=Api',
  isFolder: false,
  itemNumber: 42,
  description: "",
},{
  key: '6',
  setName: 'Biology',
  setIconUrl: 'https://tse1.mm.bing.net/th?id=OIP.obfWC0XjnIkHs9O2j1pi5AHaHa&pid=Api',
  isFolder: false,
  itemNumber: 42,
  description: "",
}];

let listData
let setListData

  
function HomeScreen() {
  const [fileModalVisible, setFileModalVisible] = React.useState(false);
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  [listData, setListData] = useState(data);

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
        <Center flex={1} px="3">
          <Box _dark={{
          bg: colours.backgroundColour
        }} flex={1} safeAreaTop maxW="400px" w="100%">
            <IconButton onPress={onOpen} icon={<Icon as={Ionicons} name="add-circle-outline" size='4xl' color={colours.secondarytext} />} />
            <ScrollData/>
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

                              keyCount+=1
                              data.push({
                                key: keyCount.toString(),
                                setName: fileModalText,
                                setIconUrl: 'https://tse1.mm.bing.net/th?id=OIP.obfWC0XjnIkHs9O2j1pi5AHaHa&pid=Api',
                                isFolder: creatingFolder,
                                itemNumber: 0,
                                description: "",
                              })
                              setListData(data)
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

function ScrollData() {
  const [deleteModalVisible, setDeleteModalVisible] = React.useState(false);
  const [deletingRowInfo, setDeletingRowInfo] = React.useState({});
  const [deletingRowMap, setDeletingRowMap] = React.useState(null);
  const [deletingRowKey, setDeletingRowKey] = React.useState(null);

  const closeRow = (rowMap, rowKey) => {
    if (rowMap[rowKey]) {
      rowMap[rowKey].closeRow();
    }
  };

  const ConfirmDeleteRowModal = ()=> {
   return(<Modal isOpen={deleteModalVisible} onClose={() => setDeleteModalVisible(false)} size="lg">
    <Modal.Content maxWidth="350">
      <Modal.CloseButton />
      <Modal.Header>Confirm Permanent Delete</Modal.Header>
      <Modal.Body>
        <Text color={colours.secondarytext} fontWeight="small">Please confirm you would like to delete:</Text>
        <Text color={'red.500'} fontWeight="medium">{deletingRowInfo.Name} | Type: {deletingRowInfo.FileType} | Id: {deletingRowInfo.Id}</Text>
      </Modal.Body>
      <Modal.Footer>
        <Button flex="1" onPress={() => {
          deleteRow(deletingRowMap, deletingRowKey)
          setDeleteModalVisible(false)
      }}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal.Content>
  </Modal>)}

  const confirmDeleteRow = (rowMap, rowKey, rowName, isRowFolder, rowId) =>{
    let rowFileType = isRowFolder ? "Folder" : "Set"
    setDeletingRowInfo({FileType: rowFileType, Name: rowName, Id: rowId});
    setDeleteModalVisible(true);

    setDeletingRowMap(rowMap);
    setDeletingRowKey(rowKey);
  }

  const deleteRow = (rowMap, rowKey) => {
    closeRow(rowMap, rowKey);
    const newData = [...listData];
    const prevIndex = listData.findIndex(item => item.key === rowKey);
    newData.splice(prevIndex, 1);
    data=newData;
    setListData(newData);
  };

  const onRowDidOpen = rowKey => {};

  const renderItem = ({
    item,
    index
  }) => <Box borderRadius={20} bg={colours.primary} borderWidth={2} borderColor={'firebrick'} marginVertical={3}>
      <Pressable onPress={() => console.log('Open Set')} >
        <Box pl="4" pr="5" py="3" >
          <HStack alignItems="center" space={3}>
            <Image borderRadius={10} size="48px" source={{uri: item.setIconUrl}} alt="Image Failed To Load" />
            <VStack>
              <Text fontSize={"xl"} color={colours.text} _dark={{
              color: colours.text
            }} bold>
                {item.setName}
              </Text>
              <Text color={colours.text} _dark={{
              color: colours.text
            }}>
                {item.description}
              </Text>
            </VStack>
            <Spacer />
            <Text right={0} flexDirection={'row'} position={'absolute'} alignSelf="flex-start" fontSize="xs" color={colours.text} _dark={{
            color: colours.text
          }}>
              {item.isFolder ? "sets: " : "terms: "}{item.itemNumber}
            </Text>
            {item.isFolder && <Icon as={<Ionicons name="folder" />} alignSelf="flex-end"  color={colours.text} size="lg" />}
          </HStack>
        </Box>
      </Pressable>
    </Box>;

  const renderHiddenItem = (data, rowMap) => (
    <HStack flex="1" pl="2.8" marginVertical={3}>
      <Pressable borderRadius={20} w="81" ml="auto" cursor="pointer" bg="red.500" justifyContent="center" onPress={() => confirmDeleteRow(rowMap, data.item.key, data.item.setName, data.item.isFolder, data.item.key)} _pressed={{opacity: 0.5}}>
        <VStack alignItems="center" space={2}>
          <Icon as={<Ionicons name="close" />} color={colours.text} size="sm" />
          <Text color={colours.text} fontSize="sm" fontWeight="medium">
            Delete
          </Text>
        </VStack>
      </Pressable>
    </HStack>
  );

  return(
  <Box bg={colours.backgroundColour} flex="1">
      <Center px="3">
        <ConfirmDeleteRowModal/>
      </Center>
      <SwipeListView data={listData} renderItem={renderItem} renderHiddenItem={renderHiddenItem} contentContainerStyle={{paddingBottom:10}} rightOpenValue={-83} previewRowKey={'0'} previewOpenValue={-40} previewOpenDelay={3000} onRowDidOpen={onRowDidOpen} />
  </Box>
  )
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: StatusBar.currentHeight || 0,
    },
    item: {
      backgroundColor: colours.secondary,
      padding: 15,
      marginVertical: 8,
      marginHorizontal: 16,
      alignItems: 'center',
      borderRadius: 20,
    },
    title: {
      fontSize: 32,
    },
});

export default HomeScreen;