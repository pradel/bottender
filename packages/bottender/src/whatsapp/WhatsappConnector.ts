import EventEmitter from 'events';

import Session from '../session/Session';
import { Connector } from '../bot/Connector';
import { RequestContext } from '../types';

import TwilioClient from './TwilioClient';
import WhatsappContext from './WhatsappContext';
import WhatsappEvent from './WhatsappEvent';

export type WhatsappRequestBody = any;

type ConstructorOptionsWithoutClient = {
  accountSid: string;
  authToken: string;
  origin?: string;
};

type ConstructorOptionsWithClient = {
  client: TwilioClient;
  origin?: string;
};

type ConstructorOptions =
  | ConstructorOptionsWithoutClient
  | ConstructorOptionsWithClient;

export default class WhatsappConnector
  implements Connector<WhatsappRequestBody, TwilioClient> {
  _client: TwilioClient;

  constructor(options: ConstructorOptions) {
    if ('client' in options) {
      this._client = options.client;
    } else {
      const { accountSid, authToken, origin } = options;

      this._client = TwilioClient.connect({
        accountSid,
        authToken,
        origin,
      });
    }
  }

  get platform(): string {
    return 'whatsapp';
  }

  get client(): TwilioClient {
    return this._client;
  }

  getUniqueSessionKey(body: WhatsappRequestBody): string {
    console.log('getUniqueSessionKey', body);
    return '1';
  }

  async updateSession(
    session: Session,
    body: WhatsappRequestBody
  ): Promise<void> {
    // do not thing?
    console.log({ session, body });
  }

  mapRequestToEvents(body: WhatsappRequestBody): WhatsappEvent[] {
    return [new WhatsappEvent(body)];
  }

  createContext(params: {
    event: WhatsappEvent;
    session: Session | null;
    initialState?: Record<string, any> | null;
    requestContext?: RequestContext;
    emitter?: EventEmitter | null;
  }): WhatsappContext {
    return new WhatsappContext({
      ...params,
      client: this._client,
    });
  }

  preprocess({
    method,
    headers,
    query,
    rawBody,
    body,
  }: {
    method: string;
    headers: Record<string, any>;
    query: Record<string, any>;
    rawBody: string;
    body: Record<string, any>;
  }) {
    console.log({
      method,
      headers,
      query,
      rawBody,
      body,
    });
    return {
      shouldNext: false,
    };
  }
}
