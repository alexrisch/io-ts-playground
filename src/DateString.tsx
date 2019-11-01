import * as t from 'io-ts';
import React, { FunctionComponent } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { either } from 'fp-ts/lib/Either';

interface DateString extends t.Type<Date, string, string> {};

const DateFromString: DateString = new t.Type(
  'DateFromString',
  (input): input is Date => input instanceof Date,
  (input, context) =>
    either.chain(t.string.validate(input, context), validatedAsString => {
      const date = new Date(validatedAsString);
      return isNaN(date.getTime()) ? t.failure(input, context) : t.success(date);
    }),
  a => a.toISOString()
);

const exampleIO = t.interface({
  firstName: t.string,
  dob: DateFromString
});

type IExample = t.TypeOf<typeof exampleIO>;

const testVal = {
  firstName: 'BBCulture',
  dob: '2008-03-01T01:00:00+01:00'
};

const testVal2 = {
  firstName: 'Test',
  dob: '20asd08-03-01sdfsf'
}

export const DateStringScreen: FunctionComponent = () => {
  console.log(exampleIO.decode(testVal))
  console.log(exampleIO.decode(testVal2))
  return (
    <View style={styles.container}>
      <Text>DateString</Text>
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