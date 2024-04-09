// Interface to defining our object of response functions
export interface ResponseFuncs {
  GET?: Function;
  POST?: Function;
  PUT?: Function;
  DELETE?: Function;
}

// Interface to define our Seed model on the frontend
export interface Seed {
  _id?: number;
  address: string;
  filename: string;
}

// Interface to define our Seed model on the frontend
export interface Greenhouse {
  _id?: number;
  address: string;
  filename: string;
}

export type GreenhouseCoords = {
  coordinates: { x: number; y: number };
  tokenId: string;
  name: string;
}[];

export type SingleCoordinates = {
  coordinates: { x: number; y: number };
  tokenId: string;
  name: string;
} | null;
