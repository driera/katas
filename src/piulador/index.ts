type UserData = { id: string; email: string };

export class Piulador {
  private users: Users;

  constructor() {
    this.users = new Users();
  }

  register(userData: UserData) {
    const user = new User(userData);
    this.users.addUser(user);
  }

  login(id: UserId) {
    const user = this.users.getUser(id);
    user.login();

    return user;
  }
}

export class Users {
  private profiles: User[];

  constructor() {
    this.profiles = [];
  }

  addUser(user: User) {
    this.profiles.push(user);
  }

  getUser(id: UserId) {
    const user = this.profiles.find((user) => user.id === id);

    if (!user) {
      throw new Error(`User with id ${id} does not exist!`);
    }

    return user;
  }
}

type UserId = User["id"];

type Message = {
  body: string;
  timestamp: number;
};

export class User {
  id: string;
  email: string;
  timeline: Message[];
  logged: boolean;

  constructor(user: { id: string; email: string }) {
    this.id = user.id;
    this.email = user.email;
    this.logged = false;
    this.timeline = [];
  }

  login() {
    this.logged = true;
  }

  getTimeline() {
    return this.timeline.reverse().map((message) => message.body);
  }

  write(message: Message["body"]) {
    this.timeline?.push({
      body: message,
      timestamp: Date.now()
    });
  }
}
