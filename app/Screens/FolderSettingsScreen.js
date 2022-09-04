import React from 'react';

import {SSRProvider} from '@react-aria/ssr'; 
import { NativeBaseProvider, Text, Box, Heading, Image } from 'native-base';
import colours from '../config/colours.js';

function FolderSettingsScreen(props) {
    return (
        <SSRProvider>
            <NativeBaseProvider>
                <Box flex={1} fontWeight="extrabold" bg={colours.primary} alignItems="center" justifyContent="center">
                    <Image flex={0.4} borderRadius={10} size="100%" source={{uri: "https://images.creativemarket.com/0.1.0/ps/1846249/6667/5000/m1/fpnw/wm1/construction-sim1-.jpg?1478246889&s=292e0dde6d0c8924e17d5b2be596338c"}} alt="Image Failed To Load" />
                    <Heading color={colours.text}>Page Under Construction</Heading>
                </Box>
            </NativeBaseProvider>
        </SSRProvider>
    );
}

export default FolderSettingsScreen;