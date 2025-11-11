import { useState, useEffect } from 'react';
import { api, Project, PaginatedResponse } from '../lib/api';

interface UseProjectsParams {
  category?: string;
  tag?: string;
  year?: number;
  search?: string;
  per_page?: number;
  page?: number;
}

export const useProjects = (params?: UseProjectsParams) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [pagination, setPagination] = useState<Omit<PaginatedResponse<Project>, 'data'> | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await api.getProjects(params);
        
        if (response.success && response.data) {
          const paginatedData = response.data as any;
          setProjects(paginatedData.data || []);
          setPagination({
            current_page: paginatedData.current_page,
            last_page: paginatedData.last_page,
            per_page: paginatedData.per_page,
            total: paginatedData.total,
          });
        }
      } catch (err: any) {
        setError(err.response?.data?.message || 'Failed to fetch projects');
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [params?.category, params?.tag, params?.year, params?.search, params?.page]);

  return { projects, pagination, loading, error };
};

export const useProject = (slug: string) => {
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await api.getProject(slug);
        
        if (response.success) {
          setProject(response.data);
        }
      } catch (err: any) {
        setError(err.response?.data?.message || 'Failed to fetch project');
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchProject();
    }
  }, [slug]);

  return { project, loading, error };
};
