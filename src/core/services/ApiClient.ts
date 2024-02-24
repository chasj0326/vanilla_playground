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

  async get(endpoint: string, body?: any, options?: RequestInit) {
    return this.request(endpoint, {
      ...options,
      body: JSON.stringify(body),
      method: 'GET',
    });
  }

  async post(endpoint: string, body?: any, options?: RequestInit) {
    return this.request(endpoint, {
      ...options,
      body: JSON.stringify(body),
      method: 'POST',
    });
  }

  async put(endpoint: string, body?: any, options?: RequestInit) {
    return this.request(endpoint, {
      ...options,
      body: JSON.stringify(body),
      method: 'PUT',
    });
  }

  async delete(endpoint: string, body?: any, options?: RequestInit) {
    return this.request(endpoint, {
      ...options,
      body: JSON.stringify(body),
      method: 'DELETE',
    });
  }
}

const createApiClient = (baseUrl: string, options: RequestInit) =>
  new ApiClient(baseUrl, options);

export default createApiClient;
