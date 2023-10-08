export class Piulador {
  users: User[];

  constructor() {
    this.users = [];
  }

  register(id: string) {
    const user = new User(id);
    this.users.push(user);
  }

  writeMessage(id: string, message: string) {
    const user = this.getUser(id);
    return user.timeline.add(message);
  }

  readTimeline(id: string) {
    const user = this.getUser(id);

    return user.timeline.getAll();
  }

  private getUser(id: string): User {
    const user = this.users.find((user) => user.id === id);

    if (!user) {
      throw new Error(`🚨 User with id "${id}" does not exist!`);
    }

    return user;
  }
}

class User {
  id: string;
  timeline: Timeline;

  constructor(id: string) {
    this.id = id;
    this.timeline = new Timeline();
  }
}

type Message = {
  body: string;
  timestamp: number;
};

class Timeline {
  messages: Message[];
  counter: number;

  constructor() {
    this.messages = [];
    this.counter = 0;
  }

  add(message: string) {
    this.counter++;
    this.messages.push({
      body: message,
      timestamp: this.counter
    });
  }

  getAll() {
    return this.messages.map((message) => message.body);
  }
}
