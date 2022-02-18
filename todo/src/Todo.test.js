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
    // new todo item
    const newItemValue = 'walk dog'
    it('creates a new todo item', () => {
        const { getByTestId } = render(<Todos initItems={todoList} />);
        // expect that todoList only has one todo item
        expect(getByTestId('todo-list').childElementCount).toBe(1);
        // add new value to input
        fireEvent.input(screen.getByTestId('todo-input'), {
            target: {
                value: newItemValue
            }
        })
        // click submit button
        fireEvent.click(screen.getByTestId('todo-form-button'));
        // expect that todoList has two items
        expect(getByTestId('todo-list').childElementCount).toBe(2);
        // expect a todo item with the new value has been added to the list
        expect(screen.getByTestId('todo-list')).toHaveTextContent(newItemValue);
    })
})

describe('un/complete todo method', () =>{
    const todoList = [{ index: 1, value: "learn react", done: false }, { index: 2, value: "brush teeth", done: false }, { index: 3, value: "walk dog", done: true }];

    it('completes a todo', () => {
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

    it('uncompletes a todo', ()=> {
        const { getByText } = render(<Todos initItems={todoList} />)
        // grab todo text div and status span
        const completedTextEl = getByText('walk dog');
        const completedStatus = completedTextEl.previousElementSibling;
        // check that done status is checked
        expect(completedStatus).toHaveTextContent("[X]")
        // check that className is done
        expect(completedTextEl.className).toBe('done')
        // click on done span el
        fireEvent.click(completedStatus);
        // refind todo text div and status span
        const todoTextEl = getByText('walk dog');
        const todoStatusEl = todoTextEl.previousElementSibling;
        // check that done status is not checked
        expect(todoStatusEl).toHaveTextContent("[ ]");
        // check that className is 'undone'
        expect(todoTextEl.className).toBe('undone');
    })
})

describe('destroy todo method', () => {
    const todoList = [{ index: 1, value: "learn react", done: false }, { index: 2, value: "brush teeth", done: false }, { index: 3, value: "walk dog", done: true }];

    it('deletes a todo', () => {
        const { getByText, getByTestId } = render(<Todos initItems={todoList}/>);
        // grab learn react text and button
        const todoTextEl =  getByText('learn react');
        const deleteButton = todoTextEl.nextElementSibling;
        // check todo List length is equal to 3
        expect(todoList).toHaveLength(3);
        // click on delete button
        fireEvent.click(deleteButton);
        // check that 'learn react' todo is NOT there
        expect(getByTestId('todo-list')).not.toContain('learn react');
        // check that todoList length is equal to 2
        expect(todoList).toHaveLength(2);
    })
})