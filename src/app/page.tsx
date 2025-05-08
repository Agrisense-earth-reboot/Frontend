export default function Home() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Welcome to AgriSense</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h2 className="text-xl font-semibold mb-4">🌾 Crop Management</h2>
          <p className="text-gray-600">Track and manage your crops efficiently with our comprehensive management tools.</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h2 className="text-xl font-semibold mb-4">📊 Yield Predictions</h2>
          <p className="text-gray-600">Get data-driven insights to predict and optimize your crop yields.</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h2 className="text-xl font-semibold mb-4">🌤 Weather Forecast</h2>
          <p className="text-gray-600">Stay informed with accurate weather forecasts for better planning.</p>
        </div>
      </div>
    </div>
  );
}
