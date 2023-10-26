import React from 'react';

import { Todo, useTodo } from '../../Context/TodoContext.tsx';

function InputField(): React.JSX.Element {
    const { setTodo, todo, todoSubTitle, setTodoSubTitle, handleAddTodo } =
        useTodo();

    function handleInput(e: React.ChangeEvent<HTMLInputElement>): void {
        setTodo(e.target.value);
    }

    function handleInputDescription(
        e: React.ChangeEvent<HTMLInputElement>,
    ): void {
        setTodoSubTitle(e.target.value);
    }

    function handleSubmitForm(e: React.FormEvent): void {
        e.preventDefault();
        if (todo.length < 3 && todoSubTitle.length < 2) return;
        const newTodoItem: Todo = {
            id: Math.random(),
            todoTitle: todo,
            todoSubTitle: todoSubTitle,
            isDone: false,
            status: 'notStarted',
        };
        handleAddTodo(newTodoItem);
        setTodo('');
        setTodoSubTitle('');
        console.log(newTodoItem);
    }

    return (
        <form
            onSubmit={handleSubmitForm}
            className={
                'flex flex-col w-full gap-y-8 row-span-3 justify-center items-center h-2/5 pt-5 lg:flex-row'
            }
        >
            <input
                className={'inputField'}
                type="text"
                placeholder={'Enter your task...'}
                value={todo}
                onChange={handleInput}
            />
            <input
                className={'inputField'}
                type="text"
                placeholder={'Enter your description of task...'}
                value={todoSubTitle}
                onChange={handleInputDescription}
            />
            <button className={'btnFrom'} type={'submit'}>
                Submit
            </button>
        </form>
    );
}

export default InputField;
