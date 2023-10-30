import React, { useEffect, useRef, useState } from 'react';
import { AiFillDelete } from 'react-icons/ai';
import { IoMdDoneAll } from 'react-icons/io';
import { useMultiDrag } from 'react-dnd-multi-backend';
import { TbProgress } from 'react-icons/tb';
import useTodo from '../../Context/useTodo.tsx';
import { BiSolidEdit } from 'react-icons/bi';
import { Todo } from '../../Context/TodoContext.tsx';

interface TodoItemProps {
    id: number;
    todo: string;
    todoSubTitle: string;
    status: string;
}

function TodoItem({
    id,
    todo,
    todoSubTitle,
    status,
}: TodoItemProps): React.JSX.Element {
    const {
        handleFinishTodo: onFinishTodo,
        handleRemoveTodo: onRemoveTodo,
        handleNotStartedTodo: onNotStartedTodo,
        handleProgressTodo: onProgressTodo,
        setTodoItems,
        todoItems,
    } = useTodo();
    const [edit, setEdit] = useState<boolean>(false);
    const [editTodo, setEditTodo] = useState<string>(todo);
    const [editSubTitle, setEditSubTitle] = useState<string>(todoSubTitle);
    const [[dragProps, ref]] = useMultiDrag({
        type: 'todo',
        item: { id: id },
        collect: (monitor) => {
            return {
                isDragging: monitor.isDragging(),
            };
        },
    });

    const todoRef = useRef<HTMLInputElement>(null);

    function handleRemoveItem(): void {
        onRemoveTodo(id);
    }

    function handleFinishItem(): void {
        onFinishTodo(id);
    }

    function handleProgressItem(): void {
        onProgressTodo(id);
    }

    function handleNotStartedItem(): void {
        onNotStartedTodo(id);
    }

    function handleEditTodo(): void {
        if (!edit) {
            setEdit(!edit);
        }
    }

    function handleChangeTodo(e: React.ChangeEvent<HTMLInputElement>): void {
        setEditTodo(e.target.value);
    }

    function handleChangeSubTitle(
        e: React.ChangeEvent<HTMLInputElement>,
    ): void {
        setEditSubTitle(e.target.value);
    }

    function handleEditForm(e: React.FormEvent, id: number): void {
        e.preventDefault();
        setTodoItems(
            todoItems.map((todoItem: Todo) =>
                todoItem.id === id
                    ? { ...todoItem, todoTitle: editTodo }
                    : todoItem,
            ),
        );
        setEdit(false);
    }

    function handleEditSubTitleForm(e: React.FormEvent, id: number): void {
        e.preventDefault();
        setTodoItems(
            todoItems.map((todoItem: Todo) =>
                todoItem.id === id
                    ? { ...todoItem, todoSubTitle: editSubTitle }
                    : todoItem,
            ),
        );
        setEdit(false);
    }

    let shadow;
    if (status === 'notStarted') {
        shadow = 'hover:shadow-todo-item-shadow';
    }
    if (status === 'In Progress') {
        shadow = 'hover:shadow-in-progress-todo-shadow';
    }
    if (status === 'Done') {
        shadow = 'hover:shadow-done-todo-shadow';
    }

    useEffect((): void => {
        todoRef.current?.focus();
    }, [edit]);

    return (
        <li
            ref={ref}
            className={`todoItem ${shadow} ${
                dragProps.isDragging ? 'opacity-40' : ''
            }`}
        >
            <div className={`flex flex-col`}>
                {edit ? (
                    <form
                        onSubmit={(e) => handleEditForm(e, id)}
                        className={`w-11/12`}
                    >
                        <input
                            className={`bg-transparent border-2 w-11/12`}
                            type="text"
                            placeholder={'Enter your task...'}
                            value={editTodo}
                            ref={todoRef}
                            onChange={handleChangeTodo}
                        />
                    </form>
                ) : (
                    todo
                )}

                <ul className={`${edit ? 'w-11/12' : 'w-full'} text-lg`}>
                    <li className={'pl-1 font-normal w-auto'}>
                        {edit ? (
                            <form
                                onSubmit={(e) => handleEditSubTitleForm(e, id)}
                                className={`w-11/12`}
                            >
                                <input
                                    className={`bg-transparent border-2 w-11/12`}
                                    type="text"
                                    placeholder={
                                        'Enter your description of task...'
                                    }
                                    value={editSubTitle}
                                    onChange={handleChangeSubTitle}
                                />
                            </form>
                        ) : (
                            <span className={`pl-2`}>-{todoSubTitle}</span>
                        )}
                    </li>
                </ul>
            </div>
            <div className={'flex items-center gap-7'}>
                <span className={'cursor-pointer'} onClick={handleRemoveItem}>
                    <AiFillDelete />
                </span>
                <button
                    type={'button'}
                    className={'cursor-pointer'}
                    onClick={handleEditTodo}
                >
                    <BiSolidEdit />
                </button>
                <span
                    className={`${
                        status === 'notStarted'
                            ? 'cursor-not-allowed opacity-30'
                            : 'cursor-pointer'
                    } cursor-pointer`}
                    onClick={handleNotStartedItem}
                >
                    ⌛
                </span>
                <span
                    className={`${
                        status === 'In Progress'
                            ? 'cursor-not-allowed opacity-30'
                            : 'cursor-pointer'
                    } cursor-pointer`}
                    onClick={handleProgressItem}
                >
                    <TbProgress />
                </span>
                <span
                    className={`${
                        status === 'Done'
                            ? 'cursor-not-allowed opacity-30'
                            : 'cursor-pointer'
                    } cursor-pointer`}
                    onClick={handleFinishItem}
                >
                    <IoMdDoneAll />
                </span>
            </div>
        </li>
    );
}

export default TodoItem;
