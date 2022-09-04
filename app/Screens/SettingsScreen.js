import React from 'react';

import {SSRProvider} from '@react-aria/ssr'; 
import { NativeBaseProvider, Text, Box, Heading, Image } from 'native-base';

import { LocalAuthentication, isEnrolledAsync, authenticateAsync, hasHardwareAsync } from 'expo-local-authentication';

import Ionicons from 'react-native-vector-icons/Ionicons';
import colours from '../config/colours.js';
import { Button } from 'react-native';

const handleAuth = async () => {
    const compatible = await hasHardwareAsync()
    if (!compatible) throw 'This device is not compatible for biometric authentication'
    const enrolled = await isEnrolledAsync()
    if (!enrolled) throw 'This device doesn\'t have biometric authentication enabled'

    const result = await authenticateAsync()
    if (!result.success) throw `${result.error} - Authentication unsuccessful`
    console.log("succecful identification")
    return(true)
}

function SettingsScreen(props) {
    return (
        <SSRProvider>
            <NativeBaseProvider>
                <Box flex={1} fontWeight="extrabold" bg={colours.primary} alignItems="center" justifyContent="center">
                    <Image flex={0.4} borderRadius={10} size="100%" source={require("../assets/PageUnderConstruction.png")} alt="Image Failed To Load" />
                    <Heading color={colours.text}>Page Under Construction</Heading>
                </Box>
            </NativeBaseProvider>
        </SSRProvider>
    );
}

export default SettingsScreen;