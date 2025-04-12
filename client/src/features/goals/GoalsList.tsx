import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../redux/store';
import { fetchGoals, selectGoal } from '../../redux/slices/goalsSlice';
import { fetchTasksByGoal } from '../../redux/slices/tasksSlice';
import { Card, CardContent } from '../../components/ui/card';

export const GoalsList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { goals, selectedGoalId, loading } = useSelector((state: RootState) => state.goals);

  useEffect(() => {
    dispatch(fetchGoals());
  }, [dispatch]);

  const handleGoalClick = (goalId: string) => {
    dispatch(selectGoal(goalId));
    dispatch(fetchTasksByGoal(goalId));
  };

  if (loading) return <div className="p-4">Loading goals...</div>;


  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold mb-4">Goals</h2>
      <div className="space-y-2">
        {(goals ?? []).map((goal) => (
          <Card
            key={goal._id}
            className={`cursor-pointer ${selectedGoalId === goal._id ? 'ring-2 ring-primary' : ''}`}
            onClick={() => handleGoalClick(goal._id)}
          >
            <CardContent className="p-3 flex items-center">
              <div
                className="w-4 h-4 rounded-full mr-2"
                style={{ backgroundColor: goal.color }}
              />
              <span>{goal.title}</span>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};