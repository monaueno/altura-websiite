import { useEffect, useState } from 'react';
import { getData } from '../utils/storage';

function VideoShowcase() {
  const [data, setData] = useState(null);
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const siteData = getData();
    setData(siteData.home);

    // Placeholder video thumbnails - actual videos will be uploaded later
    setVideos([
      { id: 1, thumbnail: '/assets/videos/thumb-1.jpg', title: 'Video Ad 1' },
      { id: 2, thumbnail: '/assets/videos/thumb-2.jpg', title: 'Video Ad 2' },
      { id: 3, thumbnail: '/assets/videos/thumb-3.jpg', title: 'Video Ad 3' },
    ]);
  }, []);

  if (!data) return null;

  return (
    <section className="bg-cream py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-geologica font-bold text-dark mb-6 leading-tight">
            {data.videoShowcaseHeadline || "Transforming Raw Content Into Performance"}
          </h2>
          <p className="text-xl text-dark/80 font-afacad leading-relaxed">
            {data.videoShowcaseSubheading}
          </p>
        </div>

        {/* Video Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {videos.map((video) => (
            <div
              key={video.id}
              className="relative aspect-[9/16] rounded-lg overflow-hidden bg-dark/10 group cursor-pointer"
            >
              {/* Placeholder for video thumbnail */}
              <div className="w-full h-full flex items-center justify-center bg-dark/5">
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center mx-auto mb-4 group-hover:bg-accent/30 transition-colors">
                    <svg className="w-8 h-8 text-accent" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                  <p className="text-dark/60 font-afacad">{video.title}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <p className="text-center text-dark/60 font-afacad mt-12 italic">
          Video content coming soon
        </p>
      </div>
    </section>
  );
}

export default VideoShowcase;
