import React from 'react';
import { View, Image } from 'react-native';

const StickyHeader = () => {
  return (
    <View className="sticky top-0 right-0 left-0 bg-white py-3 z-10 border-b border-gray-100">
      <View className="px-[2rem]">
        <Image
          source={require('../../assets/images/logo.png')}
          className="h-[3rem] w-[15rem] object-cover"
        />
      </View>
    </View>
  );
};

export default StickyHeader;
