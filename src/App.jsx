import { useState, useEffect } from "react";
import ResumeList from "./page/resume-list";
import ResumeForm from "./page/resume-form";
import ResumeDetail from "./page/resume-detail";
import "./index.css";
import SearchFilter from "./components/search-filter";

function App() {
  const [resumes, setResumes] = useState([]);
  const [selectedResume, setSelectedResume] = useState(null);
  const [filteredResumes, setFilteredResumes] = useState([]);
  const [activeTab, setActiveTab] = useState("list");

  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const storedResumes = localStorage.getItem("resumes");
    if (storedResumes) {
      setResumes(JSON.parse(storedResumes));
      setFilteredResumes(JSON.parse(storedResumes));
    }
  }, []);
  useEffect(() => {
    if (resumes.length > 0) {
      localStorage.setItem("resumes", JSON.stringify(resumes));
      setFilteredResumes(resumes);
    }
  }, [resumes]);

  const handleAddResume = (newResume) => {
    if (isEditing) {
      setResumes(
        resumes.map((resume) =>
          resume.id === selectedResume.id
            ? { ...newResume, id: selectedResume.id }
            : resume
        )
      );
      setIsEditing(false);
      setSelectedResume(null);
    } else {
      setResumes([...resumes, { ...newResume, id: Date.now().toString() }]);
    }
    setActiveTab("list");
  };

  const handleViewResume = (resume) => {
    setSelectedResume(resume);
    setActiveTab("detail");
  };

  const handleEditResume = (resume) => {
    setSelectedResume(resume);
    setIsEditing(true);
    setActiveTab("add");
  };

  const handleDeleteResume = (id) => {
    setResumes(resumes.filter((resume) => resume.id !== id));
    if (selectedResume && selectedResume.id === id) {
      setSelectedResume(null);
      setActiveTab("list");
    }
  };

  const handleSearch = (searchTerm, filters) => {
    if (!searchTerm && Object.keys(filters).length === 0) {
      setFilteredResumes(resumes);
      return;
    }

    let filtered = resumes;

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (resume) =>
          resume.fullName.toLowerCase().includes(term) ||
          resume.email.toLowerCase().includes(term) ||
          resume.education.some(
            (edu) =>
              edu.degree.toLowerCase().includes(term) ||
              edu.institution.toLowerCase().includes(term)
          ) ||
          resume.experience.some(
            (exp) =>
              exp.company.toLowerCase().includes(term) ||
              exp.position.toLowerCase().includes(term) ||
              exp.description.toLowerCase().includes(term)
          )
      );
    }

    if (filters.educationLevel && filters.educationLevel !== "all") {
      filtered = filtered.filter((resume) =>
        resume.education.some((edu) =>
          edu.degree
            .toLowerCase()
            .includes(filters.educationLevel.toLowerCase())
        )
      );
    }

    if (filters.experienceYears && filters.experienceYears !== "all") {
      const minYears = Number.parseInt(filters.experienceYears);
      filtered = filtered.filter((resume) => {
        const totalExperience = resume.experience.reduce((total, exp) => {
          const startDate = new Date(exp.startDate);
          const endDate = exp.endDate ? new Date(exp.endDate) : new Date();
          const years =
            (endDate.getTime() - startDate.getTime()) /
            (1000 * 60 * 60 * 24 * 365);
          return total + years;
        }, 0);
        return totalExperience >= minYears;
      });
    }

    setFilteredResumes(filtered);
  };

  const handleBackToList = () => {
    setActiveTab("list");
    setSelectedResume(null);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setSelectedResume(null);
    setActiveTab("list");
  };

  return (
    <main className="container">
      <h1 className="app-title">Registro de Currículos</h1>

      <div className="tabs">
        <button
          className={`tab-button ${activeTab === "list" ? "active" : ""}`}
          onClick={() => setActiveTab("list")}
        >
          Lista de Currículos
        </button>
        <button
          className={`tab-button ${activeTab === "add" ? "active" : ""}`}
          onClick={() => {
            setIsEditing(false);
            setSelectedResume(null);
            setActiveTab("add");
          }}
        >
          {isEditing ? "Editar Currículo" : "Agregar Currículo"}
        </button>
        <button
          className={`tab-button ${activeTab === "detail" ? "active" : ""}`}
          onClick={() => setActiveTab("detail")}
          disabled={!selectedResume}
        >
          Detalles del Currículo
        </button>
      </div>

      <div className="tab-content">
        {activeTab === "list" && (
          <div className="tab-panel">
            <SearchFilter onSearch={handleSearch} />
            <ResumeList
              resumes={filteredResumes}
              onViewResume={handleViewResume}
              onEditResume={handleEditResume}
              onDeleteResume={handleDeleteResume}
            />
          </div>
        )}

        {activeTab === "add" && (
          <div className="tab-panel">
            <ResumeForm
              onSubmit={handleAddResume}
              resumeToEdit={isEditing ? selectedResume : null}
              onCancel={handleCancelEdit}
            />
          </div>
        )}

        {activeTab === "detail" && selectedResume && (
          <div className="tab-panel">
            <ResumeDetail
              resume={selectedResume}
              onBack={handleBackToList}
              onDelete={() => handleDeleteResume(selectedResume.id)}
              onEdit={() => handleEditResume(selectedResume)}
            />
          </div>
        )}
      </div>
    </main>
  );
}

export default App;
