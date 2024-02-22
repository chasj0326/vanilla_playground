class ApiClient {
  baseUrl;
  baseOptions;

  constructor(baseUrl: string, options: RequestInit) {
    this.baseUrl = baseUrl;
    this.baseOptions = options;
  }

  async request(
    endpoint: string,
    options?: RequestInit
  ): Promise<Response> {
    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        ...this.baseOptions,
        ...options,
      });
      return response;
    } catch (error) {
      throw new Error('API ERROR');
    }
  }

  async get(endpoint: string, options?: RequestInit) {
    return this.request(endpoint, {
      ...options,
      method: 'GET',
    });
  }
  async post(endpoint: string, options?: RequestInit) {
    return this.request(endpoint, {
      ...options,
      method: 'POST',
    });
  }
  async put(endpoint: string, options?: RequestInit) {
    return this.request(endpoint, {
      ...options,
      method: 'PUT',
    });
  }
  async delete(endpoint: string, options?: RequestInit) {
    return this.request(endpoint, {
      ...options,
      method: 'DELETE',
    });
  }
}

export default ApiClient;
