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
