import { v4 as uuidv4 } from 'uuid';
import { StringifyOptions } from 'querystring';
export class Todo {

  name: string;
  id: string;
  state: string;
  done: boolean;
  externalId: string;
  prio: number;

  constructor(name: string, state: string, prio: number) {
    this.name = name;
    this.state = state;
    this.id = uuidv4();
    this.done = false;
    this.prio = prio;




  }
}