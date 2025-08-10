export default function TestCSSPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">
          🎨 CSS Test Page
        </h1>
        
        {/* Test Basic Tailwind Classes */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-lg border">
            <h2 className="text-xl font-semibold text-blue-600 mb-4">Basic Styling</h2>
            <p className="text-gray-600">This card tests basic Tailwind classes like padding, margins, colors, and shadows.</p>
          </div>
          
          <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-6 rounded-lg shadow-lg text-white">
            <h2 className="text-xl font-semibold mb-4">Gradients</h2>
            <p>This card tests gradient backgrounds and text colors.</p>
          </div>
          
          <div className="bg-green-100 p-6 rounded-lg shadow-lg border-l-4 border-green-500">
            <h2 className="text-xl font-semibold text-green-800 mb-4">Custom Colors</h2>
            <p className="text-green-700">This card tests custom color schemes and borders.</p>
          </div>
        </div>

        {/* Test Buttons */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Button Styles</h2>
          <div className="flex flex-wrap gap-4">
            <button className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md transition-colors">
              Primary Button
            </button>
            <button className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded-md transition-colors">
              Secondary Button
            </button>
            <button className="bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-md transition-colors">
              Success Button
            </button>
            <button className="bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded-md transition-colors">
              Danger Button
            </button>
          </div>
        </div>

        {/* Test Responsive Design */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Responsive Grid</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
              <div key={num} className="bg-blue-100 p-4 rounded-lg text-center">
                <span className="text-blue-800 font-semibold">Item {num}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Test Animations */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Animations</h2>
          <div className="flex space-x-4">
            <div className="w-16 h-16 bg-blue-500 rounded-full animate-pulse"></div>
            <div className="w-16 h-16 bg-green-500 rounded-full animate-bounce"></div>
            <div className="w-16 h-16 bg-purple-500 rounded-full animate-spin"></div>
          </div>
        </div>

        {/* Test Custom CSS Classes */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Custom Classes</h2>
          <div className="gradient-bg p-6 rounded-lg text-white mb-4">
            <h3 className="text-xl font-semibold mb-2">Custom Gradient Background</h3>
            <p>This uses the custom .gradient-bg class from globals.css</p>
          </div>
          <div className="slide-up bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Slide Up Animation</h3>
            <p className="text-gray-600">This uses the custom .slide-up animation</p>
          </div>
        </div>

        {/* Status */}
        <div className="text-center">
          <div className="inline-flex items-center px-4 py-2 bg-green-100 text-green-800 rounded-full">
            <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
            <span className="font-medium">✅ Tailwind CSS is working!</span>
          </div>
        </div>
      </div>
    </div>
  )
}