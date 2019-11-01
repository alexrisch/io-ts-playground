import React, { Fragment, PureComponent, ReactNode } from 'react';
import {
  NativeSyntheticEvent, StyleSheet, Text,
  TextInput, TextInputFocusEventData, TextInputProps, TextStyle
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import { palette, typography } from './config';


export interface TextInputWithLabelProps extends TextInputProps {
  label: string;
  error?: string;
  isPassword: boolean;
  format?: string;
}


const label: TextStyle = {
  ...typography.meta,
  position: 'relative',
  // fontFamily: fontFamily.arial,
  color: palette.accessibleGrey
};

const TextWithLabelStyles = StyleSheet.create({
  labelPlaceHolder: {
    ...label,
    top: 26
  },
  textInput: {
    // fontFamily: fontFamily.arial,
    fontSize: 16,
    color: palette.black,
    borderBottomWidth: 1,
    borderBottomColor: palette.accessibleGrey,
    paddingTop: 8,
    paddingBottom: 12
  },
  label,
  textInputError: {
    borderBottomColor: palette.red
  },
  errorMessage: {
    ...typography.meta,
    color: palette.red
  }
});

interface TextInputWithLabelState {
  isBlurred: boolean;
}

export class TextInputWithLabel extends
  PureComponent<TextInputWithLabelProps, TextInputWithLabelState> {
  state: TextInputWithLabelState = {
    isBlurred: false
  };


  // tslint:disable-next-line: cyclomatic-complexity
  render(): ReactNode {
    const { value, error, isPassword, format, ...propsToPass } = this.props;
    const showError = error && value && value.length > 0 ? true : false;
    return (
      <Fragment>
        <Animatable.Text
          transition={'top'}
          style={(!value || value.length === 0 && this.state.isBlurred) ?
            TextWithLabelStyles.labelPlaceHolder : TextWithLabelStyles.label}
        >
          {this.props.label}
        </Animatable.Text>
        <TextInput
          {...propsToPass}
          value={(format && value) ? this.format(value, format) : value}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
          style={[TextWithLabelStyles.textInput,
            showError && TextWithLabelStyles.textInputError]}
        />
        <Text style={TextWithLabelStyles.errorMessage}>
          {showError ? error : ''}
        </Text>
      </Fragment>
    );
  }

  private format: (text: string, format: string) => string = (text, format) => {
    const matches: {char: string; index: number}[] = [];
    const reg = /[\W_]/g;
    let match = reg.exec(format);

    while (match) {
      matches.push({
        index: match.index,
        char: match[0]
      });
      match = reg.exec(format);
    }

    for (const seperator of matches) {
      if (text.charAt(seperator.index) !== seperator.char && seperator.index < text.length) {
        text = text.substring(0, seperator.index) +
        seperator.char + text.substring(seperator.index + 1, text.length - 1);
      }
    }
    return text;
  }

  private handleFocus = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
    this.setState({ isBlurred: false });
    if (this.props.onFocus) {
      this.props.onFocus(e);
    }
  }
  private handleBlur = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
    this.setState({ isBlurred: true });
    if (this.props.onBlur) {
      this.props.onBlur(e);
    }
  }
}