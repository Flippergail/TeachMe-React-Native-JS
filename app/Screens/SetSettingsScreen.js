import React from 'react';

import {SSRProvider} from '@react-aria/ssr'; 
import { NativeBaseProvider, Text, Box, Heading, Image } from 'native-base';
import colours from '../config/colours.js';

function SetSettingsScreen({route, navigation}) {
    const { Item } = route.params;
    return (
        <SSRProvider>
            <NativeBaseProvider>
                <Box flex={1} fontWeight="extrabold" bg={colours.secondary} alignItems="center" justifyContent="center">
                    <Image flex={0.4} borderRadius={10} size="100%" source={require("../assets/PageUnderConstruction.png")} alt="Image Failed To Load" />
                    <Heading color={colours.backgroundColour}>Page Under Construction</Heading>
                </Box>
            </NativeBaseProvider>
        </SSRProvider>
    );
}

export default SetSettingsScreen;