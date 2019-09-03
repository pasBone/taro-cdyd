import { RootState } from 'typesafe-actions';
import Taro, { Component } from '@tarojs/taro'
import { connect } from '@tarojs/redux';

import { loadTodosAsync, saveTodosAsync } from '@/store/module/todos/actions';
import { View } from '@tarojs/components';
import { AtButton } from 'taro-ui';


const mapStateToProps = (state: RootState) => ({
  isLoading: state.todos.isLoadingTodos,
});
const dispatchProps = {
  loadTodos: loadTodosAsync.request,
  saveTodos: saveTodosAsync.request,
};

type Props = ReturnType<typeof mapStateToProps> & typeof dispatchProps;

type State = {};

class TodoActions extends Component<Props, State> {
  render() {
    const { isLoading, loadTodos, saveTodos } = this.props;
    return (
      <View>
        <AtButton onClick={() => loadTodos()} disabled={isLoading}>
          Load snapshot
        </AtButton>
        &nbsp;
        <AtButton onClick={() => saveTodos()} disabled={isLoading}>
          Save snapshot
        </AtButton>
      </View>
    );
  }
}

export default connect(
  mapStateToProps,
  dispatchProps
)(TodoActions);
