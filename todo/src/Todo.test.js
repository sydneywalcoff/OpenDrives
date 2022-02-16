import React from 'react'; 
import { TodoList, TodoListItem, TodoForm, TodoHeader, ToDos } from './Todo';

import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

describe('todo Header', () => {
    it('renders without crashing', () => {
        render(<TodoHeader />);
    })

    it('matches snapshot', () => {
        expect(render(<TodoHeader />)).toMatchSnapshot();
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

    it('changes className based on done property', ()=> {
        const { getByTestId } = render(<TodoListItem ikey={todo.index} item={todo} index={todo.index} />)
        expect(getByTestId('todo-status-class').className).toBe('undone')
    })

    it('renders delete button correctly', () => {
        const { getByTestId } = render(<TodoListItem ikey={todo.index} item={todo} index={todo.index} />);
        expect(getByTestId('todo-button').type).toBe('button');
        expect(getByTestId('todo-button').innerHTML).toBe('×');
    })
})

describe('todo list', () => {
    const todoList = [{ index: 1, value: "learn react", done: false }, { index: 2, value: "brush teeth", done: false }, { index: 3, value: "walk dog", done: true }];

    it('renders todo list without crashing', () => {
        render(<TodoList items ={todoList}/>);
    })

    it('renders the correct number of list items', () => {
        const { getByTestId } = render(<TodoList items = {todoList}/>);
        expect(getByTestId('todo-list').childElementCount).toBe(3);
    }) 
})

describe('todo form', () => {
    it('renders without crashing', () => {
        render(<TodoForm />);
    })

    it('renders input element correctly', () => {
        const { getByTestId } = render(<TodoForm />);
        expect(getByTestId('todo-input').placeholder).toBe("add a new todo...");
    })

    it('renders button correctly', () => {
        const { getByTestId } = render(<TodoForm />);
        expect(getByTestId('todo-form-button').type).toBe('submit');
        expect(getByTestId('todo-form-button')).toHaveTextContent('+');
    })
})