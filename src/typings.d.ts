interface Model {
  _id?: string;
}

interface User extends Model {
  username?: string;
  password?: string;
  loggedIn?: boolean;
}

interface HelpOffer extends Model {
  _id?: string;
  user: User;
  name: string;
  address: any;
  message: string;
  tasks: string[];
  checkup: {
    healthy: string,
    healthDetail: string
  };
}

interface HelpRequest extends Model {
  _id?: string;
  user: User;
  name: string;
  address: any;
  message: string;
  tasks: string[];
  checkup: {
    condition: string,
    conditionDetail: string
  };
}
