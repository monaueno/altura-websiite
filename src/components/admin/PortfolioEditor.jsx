import { useState } from 'react';

function generateSlug(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

function PortfolioEditor({ formData, setFormData }) {
  const [editingId, setEditingId] = useState(null);
  const projects = formData._portfolio || [];
  const heroData = formData._portfolioHero || { title: '', subtitle: '' };
  const mountainData = formData._portfolioMountain || { title: '', subtitle: '' };

  const updateProjects = (newProjects) => {
    setFormData(prev => ({ ...prev, _portfolio: newProjects }));
  };

  const updateHero = (key, value) => {
    setFormData(prev => ({ ...prev, _portfolioHero: { ...prev._portfolioHero, [key]: value } }));
  };

  const updateMountain = (key, value) => {
    setFormData(prev => ({ ...prev, _portfolioMountain: { ...prev._portfolioMountain, [key]: value } }));
  };

  const addProject = () => {
    const newProject = {
      id: Date.now().toString(),
      slug: '',
      title: '',
      image: '',
      tagline: '',
      shortDescription: '',
      strategyBullets: [],
      metrics: [],
    };
    updateProjects([...projects, newProject]);
    setEditingId(newProject.id);
  };

  const deleteProject = (id) => {
    const project = projects.find(p => p.id === id);
    if (window.confirm(`Delete "${project?.title || 'Untitled'}"? This cannot be undone.`)) {
      updateProjects(projects.filter(p => p.id !== id));
      if (editingId === id) setEditingId(null);
    }
  };

  const updateProject = (id, key, value) => {
    updateProjects(projects.map(p => {
      if (p.id !== id) return p;
      const updated = { ...p, [key]: value };
      if (key === 'title') {
        let slug = generateSlug(value);
        const others = projects.filter(o => o.id !== id);
        let suffix = 2;
        let candidate = slug;
        while (others.some(o => o.slug === candidate)) {
          candidate = `${slug}-${suffix++}`;
        }
        updated.slug = candidate;
      }
      return updated;
    }));
  };

  // Strategy bullet helpers
  const addBullet = (projectId) => {
    updateProjects(projects.map(p => {
      if (p.id !== projectId) return p;
      return { ...p, strategyBullets: [...(p.strategyBullets || []), { title: '', description: '' }] };
    }));
  };

  const updateBullet = (projectId, idx, key, value) => {
    updateProjects(projects.map(p => {
      if (p.id !== projectId) return p;
      const bullets = [...p.strategyBullets];
      bullets[idx] = { ...bullets[idx], [key]: value };
      return { ...p, strategyBullets: bullets };
    }));
  };

  const removeBullet = (projectId, idx) => {
    updateProjects(projects.map(p => {
      if (p.id !== projectId) return p;
      return { ...p, strategyBullets: p.strategyBullets.filter((_, i) => i !== idx) };
    }));
  };

  // Metric helpers
  const addMetric = (projectId) => {
    updateProjects(projects.map(p => {
      if (p.id !== projectId) return p;
      return {
        ...p,
        metrics: [...(p.metrics || []), {
          label: '',
          value: '',
          industryLabel: 'INDUSTRY STANDARD',
          industryContext: '',
          benchmarks: [],
        }],
      };
    }));
  };

  const updateMetric = (projectId, idx, key, value) => {
    updateProjects(projects.map(p => {
      if (p.id !== projectId) return p;
      const metrics = [...p.metrics];
      metrics[idx] = { ...metrics[idx], [key]: value };
      return { ...p, metrics };
    }));
  };

  const removeMetric = (projectId, idx) => {
    updateProjects(projects.map(p => {
      if (p.id !== projectId) return p;
      return { ...p, metrics: p.metrics.filter((_, i) => i !== idx) };
    }));
  };

  // Benchmark helpers
  const addBenchmark = (projectId, metricIdx) => {
    updateProjects(projects.map(p => {
      if (p.id !== projectId) return p;
      const metrics = [...p.metrics];
      metrics[metricIdx] = {
        ...metrics[metricIdx],
        benchmarks: [...(metrics[metricIdx].benchmarks || []), { level: '', range: '', bold: false }],
      };
      return { ...p, metrics };
    }));
  };

  const updateBenchmark = (projectId, metricIdx, bmIdx, key, value) => {
    updateProjects(projects.map(p => {
      if (p.id !== projectId) return p;
      const metrics = [...p.metrics];
      const benchmarks = [...metrics[metricIdx].benchmarks];
      benchmarks[bmIdx] = { ...benchmarks[bmIdx], [key]: value };
      metrics[metricIdx] = { ...metrics[metricIdx], benchmarks };
      return { ...p, metrics };
    }));
  };

  const removeBenchmark = (projectId, metricIdx, bmIdx) => {
    updateProjects(projects.map(p => {
      if (p.id !== projectId) return p;
      const metrics = [...p.metrics];
      metrics[metricIdx] = {
        ...metrics[metricIdx],
        benchmarks: metrics[metricIdx].benchmarks.filter((_, i) => i !== bmIdx),
      };
      return { ...p, metrics };
    }));
  };

  const inputClass = "w-full px-3.5 py-2.5 border border-near-black/[0.06] rounded-lg font-body text-[0.95rem] text-near-black bg-white outline-none transition-all duration-150 focus:border-accent focus:ring-1 focus:ring-accent/15 placeholder:text-near-black/30 hover:border-near-black/[0.12]";

  const editingProject = projects.find(p => p.id === editingId);

  // Edit view
  if (editingProject) {
    return (
      <div className="animate-[fadeIn_0.3s_ease-out]">
        <button
          onClick={() => setEditingId(null)}
          className="flex items-center gap-2 mb-8 text-[0.9rem] font-medium text-near-black/50 hover:text-near-black transition-colors bg-transparent border-none cursor-pointer"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to all projects
        </button>

        <div className="mb-10">
          <h2 className="font-display text-[1.75rem] font-semibold text-near-black tracking-tight">
            {editingProject.title || 'New Project'}
          </h2>
        </div>

        {/* Basic Info */}
        <div className="bg-white border border-near-black/[0.04] rounded-lg p-7 mb-5 shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
          <h3 className="text-[0.9rem] font-semibold text-near-black mb-6">Basic Info</h3>

          <div className="mb-5">
            <label className="block text-[0.85rem] font-medium text-near-black/70 mb-2.5">Title</label>
            <input type="text" value={editingProject.title} onChange={(e) => updateProject(editingProject.id, 'title', e.target.value)} placeholder="Project title" className={inputClass} />
          </div>
          <div className="mb-5">
            <label className="block text-[0.85rem] font-medium text-near-black/70 mb-2.5">Slug <span className="text-near-black/30">(auto-generated)</span></label>
            <input type="text" value={editingProject.slug} onChange={(e) => updateProject(editingProject.id, 'slug', e.target.value)} className={`${inputClass} bg-[#FAFAFA] text-near-black/60`} />
          </div>
          <div className="mb-5">
            <label className="block text-[0.85rem] font-medium text-near-black/70 mb-2.5">Tagline</label>
            <input type="text" value={editingProject.tagline || ''} onChange={(e) => updateProject(editingProject.id, 'tagline', e.target.value)} placeholder="A short catchy line" className={inputClass} />
          </div>
          <div className="mb-5">
            <label className="block text-[0.85rem] font-medium text-near-black/70 mb-2.5">Short Description</label>
            <textarea value={editingProject.shortDescription || ''} onChange={(e) => updateProject(editingProject.id, 'shortDescription', e.target.value)} placeholder="Brief description for the card" className={`${inputClass} resize-y min-h-[80px]`} />
          </div>
          <div>
            <label className="block text-[0.85rem] font-medium text-near-black/70 mb-2.5">Image</label>
            <div className="relative border border-dashed border-near-black/[0.1] rounded-lg p-6 text-center cursor-pointer transition-all duration-150 hover:border-accent/60 hover:bg-accent/[0.03] bg-white group">
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (!file) return;
                  const reader = new FileReader();
                  reader.onload = (ev) => updateProject(editingProject.id, 'image', ev.target.result);
                  reader.readAsDataURL(file);
                }}
                className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
              />
              <svg className="w-8 h-8 mx-auto mb-2 text-near-black/25" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
              <div className="text-[0.85rem] text-near-black/60 font-medium">Click to upload</div>
            </div>
            {editingProject.image && (
              <div className="mt-3 rounded-lg overflow-hidden border border-near-black/[0.04]">
                <img src={editingProject.image} alt="Preview" className="w-full max-h-[160px] object-cover" />
              </div>
            )}
          </div>
        </div>

        {/* Strategy Bullets */}
        <div className="bg-white border border-near-black/[0.04] rounded-lg p-7 mb-5 shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-[0.9rem] font-semibold text-near-black">Strategy Bullets</h3>
            <button
              onClick={() => addBullet(editingProject.id)}
              className="flex items-center gap-1.5 px-3 py-1.5 text-[0.8rem] font-medium rounded-lg border border-near-black/[0.08] bg-transparent text-near-black/60 hover:text-near-black hover:border-near-black/20 cursor-pointer transition-all"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
              Add Bullet
            </button>
          </div>

          {(editingProject.strategyBullets || []).length === 0 ? (
            <p className="text-[0.85rem] text-near-black/40 text-center py-4">No strategy bullets yet. Click "Add Bullet" to add one.</p>
          ) : (
            <div className="space-y-4">
              {editingProject.strategyBullets.map((bullet, idx) => (
                <div key={idx} className="border border-near-black/[0.06] rounded-lg p-4">
                  <div className="flex justify-between items-start mb-3">
                    <span className="text-[0.75rem] font-medium text-near-black/40 uppercase">Bullet {idx + 1}</span>
                    <button onClick={() => removeBullet(editingProject.id, idx)} className="text-[0.75rem] text-red-400 hover:text-red-600 bg-transparent border-none cursor-pointer">Remove</button>
                  </div>
                  <input type="text" value={bullet.title} onChange={(e) => updateBullet(editingProject.id, idx, 'title', e.target.value)} placeholder="Bullet heading" className={`${inputClass} mb-3`} />
                  <textarea value={bullet.description} onChange={(e) => updateBullet(editingProject.id, idx, 'description', e.target.value)} placeholder="Description" className={`${inputClass} resize-y min-h-[60px]`} />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Metrics */}
        <div className="bg-white border border-near-black/[0.04] rounded-lg p-7 mb-5 shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-[0.9rem] font-semibold text-near-black">Performance Metrics</h3>
            <button
              onClick={() => addMetric(editingProject.id)}
              className="flex items-center gap-1.5 px-3 py-1.5 text-[0.8rem] font-medium rounded-lg border border-near-black/[0.08] bg-transparent text-near-black/60 hover:text-near-black hover:border-near-black/20 cursor-pointer transition-all"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
              Add Metric
            </button>
          </div>

          {(editingProject.metrics || []).length === 0 ? (
            <p className="text-[0.85rem] text-near-black/40 text-center py-4">No metrics yet. Click "Add Metric" to add one.</p>
          ) : (
            <div className="space-y-6">
              {editingProject.metrics.map((metric, mIdx) => (
                <div key={mIdx} className="border border-near-black/[0.06] rounded-lg p-5">
                  <div className="flex justify-between items-start mb-4">
                    <span className="text-[0.75rem] font-medium text-near-black/40 uppercase">Metric {mIdx + 1}</span>
                    <button onClick={() => removeMetric(editingProject.id, mIdx)} className="text-[0.75rem] text-red-400 hover:text-red-600 bg-transparent border-none cursor-pointer">Remove</button>
                  </div>

                  <div className="grid grid-cols-2 gap-3 mb-3">
                    <div>
                      <label className="block text-[0.8rem] text-near-black/50 mb-1">Label (e.g., ROAS)</label>
                      <input type="text" value={metric.label} onChange={(e) => updateMetric(editingProject.id, mIdx, 'label', e.target.value)} placeholder="ROAS" className={inputClass} />
                    </div>
                    <div>
                      <label className="block text-[0.8rem] text-near-black/50 mb-1">Value</label>
                      <input type="text" value={metric.value} onChange={(e) => updateMetric(editingProject.id, mIdx, 'value', e.target.value)} placeholder="6.88" className={inputClass} />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div>
                      <label className="block text-[0.8rem] text-near-black/50 mb-1">Industry Label</label>
                      <input type="text" value={metric.industryLabel} onChange={(e) => updateMetric(editingProject.id, mIdx, 'industryLabel', e.target.value)} className={inputClass} />
                    </div>
                    <div>
                      <label className="block text-[0.8rem] text-near-black/50 mb-1">Context</label>
                      <input type="text" value={metric.industryContext || ''} onChange={(e) => updateMetric(editingProject.id, mIdx, 'industryContext', e.target.value)} placeholder="(DTC eCommerce)" className={inputClass} />
                    </div>
                  </div>

                  {/* Benchmarks */}
                  <div className="ml-4 border-l-2 border-near-black/[0.06] pl-4">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[0.8rem] font-medium text-near-black/50">Benchmarks</span>
                      <button
                        onClick={() => addBenchmark(editingProject.id, mIdx)}
                        className="text-[0.75rem] text-accent hover:text-accent-dark bg-transparent border-none cursor-pointer"
                      >
                        + Add Row
                      </button>
                    </div>
                    {(metric.benchmarks || []).map((bm, bmIdx) => (
                      <div key={bmIdx} className="flex items-center gap-2 mb-2">
                        <input type="text" value={bm.level} onChange={(e) => updateBenchmark(editingProject.id, mIdx, bmIdx, 'level', e.target.value)} placeholder="AVERAGE" className="flex-1 px-2.5 py-1.5 border border-near-black/[0.06] rounded font-body text-[0.85rem] text-near-black bg-white outline-none focus:border-accent" />
                        <input type="text" value={bm.range} onChange={(e) => updateBenchmark(editingProject.id, mIdx, bmIdx, 'range', e.target.value)} placeholder="2.0 – 3.0" className="flex-1 px-2.5 py-1.5 border border-near-black/[0.06] rounded font-body text-[0.85rem] text-near-black bg-white outline-none focus:border-accent" />
                        <label className="flex items-center gap-1 text-[0.75rem] text-near-black/50 shrink-0">
                          <input type="checkbox" checked={!!bm.bold} onChange={(e) => updateBenchmark(editingProject.id, mIdx, bmIdx, 'bold', e.target.checked)} />
                          Bold
                        </label>
                        <button onClick={() => removeBenchmark(editingProject.id, mIdx, bmIdx)} className="text-red-400 hover:text-red-600 bg-transparent border-none cursor-pointer shrink-0">
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }

  // List view
  return (
    <div className="animate-[fadeIn_0.3s_ease-out]">
      <div className="mb-10">
        <h2 className="font-display text-[1.75rem] font-semibold text-near-black mb-3 tracking-tight">
          Portfolio
        </h2>
        <p className="text-[0.95rem] text-near-black/50 leading-relaxed">
          Manage your portfolio projects and section text.
        </p>
      </div>

      {/* Portfolio Hero Text */}
      <div className="bg-white border border-near-black/[0.04] rounded-lg p-7 mb-5 shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
        <h3 className="text-[0.9rem] font-semibold text-near-black mb-4">Portfolio Page Header</h3>
        <div className="mb-4">
          <label className="block text-[0.85rem] font-medium text-near-black/70 mb-2">Title</label>
          <input type="text" value={heroData.title || ''} onChange={(e) => updateHero('title', e.target.value)} className={inputClass} />
        </div>
        <div>
          <label className="block text-[0.85rem] font-medium text-near-black/70 mb-2">Subtitle</label>
          <input type="text" value={heroData.subtitle || ''} onChange={(e) => updateHero('subtitle', e.target.value)} className={inputClass} />
        </div>
      </div>

      {/* Case Studies Text */}
      <div className="bg-white border border-near-black/[0.04] rounded-lg p-7 mb-8 shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
        <h3 className="text-[0.9rem] font-semibold text-near-black mb-4">Case Studies Section</h3>
        <div className="mb-4">
          <label className="block text-[0.85rem] font-medium text-near-black/70 mb-2">Title</label>
          <input type="text" value={mountainData.title || ''} onChange={(e) => updateMountain('title', e.target.value)} className={inputClass} />
        </div>
        <div>
          <label className="block text-[0.85rem] font-medium text-near-black/70 mb-2">Subtitle</label>
          <textarea value={mountainData.subtitle || ''} onChange={(e) => updateMountain('subtitle', e.target.value)} className={`${inputClass} resize-y min-h-[80px]`} />
        </div>
      </div>

      {/* Projects List */}
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-[1.1rem] font-semibold text-near-black">Projects</h3>
        <button
          onClick={addProject}
          className="flex items-center gap-2 px-5 py-2.5 text-[0.9rem] font-body font-medium rounded-lg cursor-pointer border-none transition-all duration-200 bg-near-black text-white hover:bg-near-black/90"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add New Project
        </button>
      </div>

      {projects.length === 0 ? (
        <div className="bg-white border border-near-black/[0.04] rounded-lg p-12 text-center shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
          <p className="text-near-black/40 text-[1rem] mb-4">No projects yet.</p>
          <button onClick={addProject} className="px-5 py-2.5 text-[0.9rem] font-body font-medium rounded-lg cursor-pointer border-none bg-near-black text-white hover:bg-near-black/90">
            Create Your First Project
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {projects.map(project => (
            <div
              key={project.id}
              className="bg-white border border-near-black/[0.04] rounded-lg p-5 shadow-[0_1px_2px_rgba(0,0,0,0.02)] flex items-center gap-4"
            >
              {project.image && (
                <img src={project.image} alt="" className="w-16 h-16 rounded-lg object-cover shrink-0" />
              )}
              <div className="flex-1 min-w-0">
                <h4 className="text-[0.95rem] font-semibold text-near-black truncate">
                  {project.title || 'Untitled Project'}
                </h4>
                <p className="text-[0.8rem] text-near-black/40 mt-0.5">
                  {project.strategyBullets?.length || 0} bullets · {project.metrics?.length || 0} metrics
                </p>
              </div>
              <div className="flex gap-2 shrink-0">
                <button
                  onClick={() => setEditingId(project.id)}
                  className="p-2 rounded-lg border border-near-black/[0.08] bg-transparent text-near-black/50 hover:text-near-black hover:border-near-black/20 cursor-pointer transition-all"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </button>
                <button
                  onClick={() => deleteProject(project.id)}
                  className="p-2 rounded-lg border border-near-black/[0.08] bg-transparent text-near-black/50 hover:text-red-500 hover:border-red-200 cursor-pointer transition-all"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default PortfolioEditor;
