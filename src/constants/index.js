import { Platform, Dimensions } from 'react-native';

export const { width, height } = Dimensions.get('window');
export const SPACING = 10;
export const ITEM_SIZE = Platform.OS === 'ios' ? width * 0.7 : width * 0.75;
export const EMPTY_ITEM_SIZE = (width - ITEM_SIZE) / 2;
export const BACKDROP_HEIGHT = height * 0.8;
