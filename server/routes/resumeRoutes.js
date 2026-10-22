import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

// Private server-side directory for resumes
const resumesDir = path.join(__dirname, '..', 'resumes');

// Ensure resumes directory exists
if (!fs.existsSync(resumesDir)) {
  fs.mkdirSync(resumesDir, { recursive: true });
}

/**
 * Helper to locate resume file on disk for a given format
 * Supports custom filenames (e.g. Nehal_Mittal_Resume.pdf, resume.pdf, or any .pdf)
 */
const getResumeFilePath = (format) => {
  const ext = `.${format.toLowerCase()}`;
  
  // 1. Check preferred filenames first (User's real file prioritized)
  const preferredNames = [
    `Resume_Nehal-Mittal${ext}`,
    `Resume_Nehal_Mittal${ext}`,
    `Resume-Nehal-Mittal${ext}`,
    `Nehal_Mittal_Resume${ext}`,
    `Nehal-Mittal-Resume${ext}`,
    `NehalMittal_Resume${ext}`,
    `resume${ext}`,
    `Resume${ext}`,
    `Sample-Developer-Resume${ext}`,
  ];

  for (const name of preferredNames) {
    const fullPath = path.join(resumesDir, name);
    if (fs.existsSync(fullPath)) {
      return {
        exists: true,
        fullPath,
        filename: name,
      };
    }
  }

  // 2. Fallback: search for any file with this extension in /server/resumes
  if (fs.existsSync(resumesDir)) {
    const files = fs.readdirSync(resumesDir);
    const matched = files.find((f) => f.toLowerCase().endsWith(ext));
    if (matched) {
      return {
        exists: true,
        fullPath: path.join(resumesDir, matched),
        filename: matched,
      };
    }
  }

  return {
    exists: false,
    fullPath: path.join(resumesDir, `Nehal_Mittal_Resume${ext}`),
    filename: `Nehal_Mittal_Resume${ext}`,
  };
};

/**
 * Common handler to serve resume file with appropriate content-type and headers
 */
const serveResume = (format, res) => {
  const isPdf = format.toLowerCase() === 'pdf';
  const fileInfo = getResumeFilePath(format);
  const downloadName = fileInfo.exists
    ? fileInfo.filename
    : (isPdf ? 'Resume_Nehal-Mittal.pdf' : 'Resume_Nehal-Mittal.docx');
  const contentType = isPdf
    ? 'application/pdf'
    : 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';

  if (!fileInfo.exists) {
    return res.status(404).json({
      success: false,
      message: `Resume ${format.toUpperCase()} file not found on the server.`,
      format: format.toLowerCase(),
      expectedFile: downloadName,
      directory: '/server/resumes',
      instructions: `Please place your official resume file (${downloadName}) in the server/resumes directory.`,
    });
  }

  // Set explicit download headers
  res.setHeader('Content-Type', contentType);
  res.setHeader('Content-Disposition', `attachment; filename="${downloadName}"`);

  // Express res.download streams the file securely from the private server directory
  return res.download(fileInfo.fullPath, downloadName, (err) => {
    if (err && !res.headersSent) {
      console.error(`Error sending ${format.toUpperCase()} resume:`, err.message);
      return res.status(500).json({
        success: false,
        message: `Failed to download ${format.toUpperCase()} resume file from server.`,
        error: err.message,
      });
    }
  });
};

/**
 * @route   GET /api/resume/pdf
 * @desc    Serve the PDF resume file from /server/resumes
 * @access  Public
 */
router.get('/pdf', (req, res) => {
  return serveResume('pdf', res);
});

/**
 * @route   GET /api/resume/docx
 * @desc    Serve the DOCX resume file from /server/resumes
 * @access  Public
 */
router.get('/docx', (req, res) => {
  return serveResume('docx', res);
});

/**
 * @route   GET /api/resume/download/:format
 * @desc    Backward-compatible route for download by format parameter (pdf or docx)
 * @access  Public
 */
router.get('/download/:format', (req, res) => {
  const { format } = req.params;
  const lower = (format || '').toLowerCase();
  if (lower === 'pdf' || lower === 'docx' || lower === 'doc') {
    return serveResume(lower === 'doc' ? 'docx' : lower, res);
  }
  return res.status(400).json({
    success: false,
    message: 'Invalid resume format requested. Supported formats: pdf, docx',
  });
});

/**
 * @route   GET /api/resume/info
 * @desc    Get metadata and availability status of resume files on the server
 * @access  Public
 */
router.get('/info', (req, res) => {
  const pdfInfo = getResumeFilePath('pdf');
  const docxInfo = getResumeFilePath('docx');

  return res.json({
    success: true,
    data: {
      candidateName: 'Nehal Mittal',
      degree: 'B.Tech in Computer Science and Engineering',
      institution: 'JK Lakshmipat University',
      location: 'Jaipur, Rajasthan, India',
      targetRole: 'Software Development Engineer (SDE) / Machine Learning',
      storageDirectory: '/server/resumes',
      files: {
        pdf: {
          available: pdfInfo.exists,
          filename: pdfInfo.exists ? pdfInfo.filename : null,
          downloadUrl: '/api/resume/pdf',
        },
        docx: {
          available: docxInfo.exists,
          filename: docxInfo.exists ? docxInfo.filename : null,
          downloadUrl: '/api/resume/docx',
        },
      },
      instructions: 'To update resume files, place your PDF and DOCX files into the server/resumes directory.',
    },
  });
});

export default router;
