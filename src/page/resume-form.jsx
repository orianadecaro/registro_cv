import { useState, useEffect } from "react";
import "../index.css";

export default function ResumeForm({
  onSubmit,
  resumeToEdit = null,
  onCancel,
}) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [photo, setPhoto] = useState("");
  const [education, setEducation] = useState([
    { id: "1", degree: "", institution: "", graduationYear: "" },
  ]);
  const [experience, setExperience] = useState([
    {
      id: "1",
      company: "",
      position: "",
      startDate: "",
      endDate: "",
      description: "",
    },
  ]);

  useEffect(() => {
    if (resumeToEdit) {
      setFullName(resumeToEdit.fullName);
      setEmail(resumeToEdit.email);
      setPhone(resumeToEdit.phone);
      setPhoto(resumeToEdit.photo || "");

      if (resumeToEdit.education && resumeToEdit.education.length > 0) {
        setEducation(resumeToEdit.education);
      }

      if (resumeToEdit.experience && resumeToEdit.experience.length > 0) {
        setExperience(resumeToEdit.experience);
      }
    } else {
      setFullName("");
      setEmail("");
      setPhone("");
      setPhoto("");
      setEducation([
        { id: "1", degree: "", institution: "", graduationYear: "" },
      ]);
      setExperience([
        {
          id: "1",
          company: "",
          position: "",
          startDate: "",
          endDate: "",
          description: "",
        },
      ]);
    }
  }, [resumeToEdit]);

  const handlePhotoChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhoto(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const addEducation = () => {
    setEducation([
      ...education,
      {
        id: Date.now().toString(),
        degree: "",
        institution: "",
        graduationYear: "",
      },
    ]);
  };

  const updateEducation = (id, field, value) => {
    setEducation(
      education.map((edu) => (edu.id === id ? { ...edu, [field]: value } : edu))
    );
  };

  const removeEducation = (id) => {
    if (education.length > 1) {
      setEducation(education.filter((edu) => edu.id !== id));
    }
  };

  const addExperience = () => {
    setExperience([
      ...experience,
      {
        id: Date.now().toString(),
        company: "",
        position: "",
        startDate: "",
        endDate: "",
        description: "",
      },
    ]);
  };

  const updateExperience = (id, field, value) => {
    setExperience(
      experience.map((exp) =>
        exp.id === id ? { ...exp, [field]: value } : exp
      )
    );
  };

  const removeExperience = (id) => {
    if (experience.length > 1) {
      setExperience(experience.filter((exp) => exp.id !== id));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!fullName || !email || !phone) {
      alert(
        "Por favor complete los campos obligatorios: nombre, email y teléfono"
      );
      return;
    }

    const resumeData = {
      id: resumeToEdit ? resumeToEdit.id : Date.now().toString(),
      fullName,
      email,
      phone,
      photo,
      education,
      experience,
    };

    onSubmit(resumeData);
  };

  return (
    <form onSubmit={handleSubmit} className="resume-form">
      <div className="card">
        <div className="card-content">
          <h2 className="section-title">
            {resumeToEdit
              ? "Editar Información Personal"
              : "Información Personal"}
          </h2>

          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="fullName">Nombre Completo *</label>
              <input
                id="fullName"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Correo Electrónico *</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label htmlFor="phone">Número de Teléfono *</label>
              <input
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label htmlFor="photo">Foto</label>
              <input
                id="photo"
                type="file"
                accept="image/*"
                onChange={handlePhotoChange}
                className="form-input"
              />
              {photo && (
                <div className="photo-preview">
                  <img src={photo || "/placeholder.svg"} alt="Vista previa" />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-content">
          <div className="section-header">
            <h2 className="section-title">Educación</h2>
            <button
              type="button"
              onClick={addEducation}
              className="button button-outline"
            >
              + Agregar Educación
            </button>
          </div>

          {education.map((edu, index) => (
            <div key={edu.id} className="form-section">
              <div className="section-header">
                <h3 className="subsection-title">Educación {index + 1}</h3>
                <button
                  type="button"
                  onClick={() => removeEducation(edu.id)}
                  className="button button-icon"
                  disabled={education.length <= 1}
                >
                  🗑️
                </button>
              </div>

              <div className="form-grid">
                <div className="form-group">
                  <label htmlFor={`degree-${edu.id}`}>Título</label>
                  <input
                    id={`degree-${edu.id}`}
                    value={edu.degree}
                    onChange={(e) =>
                      updateEducation(edu.id, "degree", e.target.value)
                    }
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor={`institution-${edu.id}`}>Institución</label>
                  <input
                    id={`institution-${edu.id}`}
                    value={edu.institution}
                    onChange={(e) =>
                      updateEducation(edu.id, "institution", e.target.value)
                    }
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor={`graduationYear-${edu.id}`}>
                    Año de Graduación
                  </label>
                  <input
                    id={`graduationYear-${edu.id}`}
                    value={edu.graduationYear}
                    onChange={(e) =>
                      updateEducation(edu.id, "graduationYear", e.target.value)
                    }
                    className="form-input"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="card">
        <div className="card-content">
          <div className="section-header">
            <h2 className="section-title">Experiencia Laboral</h2>
            <button
              type="button"
              onClick={addExperience}
              className="button button-outline"
            >
              + Agregar Experiencia
            </button>
          </div>

          {experience.map((exp, index) => (
            <div key={exp.id} className="form-section">
              <div className="section-header">
                <h3 className="subsection-title">Experiencia {index + 1}</h3>
                <button
                  type="button"
                  onClick={() => removeExperience(exp.id)}
                  className="button button-icon"
                  disabled={experience.length <= 1}
                >
                  🗑️
                </button>
              </div>

              <div className="form-grid">
                <div className="form-group">
                  <label htmlFor={`company-${exp.id}`}>Empresa</label>
                  <input
                    id={`company-${exp.id}`}
                    value={exp.company}
                    onChange={(e) =>
                      updateExperience(exp.id, "company", e.target.value)
                    }
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor={`position-${exp.id}`}>Cargo</label>
                  <input
                    id={`position-${exp.id}`}
                    value={exp.position}
                    onChange={(e) =>
                      updateExperience(exp.id, "position", e.target.value)
                    }
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor={`startDate-${exp.id}`}>Fecha de Inicio</label>
                  <input
                    id={`startDate-${exp.id}`}
                    type="date"
                    value={exp.startDate}
                    onChange={(e) =>
                      updateExperience(exp.id, "startDate", e.target.value)
                    }
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor={`endDate-${exp.id}`}>Fecha de Fin</label>
                  <input
                    id={`endDate-${exp.id}`}
                    type="date"
                    value={exp.endDate}
                    onChange={(e) =>
                      updateExperience(exp.id, "endDate", e.target.value)
                    }
                    className="form-input"
                  />
                </div>

                <div className="form-group full-width">
                  <label htmlFor={`description-${exp.id}`}>
                    Descripción de Responsabilidades
                  </label>
                  <textarea
                    id={`description-${exp.id}`}
                    value={exp.description}
                    onChange={(e) =>
                      updateExperience(exp.id, "description", e.target.value)
                    }
                    rows={3}
                    className="form-textarea"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="form-actions">
        {onCancel && (
          <button
            type="button"
            className="button button-outline"
            onClick={onCancel}
          >
            Cancelar
          </button>
        )}
        <button type="submit" className="button button-primary">
          {resumeToEdit ? "Actualizar Currículo" : "Guardar Currículo"}
        </button>
      </div>
    </form>
  );
}
