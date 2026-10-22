import mongoose from 'mongoose';

const timelineSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      required: true,
      enum: ['education', 'experience'],
    },
    roleOrDegree: {
      type: String,
      required: true,
      trim: true,
    },
    organization: {
      type: String,
      required: true,
      trim: true,
    },
    location: {
      type: String,
      default: '[City, State/Country Placeholder]',
    },
    period: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    points: [
      {
        type: String,
      },
    ],
    skills: [
      {
        type: String,
      },
    ],
    order: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Timeline = mongoose.model('Timeline', timelineSchema);

export default Timeline;
