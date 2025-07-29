// API utility functions for YorkTown admin panel

const API_BASE_URL = 'https://eatatyorktown.com/api';

// Helper function to handle API responses
const handleApiResponse = async (response) => {
  const contentType = response.headers.get('content-type');
  
  if (contentType && contentType.includes('application/json')) {
    const data = await response.json();
    return { data, status: response.status, ok: response.ok };
  } else {
    // Handle non-JSON responses
    const text = await response.text();
    return { data: { message: text }, status: response.status, ok: response.ok };
  }
};

// Generic API call function
export const apiCall = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const defaultOptions = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  };

  // Add authorization header if token exists
  const token = localStorage.getItem('adminToken');
  if (token) {
    defaultOptions.headers.Authorization = `Bearer ${token}`;
  }

  try {
    const response = await fetch(url, {
      ...defaultOptions,
      ...options,
      headers: {
        ...defaultOptions.headers,
        ...options.headers,
      },
    });

    return await handleApiResponse(response);
  } catch (error) {
    console.error('API call error:', error);
    throw new Error('Network error. Please check your connection.');
  }
};

// Admin authentication functions
export const adminAuth = {
  // Login function
  login: async (email, password) => {
    const response = await apiCall('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      const responseData = response.data;
      
      // Check the status field from the API response
      if (responseData.status === true) {
        // Success - store authentication data
        if (responseData.data && responseData.data.token) {
          localStorage.setItem('adminToken', responseData.data.token);
          localStorage.setItem('adminUser', JSON.stringify({ email }));
        }
        return {
          success: true,
          message: responseData.message || 'Login successful',
          data: responseData.data
        };
      } else {
        // API returned status: false
        let errorMessage = 'Login failed. Please try again.';
        
        if (responseData.errors && responseData.errors.length > 0) {
          errorMessage = responseData.errors[0]; // Take the first error message
        } else if (responseData.message) {
          errorMessage = responseData.message;
        }
        
        throw new Error(errorMessage);
      }
    } else {
      // Handle HTTP errors
      let errorMessage = 'Login failed. Please try again.';
      
      if (response.status === 401) {
        errorMessage = 'Invalid email or password';
      } else if (response.status === 400) {
        errorMessage = 'Invalid request. Please check your input.';
      } else if (response.status === 500) {
        errorMessage = 'Server error. Please try again later.';
      } else if (response.status === 404) {
        errorMessage = 'Login service not found.';
      }
      
      throw new Error(errorMessage);
    }
  },

  // Logout function
  logout: () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
  },

  // Check if user is authenticated
  isAuthenticated: () => {
    const token = localStorage.getItem('adminToken');
    return !!token;
  },

  // Get current user
  getCurrentUser: () => {
    const user = localStorage.getItem('adminUser');
    return user ? JSON.parse(user) : null;
  },

  // Get auth token
  getToken: () => {
    return localStorage.getItem('adminToken');
  },
};

// Admin orders functions
export const adminOrders = {
  // Fetch orders list
  getOrdersList: async (payload = {}) => {
    const response = await apiCall('/admin/orders-list', {
      method: 'POST',
      body: JSON.stringify(payload),
    });

    if (response.ok) {
      const responseData = response.data;
      
      // Check the status field from the API response
      if (responseData.status === true) {
        return {
          success: true,
          message: responseData.message || 'Orders fetched successfully',
          data: responseData.data
        };
      } else {
        // API returned status: false
        let errorMessage = 'Failed to fetch orders. Please try again.';
        
        if (responseData.errors && responseData.errors.length > 0) {
          errorMessage = responseData.errors[0]; // Take the first error message
        } else if (responseData.message) {
          errorMessage = responseData.message;
        }
        
        throw new Error(errorMessage);
      }
    } else {
      // Handle HTTP errors
      let errorMessage = 'Failed to fetch orders. Please try again.';
      
      if (response.status === 401) {
        errorMessage = 'Unauthorized. Please login again.';
      } else if (response.status === 403) {
        errorMessage = 'Access denied. You do not have permission to view orders.';
      } else if (response.status === 400) {
        errorMessage = 'Invalid request. Please check your input.';
      } else if (response.status === 500) {
        errorMessage = 'Server error. Please try again later.';
      } else if (response.status === 404) {
        errorMessage = 'Orders service not found.';
      }
      
      throw new Error(errorMessage);
    }
  },

  // Get single order details (for future use)
  getOrderDetails: async (orderId) => {
    const response = await apiCall(`/admin/orders/${orderId}`, {
      method: 'GET',
    });

    if (response.ok) {
      const responseData = response.data;
      
      if (responseData.status === true) {
        return {
          success: true,
          message: responseData.message || 'Order details fetched successfully',
          data: responseData.data
        };
      } else {
        let errorMessage = 'Failed to fetch order details. Please try again.';
        
        if (responseData.errors && responseData.errors.length > 0) {
          errorMessage = responseData.errors[0];
        } else if (responseData.message) {
          errorMessage = responseData.message;
        }
        
        throw new Error(errorMessage);
      }
    } else {
      let errorMessage = 'Failed to fetch order details. Please try again.';
      
      if (response.status === 401) {
        errorMessage = 'Unauthorized. Please login again.';
      } else if (response.status === 404) {
        errorMessage = 'Order not found.';
      } else if (response.status === 500) {
        errorMessage = 'Server error. Please try again later.';
      }
      
      throw new Error(errorMessage);
    }
  },

  // Update order status (for future use)
  updateOrderStatus: async (orderId, status) => {
    const response = await apiCall(`/admin/orders/${orderId}/status`, {
      method: 'PUT',
      body: JSON.stringify({ status }),
    });

    if (response.ok) {
      const responseData = response.data;
      
      if (responseData.status === true) {
        return {
          success: true,
          message: responseData.message || 'Order status updated successfully',
          data: responseData.data
        };
      } else {
        let errorMessage = 'Failed to update order status. Please try again.';
        
        if (responseData.errors && responseData.errors.length > 0) {
          errorMessage = responseData.errors[0];
        } else if (responseData.message) {
          errorMessage = responseData.message;
        }
        
        throw new Error(errorMessage);
      }
    } else {
      let errorMessage = 'Failed to update order status. Please try again.';
      
      if (response.status === 401) {
        errorMessage = 'Unauthorized. Please login again.';
      } else if (response.status === 404) {
        errorMessage = 'Order not found.';
      } else if (response.status === 400) {
        errorMessage = 'Invalid status. Please check your input.';
      } else if (response.status === 500) {
        errorMessage = 'Server error. Please try again later.';
      }
      
      throw new Error(errorMessage);
    }
  },

  // Fetch order details by new endpoint
  getOrderDetailsById: async (orderId) => {
    const response = await apiCall(`/admin/order-details/${orderId}`, {
      method: 'GET',
    });

    if (response.ok) {
      const responseData = response.data;
      if (responseData.status === true) {
        return {
          success: true,
          message: responseData.message || 'Order details fetched successfully',
          data: responseData.data
        };
      } else {
        let errorMessage = 'Failed to fetch order details. Please try again.';
        if (responseData.errors && responseData.errors.length > 0) {
          errorMessage = responseData.errors[0];
        } else if (responseData.message) {
          errorMessage = responseData.message;
        }
        throw new Error(errorMessage);
      }
    } else {
      let errorMessage = 'Failed to fetch order details. Please try again.';
      if (response.status === 401) {
        errorMessage = 'Unauthorized. Please login again.';
      } else if (response.status === 404) {
        errorMessage = 'Order not found.';
      } else if (response.status === 500) {
        errorMessage = 'Server error. Please try again later.';
      }
      throw new Error(errorMessage);
    }
  },

  updateOrderStatusApi: async ({ orderId, statusId }) => {
    const response = await apiCall('/admin/update-order-status', {
      method: 'POST',
      body: JSON.stringify({ orderId, statusId }),
    });
    if (response.ok) {
      return response.data;
    } else {
      throw new Error(response.data?.message || 'Failed to update order status');
    }
  },
};

// Admin coupons functions
export const adminCoupons = {
  // Fetch coupon list
  getCouponList: async (payload = {}) => {
    const response = await apiCall('/coupon/list', {
      method: 'POST',
      body: JSON.stringify(payload),
    });

    if (response.ok) {
      const responseData = response.data;
      if (responseData.status === true) {
        return {
          success: true,
          message: responseData.message || 'Coupons fetched successfully',
          data: responseData.data
        };
      } else {
        let errorMessage = 'Failed to fetch coupons. Please try again.';
        if (responseData.errors && responseData.errors.length > 0) {
          errorMessage = responseData.errors[0];
        } else if (responseData.message) {
          errorMessage = responseData.message;
        }
        throw new Error(errorMessage);
      }
    } else {
      let errorMessage = 'Failed to fetch coupons. Please try again.';
      if (response.status === 401) {
        errorMessage = 'Unauthorized. Please login again.';
      } else if (response.status === 403) {
        errorMessage = 'Access denied. You do not have permission to view coupons.';
      } else if (response.status === 400) {
        errorMessage = 'Invalid request. Please check your input.';
      } else if (response.status === 500) {
        errorMessage = 'Server error. Please try again later.';
      } else if (response.status === 404) {
        errorMessage = 'Coupons service not found.';
      }
      throw new Error(errorMessage);
    }
  },
  // Add or update a coupon
  upsertCoupon: async (payload = {}) => {
    const response = await apiCall('/coupon/upsert', {
      method: 'POST',
      body: JSON.stringify(payload),
    });

    if (response.ok) {
      const responseData = response.data;
      if (responseData.status === true) {
        return {
          success: true,
          message: responseData.message || 'Coupon saved successfully',
          data: responseData.data
        };
      } else {
        let errorMessage = 'Failed to save coupon. Please try again.';
        if (responseData.errors && responseData.errors.length > 0) {
          errorMessage = responseData.errors[0];
        } else if (responseData.message) {
          errorMessage = responseData.message;
        }
        throw new Error(errorMessage);
      }
    } else {
      let errorMessage = 'Failed to save coupon. Please try again.';
      if (response.status === 401) {
        errorMessage = 'Unauthorized. Please login again.';
      } else if (response.status === 403) {
        errorMessage = 'Access denied. You do not have permission to add/edit coupons.';
      } else if (response.status === 400) {
        errorMessage = 'Invalid request. Please check your input.';
      } else if (response.status === 500) {
        errorMessage = 'Server error. Please try again later.';
      } else if (response.status === 404) {
        errorMessage = 'Coupon service not found.';
      }
      throw new Error(errorMessage);
    }
  },
  // Fetch coupon details by id
  getCouponDetails: async (id) => {
    const response = await apiCall(`/coupon/coupon-details/${id}`, {
      method: 'GET',
    });
    if (response.ok) {
      const responseData = response.data;
      if (responseData.status === true) {
        return {
          success: true,
          message: responseData.message || 'Coupon details fetched successfully',
          data: responseData.data
        };
      } else {
        let errorMessage = 'Failed to fetch coupon details. Please try again.';
        if (responseData.errors && responseData.errors.length > 0) {
          errorMessage = responseData.errors[0];
        } else if (responseData.message) {
          errorMessage = responseData.message;
        }
        throw new Error(errorMessage);
      }
    } else {
      let errorMessage = 'Failed to fetch coupon details. Please try again.';
      if (response.status === 401) {
        errorMessage = 'Unauthorized. Please login again.';
      } else if (response.status === 403) {
        errorMessage = 'Access denied. You do not have permission to view coupon details.';
      } else if (response.status === 400) {
        errorMessage = 'Invalid request. Please check your input.';
      } else if (response.status === 500) {
        errorMessage = 'Server error. Please try again later.';
      } else if (response.status === 404) {
        errorMessage = 'Coupon not found.';
      }
      throw new Error(errorMessage);
    }
  },
  // Delete a coupon by id
  deleteCoupon: async (id) => {
    const response = await apiCall(`/coupon/${id}`, {
      method: 'DELETE',
    });
    if (response.ok) {
      const responseData = response.data;
      if (responseData.status === true) {
        return {
          success: true,
          message: responseData.message || 'Coupon deleted successfully',
          data: responseData.data
        };
      } else {
        let errorMessage = 'Failed to delete coupon. Please try again.';
        if (responseData.errors && responseData.errors.length > 0) {
          errorMessage = responseData.errors[0];
        } else if (responseData.message) {
          errorMessage = responseData.message;
        }
        throw new Error(errorMessage);
      }
    } else {
      let errorMessage = 'Failed to delete coupon. Please try again.';
      if (response.status === 401) {
        errorMessage = 'Unauthorized. Please login again.';
      } else if (response.status === 403) {
        errorMessage = 'Access denied. You do not have permission to delete coupons.';
      } else if (response.status === 400) {
        errorMessage = 'Invalid request. Please check your input.';
      } else if (response.status === 500) {
        errorMessage = 'Server error. Please try again later.';
      } else if (response.status === 404) {
        errorMessage = 'Coupon not found.';
      }
      throw new Error(errorMessage);
    }
  },
};

// Admin dashboard functions
export const adminDashboard = {
  // Fetch dashboard data
  getDashboardData: async () => {
    const response = await apiCall('/admin/dashboard', {
      method: 'GET',
    });

    if (response.ok) {
      const responseData = response.data;
      
      // Check the status field from the API response
      if (responseData.status === true) {
        return {
          success: true,
          message: responseData.message || 'Dashboard data fetched successfully',
          data: responseData.data
        };
      } else {
        // API returned status: false
        let errorMessage = 'Failed to fetch dashboard data. Please try again.';
        
        if (responseData.errors && responseData.errors.length > 0) {
          errorMessage = responseData.errors[0]; // Take the first error message
        } else if (responseData.message) {
          errorMessage = responseData.message;
        }
        
        throw new Error(errorMessage);
      }
    } else {
      // Handle HTTP errors
      let errorMessage = 'Failed to fetch dashboard data. Please try again.';
      
      if (response.status === 401) {
        errorMessage = 'Unauthorized. Please login again.';
      } else if (response.status === 403) {
        errorMessage = 'Access denied. You do not have permission to view dashboard.';
      } else if (response.status === 400) {
        errorMessage = 'Invalid request. Please check your input.';
      } else if (response.status === 500) {
        errorMessage = 'Server error. Please try again later.';
      } else if (response.status === 404) {
        errorMessage = 'Dashboard service not found.';
      }
      
      throw new Error(errorMessage);
    }
  },
};

// Error handling utility
export const handleApiError = (error) => {
  if (error.name === 'TypeError' && error.message.includes('fetch')) {
    return 'Unable to connect to server. Please check your internet connection.';
  }
  
  if (error.message) {
    return error.message;
  }
  
  return 'An unexpected error occurred. Please try again.';
};

// Validation utilities
export const validation = {
  email: (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  },
  
  password: (password) => {
    return password && password.length >= 6;
  },
  
  required: (value) => {
    return value && value.trim().length > 0;
  },
}; 