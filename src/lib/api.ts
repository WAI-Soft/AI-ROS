import axios, { AxiosInstance, AxiosError } from 'axios';

// API Configuration
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api/v1';

// Create axios instance
const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  withCredentials: true,
});

// Request interceptor
apiClient.interceptors.request.use(
  (config) => {
    // Add auth token if available
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      // Handle unauthorized - clear token and redirect to login
      localStorage.removeItem('auth_token');
      // You can add redirect logic here if needed
    }
    return Promise.reject(error);
  }
);

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message: string;
  errors: any;
}

export interface PaginatedResponse<T> {
  data: T[];
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
}

// Type Definitions
export interface Project {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  description: string;
  banner_image_url: string;
  client: string;
  year: number;
  location: string;
  key_metrics: Array<{ label: string; value: string }>;
  tech_stack: string[];
  status: 'published' | 'draft';
  featured: boolean;
  view_count: number;
  categories: Category[];
  tags: Tag[];
  media: Media[];
  created_at: string;
  updated_at: string;
}

export interface BlogPost {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featured_image: string;
  reading_time: number;
  status: 'published' | 'draft';
  published_at: string;
  view_count: number;
  author: User;
  tags: Tag[];
  created_at: string;
  updated_at: string;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  description: string;
  icon: string;
  projects_count?: number;
}

export interface Tag {
  id: number;
  name: string;
  slug: string;
  projects_count?: number;
  posts_count?: number;
}

export interface TeamMember {
  id: number;
  name: string;
  title: string;
  bio: string;
  avatar: string;
  linkedin_url: string;
  twitter_url: string;
  order: number;
}

export interface Partner {
  id: number;
  name: string;
  logo_url: string;
  website_url: string;
  order: number;
}

export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  avatar?: string;
  bio?: string;
}

export interface Stats {
  total_projects: number;
  co2_saved: number;
  partner_count: number;
  years_experience: number;
}

export interface ContactSubmission {
  name: string;
  email: string;
  company?: string;
  subject: string;
  message: string;
  recaptcha_token: string;
}

// API Methods
export const api = {
  // Projects
  getProjects: async (params?: {
    category?: string;
    tag?: string;
    year?: number;
    search?: string;
    per_page?: number;
    page?: number;
  }) => {
    const response = await apiClient.get<ApiResponse<PaginatedResponse<Project>>>('/projects', { params });
    return response.data;
  },

  getProject: async (slug: string) => {
    const response = await apiClient.get<ApiResponse<Project>>(`/projects/${slug}`);
    return response.data;
  },

  // Blog Posts
  getBlogPosts: async (params?: {
    tag?: string;
    search?: string;
    per_page?: number;
    page?: number;
  }) => {
    const response = await apiClient.get<ApiResponse<PaginatedResponse<BlogPost>>>('/posts', { params });
    return response.data;
  },

  getBlogPost: async (slug: string) => {
    const response = await apiClient.get<ApiResponse<BlogPost>>(`/posts/${slug}`);
    return response.data;
  },

  // Categories & Tags
  getCategories: async () => {
    const response = await apiClient.get<ApiResponse<Category[]>>('/categories');
    return response.data;
  },

  getTags: async () => {
    const response = await apiClient.get<ApiResponse<Tag[]>>('/tags');
    return response.data;
  },

  // Team & Partners
  getTeamMembers: async () => {
    const response = await apiClient.get<ApiResponse<TeamMember[]>>('/team');
    return response.data;
  },

  getPartners: async () => {
    const response = await apiClient.get<ApiResponse<Partner[]>>('/partners');
    return response.data;
  },

  // Stats
  getStats: async () => {
    const response = await apiClient.get<ApiResponse<Stats>>('/stats');
    return response.data;
  },

  // Contact
  submitContact: async (data: ContactSubmission) => {
    const response = await apiClient.post<ApiResponse<{ reference_id: string; message: string }>>('/contact', data);
    return response.data;
  },

  // Auth
  login: async (email: string, password: string) => {
    const response = await apiClient.post<ApiResponse<{ user: User; token: string; expires_at: string }>>('/auth/login', {
      email,
      password,
    });
    if (response.data.success && response.data.data.token) {
      localStorage.setItem('auth_token', response.data.data.token);
    }
    return response.data;
  },

  logout: async () => {
    const response = await apiClient.post<ApiResponse<null>>('/auth/logout');
    localStorage.removeItem('auth_token');
    return response.data;
  },

  getMe: async () => {
    const response = await apiClient.get<ApiResponse<User>>('/auth/me');
    return response.data;
  },

  // Health Check
  healthCheck: async () => {
    const response = await apiClient.get<ApiResponse<{ status: string; version: string; timestamp: string }>>('/health');
    return response.data;
  },
};

export default api;
