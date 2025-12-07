function SkillsManager({ skills, onUpdate }) {
  try {
    const [newSkill, setNewSkill] = React.useState("");
    const [newLevel, setNewLevel] = React.useState(50);

    const handleAddSkill = () => {
      if (newSkill.trim()) {
        const updatedSkills = [...skills, { name: newSkill, level: newLevel }];
        onUpdate(updatedSkills);
        setNewSkill("");
        setNewLevel(50);
      }
    };

    const handleRemoveSkill = (index) => {
      const updatedSkills = skills.filter((_, i) => i !== index);
      onUpdate(updatedSkills);
    };

    return (
      <div className="card" data-name="skills-manager" data-file="components/SkillsManager.js">
        <h2 className="text-2xl font-bold text-[var(--text-dark)] mb-6">
          Skills & Progress
        </h2>

        <div className="space-y-4 mb-6">
          {skills.map((skill, index) => (
            <div key={index} className="border-b border-gray-200 pb-4">
              <div className="flex justify-between items-center mb-2">
                <span className="font-semibold text-[var(--text-dark)]">
                  {skill.name}
                </span>
                <div className="flex items-center gap-3">
                  <span className="text-sm text-[var(--text-light)]">
                    {skill.level}%
                  </span>
                  <button
                    onClick={() => handleRemoveSkill(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <div className="icon-x text-lg"></div>
                  </button>
                </div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-[var(--primary-color)] to-[var(--secondary-color)] h-2 rounded-full"
                  style={{ width: `${skill.level}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-200 pt-6">
          <h3 className="text-lg font-semibold text-[var(--text-dark)] mb-4">
            Add New Skill
          </h3>
          <div className="flex flex-col md:flex-row gap-4">
            <input
              type="text"
              placeholder="Skill name"
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              className="input-field flex-grow"
            />
            <div className="flex items-center gap-4">
              <input
                type="range"
                min="0"
                max="100"
                value={newLevel}
                onChange={(e) => setNewLevel(parseInt(e.target.value))}
                className="w-32"
              />
              <span className="text-sm text-[var(--text-light)] w-12">
                {newLevel}%
              </span>
              <button onClick={handleAddSkill} className="btn-primary whitespace-nowrap">
                Add Skill
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('SkillsManager component error:', error);
    return null;
  }
}
