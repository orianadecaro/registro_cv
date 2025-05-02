import "../index.css";

export default function ResumeList({
  resumes,
  onViewResume,
  onDeleteResume,
  onEditResume,
}) {
  if (resumes.length === 0) {
    return (
      <div className="empty-state">
        <p>No hay currículos registrados. Agrega uno nuevo para comenzar.</p>
      </div>
    );
  }

  return (
    <div className="resume-list">
      {resumes.map((resume) => (
        <div key={resume.id} className="resume-card">
          <div className="resume-card-content">
            <div className="resume-info">
              <div className="resume-avatar">
                {resume.photo ? (
                  <img
                    src={resume.photo || "/placeholder.svg"}
                    alt={resume.fullName}
                  />
                ) : (
                  <div className="avatar-placeholder">
                    <span>{resume.fullName.charAt(0)}</span>
                  </div>
                )}
              </div>

              <div className="resume-details">
                <h3>{resume.fullName}</h3>
                <p>{resume.email}</p>
              </div>
            </div>

            <div className="resume-actions">
              <button
                className="button button-text"
                onClick={() => onViewResume(resume)}
              >
                👁️ Ver
              </button>
              <button
                className="button button-text"
                onClick={() => onEditResume(resume)}
              >
                ✏️ Editar
              </button>
              <button
                className="button button-text"
                onClick={() => {
                  if (
                    window.confirm(
                      "¿Estás seguro de que deseas eliminar este currículo?"
                    )
                  ) {
                    onDeleteResume(resume.id);
                  }
                }}
              >
                🗑️ Eliminar
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
