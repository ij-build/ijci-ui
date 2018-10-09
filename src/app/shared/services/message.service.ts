import { Injectable } from '@angular/core';
import { v4 as uuid } from 'uuid';

import { Message } from '../models/message';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  messages = [];

  add(message: string) {
    if (false) {
      const id = uuid();
      this.messages.push(new Message(id, message));
      setTimeout(() => this.remove(id), 5000);
    }
  }

  remove(id: string) {
    this.messages = this.messages.filter(m => m.id !== id);
  }

  clear() {
    this.messages = [];
  }
}
