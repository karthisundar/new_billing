import React from 'react';
import {TextInput} from 'react-native';
import {darkGreen} from './Constants';

const Field = ({props,onChangeText,placeholder,textContentType,value,maxLength,keyboardType}) => {
  return (
    <TextInput
      {...props}
      onChangeText={onChangeText}
      placeholder={placeholder}
      textContentType={textContentType}
      value={value}
      maxLength={maxLength}
      keyboardType={keyboardType}
      // placeholderTextColor={placeholderTextColor}
    //   keyboardType ={keyboardType}
      style={{borderRadius: 100, color: darkGreen, paddingHorizontal: 10, width: '130%',marginTop:40,marginLeft:-50, backgroundColor: 'rgb(220,220, 220)', marginVertical: 10}}
      placeholderTextColor={darkGreen}></TextInput>
  );
};

export default Field;