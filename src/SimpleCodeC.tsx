import { StyleSheet, Text, View, TextInput } from 'react-native';
import React, { FunctionComponent, ReactNode } from 'react';
import * as t from 'io-ts';
import { pipe } from 'fp-ts/lib/pipeable';
import { fold } from 'fp-ts/lib/Either';

function code() {
  const codec = new t.Type<any, any, unknown>(
    'MyCodec', // Name
    (input: any): input is any => !!input, // Validator
    (input, context) => !!input ? t.success(input) : t.failure(input, context), // Decoder
    t.identity // Encoder
  );
  const onLeft = (errors: t.Errors) => console.log(errors);
  const onRight = (val: string) => console.log(val);

  const values = [true, false];

  values.forEach(element => {
    pipe(
      codec.decode(element),
      fold(onLeft,onRight)
    );
    
  });
}

export const SimpleCodeC: FunctionComponent = () => {
  code();
  return (
    <View style={styles.container}>
      <Text>SimpleCodeC</Text>
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
