import React from 'react';
import Todos, { TodoList, TodoListItem, TodoForm, TodoHeader } from './Todo';

import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

describe('todo Header', () => {
    it('renders without crashing', () => {
        render(<TodoHeader />);
    })

    it('matches snapshot', () => {
        const { asFragment } = render(<TodoHeader />);
        expect(asFragment()).toMatchSnapshot();
    })
})

describe('todo List Item', () => {
    const todo = { index: 1, value: "learn react", done: false };

    it('renders without crashing', () => {
        render(<TodoListItem ikey={todo.index} item={todo} index={todo.index} />)
    })

    it('matches snapshot', () => {
        const { asFragment } = render(<TodoListItem ikey={todo.index} item={todo} index={todo.index} />);
        expect(asFragment()).toMatchSnapshot();
    })

    it('renders to do list item with correct value', () => {
        const { getByTestId } = render(<TodoListItem ikey={todo.index} item={todo} index={todo.index} />);
        expect(getByTestId('todo-item')).toHaveTextContent("learn react");
    })

    it('renders status based on done property', () => {
        const { getByTestId } = render(<TodoListItem ikey={todo.index} item={todo} index={todo.index} />);
        expect(getByTestId('todo-status').innerHTML).toBe('[  ]')
    })

    it('changes className based on done property', () => {
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
        render(<TodoList items={todoList} />);
    })

    it('matches snpashot', () => {
        const { asFragment } = render(<TodoList items={todoList} />);
        expect(asFragment()).toMatchSnapshot();
    })

    it('renders the correct number of list items', () => {
        const { getByTestId } = render(<TodoList items={todoList} />);
        expect(getByTestId('todo-list').childElementCount).toBe(3);
    })
})

describe('todo form', () => {
    it('renders without crashing', () => {
        render(<TodoForm />);
    })

    it('matches snapshot', () => {
        const { asFragment } = render(<TodoForm />)
        expect(asFragment()).toMatchSnapshot()
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

describe('create todo method', () => {
    const todoList = [
        {
            index: 1,
            value: "learn react",
            done: false
        }
    ]
    const newItemValue = 'walk dog'
    it('creates a new todo item', () => {
        const { getByTestId } = render(<Todos initItems={todoList} />);
        expect(getByTestId('todo-list').childElementCount).toBe(1);

        fireEvent.input(screen.getByTestId('todo-input'), {
            target: {
                value: newItemValue
            }
        })
        fireEvent.click(screen.getByTestId('todo-form-button'));
        expect(getByTestId('todo-list').childElementCount).toBe(2);
        expect(screen.getByTestId('todo-list')).toHaveTextContent(newItemValue);
    })
})

describe('complete todo method', () =>{
    const todoList = [{ index: 1, value: "learn react", done: false }, { index: 2, value: "brush teeth", done: false }, { index: 3, value: "walk dog", done: true }];

    it('changes done property to true', () => {
        const { getByText } = render(<Todos initItems={todoList} />)
        // check that todo Status is un-done
        const todoElText = getByText('learn react');
        // grab prev sibling to get to done status
        const todoStatusEl = todoElText.previousElementSibling;
        // check that done status is undone
        expect(todoStatusEl).toHaveTextContent("[ ]")
        // check that class name is 'undone' to apply undone styles
        expect(todoElText.className).toBe('undone')
        // click on the done span element
        fireEvent.click(todoStatusEl)
        // re-find the 'learn react' text
        const completedTodo = getByText('learn react');
        // get the previous element sibling to check the status
        const completedTodoStatus = completedTodo.previousElementSibling;
        // check that done status has been updated
        expect(completedTodoStatus).toHaveTextContent("[X]");
        // check that class name has been updated to 'done' to apply styles
        expect(completedTodo.className).toBe('done');
    })
})