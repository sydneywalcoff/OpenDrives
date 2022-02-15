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

    it('renders to do list item correctly', () => {
        const { getByTestId } = render(<TodoListItem ikey={todo.index} item={todo} index={todo.index} />);
        // console.log(getByTestId('todo-item'))
        // expect(getByTestId('todo-item')).toHaveTextContext("learn react")
    })
})

