import {useTheme} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {View, Text, Pressable} from 'react-native';
import KeypadCustom from './KeypadCustom';
import shadowBox from './ShadowBox';

export default function OTP(props: {
  navigation: any;
  onComplete?: () => void;
  length?: number;
}) {
  const init: Array<string> = [];
  const length = props.length || 4;
  for (let index = 0; index < length; index++) init.push('');
  const [position, setPosition] = useState<number>(0);
  const [codeOTP, setCodeOTP] = useState<Array<string>>(init);
  useEffect(() => {
    var opt: string = '';
    for (let index = 0; index < codeOTP.length; index++) opt += codeOTP[index];
    if (opt.length === length)
      if (props.onComplete !== undefined) props.onComplete();
  });
  return (
    <View>
      <Text
        style={{
          fontWeight: '900',
          margin: 32,
          fontSize: 32,
          textAlign: 'center',
        }}>
        OTP Code
      </Text>
      <View
        style={{
          marginHorizontal: 24,
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
        }}>
        {init.map((item, index) => (
          <Pressable
            style={{
              marginHorizontal: 8,
              display: 'flex',
              width: 58,
              borderRadius: 8,
              justifyContent: 'center',
              alignItems: 'center',
              ...shadowBox,
              height: 68,
              borderWidth: index === position ? 0.5 : 0,
            }}
            key={index}
            onPress={() => {
              setPosition(index);
            }}>
            <Text
              style={{
                fontWeight: '900',
              }}>
              {codeOTP?.[index]}
            </Text>
          </Pressable>
        ))}
      </View>
      <View
        style={{
          marginTop: 20,
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text
          style={{
            fontWeight: '800',
          }}>
          Send Again Code?
        </Text>
        <Text
          style={{
            fontWeight: '700',
          }}>
          {' 02:03'}
        </Text>
      </View>
      <KeypadCustom
        onPress={(key: any) => {
          const newCodeOPT: Array<string> = [];
          for (let index = 0; index < 4; index++) {
            newCodeOPT.push(codeOTP[index]);
          }
          if (key !== 'delete') {
            if (position === length - 1) {
              if (newCodeOPT[position] === '') newCodeOPT[position] = key;
            } else newCodeOPT[position] = key;
            if (position < length - 1) setPosition(position + 1);
          } else {
            if (newCodeOPT[position] === '') newCodeOPT[position - 1] = '';
            else newCodeOPT[position] = '';
            if (codeOTP[length - 1] !== '' && position === length - 1)
              newCodeOPT[length - 1] = '';
            if (position !== 0) setPosition(position - 1);
          }
          setCodeOTP(newCodeOPT);
        }}
      />
      <Pressable
        style={{
          marginHorizontal: 32,
          justifyContent: 'center',
          paddingVertical: 16,
          borderRadius: 8,
          marginVertical: 16,
          borderWidth: 0.3,
        }}
        onPress={() => {
          props.navigation.goBack();
        }}>
        <Text
          style={{
            textAlign: 'center',
            fontWeight: '900',
          }}>
          Go Back
        </Text>
      </Pressable>
    </View>
  );
}
