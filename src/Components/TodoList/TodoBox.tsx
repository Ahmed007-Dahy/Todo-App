import { ReactElement } from 'react';

import TodoItem from './TodoItem.tsx';
// import { useDrop } from 'react-dnd';
import { Todo } from '../../Context/TodoContext.tsx';
import useTodo from '../../Context/useTodo.tsx';
import { useMultiDrop } from 'react-dnd-multi-backend';
import { TbProgress } from 'react-icons/tb';
import { IoMdDoneAll } from 'react-icons/io';

interface TodoBoxProps {
    status: string;
}

function TodoBox({ status }: TodoBoxProps): ReactElement {
    const { setTodoItems, notStartedTask, progressTask, doneTask } = useTodo();

    const [[dropProps, ref]] = useMultiDrop({
        accept: 'todo',
        drop: (item: Todo): void => addTodoToList(item.id),
        collect: (monitor) => {
            return {
                isOver: monitor.isOver(),
                canDrop: monitor.canDrop(),
            };
        },
    });
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
        setTodoItems((prevTask: Todo[]) => {
            const newTodoTask: Todo[] = prevTask.map((task: Todo) => {
                if (task.id === id) {
                    return { ...task, status: status };
                }
                return task;
            });
            localStorage.setItem('todoTasks', JSON.stringify(newTodoTask));
            return newTodoTask;
        });
    }

    let headingStatus, boxBg;

    if (status === 'notStarted') {
        headingStatus = <span>⌛</span>;
    } else if (status === 'In Progress') {
        headingStatus = <TbProgress />;
    } else if (status === 'Done') {
        headingStatus = <IoMdDoneAll />;
    }
    if (status === 'notStarted') {
        boxBg = 'bg-not-started-todo-num';
    }
    if (status === 'In Progress') {
        boxBg = 'bg-in-progress-todo-num';
    }
    if (status === 'Done') {
        boxBg = 'bg-done-todo-num';
    }
    return (
        <div
            ref={ref}
            className={`${
                dropProps.isOver && dropProps.canDrop
                    ? `${boxBg} p-4 rounded-xl transition duration-150`
                    : ''
            } text-center w-full overflow-y-auto py-5`}
        >
            <span className={`headingList ${backGround}`}>
                {heading} {headingStatus}
                <span
                    className={`${todoBg} text-white flex items-center justify-center w-1/12 h-1/6 rounded-full`}
                >
                    {todoToMap.length}
                </span>
            </span>
            <ul className={'flex flex-col gap-5 mt-6 px-2'}>
                {todoToMap.map((item: Todo) => (
                    <TodoItem
                        key={item.id}
                        id={item.id}
                        todo={item.todoTitle}
                        todoSubTitle={item.todoSubTitle}
                        status={item.status}
                    />
                ))}
            </ul>
        </div>
    );
}

export default TodoBox;
