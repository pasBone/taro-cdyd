import * as React from 'react'
import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components';

interface Props {
  title: string;
  onRemoveClick: () => void;
}

function TodoListItem({ title, onRemoveClick }: Props) {
  return (
    <View style={getStyle()}>
      {title}
      <View
        style={{ color: 'darkred', float: 'right', cursor: 'pointer' }}
        onClick={onRemoveClick}
      >
        X
      </View>
    </View>
  );
}

const getStyle = (): React.CSSProperties => ({
  overflowX: 'hidden',
  textOverflow: 'ellipsis',
});

export default TodoListItem;
