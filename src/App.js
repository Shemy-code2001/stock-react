import React, { useState, useEffect } from 'react';

// Sample initial data - in a real app, this would come from an API
const initialProducts = [
  { 
    id: 1, 
    name: 'Laptop', 
    sku: 'LAP001',
    quantity: 5,
    lowStockThreshold: 3,
    price: 999.99,
    status: 'available',
    supplier: 'Tech Supplies Inc',
    lastRestocked: '2024-03-15',
  },
  { 
    id: 2, 
    name: 'Wireless Mouse', 
    sku: 'MOU001',
    quantity: 2,
    lowStockThreshold: 5,
    price: 29.99,
    status: 'low_stock',
    supplier: 'Tech Supplies Inc',
    lastRestocked: '2024-03-10',
  },
  { 
    id: 3, 
    name: 'Monitor', 
    sku: 'MON001',
    quantity: 0,
    lowStockThreshold: 2,
    price: 299.99,
    status: 'out_of_stock',
    supplier: 'Display Solutions LLC',
    lastRestocked: '2024-02-28',
  },
];

const StockManagementDashboard = () => {
  const [products, setProducts] = useState(initialProducts);
  const [alerts, setAlerts] = useState([]);

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setProducts(currentProducts => 
        currentProducts.map(product => ({
          ...product,
          status: getProductStatus(product.quantity, product.lowStockThreshold)
        }))
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Update alerts when product status changes
  useEffect(() => {
    const newAlerts = products
      .filter(product => product.status !== 'available')
      .map(product => ({
        id: product.id,
        message: product.status === 'out_of_stock' 
          ? `${product.name} is out of stock!` 
          : `${product.name} is running low on stock (${product.quantity} remaining)`,
        type: product.status === 'out_of_stock' ? 'error' : 'warning',
        timestamp: new Date().toISOString()
      }));
    
    setAlerts(newAlerts);
  }, [products]);

  const getProductStatus = (quantity, threshold) => {
    if (quantity <= 0) return 'out_of_stock';
    if (quantity <= threshold) return 'low_stock';
    return 'available';
  };

  const handleRestock = (productId) => {
    setProducts(currentProducts =>
      currentProducts.map(product =>
        product.id === productId
          ? { ...product, quantity: product.quantity + 5, lastRestocked: new Date().toISOString() }
          : product
      )
    );
  };

  const getStatusClass = (status) => {
    switch (status) {
      case 'available':
        return 'bg-green-100 text-green-800';
      case 'low_stock':
        return 'bg-yellow-100 text-yellow-800';
      case 'out_of_stock':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Stock Management</h1>
        <div className="relative">
          {alerts.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
              {alerts.length}
            </span>
          )}
        </div>
      </div>

      {/* Alerts Section */}
      {alerts.length > 0 && (
        <div className="space-y-2 mb-6">
          {alerts.map((alert) => (
            <div
              key={`${alert.id}-${alert.timestamp}`}
              className={`p-4 rounded-lg ${
                alert.type === 'error' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'
              }`}
            >
              <p>{alert.message}</p>
            </div>
          ))}
        </div>
      )}

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="text-sm text-gray-600">Total Products</div>
          <div className="text-2xl font-bold">{products.length}</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="text-sm text-gray-600">Low Stock Items</div>
          <div className="text-2xl font-bold">
            {products.filter(p => p.status === 'low_stock').length}
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="text-sm text-gray-600">Out of Stock</div>
          <div className="text-2xl font-bold">
            {products.filter(p => p.status === 'out_of_stock').length}
          </div>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-4 border-b">
          <h2 className="text-xl font-semibold">Inventory</h2>
          <p className="text-gray-600">Manage your product stock levels and restock when necessary.</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">SKU</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Restocked</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {products.map((product) => (
                <tr key={product.id}>
                  <td className="px-6 py-4 whitespace-nowrap">{product.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{product.sku}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{product.quantity}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 rounded-full text-xs ${getStatusClass(product.status)}`}>
                      {product.status.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{new Date(product.lastRestocked).toLocaleDateString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => handleRestock(product.id)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      Restock
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default StockManagementDashboard;