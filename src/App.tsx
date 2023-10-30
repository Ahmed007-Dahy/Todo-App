import React from 'react';

import InputField from './Components/InputField/InputField.tsx';
import TodoList from './Components/TodoList/TodoList.tsx';
import Main from './Components/Main/Main.tsx';
import { DndProvider } from 'react-dnd-multi-backend';
import { TodoAppProvider } from './Context/TodoContext.tsx';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { TouchBackend } from 'react-dnd-touch-backend';
import { TouchTransition, MouseTransition } from 'react-dnd-multi-backend';

export const HTML5toTouch = {
    backends: [
        {
            id: 'html5',
            backend: HTML5Backend,
            transition: MouseTransition,
        },
        {
            id: 'touch',
            backend: TouchBackend,
            options: { enableMouseEvents: true },
            preview: true,
            transition: TouchTransition,
        },
    ],
};

function App(): React.JSX.Element {
    return (
        <DndProvider options={HTML5toTouch}>
            <Main>
                <TodoAppProvider>
                    <InputField />
                    <TodoList />
                </TodoAppProvider>
            </Main>
        </DndProvider>
    );
}

export default App;
