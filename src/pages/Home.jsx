import Navbar from "../components/Navbar"
import heroIllustration from "../assets/hero-illustration.png";

const HeroImage = () => (
  <div className="relative w-full max-w-xl mx-auto">
    <img
      src={heroIllustration}
      alt="Hero illustration"
      className="w-full h-auto object-contain"
    />
  </div>
);

function Home() {
return (
    <div className="min-h-screen bg-white font-sans antialiased">
      <Navbar />
      {/* Hero Section */}
      <main className="min-h-screen flex flex-col">
        <div className="flex-1 px-6 flex items-center">
          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center py-20">
            {/* Illustration */}
            <div className="order-2 md:order-1 animate-fade-in">
              <HeroImage />
            </div>
 
            {/* Text content */}
            <div className="order-1 md:order-2 flex flex-col gap-6 px-3">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-amber-50 border border-amber-200 rounded-full w-fit">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                <span className="text-xs font-medium text-amber-700">Your personal learning space</span>
              </div>
 
              <div className="flex flex-col gap-3">
                <h1 className="text-8xl font-bold text-gray-900 leading-tight tracking-tight">
                  Learn at your<br />
                  <span className="text-gray-400">own pace</span>
                </h1>
                <p className="text-lg text-gray-500 leading-relaxed">
                  Study smarter, not harder.
                </p>
              </div>
 
              <div className="flex items-center gap-4 pt-2">
                <button className="px-6 py-3 text-sm font-semibold text-white bg-gray-900 rounded-full hover:bg-gray-700 transition-all duration-200 shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0">
                  Start Learning →
                </button>
              </div>
 
              <div className="flex items-center gap-6 pt-4 border-t border-gray-100">
                <div>
                  <p className="text-xl font-bold text-gray-900">12k+</p>
                  <p className="text-xs text-gray-400 mt-0.5">Active learners</p>
                </div>
                <div className="w-px h-8 bg-gray-200" />
                <div>
                  <p className="text-xl font-bold text-gray-900">200+</p>
                  <p className="text-xs text-gray-400 mt-0.5">Courses</p>
                </div>
                <div className="w-px h-8 bg-gray-200" />
                <div>
                  <p className="text-xl font-bold text-gray-900">4.9★</p>
                  <p className="text-xs text-gray-400 mt-0.5">Rating</p>
                </div>
              </div>
            </div>
          </div>
        </div>
 
      </main>
 
      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.6s ease-out both;
        }
      `}</style>
    </div>
  );
}

export default Home