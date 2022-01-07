import React from 'react';
import { ActivityIndicator, Text, View } from 'react-native';

export const Loading = () => {
  return (
    <View style={{ alignItems: 'center', flex: 1, justifyContent: 'center' }}>
      <ActivityIndicator color='grey' size={35} />
      <Text style={{ color: 'grey' }}>Cargando...</Text>
    </View>
  )
}
