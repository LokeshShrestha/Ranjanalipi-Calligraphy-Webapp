/**
 * API Configuration and Helper Functions
 */

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

/**
 * Get auth token from localStorage
 */
export const getAuthToken = (): string | null => {
  return localStorage.getItem('access_token');
};

/**
 * Set auth tokens in localStorage
 */
export const setAuthTokens = (accessToken: string, refreshToken: string) => {
  localStorage.setItem('access_token', accessToken);
  localStorage.setItem('refresh_token', refreshToken);
};

/**
 * Clear auth tokens from localStorage
 */
export const clearAuthTokens = () => {
  localStorage.removeItem('access_token');
  localStorage.removeItem('refresh_token');
  localStorage.removeItem('username');
};

/**
 * Get username from localStorage
 */
export const getUsername = (): string | null => {
  return localStorage.getItem('username');
};

/**
 * Set username in localStorage
 */
export const setUsername = (username: string) => {
  localStorage.setItem('username', username);
};

/**
 * Check if user is authenticated
 */
export const isAuthenticated = (): boolean => {
  return !!getAuthToken();
};

/**
 * API Request helper with auth headers
 */
async function apiRequest(
  endpoint: string,
  options: RequestInit = {},
  skipAuthRedirect: boolean = false
): Promise<Response> {
  const token = getAuthToken();
  const headers: HeadersInit = {
    ...options.headers,
  };

  // Add auth header if token exists
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  // Add Content-Type for JSON requests (but not for FormData)
  if (!(options.body instanceof FormData)) {
    headers['Content-Type'] = 'application/json';
  }

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
  });

  // Handle 401 Unauthorized - token expired (but skip for login/signup endpoints)
  if (response.status === 401 && !skipAuthRedirect) {
    clearAuthTokens();
    window.location.href = '/login';
    throw new Error('Authentication failed. Please login again.');
  }

  return response;
}

/**
 * Authentication APIs
 */
export interface SignupData {
  username: string;
  email: string;
  password: string;
  password2: string;
}

export interface SigninData {
  username: string;
  password: string;
}

export interface AuthResponse {
  access: string;
  refresh: string;
}

export const authApi = {
  signup: async (data: SignupData) => {
    const response = await apiRequest('/signup/', {
      method: 'POST',
      body: JSON.stringify(data),
    }, true); // Skip auto-redirect for signup
    return response.json();
  },

  signin: async (data: SigninData): Promise<AuthResponse> => {
    const response = await apiRequest('/signin/', {
      method: 'POST',
      body: JSON.stringify(data),
    }, true); // Skip auto-redirect for signin
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Login failed');
    }
    
    return response.json();
  },

  changePassword: async (oldPassword: string, newPassword: string) => {
    const response = await apiRequest('/change-password/', {
      method: 'POST',
      body: JSON.stringify({
        old_password: oldPassword,
        new_password: newPassword,
      }),
    });
    return response.json();
  },

  changeUsername: async (newUsername: string) => {
    const response = await apiRequest('/change-username/', {
      method: 'POST',
      body: JSON.stringify({
        new_username: newUsername,
      }),
    });
    return response.json();
  },
};

/**
 * Prediction/Recognition APIs
 */
export interface PredictionResponse {
  success: boolean;
  predicted_class: number;
  confidence: number;
  processed_image: string; // base64
  error?: string;
}

export const predictionApi = {
  predictCharacter: async (imageFile: File): Promise<PredictionResponse> => {
    const formData = new FormData();
    formData.append('image', imageFile);

    const response = await apiRequest('/predict/', {
      method: 'POST',
      body: formData,
    });

    return response.json();
  },
};

/**
 * Similarity/Comparison APIs
 */
export interface SimilarityResponse {
  success: boolean;
  similarity_score: number;
  distance: number;
  is_same_character: boolean;
  threshold: number;
  compared_with_class: number;
  reference_image: string; // base64
  user_image: string; // base64
  gradcam_image: string; // base64
  blended_overlay: string; // base64
  feedback?: string;
  error?: string;
}

export const similarityApi = {
  compareHandwriting: async (
    imageFile: File,
    targetClass: number,
    processedImageBase64?: string
  ): Promise<SimilarityResponse> => {
    const formData = new FormData();
    if (processedImageBase64) {
      formData.append('processed_image_base64', processedImageBase64);
    } else {
      formData.append('image', imageFile);
    }
    formData.append('target_class', targetClass.toString());

    const response = await apiRequest('/similarity/', {
      method: 'POST',
      body: formData,
    });

    return response.json();
  },
};

/**
 * History APIs
 */
export interface PredictionHistory {
  id: number;
  image_url: string | null;
  predicted_class: number;
  confidence: number;
  created_at: string;
}

export interface SimilarityHistory {
  id: number;
  user_image_url: string | null;
  reference_image_url: string | null;
  blended_overlay_url: string | null;
  target_class: number;
  similarity_score: number;
  distance: number;
  is_same_character: boolean;
  created_at: string;
}

export const historyApi = {
  getPredictionHistory: async (): Promise<{
    success: boolean;
    count: number;
    predictions: PredictionHistory[];
  }> => {
    const response = await apiRequest('/history/predictions/');
    return response.json();
  },

  getSimilarityHistory: async (): Promise<{
    success: boolean;
    count: number;
    similarities: SimilarityHistory[];
  }> => {
    const response = await apiRequest('/history/similarities/');
    return response.json();
  },

  deleteSimilarityHistory: async (historyId: number): Promise<{
    success: boolean;
    message?: string;
    error?: string;
  }> => {
    const response = await apiRequest(`/history/similarities/${historyId}/`, {
      method: 'DELETE',
    });
    return response.json();
  },
};

/**
 * User Statistics API
 */
export interface UserStatistics {
  total_analyses: number;
  average_score: number;
  match_rate: number;
  best_score: number;
  total_matches: number;
  total_mismatches: number;
  most_practiced_character: number | null;
  characters_attempted: number;
  high_scores: number;
  good_scores: number;
  needs_practice: number;
  recent_activity: string | null;
}

export interface StatisticsFilters {
  target_class?: number;
  days?: number;
  start_date?: string;
  end_date?: string;
}

export const userApi = {
  getStatistics: async (filters?: StatisticsFilters): Promise<{
    success: boolean;
    statistics: UserStatistics;
    error?: string;
  }> => {
    const params = new URLSearchParams();
    if (filters?.target_class !== undefined) {
      params.append('target_class', filters.target_class.toString());
    }
    if (filters?.days !== undefined) {
      params.append('days', filters.days.toString());
    }
    if (filters?.start_date) {
      params.append('start_date', filters.start_date);
    }
    if (filters?.end_date) {
      params.append('end_date', filters.end_date);
    }
    
    const queryString = params.toString();
    const endpoint = `/user/statistics/${queryString ? '?' + queryString : ''}`;
    
    const response = await apiRequest(endpoint);
    return response.json();
  },
};

/**
 * Feedback API
 */
export interface FeedbackResponse {
  success: boolean;
  feedback: string;
  error?: string;
}

export interface FeedbackRequest {
  user_image: string; // base64
  reference_image: string; // base64
  blended_overlay: string; // base64
  target_class: number;
  similarity_score: number;
  distance: number;
  is_same_character: boolean;
}

export const feedbackApi = {
  getAIFeedback: async (feedbackData: FeedbackRequest): Promise<FeedbackResponse> => {
    const formData = new FormData();
    formData.append('user_image', feedbackData.user_image);
    formData.append('reference_image', feedbackData.reference_image);
    formData.append('blended_overlay', feedbackData.blended_overlay);
    formData.append('target_class', feedbackData.target_class.toString());
    formData.append('similarity_score', feedbackData.similarity_score.toString());
    formData.append('distance', feedbackData.distance.toString());
    formData.append('is_same_character', feedbackData.is_same_character.toString());

    const response = await apiRequest('/feedback/', {
      method: 'POST',
      body: formData,
    });

    return response.json();
  },
};
