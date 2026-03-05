const STORAGE_KEY = 'annalise_site_data';

const defaultData = {
  home: {
    heroHeadline: "Where Strategy Meets Creative That Converts",
    heroSubheadline: "Altura Marketing is a growth-focused marketing studio specializing in paid advertising and organic social strategy. We help brands turn attention into measurable results through intentional creative and data-driven execution.",
    heroCTAText: "Let's Chat",
    heroImage: "/assets/Images/Branding Photoshoot/walking-home-page.jpg",
    uspHeadline: "It's about understanding people... not just platforms.",
    uspBody: "I focus on uncovering what your audience actually cares about, then shaping creative and messaging that feels natural, emotional, and aligned with how they think and buy. When strategy leads, performance follows.",
    uspImage: "/assets/images/computer.jpg", // Placeholder - to be uploaded later
    staticShowcaseHeadline: "See the Creative Strategy Come to Life",
    staticShowcaseSubheading: "These static ads are real examples of how insight, intention, and execution come together. Each piece is designed to speak to a specific audience, highlight what matters most, and make the message feel natural, not forced.",
    videoShowcaseHeadline: "",
    videoShowcaseSubheading: "Sometimes the UGC comes back less than ideal. Sometimes all you have are still images from a recent shoot. This portfolio highlights how creative strategy and thoughtful editing can transform what you have into video ads that actually work."
  },
  about: {
    photo: "/assets/images/about-photo.jpg",
    bio: "Marketing strategist passionate about helping brands connect with their audiences through authentic storytelling and data-driven creative."
  },
  services: [
    {
      id: "1",
      number: "01",
      title: "Creative Strategist Consultant",
      description: "For teams that already have execution covered but need sharper thinking behind the creative. I partner with in-house designers and media buyers to uncover insights, refine messaging, and generate ideas that actually resonate and perform."
    },
    {
      id: "2",
      number: "02",
      title: "Paid Media Consultant",
      description: "Campaign strategy and management across Meta, Pinterest, and TikTok. I approach paid media through a creative-first lens, helping brands make smarter decisions, improve performance, and scale with intention."
    },
    {
      id: "3",
      number: "03",
      title: "Organic Social Consultant",
      description: "Organic social strategy focused on clarity, consistency, and connection. From content direction to messaging frameworks, I help brands show up in a way that feels natural, aligned, and worth engaging with."
    },
    {
      id: "4",
      number: "04",
      title: "Graphic Design",
      description: "Strategic, conversion-focused design that supports your marketing goals. Every deliverable is created with clarity, consistency, and performance in mind. Design isn't just about looking good, it's about communicating quickly and effectively."
    },
    {
      id: "5",
      number: "05",
      title: "Brand Design",
      description: "Intentional brand identities built to position you clearly and confidently in your market. From visual identity systems and typography to color palettes and foundational brand elements, we create brands that feel cohesive, elevated, and built for long-term growth. This is more than a logo, it's a strategic foundation for everything that follows."
    }
  ],
  portfolio: [
    {
      id: "1",
      slug: "sample-project-1",
      title: "Sample Project 1",
      shortDescription: "Strategic campaign for lifestyle brand focusing on millennial audience engagement.",
      image: "/assets/portfolio/placeholder-1.jpg",
      tagline: "Where authenticity meets strategy",
      strategyBullets: [
        "Identified core audience pain points through social listening",
        "Developed messaging framework emphasizing emotional connection",
        "Created cohesive visual system across all touchpoints"
      ]
    },
    {
      id: "2",
      slug: "sample-project-2",
      title: "Sample Project 2",
      shortDescription: "Paid social campaign driving 3x ROAS for e-commerce client.",
      image: "/assets/portfolio/placeholder-2.jpg",
      tagline: "Data-driven creative that converts",
      strategyBullets: [
        "Conducted competitive analysis and market positioning",
        "Tested 15+ creative variants to optimize performance",
        "Scaled winning concepts across Meta and TikTok"
      ]
    }
  ],
  blog: [
    {
      id: "1",
      slug: "why-creative-strategy-matters",
      title: "Why Creative Strategy Matters More Than Your Budget",
      date: "2025-03-01",
      coverImage: "",
      body: "In today's crowded digital landscape, throwing money at ads isn't enough. The brands that win are the ones who lead with strategy—understanding their audience deeply and crafting messages that resonate on an emotional level..."
    }
  ],
  testimonials: [
    {
      id: "1",
      name: "Sarah Johnson",
      titleCompany: "Marketing Director, Brand Co.",
      quote: "Working with Annalise transformed how we approach creative strategy. Her insights helped us increase our ROAS by 200% while actually reducing our ad spend.",
      avatar: ""
    },
    {
      id: "2",
      name: "Michael Chen",
      titleCompany: "Founder, Growth Startup",
      quote: "Annalise doesn't just create beautiful ads—she thinks deeply about why they work and how they connect with real people. Game changer for our brand.",
      avatar: ""
    },
    {
      id: "3",
      name: "Emily Rodriguez",
      titleCompany: "CEO, E-commerce Brand",
      quote: "Finally, someone who gets that creative and strategy aren't separate disciplines. Annalise bridges that gap effortlessly.",
      avatar: ""
    }
  ]
};

export const getData = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : defaultData;
  } catch (error) {
    console.error('Error reading from localStorage:', error);
    return defaultData;
  }
};

export const setData = (data) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.error('Error writing to localStorage:', error);
  }
};

export const resetData = () => {
  setData(defaultData);
  return defaultData;
};
