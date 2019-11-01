import * as t from 'io-ts';
import React, { FunctionComponent } from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface IOriginal {
  firstName: string,
  petNames: string[],
  likesSpicyFood: boolean
}

const exampleIO = t.interface({
  firstName: t.string,
  petNames: t.array(t.string),
  likesSpicyFood: t.boolean
});
type IGenerated = t.TypeOf<typeof exampleIO>;

export const InterfaceScreen: FunctionComponent = () => {

  return (
    <View style={styles.container}>
      <Text>Interfaces</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});