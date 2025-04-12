import React, { useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../redux/store';
import { setDraggedTask } from '../../redux/slices/uiSlice';
import { useDrag } from 'react-dnd';
import { Card, CardContent } from '../../components/ui/card';

export const TasksList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { tasks, loading } = useSelector((state: RootState) => state.tasks);
  const { goals, selectedGoalId } = useSelector((state: RootState) => state.goals);
  
  // Safely find the selected goal with null checks
  const selectedGoal = selectedGoalId && goals ? goals.find(g => g._id === selectedGoalId) : null;

  if (!selectedGoal) return <div className="p-4">Select a goal to view tasks</div>;
  if (loading) return <div className="p-4">Loading tasks...</div>;

  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold mb-4">Tasks for {selectedGoal.title}</h2>
      <div className="space-y-2">
        {tasks && tasks.map((task) => (
          <DraggableTask 
            key={task._id}
            task={task}
            color={selectedGoal.color}
          />
        ))}
      </div>
    </div>
  );
};

interface DraggableTaskProps {
  task: { _id: string; title: string };
  color: string;
}

const DraggableTask: React.FC<DraggableTaskProps> = ({ task, color }) => {
  const dispatch = useDispatch<AppDispatch>();
  const ref = useRef<HTMLDivElement>(null);

  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'TASK',
    item: { id: task._id, title: task.title, color },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
    begin: () => {
      dispatch(setDraggedTask({ id: task._id, title: task.title, color }));
    },
    end: () => {
      dispatch(setDraggedTask(null));
    },
  }));

  drag(ref);

  return (
    <div ref={ref} style={{ opacity: isDragging ? 0.5 : 1 }}>
      <Card className="cursor-move">
        <CardContent className="p-3 flex items-center">
          <div 
            className="w-4 h-4 rounded-full mr-2"
            style={{ backgroundColor: color }}
          />
          <span>{task.title}</span>
        </CardContent>
      </Card>
    </div>
  );
};