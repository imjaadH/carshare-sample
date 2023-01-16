/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Coordinates: any;
  DATETIME: any;
};

export type Agent = {
  __typename?: 'Agent';
  area?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DATETIME']>;
  id?: Maybe<Scalars['ID']>;
  name?: Maybe<Scalars['String']>;
  properties?: Maybe<PropertiesData>;
  rating?: Maybe<Scalars['Float']>;
  updatedAt?: Maybe<Scalars['DATETIME']>;
};

export type AuthResponse = {
  __typename?: 'AuthResponse';
  refreshToken?: Maybe<Scalars['String']>;
  token?: Maybe<Scalars['String']>;
};

export type House = {
  __typename?: 'House';
  agentId: Scalars['String'];
  createdAt: Scalars['DATETIME'];
  id: Scalars['String'];
  price: Scalars['Int'];
  totalBath: Scalars['Int'];
  totalBed: Scalars['Int'];
  updatedAt: Scalars['DATETIME'];
};

export type LoginResponse = AuthResponse | User;

export type Mutation = {
  __typename?: 'Mutation';
  addProperty: House;
  addUser?: Maybe<User>;
  authenticate?: Maybe<Scalars['String']>;
  createReservation?: Maybe<Reservation>;
  createTrip?: Maybe<Trip>;
  refresh?: Maybe<Scalars['String']>;
};


export type MutationAddPropertyArgs = {
  agentId: Scalars['String'];
  price: Scalars['Int'];
  totalBath: Scalars['Int'];
  totalBed: Scalars['Int'];
};


export type MutationAddUserArgs = {
  data?: InputMaybe<UserData>;
};


export type MutationAuthenticateArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};


export type MutationCreateReservationArgs = {
  data?: InputMaybe<ReservationData>;
};


export type MutationCreateTripArgs = {
  data?: InputMaybe<TripInput>;
};

export type PropertiesData = {
  __typename?: 'PropertiesData';
  count?: Maybe<Scalars['Int']>;
  data: Array<House>;
};

export type Query = {
  __typename?: 'Query';
  getAgentData: Agent;
  getAllProperties: Array<Maybe<House>>;
  getAllTrips: Array<Maybe<Trip>>;
  getAllUsers: Array<Maybe<User>>;
  getReservationInfo: Reservation;
  getTransactions?: Maybe<Array<Maybe<Transaction>>>;
  getTripDetails: Trip;
  getTripReservations?: Maybe<Array<Maybe<Reservation>>>;
  getUserDetails: User;
  getUserReservations?: Maybe<Array<Maybe<Reservation>>>;
  getWallet?: Maybe<Wallet>;
};


export type QueryGetAgentDataArgs = {
  id: Scalars['String'];
};


export type QueryGetAllPropertiesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
};


export type QueryGetAllTripsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
};


export type QueryGetAllUsersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
};


export type QueryGetReservationInfoArgs = {
  id?: InputMaybe<Scalars['String']>;
};


export type QueryGetTransactionsArgs = {
  from?: InputMaybe<Scalars['String']>;
};


export type QueryGetTripDetailsArgs = {
  id: Scalars['String'];
};


export type QueryGetTripReservationsArgs = {
  take?: InputMaybe<Scalars['Int']>;
  tripId: Scalars['String'];
};


export type QueryGetUserReservationsArgs = {
  take?: InputMaybe<Scalars['Int']>;
  userId: Scalars['String'];
};


export type QueryGetWalletArgs = {
  userId?: InputMaybe<Scalars['String']>;
};

export type Rating = {
  __typename?: 'Rating';
  createdAt?: Maybe<Scalars['DATETIME']>;
  id?: Maybe<Scalars['ID']>;
  updatedAt?: Maybe<Scalars['DATETIME']>;
  userId?: Maybe<Scalars['ID']>;
  value?: Maybe<Scalars['Int']>;
};

export type Reservation = {
  __typename?: 'Reservation';
  approxDistance?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DATETIME']>;
  endAddress: Scalars['String'];
  fare: Scalars['Int'];
  id?: Maybe<Scalars['String']>;
  pickupTitle: Scalars['String'];
  startAddress: Scalars['String'];
  status?: Maybe<Status>;
  tripData: Trip;
  tripId?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['DATETIME']>;
  userId?: Maybe<Scalars['String']>;
  userInfo: User;
};

export type ReservationData = {
  approxDistance?: InputMaybe<Scalars['String']>;
  endAddress?: InputMaybe<Scalars['String']>;
  fare: Scalars['Int'];
  pickupTitle?: InputMaybe<Scalars['String']>;
  startAddress?: InputMaybe<Scalars['String']>;
  status?: InputMaybe<Status>;
  tripId: Scalars['String'];
  userId: Scalars['String'];
};

export enum Status {
  Cancelled = 'cancelled',
  Hold = 'hold',
  Pending = 'pending',
  Success = 'success'
}

export type Transaction = {
  __typename?: 'Transaction';
  amount?: Maybe<Scalars['Int']>;
  createdAt?: Maybe<Scalars['DATETIME']>;
  from?: Maybe<Scalars['ID']>;
  id?: Maybe<Scalars['ID']>;
  status?: Maybe<Status>;
  to?: Maybe<Scalars['ID']>;
  updatedAt?: Maybe<Scalars['DATETIME']>;
};

export type Trip = {
  __typename?: 'Trip';
  createdAt?: Maybe<Scalars['DATETIME']>;
  destination: Scalars['String'];
  endAddress?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['ID']>;
  offeredBy?: Maybe<Scalars['ID']>;
  seatLimit?: Maybe<Scalars['Int']>;
  startAddress?: Maybe<Scalars['String']>;
  startTime?: Maybe<Scalars['DATETIME']>;
  startingPoint: Scalars['String'];
  status?: Maybe<Status>;
  tripDuration: Scalars['Int'];
  updatedAt?: Maybe<Scalars['DATETIME']>;
  user: User;
};

export type TripInput = {
  destination?: InputMaybe<Scalars['String']>;
  endAddress?: InputMaybe<Scalars['String']>;
  offeredBy?: InputMaybe<Scalars['String']>;
  seatLimit?: InputMaybe<Scalars['Int']>;
  startAddress?: InputMaybe<Scalars['String']>;
  startTime?: InputMaybe<Scalars['DATETIME']>;
  startingPoint?: InputMaybe<Scalars['String']>;
  status: Status;
};

export type User = {
  __typename?: 'User';
  age: Scalars['Int'];
  avgRating?: Maybe<Scalars['String']>;
  contact: Scalars['String'];
  createdAt: Scalars['DATETIME'];
  emailAddress: Scalars['String'];
  firstName: Scalars['String'];
  gender: Scalars['Boolean'];
  hourlyRate?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['String']>;
  lastName: Scalars['String'];
  photoUrl?: Maybe<Scalars['String']>;
  ratings?: Maybe<Array<Maybe<Rating>>>;
  reservations?: Maybe<Array<Maybe<Reservation>>>;
  status: UserStatus;
  trips?: Maybe<Array<Maybe<Trip>>>;
  tripsTaken?: Maybe<Scalars['Int']>;
  updatedAt: Scalars['DATETIME'];
  wallet?: Maybe<Wallet>;
};


export type UserReservationsArgs = {
  take?: InputMaybe<Scalars['Int']>;
};

export type UserData = {
  age?: InputMaybe<Scalars['Int']>;
  contact?: InputMaybe<Scalars['String']>;
  emailAddress?: InputMaybe<Scalars['String']>;
  firstName?: InputMaybe<Scalars['String']>;
  gender?: InputMaybe<Scalars['Boolean']>;
  lastName?: InputMaybe<Scalars['String']>;
};

export enum UserStatus {
  Active = 'active',
  Blocked = 'blocked',
  Deleted = 'deleted'
}

export type Wallet = {
  __typename?: 'Wallet';
  createdAt?: Maybe<Scalars['DATETIME']>;
  id?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['DATETIME']>;
  userId?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['Int']>;
};

export type AuthenticateMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type AuthenticateMutation = { __typename?: 'Mutation', authenticate?: string | null };

export type CreateTripMutationVariables = Exact<{
  data?: InputMaybe<TripInput>;
}>;


export type CreateTripMutation = { __typename?: 'Mutation', createTrip?: { __typename?: 'Trip', id?: string | null, endAddress?: string | null, createdAt?: any | null } | null };

export type CreateReservationMutationVariables = Exact<{
  createReservationData?: InputMaybe<ReservationData>;
}>;


export type CreateReservationMutation = { __typename?: 'Mutation', createReservation?: { __typename?: 'Reservation', id?: string | null } | null };

export type GetAllTripsQueryVariables = Exact<{
  take?: InputMaybe<Scalars['Int']>;
  skip?: InputMaybe<Scalars['Int']>;
}>;


export type GetAllTripsQuery = { __typename?: 'Query', getAllTrips: Array<{ __typename?: 'Trip', id?: string | null, createdAt?: any | null, destination: string, endAddress?: string | null, seatLimit?: number | null, startAddress?: string | null, startingPoint: string, startTime?: any | null, offeredBy?: string | null, user: { __typename?: 'User', hourlyRate?: number | null, avgRating?: string | null, contact: string, age: number } } | null> };

export type GetTripDetailsQueryVariables = Exact<{
  getTripDetailsId: Scalars['String'];
}>;


export type GetTripDetailsQuery = { __typename?: 'Query', getTripDetails: { __typename?: 'Trip', id?: string | null, offeredBy?: string | null, startAddress?: string | null, endAddress?: string | null, startTime?: any | null, seatLimit?: number | null, user: { __typename?: 'User', tripsTaken?: number | null, firstName: string, contact: string, lastName: string, photoUrl?: string | null, avgRating?: string | null, hourlyRate?: number | null } } };

export type GetTripReservationsQueryVariables = Exact<{
  tripId: Scalars['String'];
  take?: InputMaybe<Scalars['Int']>;
}>;


export type GetTripReservationsQuery = { __typename?: 'Query', getTripReservations?: Array<{ __typename?: 'Reservation', approxDistance?: string | null, pickupTitle: string, status?: Status | null, id?: string | null, userInfo: { __typename?: 'User', id?: string | null, firstName: string, lastName: string } } | null> | null };

export type GetUserReservationsQueryVariables = Exact<{
  userId: Scalars['String'];
}>;


export type GetUserReservationsQuery = { __typename?: 'Query', getUserReservations?: Array<{ __typename?: 'Reservation', id?: string | null, pickupTitle: string, fare: number, approxDistance?: string | null, tripData: { __typename?: 'Trip', id?: string | null, startTime?: any | null }, userInfo: { __typename?: 'User', avgRating?: string | null, firstName: string, lastName: string, photoUrl?: string | null } } | null> | null };


export const AuthenticateDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Authenticate"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"password"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"authenticate"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}},{"kind":"Argument","name":{"kind":"Name","value":"password"},"value":{"kind":"Variable","name":{"kind":"Name","value":"password"}}}]}]}}]} as unknown as DocumentNode<AuthenticateMutation, AuthenticateMutationVariables>;
export const CreateTripDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateTrip"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"TripInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createTrip"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"endAddress"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}}]} as unknown as DocumentNode<CreateTripMutation, CreateTripMutationVariables>;
export const CreateReservationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateReservation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"createReservationData"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ReservationData"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createReservation"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"createReservationData"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<CreateReservationMutation, CreateReservationMutationVariables>;
export const GetAllTripsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetAllTrips"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"take"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"skip"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getAllTrips"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"take"},"value":{"kind":"Variable","name":{"kind":"Name","value":"take"}}},{"kind":"Argument","name":{"kind":"Name","value":"skip"},"value":{"kind":"Variable","name":{"kind":"Name","value":"skip"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"destination"}},{"kind":"Field","name":{"kind":"Name","value":"endAddress"}},{"kind":"Field","name":{"kind":"Name","value":"seatLimit"}},{"kind":"Field","name":{"kind":"Name","value":"startAddress"}},{"kind":"Field","name":{"kind":"Name","value":"startingPoint"}},{"kind":"Field","name":{"kind":"Name","value":"startTime"}},{"kind":"Field","name":{"kind":"Name","value":"offeredBy"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"hourlyRate"}},{"kind":"Field","name":{"kind":"Name","value":"avgRating"}},{"kind":"Field","name":{"kind":"Name","value":"contact"}},{"kind":"Field","name":{"kind":"Name","value":"age"}}]}}]}}]}}]} as unknown as DocumentNode<GetAllTripsQuery, GetAllTripsQueryVariables>;
export const GetTripDetailsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetTripDetails"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"getTripDetailsId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getTripDetails"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"getTripDetailsId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"offeredBy"}},{"kind":"Field","name":{"kind":"Name","value":"startAddress"}},{"kind":"Field","name":{"kind":"Name","value":"endAddress"}},{"kind":"Field","name":{"kind":"Name","value":"startTime"}},{"kind":"Field","name":{"kind":"Name","value":"seatLimit"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"tripsTaken"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"contact"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"photoUrl"}},{"kind":"Field","name":{"kind":"Name","value":"avgRating"}},{"kind":"Field","name":{"kind":"Name","value":"hourlyRate"}}]}}]}}]}}]} as unknown as DocumentNode<GetTripDetailsQuery, GetTripDetailsQueryVariables>;
export const GetTripReservationsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetTripReservations"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"tripId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"take"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getTripReservations"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"tripId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"tripId"}}},{"kind":"Argument","name":{"kind":"Name","value":"take"},"value":{"kind":"Variable","name":{"kind":"Name","value":"take"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"approxDistance"}},{"kind":"Field","name":{"kind":"Name","value":"pickupTitle"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"userInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}}]}}]}}]}}]} as unknown as DocumentNode<GetTripReservationsQuery, GetTripReservationsQueryVariables>;
export const GetUserReservationsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetUserReservations"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getUserReservations"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"pickupTitle"}},{"kind":"Field","name":{"kind":"Name","value":"fare"}},{"kind":"Field","name":{"kind":"Name","value":"approxDistance"}},{"kind":"Field","name":{"kind":"Name","value":"tripData"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"startTime"}}]}},{"kind":"Field","name":{"kind":"Name","value":"userInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"avgRating"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"photoUrl"}}]}}]}}]}}]} as unknown as DocumentNode<GetUserReservationsQuery, GetUserReservationsQueryVariables>;