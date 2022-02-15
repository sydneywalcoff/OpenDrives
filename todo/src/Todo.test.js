import React from 'react';
import ReactDOM from 'react-dom';
import { TodoList, TodoListItem, TodoForm, TodoHeader, ToDos } from './Todo';

import { render } from '@testing-library/react';

describe('todo Header', () => {
    const div = document.createElement("div");
    it('renders without crashing', () => {
        ReactDOM.render( <TodoHeader />, div);
    })
})

