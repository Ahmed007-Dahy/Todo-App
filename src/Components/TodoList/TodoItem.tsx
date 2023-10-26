import React from 'react';
import { AiFillDelete } from 'react-icons/ai';
import { IoMdDoneAll } from 'react-icons/io';
import { useDrag } from 'react-dnd';
import { TbProgress } from 'react-icons/tb';
import { Todo, TodoContextType, useTodo } from '../../Context/TodoContext.tsx';

interface TodoItemProps {
    id: number;
}

function TodoItem({ id }: TodoItemProps): React.JSX.Element {
    const {
        todo,
        todoSubTitle,
        handleRemoveTodo: onRemoveTodo,
        handleFinishTodo: onFinishTodo,
        handleNotStartedTodo: onNotStartedTodo,
        handleProgressTodo: onProgressTodo,
    }: TodoContextType | string = useTodo();
    const [{ isDragging }, drag] = useDrag(() => ({
        type: 'todo',
        item: { id: id },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
    }));

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

    return (
        <li ref={drag} className={`todoItem ${isDragging ? 'opacity-40' : ''}`}>
            <div>
                {todo}
                <ul className={'w-full text-lg'}>
                    <li className={'pl-1 font-normal w-auto'}>
                        -{todoSubTitle}
                    </li>
                </ul>
            </div>
            <div className={'flex items-center gap-7'}>
                <span className={'cursor-pointer'} onClick={handleRemoveItem}>
                    <AiFillDelete />
                </span>
                <span
                    className={'cursor-pointer block'}
                    onClick={handleNotStartedItem}
                >
                    ⌛
                </span>
                <span
                    className={'cursor-pointer block'}
                    onClick={handleProgressItem}
                >
                    <TbProgress />
                </span>
                <span
                    className={'cursor-pointer block'}
                    onClick={handleFinishItem}
                >
                    <IoMdDoneAll />
                </span>
            </div>
        </li>
    );
}

export default TodoItem;
