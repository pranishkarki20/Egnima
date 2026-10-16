import { useState, useMemo, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Download,
  BookOpen,
  Search,
  X,
  Filter,
  ChevronDown,
  ArrowLeft,
  FileText,
  Lock,
  Unlock,
  ShieldAlert,
  Plus,
  Trash2,
  Save
} from "lucide-react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import {
  subjects as initialSubjects,
  years,
  semesters,
  branches,
  type Year,
  type Semester,
  type Subject
} from "@/lib/notesData";

const NotesLibrary = () => {
  // --- Persistent Library State ---
  const [localSubjects, setLocalSubjects] = useState<Subject[]>(() => {
    // Load from local storage so it survives page refreshes!
    const saved = localStorage.getItem("enigma_notes_db");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return initialSubjects;
      }
    }
    return initialSubjects;
  });

  // Save to local storage whenever we add/delete a note
  useEffect(() => {
    localStorage.setItem("enigma_notes_db", JSON.stringify(localSubjects));
  }, [localSubjects]);

  const[selectedYear, setSelectedYear] = useState<Year | "">("");
  const [selectedSemester, setSelectedSemester] = useState<Semester | "">("");
  const [selectedBranch, setSelectedBranch] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState("");

  // --- Admin Panel State ---
  const [isAdmin, setIsAdmin] = useState(false);
  const[isPasscodeModalOpen, setIsPasscodeModalOpen] = useState(false);
  const [isAdminPanelOpen, setIsAdminPanelOpen] = useState(false);
  const [passcode, setPasscode] = useState("");
  const[passcodeError, setPasscodeError] = useState("");
  const [adminTab, setAdminTab] = useState<"ADD" | "MANAGE">("ADD");

// --- New Note Form State ---
const [newNote, setNewNote] = useState<Partial<Subject>>({
  name: "",
  code: "",
  year: 1,
  semester: 1,
  branch: "CSE",
  description: "",
  pdfUrl: "" // Now holds a URL string
});

  // Upload helper state: direct PDF upload (stored as data URL)
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [uploadName, setUploadName] = useState("");

  const handleFileSelect = (file?: File) => {
    if (!file) {
      setUploadName("");
      setNewNote({ ...newNote, pdfUrl: "" });
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      // Store the file as a data URL so it persists in localStorage
      setNewNote({ ...newNote, pdfUrl: result });
      setUploadName(file.name);
    };
    reader.readAsDataURL(file);
  };

  // --- Filter Logic ---
  const filteredSubjects = useMemo(() => {
    return localSubjects.filter((subject) => {
      const matchYear = selectedYear === "" || subject.year === selectedYear;
      const matchSemester = selectedSemester === "" || subject.semester === selectedSemester;
      const matchBranch = selectedBranch === "" || subject.branch === selectedBranch;
      const matchSearch =
        searchQuery === "" ||
        subject.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        subject.code.toLowerCase().includes(searchQuery.toLowerCase());
      return matchYear && matchSemester && matchBranch && matchSearch;
    });
  },[selectedYear, selectedSemester, selectedBranch, searchQuery, localSubjects]);

  const resetFilters = () => {
    setSelectedYear("");
    setSelectedSemester("");
    setSelectedBranch("");
    setSearchQuery("");
  };

  const hasActiveFilters =
    selectedYear !== "" ||
    selectedSemester !== "" ||
    selectedBranch !== "" ||
    searchQuery !== "";

  const availableSemesters = useMemo(() => {
    if (selectedYear === "") return semesters;
    const yearNum = selectedYear as number;
    return semesters.filter((s) => s === yearNum * 2 - 1 || s === yearNum * 2);
  }, [selectedYear]);

  // --- Admin Sorting & Grouping Logic ---
  const groupedSubjects = useMemo(() => {
    const groups: Record<string, Subject[]> = {};
    
    localSubjects.forEach((subject) => {
      if (!groups[subject.branch]) groups[subject.branch] =[];
      groups[subject.branch].push(subject);
    });

    const sortedBranches = Object.keys(groups).sort();

    sortedBranches.forEach((branch) => {
      groups[branch].sort((a, b) => {
        if (a.year !== b.year) return a.year - b.year;
        if (a.semester !== b.semester) return a.semester - b.semester;
        return a.name.localeCompare(b.name);
      });
    });

    return { groups, sortedBranches };
  }, [localSubjects]);

  // --- Admin Functions ---
  const handlePasscodeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode === import.meta.env.VITE_ADMIN_PASSCODE) {
      setIsAdmin(true);
      setIsPasscodeModalOpen(false);
      setPasscode("");
      setPasscodeError("");
      setIsAdminPanelOpen(true);
    } else {
      setPasscodeError("ACCESS DENIED: INVALID CREDENTIALS");
    }
  };
const handleAddNote = (e: React.FormEvent) => {
  e.preventDefault();
  if (!newNote.name || !newNote.code || !newNote.pdfUrl) return;
  
  const newId = `custom-${Date.now()}`;
  const addedNote: Subject = {
    id: newId,
    name: newNote.name,
    code: newNote.code,
    year: (newNote.year || 1) as Year,
    semester: (newNote.semester || 1) as Semester,
    branch: newNote.branch || "CSE",
    description: newNote.description,
    pdfUrl: newNote.pdfUrl, // Storing the link directly
  };
  
  setLocalSubjects((prev) => [addedNote, ...prev]);
  
  // Clear form
  setNewNote({
    name: "",
    code: "",
    year: 1,
    semester: 1,
    branch: "CSE",
    description: "",
    pdfUrl: ""
  });
  
  alert("SYSTEM UPDATED: Link added successfully.");
};

  const handleDeleteNote = (id: string) => {
    if (confirm("WARNING: Are you sure you want to delete this file from the database?")) {
      setLocalSubjects(localSubjects.filter((s) => s.id !== id));
    }
  };

  const handleExportDatabase = () => {
    // This allows the admin to download the updated JSON file to easily update the codebase!
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(localSubjects, null, 2));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "updated_notesData.json");
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };
// Open or download a PDF
const handleOpenOrDownload = (e: React.MouseEvent, pdfUrl?: string) => {
  e.preventDefault();
  if (!pdfUrl) return;

  // Change this:
  // window.open(pdfUrl, '_blank', 'noopener,noreferrer');
  
  // To this (pass features as a string if you really need them, 
  // but most modern browsers handle '_blank' safely by default):
  window.open(pdfUrl, '_blank');
};

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Header */}
      <section className="pt-32 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 border-y border-white/5 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]" />
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
          <h2 className="text-[18vw] font-black text-white/[0.02] tracking-tighter leading-none">
            NOTES
          </h2>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-primary font-code text-xs tracking-widest uppercase mb-12 hover:text-white transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            BACK_TO_HOME
          </Link>
          <div className="max-w-5xl">
            <div className="flex items-center gap-4 mb-8">
              <div className="h-[1px] w-12 sm:w-20 bg-primary" />
              <span className="text-primary font-code tracking-[0.3em] uppercase text-[10px] sm:text-xs">
                Resource.Archive
              </span>
            </div>
            <h1 className="text-5xl sm:text-7xl md:text-[7rem] font-black font-poppins leading-[0.85] tracking-tighter mb-8">
              NOTES <br />
              <span className="text-primary italic">LIBRARY.</span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl border-l-2 border-primary pl-6 font-code text-sm uppercase">
              Access subject notes filtered by year, semester and branch.
            </p>
          </div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-8 border-y border-white/10 sticky top-16 z-40 bg-background/95 backdrop-blur-md">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center">
            <div className="flex items-center gap-3 shrink-0">
              <Filter className="w-4 h-4 text-primary" />
              <span className="text-[10px] font-code text-primary tracking-[0.3em] uppercase">
                FILTER.PARAMS
              </span>
            </div>

            <div className="flex flex-col sm:flex-row flex-wrap gap-3 flex-1">
              <div className="relative flex-1 min-w-[200px] max-w-sm">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                <input
                  type="text"
                  placeholder="SEARCH SUBJECTS..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 text-white placeholder-white/30 font-code text-xs tracking-wider uppercase pl-10 pr-4 py-3 focus:outline-none focus:border-primary transition-colors"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-primary transition-colors"
                  >
                    <X className="w-3 h-3" />
                  </button>
                )}
              </div>

              <div className="relative">
                <select
                  value={selectedYear}
                  onChange={(e) => {
                    const val = e.target.value;
                    setSelectedYear(val === "" ? "" : (Number(val) as Year));
                    setSelectedSemester("");
                  }}
                  className="appearance-none bg-white/5 border border-white/10 text-white font-code text-xs tracking-wider uppercase px-4 py-3 pr-10 focus:outline-none focus:border-primary transition-colors cursor-pointer min-w-[140px]"
                >
                  <option value="" className="bg-[#121212]">ALL YEARS</option>
                  {years.map((y) => (
                    <option key={y} value={y} className="bg-[#121212]">YEAR {y}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30 pointer-events-none" />
              </div>

              <div className="relative">
                <select
                  value={selectedSemester}
                  onChange={(e) => {
                    const val = e.target.value;
                    setSelectedSemester(val === "" ? "" : (Number(val) as Semester));
                  }}
                  className="appearance-none bg-white/5 border border-white/10 text-white font-code text-xs tracking-wider uppercase px-4 py-3 pr-10 focus:outline-none focus:border-primary transition-colors cursor-pointer min-w-[160px]"
                >
                  <option value="" className="bg-[#121212]">ALL SEMESTERS</option>
                  {availableSemesters.map((s) => (
                    <option key={s} value={s} className="bg-[#121212]">SEM {s}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30 pointer-events-none" />
              </div>

              <div className="relative">
                <select
                  value={selectedBranch}
                  onChange={(e) => setSelectedBranch(e.target.value)}
                  className="appearance-none bg-white/5 border border-white/10 text-white font-code text-xs tracking-wider uppercase px-4 py-3 pr-10 focus:outline-none focus:border-primary transition-colors cursor-pointer min-w-[150px]"
                >
                  <option value="" className="bg-[#121212]">ALL BRANCHES</option>
                  {branches.map((b) => (
                    <option key={b} value={b} className="bg-[#121212]">{b}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30 pointer-events-none" />
              </div>

              {hasActiveFilters && (
                <button
                  onClick={resetFilters}
                  className="flex items-center gap-2 bg-primary text-black font-code text-xs font-bold tracking-widest uppercase px-5 py-3 hover:bg-white transition-colors"
                >
                  <X className="w-3 h-3" /> RESET
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Subject Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {filteredSubjects.length > 0 ? (
            <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-px bg-white/10 border border-white/10">
              <AnimatePresence mode="popLayout">
                {filteredSubjects.map((subject, index) => (
                  <motion.div
                    key={subject.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3, delay: index * 0.03 }}
                    className="bg-background p-8 group relative overflow-hidden flex flex-col"
                  >
                    <div className="absolute top-3 right-3 font-code text-[8px] text-white/10 select-none">
                      DOC_{String(index + 1).padStart(3, "0")}
                    </div>
                    <div className="mb-6 w-12 h-12 bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:bg-primary group-hover:border-primary transition-colors">
                      <FileText className="w-5 h-5 text-primary group-hover:text-black transition-colors" />
                    </div>
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      <span className="font-code text-[9px] bg-white/5 text-white/40 px-2 py-0.5 tracking-wider border border-white/5">Y{subject.year}</span>
                      <span className="font-code text-[9px] bg-white/5 text-white/40 px-2 py-0.5 tracking-wider border border-white/5">S{subject.semester}</span>
                      <span className="font-code text-[9px] bg-primary/10 text-primary px-2 py-0.5 tracking-wider border border-primary/20">{subject.branch}</span>
                    </div>
                    <div className="flex-1">
                      <span className="font-code text-[10px] text-primary/60 tracking-widest block mb-2">{subject.code}</span>
                      <h3 className="text-lg font-black font-poppins tracking-tight uppercase leading-tight mb-3 group-hover:text-primary transition-colors">
                        {subject.name}
                      </h3>
                      {subject.description && (
                        <p className="text-muted-foreground font-code text-[10px] leading-relaxed line-clamp-3 opacity-50">
                          {subject.description}
                        </p>
                      )}
                    </div>
                    <a
                      href={subject.pdfUrl}
                      onClick={(e) => handleOpenOrDownload(e, subject.pdfUrl)}
                      rel="noopener noreferrer"
                      className="mt-6 flex items-center justify-center gap-2 w-full bg-white/5 border border-white/10 text-white font-code text-[10px] font-bold tracking-widest uppercase px-4 py-3 hover:bg-primary hover:text-black hover:border-primary transition-all group/btn"
                    >
                      <Download className="w-3.5 h-3.5" /> ACCESS_DOCUMENT
                    </a>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          ) : (
            <div className="border border-white/10 p-16 flex flex-col items-center justify-center text-center">
              <BookOpen className="w-8 h-8 text-white/20 mb-8" />
              <h3 className="text-2xl font-black font-poppins tracking-tight uppercase mb-4">NO_RESULTS_FOUND</h3>
              <p className="text-muted-foreground font-code text-sm">No subjects match your current filter configuration.</p>
            </div>
          )}
        </div>
      </section>

      {/* --- Admin Lock Button (Bottom Right, above Chatbot) --- */}
      <div className="fixed bottom-28 right-8 z-50">
        <button
          onClick={() => isAdmin ? setIsAdminPanelOpen(true) : setIsPasscodeModalOpen(true)}
          className="w-16 h-16 bg-background border border-white/20 flex items-center justify-center text-white hover:border-primary hover:text-primary transition-all shadow-lg hover:shadow-[0_0_20px_rgba(213,255,64,0.3)] group"
          aria-label="Admin Access"
        >
          {isAdmin ? (
            <Unlock className="w-6 h-6" />
          ) : (
            <Lock className="w-6 h-6 group-hover:scale-110 transition-transform" />
          )}
        </button>
      </div>

      {/* --- Passcode Modal Overlay --- */}
      <AnimatePresence>
        {isPasscodeModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-md p-4"
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="bg-background border border-primary p-8 md:p-12 max-w-md w-full relative shadow-[8px_8px_0px_0px_#d4aa27]"
            >
              <button
                onClick={() => setIsPasscodeModalOpen(false)}
                className="absolute top-4 right-4 text-white/50 hover:text-primary"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="flex flex-col items-center text-center mb-8">
                <div className="w-16 h-16 bg-primary/10 border border-primary flex items-center justify-center mb-6">
                  <ShieldAlert className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-2xl font-black font-poppins uppercase tracking-tighter">Admin Override</h3>
                <p className="font-code text-xs text-muted-foreground mt-2 uppercase tracking-widest">
                  Enter security protocol passcode
                </p>
              </div>

              <form onSubmit={handlePasscodeSubmit} className="space-y-6">
                <div>
                  <input
                    type="password"
                    placeholder="ENTER PASSCODE..."
                    value={passcode}
                    onChange={(e) => setPasscode(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 text-white placeholder-white/30 font-code text-sm tracking-widest uppercase px-4 py-4 focus:outline-none focus:border-primary transition-colors text-center"
                    autoFocus
                  />
                  {passcodeError && (
                    <p className="text-red-500 font-code text-[10px] mt-2 uppercase tracking-widest text-center">
                      {passcodeError}
                    </p>
                  )}
                </div>
                <button
                  type="submit"
                  className="w-full bg-primary text-black font-black font-code uppercase tracking-widest py-4 hover:bg-white transition-colors"
                >
                  Authorize Access
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- Admin Panel Modal Overlay --- */}
      <AnimatePresence>
        {isAdminPanelOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-md p-4"
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="bg-background border border-primary w-full max-w-4xl max-h-[90vh] flex flex-col relative shadow-[16px_16px_0px_0px_#d4aa27]"
            >
              <div className="flex items-center justify-between border-b border-white/10 p-6 shrink-0">
                <div className="flex items-center gap-4">
                  <Unlock className="w-6 h-6 text-primary" />
                  <h3 className="text-2xl font-black font-poppins uppercase tracking-tighter">System Console</h3>
                </div>
                <button
                  onClick={() => setIsAdminPanelOpen(false)}
                  className="text-white/50 hover:text-primary"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="flex border-b border-white/10 shrink-0">
                <button
                  onClick={() => setAdminTab("ADD")}
                  className={`flex-1 py-4 font-code text-xs font-bold uppercase tracking-widest border-r border-white/10 transition-colors ${
                    adminTab === "ADD" ? "bg-primary text-black" : "text-white/50 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  Add New Document
                </button>
                <button
                  onClick={() => setAdminTab("MANAGE")}
                  className={`flex-1 py-4 font-code text-xs font-bold uppercase tracking-widest transition-colors ${
                    adminTab === "MANAGE" ? "bg-primary text-black" : "text-white/50 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  Manage Database
                </button>
              </div>

              <div className="p-6 md:p-8 overflow-y-auto">
                {adminTab === "ADD" ? (
                  <form onSubmit={handleAddNote} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="font-code text-[10px] text-primary uppercase tracking-widest">Document Name</label>
                        <input
                          type="text"
                          required
                          value={newNote.name}
                          onChange={(e) => setNewNote({ ...newNote, name: e.target.value })}
                          className="w-full bg-white/5 border border-white/10 text-white font-code text-xs px-4 py-3 focus:outline-none focus:border-primary"
                          placeholder="e.g. Advanced Data Structures"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="font-code text-[10px] text-primary uppercase tracking-widest">Subject Code</label>
                        <input
                          type="text"
                          required
                          value={newNote.code}
                          onChange={(e) => setNewNote({ ...newNote, code: e.target.value })}
                          className="w-full bg-white/5 border border-white/10 text-white font-code text-xs px-4 py-3 focus:outline-none focus:border-primary"
                          placeholder="e.g. CS255"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="font-code text-[10px] text-primary uppercase tracking-widest">Year</label>
                        <select
                          required
                          value={newNote.year}
                          onChange={(e) => setNewNote({ ...newNote, year: Number(e.target.value) as Year })}
                          className="w-full bg-white/5 border border-white/10 text-white font-code text-xs px-4 py-3 focus:outline-none focus:border-primary"
                        >
                          {years.map((y) => (
                            <option key={y} value={y} className="bg-[#121212]">Year {y}</option>
                          ))}
                        </select>
                      </div>
                      <div className="space-y-2">
                        <label className="font-code text-[10px] text-primary uppercase tracking-widest">Semester</label>
                        <select
                          required
                          value={newNote.semester}
                          onChange={(e) => setNewNote({ ...newNote, semester: Number(e.target.value) as Semester })}
                          className="w-full bg-white/5 border border-white/10 text-white font-code text-xs px-4 py-3 focus:outline-none focus:border-primary"
                        >
                          {semesters.map((s) => (
                            <option key={s} value={s} className="bg-[#121212]">Semester {s}</option>
                          ))}
                        </select>
                      </div>
                      <div className="space-y-2">
                        <label className="font-code text-[10px] text-primary uppercase tracking-widest">Branch</label>
                        <select
                          required
                          value={newNote.branch}
                          onChange={(e) => setNewNote({ ...newNote, branch: e.target.value })}
                          className="w-full bg-white/5 border border-white/10 text-white font-code text-xs px-4 py-3 focus:outline-none focus:border-primary"
                        >
                          {branches.map((b) => (
                            <option key={b} value={b} className="bg-[#121212]">{b}</option>
                          ))}
                        </select>
                      </div>
                      
                      {/* --- REPLACED FILE UPLOAD WITH LINK INPUT FOR PERSISTENCE --- */}
                      <div className="space-y-2">
  <label className="font-code text-[10px] text-primary uppercase tracking-widest">
    PDF Link (Google Drive / URL)
  </label>
  <input
    type="url"
    required
    value={newNote.pdfUrl}
    onChange={(e) => setNewNote({ ...newNote, pdfUrl: e.target.value })}
    className="w-full bg-white/5 border border-white/10 text-white font-code text-xs px-4 py-3 focus:outline-none focus:border-primary"
    placeholder="https://drive.google.com/file/..."
  />
</div>
                    </div>
                    <div className="space-y-2">
                      <label className="font-code text-[10px] text-primary uppercase tracking-widest">Description (Optional)</label>
                      <textarea
                        value={newNote.description}
                        onChange={(e) => setNewNote({ ...newNote, description: e.target.value })}
                        className="w-full bg-white/5 border border-white/10 text-white font-code text-xs px-4 py-3 focus:outline-none focus:border-primary h-24 resize-none"
                        placeholder="Brief details about the document contents..."
                      />
                    </div>
                    <button
                      type="submit"
                      className="flex items-center justify-center gap-2 w-full bg-primary text-black font-black font-code uppercase tracking-widest py-4 hover:bg-white transition-colors mt-8"
                    >
                      <Plus className="w-4 h-4" /> UPLOAD TO SYSTEM
                    </button>
                  </form>
                ) : (
                  <div className="space-y-8">
                    {/* Database Export Utility */}
                    <div className="flex justify-between items-center bg-primary/10 border border-primary/20 p-4">
                      <div>
                        <h4 className="font-poppins font-bold uppercase text-primary text-sm">Database Export</h4>
                        <p className="font-code text-[10px] text-white/50">Download the updated JSON to permanently commit to code.</p>
                      </div>
                      <button 
                        onClick={handleExportDatabase}
                        className="flex items-center gap-2 bg-primary text-black px-4 py-2 font-code text-xs font-bold uppercase tracking-widest hover:bg-white transition-colors"
                      >
                        <Save className="w-3.5 h-3.5" /> Export DB
                      </button>
                    </div>

                    {localSubjects.length === 0 ? (
                      <p className="text-muted-foreground font-code text-sm text-center py-8">
                        No documents in database.
                      </p>
                    ) : (
                      groupedSubjects.sortedBranches.map((branch) => (
                        <div key={branch} className="space-y-3">
                          {/* Branch Header */}
                          <div className="border-b border-primary/30 pb-2 mb-4">
                            <h4 className="font-poppins font-black text-primary text-2xl uppercase tracking-tighter">
                              {branch} <span className="text-white/20 text-sm ml-2 font-code tracking-widest">[{groupedSubjects.groups[branch].length} DOCS]</span>
                            </h4>
                          </div>

                          {/* Notes for this Branch */}
                          <div className="space-y-2">
                            {groupedSubjects.groups[branch].map((subject) => (
                              <div
                                key={subject.id}
                                className="flex items-center justify-between bg-white/5 border border-white/10 p-4 hover:border-primary/50 transition-colors group"
                              >
                                <div>
                                  <h4 className="font-poppins font-bold uppercase group-hover:text-primary transition-colors">
                                    {subject.name}
                                  </h4>
                                  <span className="font-code text-[10px] text-white/50 uppercase tracking-widest">
                                    {subject.code} // Y{subject.year} // S{subject.semester}
                                  </span>
                                </div>
                                <button
                                  onClick={() => handleDeleteNote(subject.id)}
                                  className="w-10 h-10 shrink-0 bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-black flex items-center justify-center transition-colors ml-4"
                                  title="Delete Document"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer Info Bars */}
      <section className="border-t border-white/10 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/10 border border-white/10">
            {[
              { label: "TOTAL_SUBJECTS", value: localSubjects.length },
              { label: "BRANCHES", value: branches.length },
              { label: "YEARS_COVERED", value: years.length },
              { label: "SEMESTERS", value: semesters.length },
            ].map((stat, i) => (
              <div key={i} className="bg-background p-8 text-center">
                <div className="text-4xl font-black font-poppins text-primary mb-2">{stat.value}</div>
                <div className="font-code text-[9px] text-white/30 tracking-widest uppercase">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default NotesLibrary;
