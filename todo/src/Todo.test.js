import React from 'react';
import ReactDOM from 'react-dom';
import { TodoList, TodoListItem, TodoForm, TodoHeader, ToDos } from './Todo';

import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

describe('todo Header', () => {
    const div = document.createElement("div");
    it('renders without crashing', () => {
        ReactDOM.render(<TodoHeader />, div);
    })
})

describe('todo List Item', () => {
    const todo = { index: 1, value: "learn react", done: false };

    it('renders to do list item with correct value', () => {
        const { getByTestId } = render(<TodoListItem ikey={todo.index} item={todo} index={todo.index} />);
        expect(getByTestId('todo-item')).toHaveTextContent("learn react");
    })

    it('renders status based on done property', () => {
        const { getByTestId } = render(<TodoListItem ikey={todo.index} item={todo} index={todo.index} />);
        expect(getByTestId('todo-status').innerHTML).toBe('[  ]')
    })

    it('renders delete button', () => {
        const div = document.createElement("div");
        const { getByTestId } = render(<TodoListItem ikey={todo.index} item={todo} index={todo.index} />);
        expect(getByTestId('todo-button').type).toBe('button')
    })
})

describe('todo list', () => {
    it('renders todo list without crashing',() => {
        const todoList = [{ index: 1, value: "learn react", done: false }, { index: 2, value: "brush teeth", done: false }, { index: 3, value: "walk dog", done: true }];
        const div = document.createElement('div');
        ReactDOM.render(<TodoList items ={todoList}/>, div);
    })
})