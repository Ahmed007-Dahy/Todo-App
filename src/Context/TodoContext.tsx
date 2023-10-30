import React, { createContext, ReactElement, useEffect, useState } from 'react';

export interface Todo {
    id: number;
    todoTitle: string;
    todoSubTitle: string;
    isDone: boolean;
    status: string;
}

export interface TodoAppProviderProps {
    children: React.ReactNode;
}

export interface TodoContextType {
    todo: string;
    todoSubTitle: string;
    todoItems: Todo[];
    notStartedTask: Todo[];
    progressTask: Todo[];
    doneTask: Todo[];
    statuses: string[];
    setTodo: React.Dispatch<React.SetStateAction<string>>;
    setTodoSubTitle: React.Dispatch<React.SetStateAction<string>>;
    setTodoItems: React.Dispatch<React.SetStateAction<Todo[]>>;
    setNotStartedTask: React.Dispatch<React.SetStateAction<Todo[]>>;
    setProgressTask: React.Dispatch<React.SetStateAction<Todo[]>>;
    setDoneTask: React.Dispatch<React.SetStateAction<Todo[]>>;

    handleAddTodo(todoItem: Todo): void;

    handleRemoveTodo(id: number): void;

    handleFinishTodo(id: number): void;

    handleProgressTodo(id: number): void;

    handleNotStartedTodo(id: number): void;
}

export const TodoContext = createContext<TodoContextType>({
    todo: '',
    todoSubTitle: '',
    todoItems: [],
    notStartedTask: [],
    progressTask: [],
    doneTask: [],
    statuses: ['notStarted', 'In Progress', 'Done'],
    setDoneTask: (): void => {},
    setTodo: (): void => {},
    setNotStartedTask: (): void => {},
    setProgressTask: (): void => {},
    setTodoSubTitle: (): void => {},
    setTodoItems: (): void => {},
    handleAddTodo: (): void => {},
    handleRemoveTodo: (): void => {},
    handleFinishTodo: (): void => {},
    handleProgressTodo: (): void => {},
    handleNotStartedTodo: (): void => {},
});

function TodoAppProvider({ children }: TodoAppProviderProps): ReactElement {
    const [todo, setTodo] = useState<string>('');
    const [todoSubTitle, setTodoSubTitle] = useState<string>('');
    const [todoItems, setTodoItems] = useState(function () {
        const storedTodoItems: string | null =
            localStorage.getItem('todoTasks');
        return storedTodoItems ? JSON.parse(storedTodoItems) : [];
    });
    const [notStartedTask, setNotStartedTask] = useState<Todo[]>([]);
    const [progressTask, setProgressTask] = useState<Todo[]>([]);
    const [doneTask, setDoneTask] = useState<Todo[]>([]);
    const statuses: string[] = ['notStarted', 'In Progress', 'Done'];

    function handleAddTodo(todoItem: Todo): void {
        if (
            !todoItems.find(
                (item: Todo): boolean =>
                    item.todoTitle.toLowerCase().trim() ===
                    todoItem.todoTitle.toLowerCase().trim(),
            )
        ) {
            const todoList: Todo[] = [...todoItems, todoItem];
            setTodoItems(todoList);
        } else {
            alert('This item is already exit in your Todo list');
        }
    }

    function handleRemoveTodo(id: number): void {
        setTodoItems((todoItem: Todo[]) =>
            todoItem.filter((item: Todo) => item.id !== id),
        );
    }

    function handleFinishTodo(id: number): void {
        setTodoItems((todoItem: Todo[]) =>
            todoItem.map((item: Todo) =>
                item.id === id ? { ...item, status: 'Done' } : item,
            ),
        );
    }

    function handleProgressTodo(id: number): void {
        setTodoItems((todoItem: Todo[]) =>
            todoItem.map((item: Todo) =>
                item.id === id ? { ...item, status: 'In Progress' } : item,
            ),
        );
    }

    function handleNotStartedTodo(id: number): void {
        setTodoItems((todoItem: Todo[]) =>
            todoItem.map((item: Todo) =>
                item.id === id ? { ...item, status: 'notStarted' } : item,
            ),
        );
    }

    useEffect(
        function (): void {
            const notStartList: Todo[] = todoItems.filter(
                (todo: Todo): boolean => todo.status === 'notStarted',
            );
            const inProgressList: Todo[] = todoItems.filter(
                (todo: Todo): boolean => todo.status === 'In Progress',
            );
            const doneList: Todo[] = todoItems.filter(
                (todo: Todo): boolean => todo.status === 'Done',
            );
            setNotStartedTask(notStartList);
            setProgressTask(inProgressList);
            setDoneTask(doneList);
        },
        [todoItems],
    );
    useEffect((): void => {
        localStorage.setItem('todoTasks', JSON.stringify(todoItems));
    }, [todoItems]);
    const TodoAppValues: TodoContextType = {
        todo,
        todoSubTitle,
        todoItems,
        notStartedTask,
        progressTask,
        doneTask,
        setNotStartedTask,
        setProgressTask,
        setDoneTask,
        statuses,
        setTodoSubTitle,
        setTodo,
        setTodoItems,
        handleAddTodo,
        handleRemoveTodo,
        handleFinishTodo,
        handleNotStartedTodo,
        handleProgressTodo,
    };

    return (
        <TodoContext.Provider value={TodoAppValues}>
            {children}
        </TodoContext.Provider>
    );
}

export { TodoAppProvider };
