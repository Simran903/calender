import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../redux/store';
import { addEvent, updateEvent, deleteEvent } from '../../redux/slices/eventsSlice';
import { closeModal } from '../../redux/slices/uiSlice';
import { EventItem, EventCategory } from '../../types';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '../../components/ui/dialog';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';

export const EventModal: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const isOpen = useSelector((state: RootState) => state.ui.isModalOpen);
  const selectedDate = useSelector((state: RootState) => state.ui.selectedDate);
  const selectedStartTime = useSelector((state: RootState) => state.ui.selectedStartTime);
  const selectedEndTime = useSelector((state: RootState) => state.ui.selectedEndTime);
  const selectedEvent = useSelector((state: RootState) => state.ui.selectedEvent);
  
  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<EventItem>({
    defaultValues: {
      title: selectedEvent?.title || '',
      category: selectedEvent?.category || 'work',
      date: selectedEvent?.date || selectedDate || '',
      startTime: selectedEvent?.startTime || selectedStartTime || '',
      endTime: selectedEvent?.endTime || selectedEndTime || '',
    }
  });

  // Update form values when selectedEvent changes
  React.useEffect(() => {
    if (selectedEvent) {
      setValue('title', selectedEvent.title);
      setValue('category', selectedEvent.category);
      setValue('date', selectedEvent.date);
      setValue('startTime', selectedEvent.startTime);
      setValue('endTime', selectedEvent.endTime);
    } else {
      setValue('date', selectedDate || '');
      setValue('startTime', selectedStartTime || '');
      setValue('endTime', selectedEndTime || '');
    }
  }, [selectedEvent, selectedDate, selectedStartTime, selectedEndTime, setValue]);

  const onSubmit = (data: any) => {
    if (selectedEvent && selectedEvent._id !== 'new') {
      dispatch(updateEvent({ ...data, _id: selectedEvent._id }));
    } else {
      dispatch(addEvent(data));
    }
    dispatch(closeModal());
  };

  const handleDelete = () => {
    if (selectedEvent && selectedEvent._id !== 'new') {
      dispatch(deleteEvent(selectedEvent._id));
      dispatch(closeModal());
    }
  };

  const categories: EventCategory[] = ['exercise', 'eating', 'work', 'relax', 'family', 'social'];

  return (
    <Dialog open={isOpen} onOpenChange={() => dispatch(closeModal())}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{selectedEvent && selectedEvent._id !== 'new' ? 'Edit Event' : 'Create Event'}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="title">Title</Label>
            <Input id="title" {...register('title', { required: true })} />
            {errors.title && <p className="text-red-500 text-sm">Title is required</p>}
          </div>

          <div className="grid gap-2">
            <Label htmlFor="category">Category</Label>
            <Select 
              defaultValue={watch('category')} 
              onValueChange={(value) => setValue('category', value as EventCategory)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map(category => (
                  <SelectItem key={category} value={category}>
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="date">Date</Label>
            <Input type="date" id="date" {...register('date', { required: true })} />
            {errors.date && <p className="text-red-500 text-sm">Date is required</p>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="startTime">Start Time</Label>
              <Input type="time" id="startTime" {...register('startTime', { required: true })} />
              {errors.startTime && <p className="text-red-500 text-sm">Start time is required</p>}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="endTime">End Time</Label>
              <Input type="time" id="endTime" {...register('endTime', { required: true })} />
              {errors.endTime && <p className="text-red-500 text-sm">End time is required</p>}
            </div>
          </div>

          <DialogFooter className="gap-2 sm:gap-0">
            {selectedEvent && selectedEvent._id !== 'new' && (
              <Button type="button" variant="destructive" onClick={handleDelete}>
                Delete
              </Button>
            )}
            <Button type="submit">Save</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};