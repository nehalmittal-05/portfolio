import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const targetDir = path.join(__dirname, 'resumes');
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

// 1. Generate valid, compliant PDF 1.4
function generatePdf() {
  const lines = [
    { text: 'Nehal Mittal', size: 20, lead: 26, isBold: true },
    { text: 'B.Tech in Computer Science and Engineering | JK Lakshmipat University, Jaipur', size: 10, lead: 16 },
    { text: 'Email: nehalmittal5251218@gmail.com | Location: Jaipur, Rajasthan, India', size: 9, lead: 14 },
    { text: 'GitHub: https://github.com/nehalmittal-05 | LinkedIn: https://www.linkedin.com/in/nehal511', size: 9, lead: 22 },
    
    { text: '[ OFFICIAL RESUME STARTER TEMPLATE - JK LAKSHMIPAT UNIVERSITY ]', size: 8, lead: 12 },
    { text: 'Note: To update with your official resume, place your PDF in server/resumes/Nehal_Mittal_Resume.pdf', size: 8, lead: 20 },

    { text: 'PROFESSIONAL SUMMARY', size: 12, lead: 16, isBold: true },
    { text: 'B.Tech CSE student at JK Lakshmipat University preparing for software engineering placements.', size: 9, lead: 13 },
    { text: 'Strong interest in software development, machine learning, and AI with academic project experience.', size: 9, lead: 20 },

    { text: 'EDUCATION', size: 12, lead: 16, isBold: true },
    { text: 'B.Tech in Computer Science and Engineering', size: 10, lead: 14, isBold: true },
    { text: 'JK Lakshmipat University, Jaipur, Rajasthan, India', size: 9, lead: 13 },
    { text: 'Status: Student (Preparing for SDE Placements) | Focus: Software Development & Machine Learning', size: 9, lead: 20 },

    { text: 'TECHNICAL SKILLS', size: 12, lead: 16, isBold: true },
    { text: 'Languages: Python, C, C++, JavaScript, SQL', size: 9, lead: 13 },
    { text: 'Databases: MySQL (Relational Schema Design & SQL Queries), MongoDB', size: 9, lead: 13 },
    { text: 'Backend & Web: Node.js, Express.js, RESTful APIs, React.js', size: 9, lead: 13 },
    { text: 'Machine Learning & AI: Scikit-Learn, Pandas, NumPy, Deep Learning & CNN Concepts', size: 9, lead: 13 },
    { text: 'Tools: Git, GitHub, VS Code, Jupyter Notebook, Postman', size: 9, lead: 20 },

    { text: 'FEATURED PROJECTS (VERIFIED)', size: 12, lead: 16, isBold: true },
    { text: '1. Asteroid Risk Assessment (Machine Learning Classification)', size: 9, lead: 13, isBold: true },
    { text: '   - Predictive model for classifying near-Earth asteroids as hazardous using Scikit-Learn and Pandas.', size: 8.5, lead: 13 },
    { text: '2. Power Management System (Database Engineering & Analytics)', size: 9, lead: 13, isBold: true },
    { text: '   - Campus electricity consumption tracking with MySQL schema design and query optimization.', size: 8.5, lead: 13 },
    { text: '3. Lung Nodule Detection (Deep Learning Research in Medical Imaging)', size: 9, lead: 13, isBold: true },
    { text: '   - Research project exploring volumetric CT scan preprocessing and convolutional neural networks.', size: 8.5, lead: 14 },
  ];

  let streamContent = 'BT\n';
  let currentY = 740;
  streamContent += `50 ${currentY} Td\n`;

  for (let i = 0; i < lines.length; i++) {
    const item = lines[i];
    const fontRef = item.isBold ? '/F2' : '/F1';
    const escaped = item.text.replace(/\\/g, '\\\\').replace(/\(/g, '\\(').replace(/\)/g, '\\)');
    
    if (i === 0) {
      streamContent += `${fontRef} ${item.size} Tf\n`;
      streamContent += `(${escaped}) Tj\n`;
    } else {
      const prevLead = lines[i - 1].lead;
      streamContent += `0 -${prevLead} Td\n`;
      streamContent += `${fontRef} ${item.size} Tf\n`;
      streamContent += `(${escaped}) Tj\n`;
    }
  }
  streamContent += 'ET\n';

  const streamBytes = Buffer.from(streamContent, 'utf-8');

  // Build PDF objects
  const obj1 = '1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n';
  const obj2 = '2 0 obj\n<< /Type /Pages /Kids [3 0 R] /Count 1 >>\nendobj\n';
  const obj3 = '3 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Contents 4 0 R /Resources << /Font << /F1 5 0 R /F2 6 0 R >> >> >>\nendobj\n';
  const obj4Header = `4 0 obj\n<< /Length ${streamBytes.length} >>\nstream\n`;
  const obj4Footer = '\nendstream\nendobj\n';
  const obj5 = '5 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>\nendobj\n';
  const obj6 = '6 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>\nendobj\n';

  const header = '%PDF-1.4\n';
  
  const offset1 = header.length;
  const offset2 = offset1 + obj1.length;
  const offset3 = offset2 + obj2.length;
  const offset4 = offset3 + obj3.length;
  const offset5 = offset4 + obj4Header.length + streamBytes.length + obj4Footer.length;
  const offset6 = offset5 + obj5.length;
  const xrefOffset = offset6 + obj6.length;

  const pad = (n) => String(n).padStart(10, '0');

  const xref = `xref\n0 7\n0000000000 65535 f \n${pad(offset1)} 00000 n \n${pad(offset2)} 00000 n \n${pad(offset3)} 00000 n \n${pad(offset4)} 00000 n \n${pad(offset5)} 00000 n \n${pad(offset6)} 00000 n \n`;
  const trailer = `trailer\n<< /Size 7 /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF\n`;

  const pdfBuffer = Buffer.concat([
    Buffer.from(header, 'utf-8'),
    Buffer.from(obj1, 'utf-8'),
    Buffer.from(obj2, 'utf-8'),
    Buffer.from(obj3, 'utf-8'),
    Buffer.from(obj4Header, 'utf-8'),
    streamBytes,
    Buffer.from(obj4Footer, 'utf-8'),
    Buffer.from(obj5, 'utf-8'),
    Buffer.from(obj6, 'utf-8'),
    Buffer.from(xref, 'utf-8'),
    Buffer.from(trailer, 'utf-8'),
  ]);

  const pdfPath = path.join(targetDir, 'Nehal_Mittal_Resume.pdf');
  fs.writeFileSync(pdfPath, pdfBuffer);
  console.log(`[OK] Generated valid PDF: ${pdfPath} (${pdfBuffer.length} bytes)`);
}

// 2. Generate valid OpenXML DOCX document
function generateDocx() {
  const tempDir = path.join(__dirname, '..', '.temp_docx_build');
  if (fs.existsSync(tempDir)) {
    fs.rmSync(tempDir, { recursive: true, force: true });
  }

  const wordDir = path.join(tempDir, 'word');
  const relsDir = path.join(tempDir, '_rels');
  fs.mkdirSync(wordDir, { recursive: true });
  fs.mkdirSync(relsDir, { recursive: true });

  const contentTypesXml = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">
  <Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>
  <Default Extension="xml" ContentType="application/xml"/>
  <Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/>
</Types>`;

  const rootRelsXml = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/>
</Relationships>`;

  const documentXml = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main">
  <w:body>
    <w:p>
      <w:pPr><w:jc w:val="center"/></w:pPr>
      <w:r>
        <w:rPr><w:b/><w:sz w:val="44"/><w:color w:val="1A3626"/></w:rPr>
        <w:t>NEHAL MITTAL</w:t>
      </w:r>
    </w:p>
    <w:p>
      <w:pPr><w:jc w:val="center"/></w:pPr>
      <w:r>
        <w:rPr><w:b/><w:sz w:val="22"/><w:color w:val="4A6B53"/></w:rPr>
        <w:t>B.Tech in Computer Science and Engineering | JK Lakshmipat University, Jaipur</w:t>
      </w:r>
    </w:p>
    <w:p>
      <w:pPr><w:jc w:val="center"/></w:pPr>
      <w:r>
        <w:rPr><w:sz w:val="20"/><w:color w:val="555555"/></w:rPr>
        <w:t>Email: nehalmittal5251218@gmail.com | Location: Jaipur, Rajasthan, India</w:t>
      </w:r>
    </w:p>
    <w:p>
      <w:pPr><w:jc w:val="center"/></w:pPr>
      <w:r>
        <w:rPr><w:sz w:val="20"/><w:color w:val="555555"/></w:rPr>
        <w:t>GitHub: https://github.com/nehalmittal-05 | LinkedIn: https://www.linkedin.com/in/nehal511</w:t>
      </w:r>
    </w:p>
    
    <w:p><w:r><w:t></w:t></w:r></w:p>
    
    <w:p>
      <w:pPr><w:jc w:val="center"/></w:pPr>
      <w:r>
        <w:rPr><w:i/><w:sz w:val="18"/><w:color w:val="888888"/></w:rPr>
        <w:t>[ OFFICIAL RESUME STARTER TEMPLATE - JK LAKSHMIPAT UNIVERSITY ]</w:t>
      </w:r>
    </w:p>
    <w:p>
      <w:pPr><w:jc w:val="center"/></w:pPr>
      <w:r>
        <w:rPr><w:i/><w:sz w:val="18"/><w:color w:val="888888"/></w:rPr>
        <w:t>To replace with your official placement resume, copy your files into server/resumes/</w:t>
      </w:r>
    </w:p>

    <w:p><w:r><w:t></w:t></w:r></w:p>

    <w:p>
      <w:r><w:rPr><w:b/><w:sz w:val="26"/><w:color w:val="1A3626"/></w:rPr><w:t>PROFESSIONAL SUMMARY</w:t></w:r>
    </w:p>
    <w:p>
      <w:r><w:rPr><w:sz w:val="21"/></w:rPr><w:t>Computer Science and Engineering undergraduate at JK Lakshmipat University, Jaipur. Passionate about software development, machine learning, and artificial intelligence, with practical experience designing relational database systems in MySQL, developing machine learning classification models, and exploring deep learning for medical image analysis.</w:t></w:r>
    </w:p>

    <w:p><w:r><w:t></w:t></w:r></w:p>

    <w:p>
      <w:r><w:rPr><w:b/><w:sz w:val="26"/><w:color w:val="1A3626"/></w:rPr><w:t>EDUCATION</w:t></w:r>
    </w:p>
    <w:p>
      <w:r><w:rPr><w:b/><w:sz w:val="22"/></w:rPr><w:t>Bachelor of Technology (B.Tech) in Computer Science and Engineering</w:t></w:r>
    </w:p>
    <w:p>
      <w:r><w:rPr><w:sz w:val="21"/></w:rPr><w:t>JK Lakshmipat University, Jaipur, Rajasthan, India</w:t></w:r>
    </w:p>
    <w:p>
      <w:r><w:rPr><w:sz w:val="21"/><w:color w:val="555555"/></w:rPr><w:t>Status: Student (Preparing for Software Engineering Placements)</w:t></w:r>
    </w:p>
    <w:p>
      <w:r><w:rPr><w:sz w:val="21"/><w:color w:val="555555"/></w:rPr><w:t>Relevant Coursework: Data Structures &amp; Algorithms, Object-Oriented Programming, Database Management Systems, Operating Systems, Machine Learning</w:t></w:r>
    </w:p>

    <w:p><w:r><w:t></w:t></w:r></w:p>

    <w:p>
      <w:r><w:rPr><w:b/><w:sz w:val="26"/><w:color w:val="1A3626"/></w:rPr><w:t>TECHNICAL SKILLS</w:t></w:r>
    </w:p>
    <w:p>
      <w:r><w:rPr><w:b/><w:sz w:val="21"/></w:rPr><w:t>• Programming Languages: </w:t></w:r>
      <w:r><w:rPr><w:sz w:val="21"/></w:rPr><w:t>Python, C, C++, JavaScript, SQL</w:t></w:r>
    </w:p>
    <w:p>
      <w:r><w:rPr><w:b/><w:sz w:val="21"/></w:rPr><w:t>• Databases: </w:t></w:r>
      <w:r><w:rPr><w:sz w:val="21"/></w:rPr><w:t>MySQL (Relational Schema Design &amp; Optimization), MongoDB</w:t></w:r>
    </w:p>
    <w:p>
      <w:r><w:rPr><w:b/><w:sz w:val="21"/></w:rPr><w:t>• Web &amp; Backend: </w:t></w:r>
      <w:r><w:rPr><w:sz w:val="21"/></w:rPr><w:t>Node.js, Express.js, RESTful APIs, React.js</w:t></w:r>
    </w:p>
    <w:p>
      <w:r><w:rPr><w:b/><w:sz w:val="21"/></w:rPr><w:t>• Machine Learning &amp; AI: </w:t></w:r>
      <w:r><w:rPr><w:sz w:val="21"/></w:rPr><w:t>Scikit-Learn, Pandas, NumPy, Deep Learning &amp; CNN Concepts</w:t></w:r>
    </w:p>
    <w:p>
      <w:r><w:rPr><w:b/><w:sz w:val="21"/></w:rPr><w:t>• Tools &amp; Environment: </w:t></w:r>
      <w:r><w:rPr><w:sz w:val="21"/></w:rPr><w:t>Git, GitHub, VS Code, Jupyter Notebook, Postman</w:t></w:r>
    </w:p>

    <w:p><w:r><w:t></w:t></w:r></w:p>

    <w:p>
      <w:r><w:rPr><w:b/><w:sz w:val="26"/><w:color w:val="1A3626"/></w:rPr><w:t>FEATURED PROJECTS</w:t></w:r>
    </w:p>
    <w:p>
      <w:r><w:rPr><w:b/><w:sz w:val="22"/></w:rPr><w:t>1. Asteroid Risk Assessment</w:t></w:r>
    </w:p>
    <w:p>
      <w:r><w:rPr><w:sz w:val="21"/></w:rPr><w:t>• Machine learning classification model predicting whether near-Earth asteroids are hazardous.</w:t></w:r>
    </w:p>
    <w:p>
      <w:r><w:rPr><w:sz w:val="21"/><w:color w:val="555555"/></w:rPr><w:t>• Tech: Python, Scikit-Learn, Pandas, NumPy</w:t></w:r>
    </w:p>
    <w:p>
      <w:r><w:rPr><w:b/><w:sz w:val="22"/></w:rPr><w:t>2. Power Management System</w:t></w:r>
    </w:p>
    <w:p>
      <w:r><w:rPr><w:sz w:val="21"/></w:rPr><w:t>• Campus electricity consumption tracking and relational schema design using MySQL.</w:t></w:r>
    </w:p>
    <w:p>
      <w:r><w:rPr><w:sz w:val="21"/><w:color w:val="555555"/></w:rPr><w:t>• Tech: MySQL, Relational Database Modeling, SQL Queries</w:t></w:r>
    </w:p>
    <w:p>
      <w:r><w:rPr><w:b/><w:sz w:val="22"/></w:rPr><w:t>3. Lung Nodule Detection</w:t></w:r>
    </w:p>
    <w:p>
      <w:r><w:rPr><w:sz w:val="21"/></w:rPr><w:t>• Deep learning research project in medical image analysis exploring CT scan feature extraction.</w:t></w:r>
    </w:p>
    <w:p>
      <w:r><w:rPr><w:sz w:val="21"/><w:color w:val="555555"/></w:rPr><w:t>• Tech: Python, Deep Learning, Computer Vision, CNNs</w:t></w:r>
    </w:p>
  </w:body>
</w:document>`;

  fs.writeFileSync(path.join(tempDir, '[Content_Types].xml'), contentTypesXml);
  fs.writeFileSync(path.join(relsDir, '.rels'), rootRelsXml);
  fs.writeFileSync(path.join(wordDir, 'document.xml'), documentXml);

  const tempZip = path.join(targetDir, 'temp_build.zip');
  const docxPath = path.join(targetDir, 'Nehal_Mittal_Resume.docx');
  if (fs.existsSync(tempZip)) fs.unlinkSync(tempZip);
  if (fs.existsSync(docxPath)) fs.unlinkSync(docxPath);

  // Compress using PowerShell Compress-Archive to .zip first
  const zipCmd = `powershell -Command "Compress-Archive -Path '${tempDir}\\*' -DestinationPath '${tempZip}' -Force"`;
  execSync(zipCmd);

  // Rename .zip to .docx
  fs.renameSync(tempZip, docxPath);

  // Clean temp
  fs.rmSync(tempDir, { recursive: true, force: true });
  console.log(`[OK] Generated valid DOCX: ${docxPath}`);
}

generatePdf();
generateDocx();

console.log('\nResume generation complete in /server/resumes directory.');
