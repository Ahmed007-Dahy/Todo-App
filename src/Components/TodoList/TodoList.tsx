import React from 'react';
import TodoBox from './TodoBox.tsx';
import useTodo from '../../Context/useTodo.tsx';

function TodoList(): React.JSX.Element {
    const { statuses } = useTodo();
    return (
        <div
            className={
                'grid grid-cols-1 grid-rows-3 gap-y-10 px-2 lg:grid-cols-3 lg:grid-rows-1 w-full h-screen lg:gap-x-7 lg:px-3 lg:overflow-hidden'
            }
        >
            {statuses.map((status: string, index: number) => (
                <TodoBox key={index} status={status} />
            ))}
        </div>
    );
}

export default TodoList;
