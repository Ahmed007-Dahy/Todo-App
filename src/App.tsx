import React from 'react';

import InputField from './Components/InputField/InputField.tsx';
import TodoList from './Components/TodoList/TodoList.tsx';
import Main from './Components/Main/Main.tsx';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import { TodoAppProvider } from './Context/TodoContext.tsx';

function App(): React.JSX.Element {
    return (
        <TodoAppProvider>
            <DndProvider backend={HTML5Backend}>
                <Main>
                    <InputField />
                    <TodoList />
                </Main>
            </DndProvider>
        </TodoAppProvider>
    );
}

export default App;
