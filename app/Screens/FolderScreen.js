import React, { useState } from 'react';

import {SSRProvider} from '@react-aria/ssr'; 
import { NativeBaseProvider, IconButton, Actionsheet, useDisclose, Center, Button, Modal, FormControl, Input, Box, Icon, Image } from 'native-base';

import Ionicons from 'react-native-vector-icons/Ionicons';
import colours from '../config/colours.js';

import ScrollData from './ScrollData';

function FolderScreen({ route, navigation }) {
    const { Item } = route.params;
    const [listData, setListData] = useState(Item.childSets);

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
                        <ScrollData navigation={navigation} listData={listData} setListData={setListData} />
                    </Box>
                </Center>
            </NativeBaseProvider>
        </SSRProvider>
    );
}

export default FolderScreen;