import { RootState } from 'typesafe-actions';
import Taro, { Component } from '@tarojs/taro'
import { connect } from '@tarojs/redux';

import * as selectors from '@/store/module/todos/selectors';
import * as actions from '@/store/module/todos/actions';

import TodoListItem from './TodoListItem';
import { View } from '@tarojs/components';

const mapStateToProps = (state: RootState) => ({
  isLoading: state.todos.isLoadingTodos,
  todos: selectors.getTodos(state.todos),
});
const dispatchProps = {
  removeTodo: actions.removeTodo,
};

type Props = ReturnType<typeof mapStateToProps> & typeof dispatchProps;

function TodoList({ isLoading, todos = [], removeTodo }: Props) {
  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <View style={getStyle()}>
      {todos.map(todo => (
        <View key={todo.id}>
          <TodoListItem
            title={todo.title}
            onRemoveClick={() => removeTodo(todo.id)}
          />
        </View>
      ))}
    </View>
  );
}

const getStyle = (): React.CSSProperties => ({
  textAlign: 'left',
  margin: 'auto',
  maxWidth: 500,
});

export default connect(
  mapStateToProps,
  dispatchProps
)(TodoList);
