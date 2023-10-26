// import { ReactElement } from 'react';
import TodoBox from './TodoBox.tsx';
import { useTodo } from '../../Context/TodoContext.tsx';
import React from 'react';

// interface TodoListProps {
//     todoItems: Todo[];
//     setTodoItems: React.Dispatch<React.SetStateAction<Todo[]>>;
//
//     onRemoveTodo(id: number): void;
//
//     onFinishTodo(id: number): void;
//
//     onProgressTodo(id: number): void;
//
//     onNotStartedTodo(id: number): void;
// }

function TodoList(): React.JSX.Element {
    const { statuses } = useTodo();
    console.log(useTodo());

    return (
        <div
            className={
                'grid grid-cols-1 grid-rows-3 gap-y-7 px-6 lg:grid-cols-3 lg:grid-rows-1 w-full h-screen lg:gap-x-10 lg:px-5 lg:overflow-hidden'
            }
        >
            {statuses.map((status: string, index: number) => (
                <TodoBox key={index} status={status} />
            ))}
        </div>
    );
}

export default TodoList;
