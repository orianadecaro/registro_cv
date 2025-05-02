"use client";

import { ArrowLeft, Trash2 } from "lucide-react";

export default function ResumeDetail({ resume, onBack, onDelete }) {
  return (
    <div className="resume-container">
      <div className="header-actions">
        <button onClick={onBack} className="back-button">
          <ArrowLeft className="icon" />
          Volver a la lista
        </button>
        <button
          onClick={() => {
            if (
              window.confirm(
                "¿Estás seguro de que deseas eliminar este currículo?"
              )
            ) {
              onDelete();
            }
          }}
          className="delete-button"
        >
          <Trash2 className="icon" />
          Eliminar cv
        </button>
      </div>

      <div className="section">
        <h2 className="section-title">Información Personal</h2>
        <div className="personal-info-grid">
          {resume.photo && (
            <div className="photo-wrapper">
              <img
                src={resume.photo || "/placeholder.svg"}
                alt={resume.fullName}
                className="profile-photo"
              />
            </div>
          )}
          <div className="details">
            <h2 className="full-name">{resume.fullName}</h2>
            <div className="contact-grid">
              <div>
                <p className="label">Correo electrónico</p>
                <p>{resume.email}</p>
              </div>
              <div>
                <p className="label">Teléfono</p>
                <p>{resume.phone}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="section">
        <h2 className="section-title">Educación</h2>
        {resume.education.length === 0 ? (
          <p className="empty-text">
            No hay información de educación registrada.
          </p>
        ) : (
          <div className="info-list">
            {resume.education.map((edu) => (
              <div key={edu.id} className="info-card">
                <h3 className="info-title">{edu.degree}</h3>
                <p>{edu.institution}</p>
                <p className="info-subtext">
                  Año de graduación: {edu.graduationYear}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="section">
        <h2 className="section-title">Experiencia Laboral</h2>
        {resume.experience.length === 0 ? (
          <p className="empty-text">
            No hay información de experiencia laboral registrada.
          </p>
        ) : (
          <div className="info-list">
            {resume.experience.map((exp) => (
              <div key={exp.id} className="info-card">
                <div className="experience-header">
                  <h3 className="info-title">{exp.position}</h3>
                  <p className="info-subtext">
                    {exp.startDate} - {exp.endDate || "Presente"}
                  </p>
                </div>
                <p className="company-name">{exp.company}</p>
                <p className="description">{exp.description}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
