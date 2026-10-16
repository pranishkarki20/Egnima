import express from 'express';
import cors from 'cors';
import multer from 'multer';
import path from 'path';

const app = express();
app.use(cors());
app.use(express.json());

// Serve the uploaded PDFs statically
app.use('/notes/uploads', express.static('uploads'));

// Configure Multer to save PDFs in the local 'uploads' folder
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Make sure this folder exists
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage });

// Temporary memory store for notes (In production, use MongoDB or Postgres here!)
let databaseNotes =[]; 

app.post('/api/notes', upload.single('pdfFile'), (req, res) => {
  const { passcode, name, code, year, semester, branch, description } = req.body;

  // 1. Verify Passcode Securely on the Backend!
  if (passcode !== "ENIGMA2026") {
    return res.status(401).json({ error: "Unauthorized access" });
  }

  // 2. Create the note
  const newNote = {
    id: `note-${Date.now()}`,
    name,
    code,
    year: Number(year),
    semester: Number(semester),
    branch,
    description,
    pdfUrl: `http://localhost:8787/notes/uploads/${req.file.filename}` // The link to download it
  };

  databaseNotes.push(newNote);
  res.json({ success: true, note: newNote });
});

app.listen(8787, () => {
  console.log(`Backend running on http://localhost:8787`);
});