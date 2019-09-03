import { connect } from '@tarojs/redux';
import { addTodo } from '@/store/module/todos/actions';
import Taro, { Component } from '@tarojs/taro'
import { AtForm, AtInput, AtButton } from 'taro-ui';
import { RootState } from 'typesafe-actions';
import * as selectors from '@/store/module/todos/selectors';

const dispatchProps = {
  addItem: (title: string) => addTodo({ title }),
};

const mapStateToProps = (state: RootState) => ({
  isLoading: state.todos.isLoadingTodos,
  todos: selectors.getTodos(state.todos),
});

type Props = {
  addItem: (title: string) => void;
};

type State = {
  title: string;
};

class AddTodoForm extends Component<Props, State> {
  
  readonly state = { title: '' };

  handleTitleChange = ev => {
    this.setState({ title: ev });
  };

  handleAddClick = () => {
    console.log(this);
    this.props.addItem(this.state.title);
    this.setState({ title: '' });
  };

  render() {
    const { title } = this.state;

    return (
      <AtForm
        onSubmit={ev => {
          ev.preventDefault();
        }}
      >
        <AtInput
          name="abc"
          type="text"
          placeholder="Enter new item"
          value={title}
          onChange={this.handleTitleChange}
        />
        &nbsp;
        <AtButton onClick={this.handleAddClick} disabled={!title}>
          Add
        </AtButton>
      </AtForm>
    );
  }
}

export default connect(
  mapStateToProps,
  dispatchProps
)(AddTodoForm);
