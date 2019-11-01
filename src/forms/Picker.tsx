import React, { PureComponent, ReactNode } from 'react';
import {
  Keyboard, Picker, PickerProps, Text, TouchableOpacity, View, StyleSheet, TextStyle
} from 'react-native';
import { palette, typography, fontFamily } from './config';
import { FormikProps } from 'formik';


export interface ItemPickerProps extends PickerProps {
  label: string;
  errorMode: boolean;
  items: string[];
  f: FormikProps<any>;
  placeholderLabel?: string;
}

interface ItemPickerState {
  isExpanded: boolean;
}

export class ItemPicker extends PureComponent<ItemPickerProps, ItemPickerState> {
  state: ItemPickerState = {
    isExpanded: false
  };

  focus(): void {
    this.setState({isExpanded: true});
    Keyboard.dismiss();
  }

  render(): ReactNode {
    const { selectedValue, errorMode, placeholderLabel, ...propsToPass } = this.props;
    return (
      <View style={ItemPickerStyles.container}>
        <TouchableOpacity
          onPress={this.showPicker}
        >
          <Text
            style={(!this.state.isExpanded && selectedValue === '') ?
              ItemPickerStyles.label : ItemPickerStyles.labelPlaceHolder}
          >
            {this.props.label}
          </Text>
          {selectedValue !== '' && (
            <Text style={ItemPickerStyles.selectedItemText}>
              {selectedValue}
            </Text>
          )}
        </TouchableOpacity>
        {this.state.isExpanded && (
          <View>
          <Picker
            mode={'dialog'}
            selectedValue={selectedValue ? selectedValue : undefined}
            {...propsToPass}
          >
          {!!placeholderLabel &&
            <Picker.Item
              key='placeholder'
              label={placeholderLabel}
              value={undefined}
              color={palette.accessibleGrey}
            />
          }
          {this.props.items.map(item => {
            return (
              <Picker.Item
                key={item}
                label={item}
                value={item}
              />
            );
          })}
          </Picker>
        </View>)}
      </View>
    );
  }

  private showPicker: () => void = () => {
    this.setState({isExpanded: !this.state.isExpanded});
  }
}

const label: TextStyle = {
  ...typography.meta,
  color: palette.accessibleGrey
};
export const ItemPickerStyles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    borderBottomColor: palette.accessibleGrey
  },
  label: {
    ...label,
    marginBottom: 16
  },
  labelPlaceHolder: {
    ...label,
    marginBottom: 8
  },
  pickerError: {
    borderBottomColor: palette.red
  },
  textContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  selectedItemText: {
    ...typography.paragraph,
    marginBottom: 8
  },
  text: {
    fontFamily: fontFamily.arialBold,
    fontSize: 16,
    color: palette.black,
    borderBottomWidth: 1,
    borderBottomColor: palette.accessibleGrey,
    paddingTop: 8,
    paddingBottom: 12
  }
});
