import Taro, { Component } from '@tarojs/taro'

import TodoList from './TodoList';
import AddTodoForm from './AddTodoForm';
import TodoListActions from './TodoListActions';
import { View } from '@tarojs/components';

export default () => (
  <View>
    <TodoListActions />
    <View>-----------------</View>
    <AddTodoForm />
    <View>-----------------</View>
    <TodoList />
  </View>
);
