function AboutEditor({ formData, setFormData, handleImageUpload }) {
  const about = formData._about || { photo: '', bio: '' };

  const updateAbout = (key, value) => {
    setFormData(prev => ({
      ...prev,
      _about: { ...prev._about, [key]: value },
    }));
  };

  return (
    <div className="animate-[fadeIn_0.3s_ease-out]">
      <div className="mb-10">
        <h2 className="font-display text-[1.75rem] font-semibold text-near-black mb-3 tracking-tight">
          About Page
        </h2>
        <p className="text-[0.95rem] text-near-black/50 leading-relaxed">
          Your photo and bio that appear on the About page.
        </p>
      </div>

      {/* Photo */}
      <div className="bg-white border border-near-black/[0.04] rounded-lg p-7 mb-5 shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
        <div className="flex items-center gap-2.5 mb-6">
          <svg className="w-4 h-4 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <h3 className="text-[0.9rem] font-semibold text-near-black">Photo</h3>
        </div>
        <div className="relative border border-dashed border-near-black/[0.1] rounded-lg p-8 text-center cursor-pointer transition-all duration-150 hover:border-accent/60 hover:bg-accent/[0.03] bg-white group">
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files[0];
              if (!file) return;
              const reader = new FileReader();
              reader.onload = (ev) => updateAbout('photo', ev.target.result);
              reader.readAsDataURL(file);
            }}
            className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
          />
          <svg className="w-10 h-10 mx-auto mb-3 text-near-black/25 transition-transform duration-150 group-hover:scale-105" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
          </svg>
          <div className="text-[0.9rem] text-near-black/60 font-medium mb-1">Click to upload your photo</div>
          <div className="text-[0.8rem] text-near-black/35">JPG or PNG</div>
        </div>
        {about.photo && (
          <div className="mt-4 rounded-lg overflow-hidden border border-near-black/[0.04]">
            <img src={about.photo} alt="About preview" className="w-full max-h-[200px] object-cover" />
          </div>
        )}
      </div>

      {/* Bio */}
      <div className="bg-white border border-near-black/[0.04] rounded-lg p-7 mb-5 shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
        <div className="flex items-center gap-2.5 mb-6">
          <svg className="w-4 h-4 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
          <h3 className="text-[0.9rem] font-semibold text-near-black">Bio</h3>
        </div>
        <label className="block text-[0.85rem] font-medium text-near-black/70 mb-2.5">
          Your Story
        </label>
        <textarea
          value={about.bio || ''}
          onChange={(e) => updateAbout('bio', e.target.value)}
          placeholder="Tell your story... Use blank lines between paragraphs."
          className="w-full px-3.5 py-2.5 border border-near-black/[0.06] rounded-lg font-body text-[0.95rem] text-near-black bg-white outline-none resize-y min-h-[300px] leading-relaxed transition-all duration-150 focus:border-accent focus:ring-1 focus:ring-accent/15 placeholder:text-near-black/30 hover:border-near-black/[0.12]"
        />
        <p className="text-[0.8rem] text-near-black/40 mt-2">
          Use blank lines between paragraphs. This text appears on your About page.
        </p>
      </div>
    </div>
  );
}

export default AboutEditor;
