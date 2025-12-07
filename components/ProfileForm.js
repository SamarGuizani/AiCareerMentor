function ProfileForm({ profile, onUpdate }) {
  try {
    const [isEditing, setIsEditing] = React.useState(false);
    const [formData, setFormData] = React.useState(profile);

    const handleChange = (e) => {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value
      });
    };

    const handleSave = () => {
      onUpdate(formData);
      setIsEditing(false);
    };

    const handleCancel = () => {
      setFormData(profile);
      setIsEditing(false);
    };

    return (
      <div className="card" data-name="profile-form" data-file="components/ProfileForm.js">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-[var(--text-dark)]">
            Personal Information
          </h2>
          {!isEditing && (
            <button 
              onClick={() => setIsEditing(true)}
              className="flex items-center gap-2 text-[var(--primary-color)] hover:opacity-80"
            >
              <div className="icon-edit text-lg"></div>
              Edit
            </button>
          )}
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-[var(--text-dark)] mb-2">
              Full Name
            </label>
            {isEditing ? (
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="input-field"
              />
            ) : (
              <p className="text-[var(--text-light)]">{profile.name}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-[var(--text-dark)] mb-2">
              Email
            </label>
            {isEditing ? (
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="input-field"
              />
            ) : (
              <p className="text-[var(--text-light)]">{profile.email}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-[var(--text-dark)] mb-2">
              Phone
            </label>
            {isEditing ? (
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="input-field"
              />
            ) : (
              <p className="text-[var(--text-light)]">{profile.phone}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-[var(--text-dark)] mb-2">
              Location
            </label>
            {isEditing ? (
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="input-field"
              />
            ) : (
              <p className="text-[var(--text-light)]">{profile.location}</p>
            )}
          </div>
        </div>

        {isEditing && (
          <div className="flex gap-4 mt-6">
            <button onClick={handleSave} className="btn-primary">
              Save Changes
            </button>
            <button 
              onClick={handleCancel}
              className="px-6 py-3 bg-gray-200 text-[var(--text-dark)] rounded-lg font-semibold hover:bg-gray-300"
            >
              Cancel
            </button>
          </div>
        )}
      </div>
    );
  } catch (error) {
    console.error('ProfileForm component error:', error);
    return null;
  }
}
