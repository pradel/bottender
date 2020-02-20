import qs from 'querystring';

// import AxiosError from 'axios-error';
import axios, { AxiosInstance } from 'axios';
import {
  OnRequestFunction,
  camelcaseKeys,
  createRequestInterceptor,
} from 'messaging-api-common';

type ClientConfig = {
  accountSid: string;
  authToken: string;
  origin?: string;
};

export default class TwilioClient {
  static connect(config: ClientConfig): TwilioClient {
    return new TwilioClient(config);
  }

  _onRequest: OnRequestFunction | undefined;

  _axios: AxiosInstance;

  constructor(config: ClientConfig) {
    const twilioOrigin = `https://${config.accountSid}:${config.authToken}@api.twilio.com`;
    this._axios = axios.create({
      baseURL: `${config.origin || twilioOrigin}/2010-04-01/Accounts/${
        config.accountSid
      }/`,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    this._axios.interceptors.request.use(
      createRequestInterceptor({
        onRequest: this._onRequest,
      })
    );
  }

  get axios(): AxiosInstance {
    return this._axios;
  }

  async createMessage({
    from,
    body,
    to,
  }: {
    from: string;
    body: string;
    to: string;
  }) {
    const { data } = await this._axios.post<{
      sid: string;
      date_created: string;
      date_updated: string;
      date_sent: null;
      account_sid: string;
      to: string;
      from: string;
      messaging_service_sid: null;
      body: string;
      status: string;
      num_segments: string;
      num_media: string;
      direction: string;
      api_version: string;
      price: null;
      price_unit: null;
      error_code: null;
      error_message: null;
      uri: string;
      subresource_uris: {
        uri: string;
      };
    }>(
      '/Messages.json',
      qs.stringify(
        camelcaseKeys({
          From: from,
          To: to,
          Body: body,
        })
      )
    );
    return camelcaseKeys(data);
  }
}
