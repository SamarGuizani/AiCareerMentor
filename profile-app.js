function ProfileApp() {
  try {
    const [profile, setProfile] = React.useState({
      name: "John Doe",
      email: "john.doe@example.com",
      phone: "+1 (555) 123-4567",
      location: "San Francisco, CA",
      currentRole: "Junior Developer",
      experience: "2 years"
    });

    const [skills, setSkills] = React.useState([
      { name: "JavaScript", level: 75 },
      { name: "React", level: 60 },
      { name: "HTML/CSS", level: 85 },
      { name: "Git", level: 70 }
    ]);

    const handleProfileUpdate = (updatedProfile) => {
      setProfile(updatedProfile);
      // TODO: Integrate with Laravel backend API
      // Example: await fetch('/api/profile', { method: 'PUT', body: JSON.stringify(updatedProfile) })
    };

    const handleSkillUpdate = (updatedSkills) => {
      setSkills(updatedSkills);
      // TODO: Integrate with Laravel backend API
    };

    return (
      <div className="min-h-screen" data-name="profile-app" data-file="profile-app.js">
        <Header />
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold text-[var(--text-dark)] mb-8">
              My Profile
            </h1>
            
            <div className="space-y-8">
              <ProfileForm profile={profile} onUpdate={handleProfileUpdate} />
              <SkillsManager skills={skills} onUpdate={handleSkillUpdate} />
            </div>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('ProfileApp component error:', error);
    return null;
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<ProfileApp />);
