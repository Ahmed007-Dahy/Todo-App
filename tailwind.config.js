/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            colors: {
                'todo-app': '#191919',
                'not-started-todo': '#5a5a5a',
                'not-started-todo-num': '#9b9b9b',
                'in-progress-todo': '#28456c',
                'in-progress-todo-num': '#2e7cd1',
                'done-todo': '#2d9964',
                'done-todo-num': '#2b593f',
                'todo-item': '#262626',
            },
        },
    },
    plugins: [],
};
