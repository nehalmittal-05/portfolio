import mongoose from 'mongoose';

const skillSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      required: true,
      enum: [
        'Frontend',
        'Backend',
        'Programming Languages',
        'Databases',
        'Tools & Technologies',
      ],
    },
    proficiency: {
      type: Number,
      min: 1,
      max: 100,
      default: 80,
    },
    levelLabel: {
      type: String,
      default: 'Proficient', // e.g. Familiar, Intermediate, Proficient, Advanced
    },
    iconName: {
      type: String,
      default: 'Code',
    },
    order: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Skill = mongoose.model('Skill', skillSchema);

export default Skill;
