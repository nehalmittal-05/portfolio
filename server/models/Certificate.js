import mongoose from 'mongoose';

const certificateSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ['certification', 'achievement'],
      default: 'certification',
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    issuer: {
      type: String,
      required: true,
      trim: true,
    },
    date: {
      type: String,
      required: true,
      trim: true,
    },
    credentialId: {
      type: String,
      default: '[Credential ID Placeholder]',
    },
    credentialUrl: {
      type: String,
      default: 'https://credentials-verification.example.com/verify/[CERT-ID-PLACEHOLDER]',
    },
    description: {
      type: String,
      required: true,
    },
    badgeLabel: {
      type: String,
      default: 'Verified Credential',
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

const Certificate = mongoose.model('Certificate', certificateSchema);

export default Certificate;
