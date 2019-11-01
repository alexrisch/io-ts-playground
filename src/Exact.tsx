import * as t from 'io-ts';
import React, { FunctionComponent } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { pipe } from 'fp-ts/lib/pipeable';
import * as Either from 'fp-ts/lib/Either';
import { failure } from 'io-ts/lib/PathReporter';

const ApiPayload1 = t.interface({
  
  firstName: t.string,
  petNames: t.array(t.string),
  likesSpicyFood: t.boolean
});

const ApiPayload2 = t.strict({
  firstName: t.string,
  petNames: t.array(t.string),
  likesSpicyFood: t.boolean
});

const testObj = {
  firstName: 'Test',
  petNames: ['Pet1'],
  likesSpicyFood: true,
  extra: true
}

export const cast = <I, A>(codec: t.Decoder<I, A>) => (value: I): A => {
  return(pipe(
    codec.decode(value),
    Either.getOrElse<t.Errors, A>(errors => {
      throw new Error(codec.name + ': \n' + failure(errors).join('\n'));
    })
  ));
};


export const ExactScreen: FunctionComponent = () => {
    console.clear();
  console.log(ApiPayload1.decode(testObj));
  console.log(ApiPayload2.decode(testObj));
  console.log(cast(ApiPayload1)(testObj));
  console.log(cast(ApiPayload2)(testObj));

  return (
    <View style={styles.container}>
      <Text>ExactScreen</Text>
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