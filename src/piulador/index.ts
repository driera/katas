export class Piulador {
  users: Users;
  timelines: Timelines;

  constructor() {
    this.users = new Users();
    this.timelines = new Timelines();
  }

  register(id: string) {
    this.users.add(id);
    this.timelines.create(id);
  }

  writeMessage(id: string, message: string) {
    const user = this.users.getUser(id);
    this.timelines.addMessage(user.id, message);
  }

  readTimeline(id: string) {
    const user = this.users.getUser(id);
    return this.timelines.getMessages(user.id);
  }
}

type User = {
  id: string;
};
class Users {
  profiles: User[];

  constructor() {
    this.profiles = [];
  }

  add(id: string) {
    this.profiles.push({ id });
  }

  getUser(id: string): User {
    const user = this.profiles.find((user) => user.id === id);

    if (!user) {
      throw new Error(`🚨 User with id "${id}" does not exist!`);
    }

    return user;
  }
}

type Message = {
  body: string;
  timestamp: number;
};

class Timelines {
  counter: number;
  messages: Record<string, Message[]>;

  constructor() {
    this.counter = 0;
    this.messages = {};
  }

  create(userId: string) {
    this.messages[userId] = [];
  }

  addMessage(userId: string, message: string) {
    this.counter++;
    this.messages[userId].push({
      body: message,
      timestamp: this.counter
    });
  }

  getMessages(userId: string) {
    return this.messages[userId].map((message) => message.body);
  }
}
