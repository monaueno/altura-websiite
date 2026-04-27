import { useState } from 'react';

function generateSlug(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

function BlogEditor({ formData, setFormData }) {
  const [editingId, setEditingId] = useState(null);
  const posts = formData._blog || [];

  const updatePosts = (newPosts) => {
    setFormData(prev => ({ ...prev, _blog: newPosts }));
  };

  const addPost = () => {
    const newPost = {
      id: Date.now().toString(),
      slug: '',
      title: '',
      date: new Date().toISOString().split('T')[0],
      coverImage: '',
      body: '',
    };
    updatePosts([newPost, ...posts]);
    setEditingId(newPost.id);
  };

  const deletePost = (id) => {
    const post = posts.find(p => p.id === id);
    if (window.confirm(`Delete "${post?.title || 'Untitled'}"? This cannot be undone.`)) {
      updatePosts(posts.filter(p => p.id !== id));
      if (editingId === id) setEditingId(null);
    }
  };

  const updatePost = (id, key, value) => {
    updatePosts(posts.map(p => {
      if (p.id !== id) return p;
      const updated = { ...p, [key]: value };
      if (key === 'title') {
        let slug = generateSlug(value);
        const others = posts.filter(o => o.id !== id);
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

  const editingPost = posts.find(p => p.id === editingId);

  // Edit view
  if (editingPost) {
    return (
      <div className="animate-[fadeIn_0.3s_ease-out]">
        <button
          onClick={() => setEditingId(null)}
          className="flex items-center gap-2 mb-8 text-[0.9rem] font-medium text-near-black/50 hover:text-near-black transition-colors bg-transparent border-none cursor-pointer"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to all posts
        </button>

        <div className="mb-10">
          <h2 className="font-display text-[1.75rem] font-semibold text-near-black mb-3 tracking-tight">
            {editingPost.title || 'New Post'}
          </h2>
        </div>

        <div className="bg-white border border-near-black/[0.04] rounded-lg p-7 mb-5 shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
          <div className="mb-5">
            <label className="block text-[0.85rem] font-medium text-near-black/70 mb-2.5">Title</label>
            <input
              type="text"
              value={editingPost.title}
              onChange={(e) => updatePost(editingPost.id, 'title', e.target.value)}
              placeholder="Your blog post title"
              className="w-full px-3.5 py-2.5 border border-near-black/[0.06] rounded-lg font-body text-[0.95rem] text-near-black bg-white outline-none transition-all duration-150 focus:border-accent focus:ring-1 focus:ring-accent/15 placeholder:text-near-black/30 hover:border-near-black/[0.12]"
            />
          </div>

          <div className="mb-5">
            <label className="block text-[0.85rem] font-medium text-near-black/70 mb-2.5">
              URL Slug <span className="text-near-black/30">(auto-generated from title)</span>
            </label>
            <input
              type="text"
              value={editingPost.slug}
              onChange={(e) => updatePost(editingPost.id, 'slug', e.target.value)}
              placeholder="your-post-slug"
              className="w-full px-3.5 py-2.5 border border-near-black/[0.06] rounded-lg font-body text-[0.95rem] text-near-black/60 bg-[#FAFAFA] outline-none transition-all duration-150 focus:border-accent focus:ring-1 focus:ring-accent/15 placeholder:text-near-black/30 hover:border-near-black/[0.12]"
            />
          </div>

          <div className="mb-5">
            <label className="block text-[0.85rem] font-medium text-near-black/70 mb-2.5">Date</label>
            <input
              type="date"
              value={editingPost.date}
              onChange={(e) => updatePost(editingPost.id, 'date', e.target.value)}
              className="w-full px-3.5 py-2.5 border border-near-black/[0.06] rounded-lg font-body text-[0.95rem] text-near-black bg-white outline-none transition-all duration-150 focus:border-accent focus:ring-1 focus:ring-accent/15 hover:border-near-black/[0.12]"
            />
          </div>

          <div className="mb-5">
            <label className="block text-[0.85rem] font-medium text-near-black/70 mb-2.5">Cover Image</label>
            <div className="relative border border-dashed border-near-black/[0.1] rounded-lg p-6 text-center cursor-pointer transition-all duration-150 hover:border-accent/60 hover:bg-accent/[0.03] bg-white group">
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (!file) return;
                  const reader = new FileReader();
                  reader.onload = (ev) => updatePost(editingPost.id, 'coverImage', ev.target.result);
                  reader.readAsDataURL(file);
                }}
                className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
              />
              <svg className="w-8 h-8 mx-auto mb-2 text-near-black/25" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
              <div className="text-[0.85rem] text-near-black/60 font-medium">Click to upload</div>
            </div>
            {editingPost.coverImage && (
              <div className="mt-3 rounded-lg overflow-hidden border border-near-black/[0.04]">
                <img src={editingPost.coverImage} alt="Cover preview" className="w-full max-h-[160px] object-cover" />
              </div>
            )}
          </div>

          <div>
            <label className="block text-[0.85rem] font-medium text-near-black/70 mb-2.5">Post Content</label>
            <textarea
              value={editingPost.body}
              onChange={(e) => updatePost(editingPost.id, 'body', e.target.value)}
              placeholder="Write your blog post here... Use blank lines between paragraphs."
              className="w-full px-3.5 py-2.5 border border-near-black/[0.06] rounded-lg font-body text-[0.95rem] text-near-black bg-white outline-none resize-y min-h-[300px] leading-relaxed transition-all duration-150 focus:border-accent focus:ring-1 focus:ring-accent/15 placeholder:text-near-black/30 hover:border-near-black/[0.12]"
            />
            <p className="text-[0.8rem] text-near-black/40 mt-2">Use blank lines between paragraphs.</p>
          </div>
        </div>
      </div>
    );
  }

  // List view
  return (
    <div className="animate-[fadeIn_0.3s_ease-out]">
      <div className="flex items-start justify-between mb-10">
        <div>
          <h2 className="font-display text-[1.75rem] font-semibold text-near-black mb-3 tracking-tight">
            Blog Posts
          </h2>
          <p className="text-[0.95rem] text-near-black/50 leading-relaxed">
            Create and manage your blog posts.
          </p>
        </div>
        <button
          onClick={addPost}
          className="flex items-center gap-2 px-5 py-2.5 text-[0.9rem] font-body font-medium rounded-lg cursor-pointer border-none transition-all duration-200 bg-near-black text-white hover:bg-near-black/90"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add New Post
        </button>
      </div>

      {posts.length === 0 ? (
        <div className="bg-white border border-near-black/[0.04] rounded-lg p-12 text-center shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
          <p className="text-near-black/40 text-[1rem] mb-4">No blog posts yet.</p>
          <button
            onClick={addPost}
            className="px-5 py-2.5 text-[0.9rem] font-body font-medium rounded-lg cursor-pointer border-none bg-near-black text-white hover:bg-near-black/90"
          >
            Create Your First Post
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {posts.map(post => (
            <div
              key={post.id}
              className="bg-white border border-near-black/[0.04] rounded-lg p-5 shadow-[0_1px_2px_rgba(0,0,0,0.02)] flex items-center justify-between gap-4"
            >
              <div className="flex-1 min-w-0">
                <h3 className="text-[0.95rem] font-semibold text-near-black truncate">
                  {post.title || 'Untitled Post'}
                </h3>
                <p className="text-[0.8rem] text-near-black/40 mt-1">
                  {post.date ? new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'No date'}
                  {post.slug && <span className="ml-2 text-near-black/30">/{post.slug}</span>}
                </p>
              </div>
              <div className="flex gap-2 shrink-0">
                <button
                  onClick={() => setEditingId(post.id)}
                  className="p-2 rounded-lg border border-near-black/[0.08] bg-transparent text-near-black/50 hover:text-near-black hover:border-near-black/20 cursor-pointer transition-all"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </button>
                <button
                  onClick={() => deletePost(post.id)}
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

export default BlogEditor;
