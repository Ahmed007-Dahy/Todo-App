import React, { ReactElement } from 'react';

import TodoItem from './TodoItem.tsx';
import { useDrop } from 'react-dnd';
import { useTodo, Todo } from '../../Context/TodoContext.tsx';

interface TodoBoxProps {
    status: string;
}

function TodoBox({ status }: TodoBoxProps): ReactElement {
    const {
        statuses,
        todoItems,
        setTodoItems,
        notStartedTask,
        progressTask,
        doneTask,
        handleRemoveTodo: onRemoveTodo,
        handleFinishTodo: onFinishTodo,
        handleNotStartedTodo: onNotStartedTodo,
        handleProgressTodo: onProgressTodo,
    } = useTodo();
    const [{ isOver }, drop] = useDrop(() => ({
        accept: 'todo',
        drop: (item: Todo): void => addTodoToList(item.id),
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
        }),
    }));

    let heading: string = 'Not Started';
    let backGround: string = 'bg-not-started-todo';
    let todoBg: string = 'bg-not-started-todo-num';
    let todoToMap: Todo[] = notStartedTask;

    if (status === 'In Progress') {
        heading = `In Progress`;
        backGround = 'bg-in-progress-todo';
        todoBg = 'bg-in-progress-todo-num';
        todoToMap = progressTask;
    }
    if (status === 'Done') {
        heading = 'Done';
        backGround = 'bg-done-todo';
        todoBg = 'bg-done-todo-num';
        todoToMap = doneTask;
    }

    function addTodoToList(id: number): void {
        console.log('dropped', id, status);
        setTodoItems((prevTask: Todo[]) => {
            const newTodoTask: Todo[] = prevTask.map((task: Todo) => {
                if (task.id === id) {
                    return { ...task, status: status };
                }
                return task;
            });
            localStorage.setItem('todoTasks', JSON.stringify(newTodoTask));
            console.log(newTodoTask);
            return newTodoTask;
        });
    }

    return (
        <div
            ref={drop}
            className={`${
                isOver
                    ? 'bg-gray-500 p-4 rounded-xl transition duration-150'
                    : ''
            } text-center w-full overflow-y-auto py-5`}
        >
            <span className={`headingList ${backGround}`}>
                {heading}
                <span
                    className={`${todoBg} text-white flex items-center justify-center w-1/12 h-1/6 rounded-full`}
                >
                    {todoToMap.length}
                </span>
            </span>
            <ul className={'flex flex-col gap-5 mt-6 px-2'}>
                {todoToMap.map((item: Todo) => (
                    <TodoItem key={item.id} id={item.id} />
                ))}
            </ul>
        </div>
    );
}

export default TodoBox;
