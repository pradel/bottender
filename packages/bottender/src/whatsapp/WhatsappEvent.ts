import { Event } from '../context/Event';

type WhatsappRawEvent = {
  /**
   * A 34 character unique identifier for the message. May be used to later retrieve this message from the REST API.
   */
  messageSid: string;
  /**
   * Same value as MessageSid. Deprecated and included for backward compatibility.
   */
  smsSid: string;
  /**
   * The 34 character id of the Account this message is associated with.
   */
  accountSid: string;
  /**
   * The 34 character id of the Messaging Service associated with the message.
   */
  messagingServiceSid: string;
  /**
   * The phone number or Channel address that sent this message.
   */
  from: string;
  /**
   * The phone number or Channel address of the recipient.
   */
  to: string;
  /**
   * The text body of the message. Up to 1600 characters long.
   */
  body: string;
  /**
   * The city of the sender
   */
  fromCity?: string;
  /**
   * The state or province of the sender.
   */
  fromState?: string;
  /**
   * The postal code of the called sender.
   */
  fromZip?: string;
  /**
   * The country of the called sender.
   */
  fromCountry?: string;
  /**
   * The city of the recipient.
   */
  toCity?: string;
  /**
   * The state or province of the recipient.
   */
  toState?: string;
  /**
   * The postal code of the recipient.
   */
  toZip?: string;
  /**
   * The country of the recipient.
   */
  toCountry?: string;
} & (
  | {
      /**
       * The number of media items associated with your message
       */
      numMedia: 0;
    }
  /**
   * Twilio sends form variables named MediaUrlX, where X is a zero-based index.
   * WhatsApp messages will only contain one media file per incoming message, so you can access the file at MediaUrl0 on the incoming request from Twilio to your webhook URL.
   */
  | {
      numMedia: 1;
      /**
       * The ContentTypes for the Media stored at MediaUrl0.
       */
      mediaContentType0: string;
      /**
       * A URL referencing the content of the media received in the Message.
       */
      mediaUrl0: string;
    }
);

type Message = WhatsappRawEvent; // FIXME

export default class WhatsappEvent implements Event<WhatsappRawEvent> {
  _rawEvent: WhatsappRawEvent;

  constructor(rawEvent: WhatsappRawEvent) {
    this._rawEvent = rawEvent;
  }

  /**
   * Underlying raw event from WhatsApp.
   *
   */
  get rawEvent(): WhatsappRawEvent {
    return this._rawEvent;
  }

  /**
   * Determine if the event is a message event.
   *
   */
  get isMessage(): boolean {
    return true;
  }

  /**
   * The message object from Messenger raw event.
   *
   */
  get message(): Message | null {
    return this._rawEvent;
  }

  /**
   * Determine if the event is a message event which includes text.
   *
   */
  get isText(): boolean {
    return true;
  }

  /**
   * The text string from Messenger raw event.
   *
   */
  get text(): string | null {
    return this._rawEvent.body;
  }
}
