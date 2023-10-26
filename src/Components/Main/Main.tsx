import React from 'react';

interface MainProps {
    children: React.ReactNode;
}

function Main({ children }: MainProps) {
    return (
        <div
            className={
                'bg-todo-app w-screen h-full flex flex-col gap-y-7 lg:h-screen'
            }
        >
            {children}
        </div>
    );
}

export default Main;
