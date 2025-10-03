import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';

// Navigation Component
function Navigation() {
  const location = useLocation();
  
  const isActive = (path) => location.pathname === path;
  
  return (
    <nav className="bg-blue-600 text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-8">
            <h1 className="text-xl font-bold">My Routing App</h1>
            <div className="flex space-x-4">
              <Link 
                to="/" 
                className={`px-3 py-2 rounded-md transition`}
              >
                Home
              </Link>
              <Link 
                to="/about" 
                className={`px-3 py-2 rounded-md transition`}
                >
                About
              </Link>
              <Link 
                to="/contact" 
                className={`px-3 py-2 rounded-md transition`}
              >
                Contact
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

// Home Page
function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-5xl font-bold text-gray-800 mb-6">
            Welcome Home!
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Illum laborum accusantium, ipsam non officiis vel esse, dolorem cumque autem ad, neque quidem harum officia a porro rem enim facere quam!
          </p>
        </div>
      </div>
    </div>
  );
}

// About Page
function AboutPage() {
  return (
    <div className="min-h-screen bg-pink-400">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-5xl font-bold text-gray-800 mb-6">
            About Us
          </h1>
          <div>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Maxime hic, expedita repudiandae libero ex amet, tenetur minima quis facilis magnam officiis ducimus blanditiis quod nisi? Laudantium tempora accusamus recusandae omnis!</div>
 
        </div>
      </div>
    </div>
  );
}

// Contact Page
function ContactPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-5xl font-bold text-gray-800 mb-6">
            Contact Us
          </h1>
          <div>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quos in ut illo qui accusamus velit tenetur numquam placeat architecto maxime eligendi quisquam, obcaecati ipsa sapiente nam, minus autem! Natus, culpa.</div>
        </div>
      </div>
    </div>
  );
}

// Main App Component
export default function App() {
  return (
    <BrowserRouter>
      <Navigation />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
    </BrowserRouter>
  );
}