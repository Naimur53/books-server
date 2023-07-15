import { Schema, model } from 'mongoose';
import { IReading, IReadingModel } from './reading.interface';

const readingSchema = new Schema<IReading>({
  user: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  book: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Book',
  },
  status: {
    type: String,
    enum: ['currently reading', 'finished', 'plan to read soon'],
  },
});

export const Reading = model<IReading, IReadingModel>('reading', readingSchema);
