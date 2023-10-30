import { useContext } from 'react';
import { TodoContext, TodoContextType } from './TodoContext.tsx';

export default function useTodo(): TodoContextType {
    const context: TodoContextType = useContext(TodoContext);
    if (context === undefined) {
        throw new Error(
            'Context is not defined. Make sure it is provided correctly.',
        );
    }
    return context;
}
