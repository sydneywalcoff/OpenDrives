import React from 'react';

export class TodoList extends React.Component {
  render () {
    var items = this.props.items.map((item, index) => {
      return (
        <TodoListItem key={index} item={item} index={index} removeItem={this.props.removeItem} markTodoDone={this.props.markTodoDone} />
      );
    });

    return (
      <ul className="Todo-group" data-testid="todo-list"> {items} </ul>
    );
  }
}

export class TodoListItem extends React.Component {
  constructor(props) {
    super(props);
    this.onClickClose = this.onClickClose.bind(this);
    this.onClickDone = this.onClickDone.bind(this);
  }
  onClickClose() {
    var index = parseInt(this.props.index);
    this.props.removeItem(index);
  }
  onClickDone() {
    var index = parseInt(this.props.index);
    this.props.markTodoDone(index);
  }
  render () {
    var todoClass = this.props.item.done ?
        "done" : "undone";
    let doneText = this.props.item.done ?
        "[X]" : "[  ]";
    return(
      <li className="Todo-item" data-testid='todo-item'>
        <span className="icon" aria-hidden="true" onClick={this.onClickDone} data-testid='todo-status'>{ doneText }</span>

        <div className={todoClass} data-testid="todo-status-class">
          {this.props.item.value}
        </div>
        <button type="button" className="close" onClick={this.onClickClose} data-testid='todo-button'>&times;</button>
      </li>
    );
  }
}

export class TodoForm extends React.Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
  }
  componentDidMount() {
    this.refs.itemName.focus();
  }
  onSubmit(event) {
    event.preventDefault();
    var newItemValue = this.refs.itemName.value;

    if(newItemValue) {
      this.props.addItem({newItemValue});
      this.refs.form.reset();
    }
  }
  render () {
    return (
      <form ref="form" onSubmit={this.onSubmit} className="form-inline">
        <input type="text" ref="itemName" className="form-control" placeholder="add a new todo..." data-testid="todo-input"/>
        <button type="submit" className="submit" data-testid="todo-form-button">+</button>
      </form>
    );
  }
}

export class TodoHeader extends React.Component {
  render () {
    return <h1 className="Todo-header">Todo list</h1>;
  }
}

class Todos extends React.Component {
  constructor (props) {
    super(props);

    this.addItem = this.addItem.bind(this);
    this.removeItem = this.removeItem.bind(this);
    this.markTodoDone = this.markTodoDone.bind(this);
    this.state = { todoItems: props.initItems };
  }
  addItem(todoItem) {
    const { todoItems } = this.state;
    todoItems.unshift({
      index: todoItems.length+1,
      value: todoItem.newItemValue,
      done: false
    });
    this.setState({todoItems: todoItems});
  }
  removeItem (itemIndex) {
    const { todoItems } = this.state;
    this.setState({todoItems: todoItems.splice(itemIndex, 1) });
  }
  markTodoDone(itemIndex) {
    const { todoItems } = this.state;

    var todo = todoItems[itemIndex];
    todoItems.splice(itemIndex, 1);
    todo.done = !todo.done;
    todo.done ? todoItems.push(todo) : todoItems.unshift(todo);
    this.setState({todoItems: todoItems});
  }
  render() {
    return (
      <div className="Todo">
        <TodoHeader />
        <TodoList items={this.props.initItems} removeItem={this.removeItem} markTodoDone={this.markTodoDone}/>
        <TodoForm addItem={this.addItem} />
      </div>
    );
  }
}

export default Todos;
