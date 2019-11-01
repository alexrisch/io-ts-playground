import React, { Fragment, PureComponent, ReactNode } from 'react';
import {
  CheckBoxProps,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View
} from 'react-native';
import { fontFamily, palette, typography } from './config';

export interface CheckboxFieldProps {
  label: string;
  error?: string;
  onChange: (val: boolean, key: any) => void;
  value: boolean
}

const label: TextStyle = {
  ...typography.meta,
  position: 'relative',
  // fontFamily: fontFamily.arial,
  color: palette.accessibleGrey
};

const CheckBoxStyles = StyleSheet.create({
  labelPlaceHolder: {
    ...label,
    top: 26
  },
  label
});

export class CheckboxField extends PureComponent<CheckboxFieldProps> {

  render(): ReactNode {
    const { value, error, label, ...propsToPass } = this.props;
    return (
        <Fragment>
          <View style={{flexDirection: 'column'}}>
            <Text style={CheckBoxStyles.label}>
              {label}
            </Text>
            <TouchableOpacity
              onPress={this.onChange}
            >
            <Text style={{color: 'black'}}>
              {value ? 'true' : 'false'}
            </Text>
            </TouchableOpacity>
          </View>
          <Text style={{color: 'red'}}>
            {error}
          </Text>
        </Fragment>
    );
  }

  private onChange = () => {
    
    if (this.props.onChange) {
      this.props.onChange(!this.props.value, this.props.label);
    }
  }
}
