import { Appearance } from "react-native";

const isDarkMode = Appearance.getColorScheme() == 'dark';

const FontConstants = {
    color: isDarkMode ? '#ffffff' : '#000000',
    titleLabel: isDarkMode ? '#ffffff' : '#333',
}

const ColorsConstants = {
    backgroundColor: isDarkMode ? '#000000' : '#f9f9f9',
    greenTheme: isDarkMode ? '#008177FF' : '#00d6c5',
    locationContainer: isDarkMode ? '#414141FF' : '#f9f9f9',
}

const SizeConstants = {

}

export {
    FontConstants,
    ColorsConstants,
    SizeConstants
}