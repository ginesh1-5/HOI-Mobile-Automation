import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { logger } from './logger';
import { endpoints } from '../constants/endpoints';
import { TestData } from '../fixtures/test-data';

export class ApiHelper {
  private client: AxiosInstance;
  private baseUrl: string;
  private apiKey: string;

  constructor(baseUrl: string, apiKey: string = '') {
    this.baseUrl = baseUrl;
    this.apiKey = apiKey;
    
    this.client = axios.create({
      baseURL: baseUrl,
      timeout: TestData.waitTimes.veryLong,
      headers: {
        'Content-Type': 'application/json',
        ...(apiKey && { 'Authorization': `Bearer ${apiKey}` })
      }
    });

    // Request interceptor
    this.client.interceptors.request.use(
      (config) => {
        logger.debug(`API Request: ${config.method?.toUpperCase()} ${config.url}`);
        return config;
      },
      (error) => {
        logger.error(`API Request Error: ${error.message}`);
        return Promise.reject(error);
      }
    );

    // Response interceptor
    this.client.interceptors.response.use(
      (response) => {
        logger.debug(`API Response: ${response.status} ${response.config.url}`);
        return response;
      },
      (error) => {
        logger.error(`API Response Error: ${error.response?.status} ${error.config?.url}`);
        return Promise.reject(error);
      }
    );
  }

  /**
   * GET request
   */
  async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    try {
      const response = await this.client.get<T>(url, config);
      return response.data;
    } catch (error) {
      logger.error(`GET request failed: ${url}`, error);
      throw error;
    }
  }

  /**
   * POST request
   */
  async post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    try {
      const response = await this.client.post<T>(url, data, config);
      return response.data;
    } catch (error) {
      logger.error(`POST request failed: ${url}`, error);
      throw error;
    }
  }

  /**
   * Auth endpoints
   */
  async login(credentials: { email?: string; mobileNumber?: string; password?: string; otp?: string }): Promise<any> {
    return this.post(endpoints.auth.login, credentials);
  }

  async logout(): Promise<any> {
    return this.post(endpoints.auth.logout);
  }
}
