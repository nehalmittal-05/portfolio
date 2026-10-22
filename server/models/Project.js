import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Project title is required'],
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    tagline: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      default: 'Software Development',
      trim: true,
    },
    tags: [
      {
        type: String,
        trim: true,
      },
    ],
    githubUrl: {
      type: String,
      default: 'https://github.com/yourusername/project-repository-placeholder',
    },
    liveUrl: {
      type: String,
      default: 'https://project-demo-placeholder.example.com',
    },
    image: {
      type: String,
      default: '',
    },
    featured: {
      type: Boolean,
      default: true,
    },
    highlights: [
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

const Project = mongoose.model('Project', projectSchema);

export default Project;
