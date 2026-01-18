export interface Placement {
  id: number;
  companyName: string;
  role: RoleType;
  location: LocationType;
  description: string;
  verified: boolean;
  email: string;
  stipend: boolean;
  image: string;
  rating: number;
}

export enum RoleType {
  ALL = 'All Roles',
  SOFTWARE_DEV = 'Software Dev',
  NETWORKING = 'Networking',
  HARDWARE = 'Hardware',
  CYBERSECURITY = 'Cybersecurity',
  IT_SUPPORT = 'IT Support'
}

export enum LocationType {
  ALL = 'All Locations',
  WUSE = 'Wuse',
  GARKI = 'Garki',
  MAITAMA = 'Maitama',
  JABI = 'Jabi',
  CBD = 'Central Business District',
  KUBWA = 'Kubwa'
}

export interface User {
  email: string;
  uid: string;
}