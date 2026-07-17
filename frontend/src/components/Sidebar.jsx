const Sidebar = () => {
  return (
    <div className="w-64 min-h-screen bg-blue-900 text-white p-5">
      <h1 className="text-2xl font-bold mb-8">
        🏥 Pharmacy MS
      </h1>

      <ul className="space-y-4">
        <li className="hover:text-yellow-300 cursor-pointer">🏠 Dashboard</li>
        <li className="hover:text-yellow-300 cursor-pointer">📦 Products</li>
        <li className="hover:text-yellow-300 cursor-pointer">🚚 Suppliers</li>
        <li className="hover:text-yellow-300 cursor-pointer">🛒 Purchases</li>
        <li className="hover:text-yellow-300 cursor-pointer">💰 Sales</li>
        <li className="hover:text-yellow-300 cursor-pointer">📄 Invoices</li>
        <li className="hover:text-yellow-300 cursor-pointer">📊 Reports</li>
      </ul>
    </div>
  );
};

export default Sidebar;