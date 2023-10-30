import React from 'react';
import { AiFillDelete } from 'react-icons/ai';
import { IoMdDoneAll } from 'react-icons/io';
import { useMultiDrag } from 'react-dnd-multi-backend';
import { TbProgress } from 'react-icons/tb';
import useTodo from '../../Context/useTodo.tsx';

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
    } = useTodo();

    const [[dragProps, ref]] = useMultiDrag({
        type: 'todo',
        item: { id: id },
        collect: (monitor) => {
            return {
                isDragging: monitor.isDragging(),
            };
        },
    });

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

    console.log(status);
    return (
        <li
            ref={ref}
            className={`todoItem ${dragProps.isDragging ? 'opacity-40' : ''}`}
        >
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
                    className={`${
                        status === 'notStarted' ? 'hidden' : 'block'
                    } cursor-pointer`}
                    onClick={handleNotStartedItem}
                >
                    ⌛
                </span>
                <span
                    className={`${
                        status === 'In Progress' ? 'hidden' : 'block'
                    } cursor-pointer`}
                    onClick={handleProgressItem}
                >
                    <TbProgress />
                </span>
                <span
                    className={`${
                        status === 'Done' ? 'hidden' : 'block'
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
