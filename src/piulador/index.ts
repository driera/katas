export class Piulador {
  private users: Users;
  private timelines: Timelines;

  constructor() {
    this.users = new Users();
    this.timelines = new Timelines();
  }

  register(id: UserId) {
    this.users.add(id);
    this.timelines.create(id);
  }

  writeMessage(id: UserId, message: string) {
    const user = this.users.getUser(id);
    this.timelines.addMessage(user.id, message);
  }

  readTimeline(id: UserId) {
    const user = this.users.getUser(id);
    return this.timelines.getMessages(user.id).map((message) => message.body);
  }

  followTo(userId: UserId, targetId: UserId) {
    const user = this.users.getUser(userId);
    const target = this.users.getUser(targetId);

    target.addFollower(user.id);
    user.addFollowing(target.id);
  }

  getFollowers(userId: UserId) {
    const user = this.users.getUser(userId);
    return user.getFollowers();
  }

  readFeed(userId: UserId) {
    const user = this.users.getUser(userId);
    const following = user.getFollowing();

    const messages = following
      .flatMap((id) => {
        const user = this.users.getUser(id);
        return this.timelines
          .getMessages(user.id)
          .map((message) => ({ ...message, user: user.id }));
      })
      .sort((a, b) => b.timestamp - a.timestamp)
      .map((message) => message.body);

    return messages;
  }
}

type UserId = string;
class User {
  id: UserId;
  private followers: UserId[];
  private following: UserId[];

  constructor(id: UserId) {
    this.id = id;
    this.followers = [];
    this.following = [];
  }

  addFollower(id: UserId) {
    this.followers.push(id);
  }

  addFollowing(id: UserId) {
    this.following.push(id);
  }

  getFollowers() {
    return this.followers;
  }

  getFollowing() {
    return this.following;
  }
}
class Users {
  private profiles: User[];

  constructor() {
    this.profiles = [];
  }

  add(id: UserId) {
    const user = new User(id);
    this.profiles.push(user);
  }

  getUser(id: UserId): User {
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
  private counter: number;
  private messages: Record<string, Message[]>;

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
    return this.messages[userId];
  }
}
