export type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  width?: number;
  [x: string]: any; // eslint-disable-line
};

export type User = {
  id: string;
  createdAt: string;
  email: string;
  phone: string;
  firstName: string;
  lastName: string;
  status: string;
  profilePicture: string;
  emailVerified: boolean;
  isAdmin: boolean;
  signUpMethod: string;
  address: Address;
  operator: Operator;
  member: Member;
  token?: string;
  credit: number;
  verification: string;
};

export type Address = {
  id: string;
  createdAt: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  user: User;
};

export type Operator = {
  id: string;
  createdAt: string;
  name: string;
  email: string;
  phone: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  owner: User;
  vessels: Vessel[];
  members: Member[];
};

export type Vessel = {
  id: string;
  createdAt: string;
  name: string;
  registrationNumber: string;
  picture: string;
  operator: Operator;
  members: Member[];
  trips: Trip[];
  status: string;
};

export type Member = {
  id: string;
  createdAt: string;
  operator: Operator;
  user: User;
  role: string;
  vessels: Vessel[];
};

export type Trip = {
  id: string;
  createdAt: string;
  date: string;
  time: string;
  vessel: Vessel;
  startingPort: string;
  endingPort: string;
  status: string;
  category: string;
  description: string;
  maxCapacity: number;
  estimatedTime: number;
  ticketCount: number;
  packageCount: number;
};
