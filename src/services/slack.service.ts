import axios from 'axios';
import { logger } from '../utils/logger';
import { TestData } from '../fixtures/test-data';

export interface SlackMessage {
  text: string;
  channel?: string;
  username?: string;
  icon_emoji?: string;
  attachments?: any[];
}

export class SlackService {
  private webhookUrl: string;

  constructor(webhookUrl: string) {
    this.webhookUrl = webhookUrl;
  }

  /**
   * Send message to Slack
   */
  async sendMessage(message: SlackMessage): Promise<void> {
    try {
      await axios.post(this.webhookUrl, message, {
        timeout: TestData.waitTimes.veryLong
      });
      logger.info('Slack message sent successfully');
    } catch (error: any) {
      logger.error(`Failed to send Slack message: ${error.message}`);
      throw error;
    }
  }

  /**
   * Send test results to Slack
   */
  async sendTestResults(
    totalTests: number,
    passed: number,
    failed: number,
    duration: number,
    reportUrl?: string
  ): Promise<void> {
    const message: SlackMessage = {
      text: 'Test Execution Completed',
      username: 'Test Automation',
      icon_emoji: ':robot_face:',
      attachments: [
        {
          color: failed > 0 ? 'danger' : 'good',
          fields: [
            { title: 'Total Tests', value: totalTests.toString(), short: true },
            { title: 'Passed', value: passed.toString(), short: true },
            { title: 'Failed', value: failed.toString(), short: true },
            { title: 'Duration', value: `${duration}s`, short: true }
          ],
          ...(reportUrl && {
            actions: [{ type: 'button', text: 'View Report', url: reportUrl }]
          })
        }
      ]
    };

    await this.sendMessage(message);
  }

  /**
   * Send error notification to Slack
   */
  async sendErrorNotification(error: string, details?: string): Promise<void> {
    const message: SlackMessage = {
      text: 'Test Execution Error',
      username: 'Test Automation',
      icon_emoji: ':warning:',
      attachments: [
        {
          color: 'danger',
          fields: [
            { title: 'Error', value: error, short: false },
            ...(details ? [{ title: 'Details', value: details, short: false }] : [])
          ]
        }
      ]
    };

    await this.sendMessage(message);
  }
}

