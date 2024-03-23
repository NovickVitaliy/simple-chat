import {MessageType} from "./message-type";

export interface Message {
  author: string;
  message: string;
  type: MessageType;
}
