import axios from 'axios';
import { logger } from '../utils/logger';
import { TestData } from '../fixtures/test-data';

export interface BrowserStackSession {
  sessionId: string;
  status: string;
  buildName?: string;
  projectName?: string;
  video_url?: string;
}

export class BrowserStackService {
  private username: string;
  private accessKey: string;
  private apiUrl: string = 'https://api.browserstack.com/automate';

  constructor(username: string, accessKey: string) {
    this.username = username;
    this.accessKey = accessKey;
  }

  /**
   * Get session details
   */
  async getSession(sessionId: string): Promise<BrowserStackSession> {
    try {
      const response = await axios.get(
        `${this.apiUrl}/sessions/${sessionId}.json`,
        {
          auth: {
            username: this.username,
            password: this.accessKey
          },
          timeout: TestData.waitTimes.veryLong
        }
      );
      return response.data;
    } catch (error: any) {
      logger.error(`Failed to get BrowserStack session: ${error.message}`);
      throw error;
    }
  }

  /**
   * Get all sessions
   */
  async getAllSessions(limit: number = 10): Promise<BrowserStackSession[]> {
    try {
      const response = await axios.get(
        `${this.apiUrl}/sessions.json?limit=${limit}`,
        {
          auth: {
            username: this.username,
            password: this.accessKey
          },
          timeout: TestData.waitTimes.veryLong
        }
      );
      return response.data;
    } catch (error: any) {
      logger.error(`Failed to get BrowserStack sessions: ${error.message}`);
      throw error;
    }
  }

  /**
   * Update session status
   */
  async updateSessionStatus(sessionId: string, status: 'passed' | 'failed'): Promise<void> {
    try {
      await axios.put(
        `${this.apiUrl}/sessions/${sessionId}.json`,
        { status },
        {
          auth: {
            username: this.username,
            password: this.accessKey
          },
          timeout: TestData.waitTimes.veryLong
        }
      );
      logger.info(`BrowserStack session ${sessionId} updated to ${status}`);
    } catch (error: any) {
      logger.error(`Failed to update BrowserStack session status: ${error.message}`);
      throw error;
    }
  }

  /**
   * Get session video URL
   */
  async getSessionVideoUrl(sessionId: string): Promise<string> {
    try {
      const session = await this.getSession(sessionId);
      return session.video_url || '';
    } catch (error: any) {
      logger.error(`Failed to get BrowserStack session video: ${error.message}`);
      return '';
    }
  }
}

