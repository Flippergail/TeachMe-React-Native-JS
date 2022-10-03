import 'react-native-gesture-handler';
import React, { useState } from 'react';

import { Center, Button, Modal, Box, Text, Pressable, Icon, HStack, VStack, Spacer, Image } from 'native-base';

import { SwipeListView } from 'react-native-swipe-list-view';


import Ionicons from 'react-native-vector-icons/Ionicons';
import colours from '../config/colours.js';

export default function ScrollData(props) {
    const navigation = props.navigation;

    const listData = props.listData;
    const setListData= props.setListData;

    const numChildren = props.numChildren;
    const setNumChildren = props.setNumChildren;
  
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
      const prevIndex = listData.findIndex(item => item.key === rowKey);
      listData.splice(prevIndex, 1);

      setListData(listData);
      setNumChildren(numChildren+1);
    };
  
    const onRowDidOpen = rowKey => {};
  
    const renderItem = ({
      item,
      index
    }) => <Box borderRadius={20} bg={colours.primary} borderWidth={2} borderColor={'firebrick'} marginVertical={3}>
        <Pressable onPress={() => {
          item.isFolder ? navigation.push('FolderPage', {Item: item}) : navigation.push('SetPage', {Item: item});
        }} >
          <Box pl="4" pr="5" py="3" >
            <HStack alignItems="center" space={3}>
              <Image borderRadius={10} size="48px" source={{uri: item.IconUrl}} alt="Image Failed To Load" />
              <VStack>
                <Text fontSize={"xl"} color={colours.text} _dark={{
                color: colours.text
              }} bold>
                  {item.Name}
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
                {item.isFolder ? "files: " : "terms: "} {item.numChildren}
              </Text>
              {item.isFolder && <Icon as={<Ionicons name="folder" />} alignSelf="flex-end"  color={colours.text} size="lg" />}
            </HStack>
          </Box>
        </Pressable>
      </Box>;
  
    const renderHiddenItem = (data, rowMap) => (
      <HStack flex="1" pl="2.8" marginVertical={3}>
        <Pressable borderRadius={20} borderWidth={0.7} borderColor={'maroon'} w="70" ml="auto" cursor="pointer" bg="salmon" justifyContent="center" _pressed={{opacity: 0.5}}
        onPress={() => {
          console.log(data.item);
          data.item.isFolder ? navigation.push('FolderSettingsPage', {Item: data.item}) : navigation.push('SetSettingsPage', {Item: data.item});
        }}>
          <VStack alignItems="center" space={2}>
            <Icon as={<Ionicons name="create-outline" />} color={colours.text} size="sm" />
            <Text color={colours.text} fontSize="sm" fontWeight="medium">
              Edit
            </Text>
          </VStack>
        </Pressable>
        <Pressable borderRadius={20} borderWidth={0.7} borderColor={'maroon'} w="70" ml="0.5" cursor="pointer" bg="red.500" justifyContent="center" onPress={() => confirmDeleteRow(rowMap, data.item.key, data.item.Name, data.item.isFolder, data.item.key)} _pressed={{opacity: 0.5}}>
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
    <Box borderRadius={20} bg={colours.backgroundColour} flex="1">
        <Center px="3">
          <ConfirmDeleteRowModal/>
        </Center>
        <SwipeListView data={listData} renderItem={renderItem} renderHiddenItem={renderHiddenItem} contentContainerStyle={{paddingBottom:10}} rightOpenValue={-144} previewRowKey={'0'} previewOpenValue={-90} previewOpenDelay={10000000} onRowDidOpen={onRowDidOpen} />
    </Box>
    )
  }