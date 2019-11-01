import * as t from 'io-ts';
import React, { FunctionComponent } from 'react';
import { StyleSheet, Text, View } from 'react-native';

const optionalIO = t.partial({
  str1: t.string
});
const requiredIO = t.interface({
  str: t.string
})
const intersection = t.intersection([optionalIO, requiredIO]);
const optionalObj: t.TypeOf<typeof intersection> = {
  str: 'test'
}

export function optional<RT extends t.Any>(
  type: RT,
  name: string = `${type.name} | undefined`
): t.UnionType<
  [RT, t.UndefinedType],
  t.TypeOf<RT> | undefined,
  t.OutputOf<RT> | undefined,
  t.InputOf<RT> | undefined
> {
  return t.union<[RT, t.UndefinedType]>([type, t.undefined], name);
}
const option = t.interface({
  str: t.string,
  str1: optional(t.string),
});
const someVar: t.TypeOf<typeof option> = {
  str: 'Example',
  str1: undefined
}


export const Optional: FunctionComponent = () => {

  return (
    <View style={styles.container}>
      <Text>Optional</Text>
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