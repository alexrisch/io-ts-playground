import { TextStyle } from 'react-native';

export const palette = {
  blue: '#070A22',
  denim: '#142C57',
  red: '#C41230',
  black: '#000000',
  black80: '#00000080',
  white: '#FFFFFF',
  grey: '#707070',
  accessibleGrey: '#9c9c9c',
  skeletonGrey: '#efefef',
  borderGrey: '#a9a9a9',
  borderRed: '#C41230',
  dividerGrey: '#E9E9E9',
  lightGrey: '#F7F7F7',
  green: '#47D147'
};

export const fontFamily = {
  // arial: 'Arial',
  arialBold: 'Arial Bold',
  arialItalic: 'Arial Italic',
  arialBoldItalic: 'Arial Bold Italic',
  interstate: 'Interstate-Regular',
  interstateLight: 'Interstate-Light',
  interstateBold: 'Interstate-Bold',
  interstateItalic: 'Interstate-RegularItalic',
  interstateBoldItalic: 'Interstate-BoldItalic'
};

export const typography = {
  paragraph: {
    color: palette.black,
    // fontFamily: fontFamily.arial,
    fontSize: 16,
    letterSpacing: 1,
    lineHeight: 24
  },
  instruction: {
    color: palette.black,
    // fontFamily: fontFamily.arial,
    fontSize: 9,
    letterSpacing: 1,
    lineHeight: 16
  },
  meta: {
    color: palette.black,
    // fontFamily: fontFamily.arial,
    fontSize: 12,
    letterSpacing: 1,
    lineHeight: 16
  },
  // tslint:disable-next-line: no-object-literal-type-assertion
  metaBold: ({
    color: palette.black,
    // fontFamily: fontFamily.arial,
    fontWeight: 'bold',
    fontSize: 12,
    letterSpacing: 1,
    lineHeight: 16
  }) as TextStyle,
  header5: {
    color: palette.black,
    // fontFamily: fontFamily.arial,
    fontSize: 16,
    letterSpacing: 0,
    lineHeight: 24
  },
  header4: {
    color: palette.black,
    fontFamily: fontFamily.interstateBold,
    fontSize: 12,
    letterSpacing: 1,
    lineHeight: 16
  },
  header3: {
    color: palette.black,
    fontFamily: fontFamily.interstateBold,
    fontSize: 16,
    lineHeight: 20,
    letterSpacing: 1.5
  },
  header2: {
    color: palette.black,
    fontFamily: fontFamily.interstateBold,
    fontSize: 24,
    letterSpacing: 1.5,
    lineHeight: 28
  },
  header1: {
    color: palette.black,
    fontFamily: fontFamily.interstateBold,
    fontSize: 32,
    letterSpacing: 2.5,
    lineHeight: 40
  },
  signpost: {
    color: palette.white,
    fontFamily: fontFamily.interstateBold,
    fontSize: 72,
    letterSpacing: 8,
    lineHeight: 72
  },
  productPrice: {
    // fontFamily: fontFamily.arial,
    fontSize: 12
  },
  productOldPrice: {
    fontSize: 12,
    // fontFamily: fontFamily.arial,
    color: palette.grey
  }
};