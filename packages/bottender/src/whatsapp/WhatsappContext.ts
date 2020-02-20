import Context from '../context/Context';
// import Session from '../session/Session';
// import { RequestContext } from '../types';

import WhatsappEvent from './WhatsappEvent';

type WhatsappClient = any; // FIXME

class WhatsappContext extends Context<WhatsappClient, WhatsappEvent> {
  /**
   * The name of the platform.
   *
   */
  get platform(): string {
    return 'whatsapp';
  }

  /**
   * Send text to the owner of then session.
   *
   */
  async sendText(text: string, options?: Record<string, any>): Promise<any> {
    console.log(text, options);
  }
}

export default WhatsappContext;
