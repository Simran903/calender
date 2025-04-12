import React from 'react';
import { Provider } from 'react-redux';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { store } from './redux/store';
import { Calendar } from './features/calender/Calendar';
import { GoalsList } from './features/goals/GoalsList';
import { TasksList } from './features/tasks/TasksList';
import ErrorBoundary from './components/ErrorBoundary';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <DndProvider backend={HTML5Backend}>
        <div className="flex h-screen overflow-hidden">
          <aside className="w-64 bg-gray-100 border-r overflow-y-auto flex flex-col">
            <ErrorBoundary>
              <GoalsList />
            </ErrorBoundary>
            <div className="border-t border-gray-200" />
            <ErrorBoundary>
              <TasksList />
            </ErrorBoundary>
          </aside>
          <main className="flex-1 overflow-y-auto">
            <ErrorBoundary>
              <Calendar />
            </ErrorBoundary>
          </main>
        </div>
      </DndProvider>
    </Provider>
  );
};

export default App;