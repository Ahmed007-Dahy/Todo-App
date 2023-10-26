import React, {
    createContext,
    ReactElement,
    useContext,
    useEffect,
    useState,
} from 'react';

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
    todoItems: Todo[];
    notStartedTask: Todo[];
    progressTask: Todo[];
    doneTask: Todo[];
    todo: string;
    todoSubTitle: string;
    statuses: string[];
    handleAddTodo: (todoItem: Todo) => void;
    handleRemoveTodo: (id: number) => void;
    handleFinishTodo: (id: number) => void;
    handleProgressTodo: (id: number) => void;
    handleNotStartedTodo: (id: number) => void;
    setTodo: React.Dispatch<React.SetStateAction<string>>;
    setTodoItems: React.Dispatch<React.SetStateAction<Todo[]>>;
    setTodoSubTitle: React.Dispatch<React.SetStateAction<string>>;
}

export const TodoContext = createContext<TodoContextType | string>('');

function TodoAppProvider({ children }: TodoAppProviderProps): ReactElement {
    const [todo, setTodo] = useState<string>('');
    const [todoSubTitle, setTodoSubTitle] = useState<string>('');
    const [todoItems, setTodoItems] = useState(function () {
        const storedTodoItems: string | null =
            localStorage.getItem('todoTasks');
        return storedTodoItems ? JSON.parse(storedTodoItems) : null;
    });
    const [notStartedTask, setNotStartedTask] = useState<Todo[]>([]);
    const [progressTask, setProgressTask] = useState<Todo[]>([]);
    const [doneTask, setDoneTask] = useState<Todo[]>([]);
    const statuses: string[] = ['notStarted', 'In Progress', 'Done'];

    function handleAddTodo(todoItem: Todo): void {
        if (
            !todoItems.find(
                (item: Todo): boolean =>
                    item.todoTitle.toLowerCase() ===
                    todoItem.todoTitle.toLowerCase(),
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

    console.log('todo:', todo, 'todoSubTitle:', todoSubTitle);
    const TodoAppValues: TodoContextType = {
        handleAddTodo,
        handleRemoveTodo,
        handleFinishTodo,
        handleProgressTodo,
        handleNotStartedTodo,
        setTodo,
        setTodoItems,
        setTodoSubTitle,
        todoItems,
        todo,
        todoSubTitle,
        notStartedTask,
        progressTask,
        doneTask,
        statuses,
    };

    return (
        <TodoContext.Provider value={TodoAppValues}>
            {children}
        </TodoContext.Provider>
    );
}

function useTodo(): TodoContextType | string {
    const context = useContext(TodoContext);
    if (context === undefined)
        throw new Error('you use Quiz context out of its context');
    return context;
}

// eslint-disable-next-line react-refresh/only-export-components
export { TodoAppProvider, useTodo };
