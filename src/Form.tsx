import React, { ReactNode, FC, FunctionComponent, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import { Formik, FormikConfig, FormikProps } from 'formik';
import * as t from 'io-ts';
import { TextInputWithLabel } from './forms/TextInputWithLabel';
import { CheckboxField } from './forms/Checkbox';
import { ItemPicker } from './forms/Picker';

const ioInterface = t.interface({
  firstName: t.string,
  lastName: t.string,
  likesMakingForms: t.boolean,
  // choice: t.union([t.literal(1), t.literal(2)], 'Enum')
});

export const Form: FunctionComponent = () => {
  type FormType = t.TypeOf<typeof ioInterface>;

  const renderForm: (f: FormikProps<t.TypeOf<typeof ioInterface>>) => ReactNode = f => {
    const submitForm = f.submitForm.bind(this);
    const status = f.status;
    useEffect(() => {
      console.clear();
    }, []);
    return (
      <View style={styles.form}>
        {Object.keys(ioInterface.props).map((key, index) => {
          // console.log(ioInterface.props[key])
      switch(ioInterface.props[key].name) {
        case 'string': {
          return <TextInputWithLabel
              key={key}
              label={key}
              isPassword={false}
              value={f.values[key]}
              onChangeText={f.handleChange(key)}
              error={f.errors[key]}
            />
        }
        // case 'Enum': {
        //   return <ItemPicker
        //   key={key}
        //   f={f}
        //   label={key}
        //   items={ioInterface.props[key].types.map((type) => {
        //     // console.log(type)
        //     if (type) {
        //       return(
        //         type.value
        //       )
        //     }
        //     })}
        //   onValueChange={f.handleChange([key])}
        //   errorMode={f.errors[key]}
        //   />
        // }
        case 'boolean': {
          return <CheckboxField
            key={key}
            label={key}
            onChange={(val: boolean, key) => f.setFieldValue(key, val)}
            value={f.values[key]}
            error={f.errors[key]}
          />
        }
        default:
          // console.log('Unexpected Type');
      }
    })}
    <Button
      onPress={submitForm}
      title='Submit'
      />
      </View>
    );
  }

  const initialValues: () => FormType = () => {
    let obj = {};
    for (const key in ioInterface.props) {
      if (ioInterface.props[key]) {
        switch(ioInterface.props[key].name) {
          case 'string': {
            obj[key] = 'Test';
            break;
          }
          case 'number': {
            obj[key] = 0;
            break;
          }
          case 'boolean': {
            obj[key] = false;
            break;
          }
          case 'Enum': {
            obj[key] = 1;
          }
          default:
            console.log('Unexpected Type');
        }
      }
    }
    console.log(obj);
    return obj as t.TypeOf<typeof ioInterface>;
  }

  const submit: FormikConfig<FormType>['onSubmit'] = (values, formActions) => {
    console.log(values);
  };

  const formConfig: FormikConfig<t.TypeOf<typeof ioInterface>> = {
    initialValues: {
      ...(initialValues())
    },
    onSubmit: submit
  };

  return (
    <View style={styles.container}>
      <Formik
        {...formConfig}
      >
        {renderForm}
      </Formik>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '100%'
  },
  form: {
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '50%'
  }
});
