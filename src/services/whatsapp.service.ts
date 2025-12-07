import axios from 'axios';
import { logger } from '../utils/logger';
import { TestData } from '../fixtures/test-data';

export interface WhatsAppMessage {
  to: string;
  message: string;
}

export class WhatsAppService {
  private apiUrl: string;
  private apiKey: string;

  constructor(apiUrl: string, apiKey: string) {
    this.apiUrl = apiUrl;
    this.apiKey = apiKey;
  }

  /**
   * Send WhatsApp message
   */
  async sendMessage(message: WhatsAppMessage): Promise<void> {
    try {
      await axios.post(
        `${this.apiUrl}/send`,
        message,
        {
          headers: {
            'Authorization': `Bearer ${this.apiKey}`,
            'Content-Type': 'application/json'
          },
          timeout: TestData.waitTimes.veryLong
        }
      );
      logger.info(`WhatsApp message sent to ${message.to}`);
    } catch (error: any) {
      logger.error(`Failed to send WhatsApp message: ${error.message}`);
      throw error;
    }
  }

  /**
   * Send test results via WhatsApp
   */
  async sendTestResults(
    phoneNumber: string,
    totalTests: number,
    passed: number,
    failed: number
  ): Promise<void> {
    const message = `Test Execution Results:\n` +
      `Total: ${totalTests}\n` +
      `Passed: ${passed}\n` +
      `Failed: ${failed}\n` +
      `Status: ${failed > 0 ? '❌ Failed' : '✅ Passed'}`;

    await this.sendMessage({
      to: phoneNumber,
      message
    });
  }

  /**
   * Send error notification via WhatsApp
   */
  async sendErrorNotification(phoneNumber: string, error: string): Promise<void> {
    const message = `🚨 Test Execution Error:\n${error}`;

    await this.sendMessage({
      to: phoneNumber,
      message
    });
  }
}

