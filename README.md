  🏗️ Overall Architecture Flow

  ┌─────────────────────────────────────────────────────────┐
  │                   Browser localStorage                   │
  │            (stores all website content)                  │
  └──────────────────┬──────────────────────────────────────┘
                     │
                     ├─── getData() ──→ Read content
                     └─── setData() ──→ Save content
                     │
          ┌──────────┴──────────┐
          │                     │
          ▼                     ▼
  ┌──────────────┐      ┌──────────────┐
  │ Public Site  │      │ Admin Panel  │
  │ (Homepage)   │      │ (Dashboard)  │
  └──────────────┘      └──────────────┘

  📊 Data Flow (Step-by-Step)

  1. Initial Load - Where Content Comes From

  // storage.js has default content
  const defaultData = {
    home: {
      heroHeadline: "Where Strategy Meets Creative That Converts",
      heroSubheadline: "Altura Marketing is...",
      // ... more fields
    },
    testimonials: [
      { name: "Alexis Miles", quote: "...", company: "BoostedSafe" },
      // ... 2 more testimonials
    ],
    services: [
      { title: "Creative Strategist Consultant", description: "..." },
      // ... 4 more services
    ]
  }

  // When components load:
  export const getData = () => {
    const stored = localStorage.getItem('annalise_site_data');
    return stored ? JSON.parse(stored) : defaultData; // ← Uses default if nothing saved
  };

  2. Public Homepage - Reading & Displaying

  When a user visits http://localhost:5173/:

  User visits homepage
        ↓
  App.jsx routes to Home.jsx
        ↓
  Home.jsx renders: Navbar, Hero, Testimonials, Portfolio, Services, Footer
        ↓
  Each component calls getData() on mount
        ↓
  Components read from localStorage (or get defaults)
        ↓
  Components display the content

  Example - Hero Component:

  // Hero.jsx
  function Hero() {
    const [data, setData] = useState(null);

    useEffect(() => {
      const siteData = getData();        // ← Gets data from localStorage
      setData(siteData.home);            // ← Extracts 'home' section
    }, []);

    return (
      <h1>{data.heroHeadline}</h1>       // ← Displays the headline
      <p>{data.heroSubheadline}</p>      // ← Displays the subtext
    );
  }

  3. Admin Panel - Editing & Saving

  When Annalise wants to edit content:

  Annalise visits /admin
        ↓
  Enters password: "annalise!123"
        ↓
  Password matches → sessionStorage saves auth token
        ↓
  Redirected to /admin/dashboard
        ↓
  Dashboard loads existing content via getData()
        ↓
  Annalise edits a field (e.g., hero headline)
        ↓
  Change stored in component state (formData)
        ↓
  Annalise clicks "Save Changes"
        ↓
  Dashboard calls setData() with updated content
        ↓
  Content saved to localStorage
        ↓
  Toast notification: "✓ Changes saved!"

  Example - Saving Flow:

  // AdminDashboard.jsx
  const handleSave = () => {
    const siteData = getData();              // ← Get current data

    siteData.home.heroHeadline = formData['heroHeadline'];  // ← Update with new value

    setData(siteData);                       // ← Save back to localStorage

    setShowToast(true);                      // ← Show "saved!" message
  };

  🔄 Complete User Journey

  Public Visitor Journey:

  1. User types: localhost:5173
          ↓
  2. React Router sees path "/"
          ↓
  3. App.jsx routes to <Home />
          ↓
  4. Home.jsx loads all components
          ↓
  5. Each component:
     - Calls getData()
     - Reads from localStorage (key: 'annalise_site_data')
     - If empty, uses defaultData
     - Displays content
          ↓
  6. User sees the website with current content

  Admin Editing Journey:

  1. Annalise types: localhost:5173/admin
          ↓
  2. React Router sees path "/admin"
          ↓
  3. App.jsx routes to <AdminLogin />
          ↓
  4. AdminLogin shows password form
          ↓
  5. Annalise enters: "annalise!123"
          ↓
  6. Password matches → sessionStorage.setItem('admin_authenticated', 'true')
          ↓
  7. Navigate to /admin/dashboard
          ↓
  8. AdminDashboard checks auth:
     - If not authenticated → redirect to /admin
     - If authenticated → show editor
          ↓
  9. Dashboard loads current data:
     - Calls getData()
     - Flattens data into form fields
     - Displays in text inputs/textareas
          ↓
  10. Annalise edits "heroHeadline" field
          ↓
  11. onChange updates component state (formData)
          ↓
  12. Annalise clicks "Save Changes"
          ↓
  13. handleSave() function:
      - Gets current data via getData()
      - Updates with new values from formData
      - Calls setData() to save to localStorage
      - Shows success toast
          ↓
  14. Annalise clicks "Preview Site" (opens / in new tab)
          ↓
  15. Public homepage loads with NEW content from localStorage

  💾 localStorage Structure

  When you look in browser DevTools → Application → Local Storage:

  // Key: 'annalise_site_data'
  // Value (JSON string):
  {
    "home": {
      "heroHeadline": "Where Strategy Meets Creative That Converts",
      "heroSubheadline": "Altura Marketing is a growth-focused...",
      "heroCTAText": "Let's Chat",
      "heroImage": "data:image/jpeg;base64,..." // ← Or a path like "/assets/images/hero.jpg"
    },
    "testimonials": [
      {
        "id": "1",
        "name": "Alexis Miles",
        "company": "BoostedSafe",
        "quote": "Analyse came to every meeting prepared...",
        "titleCompany": "Dir. of Content, BoostedSafe"
      }
    ],
    "services": [
      {
        "id": "1",
        "title": "Creative Strategist Consultant",
        "description": "For teams that already have execution..."
      }
    ]
  }

  🔐 Authentication Flow

  /admin route
      ↓
  AdminLogin component
      ↓
  User enters password
      ↓
  Compare: password === "annalise!123"
      ↓
      ├─ Match ✓
      │   ├─ sessionStorage.setItem('admin_authenticated', 'true')
      │   └─ navigate('/admin/dashboard')
      │
      └─ No Match ✗
          └─ Show error: "Incorrect password"

  /admin/dashboard route
      ↓
  AdminDashboard component
      ↓
  useEffect checks: sessionStorage.getItem('admin_authenticated')
      ↓
      ├─ Found ✓
      │   └─ Load editor
      │
      └─ Not Found ✗
          └─ navigate('/admin') (back to login)

  🎨 Component Hierarchy

  App.jsx (Router)
    │
    ├─ "/" → Home.jsx
    │          ├─ Navbar
    │          ├─ Hero (reads home.heroHeadline, home.heroSubheadline)
    │          ├─ Testimonials (reads testimonials[0,1,2])
    │          ├─ StaticShowcase (reads home.staticShowcaseHeadline)
    │          ├─ ServicesPreview (reads services[0,1,2,3])
    │          └─ Footer
    │
    ├─ "/admin" → AdminLogin.jsx
    │                (password check)
    │
    └─ "/admin/dashboard" → AdminDashboard.jsx
                              ├─ Header (Save, Preview, Logout buttons)
                              ├─ Sidebar (Hero, Testimonials, Portfolio, Services, Footer)
                              └─ Content Area
                                  ├─ Hero Editor (edits home.heroHeadline, etc.)
                                  ├─ Testimonials Editor (edits testimonials[0,1,2])
                                  ├─ Portfolio Editor (edits home.staticShowcaseSubheading)
                                  └─ Services Editor (edits services[0,1,2,3])

  🔄 State Management

  No Redux/Context needed! Using simple pattern:

  1. Storage Layer (storage.js)
    - Single source of truth
    - getData() / setData() abstractions
    - Easy to migrate to backend later
  2. Component State (useState)
    - Each component loads data on mount
    - Stores in local state
    - Re-renders when state changes
  3. Admin State (useState in AdminDashboard)
    - formData object holds ALL editable fields
    - Updates on input change
    - Saves all at once on "Save Changes"

  📝 Example: Editing Hero Headline

  Let me trace one complete edit cycle:

  1. Annalise logged into /admin/dashboard

  2. AdminDashboard loads:
     const siteData = getData();
     // siteData.home.heroHeadline = "Where Strategy Meets Creative That Converts"

  3. Puts into formData state:
     formData['heroHeadline'] = "Where Strategy Meets Creative That Converts"

  4. Input field shows current value:
     <input value={formData.heroHeadline} />

  5. Annalise types: "Taking Your Business to New Heights"

  6. onChange fires:
     handleInputChange('heroHeadline', 'Taking Your Business to New Heights')

  7. State updates:
     setFormData({ ...formData, heroHeadline: 'Taking Your Business to New Heights' })

  8. Input re-renders with new value (she sees her typing)

  9. Annalise clicks "Save Changes"

  10. handleSave() runs:
      const siteData = getData();
      siteData.home.heroHeadline = formData['heroHeadline']; // ← New value
      setData(siteData); // ← Saves to localStorage

  11. localStorage now has:
      { "home": { "heroHeadline": "Taking Your Business to New Heights", ... } }

  12. Annalise clicks "Preview Site"

  13. Opens / in new tab

  14. Hero.jsx loads:
      const siteData = getData(); // ← Reads from localStorage
      setData(siteData.home); // ← Gets NEW headline

  15. Renders:
      <h1>Taking Your Business to New Heights</h1> ← NEW TEXT!

  🚀 Why This Works Well

  Benefits:
  - ✅ No backend needed (perfect for launch)
  - ✅ Changes are instant (no API calls)
  - ✅ Works offline
  - ✅ Simple to understand
  - ✅ Easy to migrate later (just swap localStorage for API calls)

  Limitations:
  - ⚠️ Data lives in browser (clear cache = loses changes)
  - ⚠️ Can't share edits across devices
  - ⚠️ No version history

  Future Migration Path:
  When you want a real backend:
  1. Keep the same getData/setData functions
  2. Change them to fetch from an API instead of localStorage
  3. Components don't need to change at all!