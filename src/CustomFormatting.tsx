import * as t from 'io-ts';
import React, { FunctionComponent, ReactNode, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { pipe } from 'fp-ts/lib/pipeable';
import * as Either from 'fp-ts/lib/Either';
import { failure } from 'io-ts/lib/PathReporter';
import { fold } from 'fp-ts/lib/Either';

  const format = /^hello/;
  const testFunc = (input: string): input is string => (typeof input === 'string' && format.test(input));
  const TestFormat = new t.Type<string, string, string>(
    'TestFormat',
    testFunc,
    (input, context) => testFunc(input) ? t.success(input) : t.failure(input, context),
    t.identity
  );

  const onLeft = (errors: t.Errors): ReactNode => <Text key={'error0'}style={{color: 'red'}}>{errors[0].value + ':' + errors[0].message}</Text>;
      console.clear();
      const onRight = (val: string): ReactNode => <Text key={val}>{val}</Text>;
  pipe(
    TestFormat.decode('henlo world'),
    fold(onLeft,onRight)
  );
  pipe(
    TestFormat.decode('hello world'),
    fold(onLeft,onRight)
  );

const values = [
  'henlo world',
  'hello world'
];

export const CustomFormatting: FunctionComponent = () => {
  useEffect(() => {
    console.clear();
  }, []);
  return (
    <View style={styles.container}>
      <Text>CustomFormatting</Text>
      {values.map((value, index) =>
        pipe(
          TestFormat.decode(value),
          fold(onLeft,onRight)
        )
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }
});
