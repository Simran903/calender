import { Request, Response } from 'express';
import Event, { IEvent } from '../models/Event';

export const getAllEvents = async (req: Request, res: Response): Promise<void> => {
  try {
    const events = await Event.find();
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching events', error });
  }
};

export const createEvent = async (req: Request, res: Response): Promise<void> => {
  try {
    const newEvent = new Event(req.body);
    const savedEvent = await newEvent.save();
    res.status(201).json(savedEvent);
  } catch (error) {
    res.status(400).json({ message: 'Error creating event', error });
  }
};

export const updateEvent = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const updatedEvent = await Event.findByIdAndUpdate(id, req.body, { new: true });
    
    if (!updatedEvent) {
      res.status(404).json({ message: 'Event not found' });
      return;
    }
    
    res.status(200).json(updatedEvent);
  } catch (error) {
    res.status(400).json({ message: 'Error updating event', error });
  }
};

export const deleteEvent = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const deletedEvent = await Event.findByIdAndDelete(id);
    
    if (!deletedEvent) {
      res.status(404).json({ message: 'Event not found' });
      return;
    }
    
    res.status(200).json({ message: 'Event deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: 'Error deleting event', error });
  }
};