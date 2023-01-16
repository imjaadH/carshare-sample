/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel-plugin for production.
 */
const documents = {
    "\n  mutation Authenticate($email: String!, $password: String!) {\n    authenticate(email: $email, password: $password)\n  }\n": types.AuthenticateDocument,
    "\n mutation CreateTrip($data: TripInput) {\n  createTrip(data: $data) {\n    id\n    endAddress\n    createdAt\n  }\n}\n": types.CreateTripDocument,
    "\nmutation CreateReservation($createReservationData: ReservationData) {\n  createReservation(data: $createReservationData) {\n    id\n  }\n}\n": types.CreateReservationDocument,
    "\nquery GetAllTrips ($take: Int, $skip: Int){\ngetAllTrips(take: $take, skip: $skip) {\n    id\n    createdAt\n    destination\n    endAddress\n    seatLimit\n    startAddress\n    startingPoint\n    startTime\n    offeredBy\n    user {\n      hourlyRate\n      avgRating\n\t  contact\n\t  age\n    }\n}}": types.GetAllTripsDocument,
    "\nquery GetTripDetails($getTripDetailsId: String!) {\n  getTripDetails(id: $getTripDetailsId) {\n    id\n    offeredBy\n    startAddress\n    endAddress\n    startTime\n\tseatLimit\n    user {\n    tripsTaken\n      firstName         \n      contact\n      lastName\n      photoUrl\n      avgRating\n      hourlyRate\n    }\n  }\n}\n": types.GetTripDetailsDocument,
    "\nquery GetTripReservations($tripId: String!, $take: Int) {\n  getTripReservations(tripId: $tripId, take: $take) {\n    approxDistance\n    pickupTitle\n    status\n    id\n    userInfo {\n      id\n      firstName\n      lastName\n    }\n  }\n}": types.GetTripReservationsDocument,
    "query GetUserReservations($userId: String!) {\n  getUserReservations(userId: $userId) {\nid    \npickupTitle\nfare\napproxDistance\ntripData {\n  id\n  startTime\n}\nuserInfo {\n  avgRating\n  firstName\n  lastName\n  photoUrl\n}\n  }\n}": types.GetUserReservationsDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation Authenticate($email: String!, $password: String!) {\n    authenticate(email: $email, password: $password)\n  }\n"): (typeof documents)["\n  mutation Authenticate($email: String!, $password: String!) {\n    authenticate(email: $email, password: $password)\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n mutation CreateTrip($data: TripInput) {\n  createTrip(data: $data) {\n    id\n    endAddress\n    createdAt\n  }\n}\n"): (typeof documents)["\n mutation CreateTrip($data: TripInput) {\n  createTrip(data: $data) {\n    id\n    endAddress\n    createdAt\n  }\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nmutation CreateReservation($createReservationData: ReservationData) {\n  createReservation(data: $createReservationData) {\n    id\n  }\n}\n"): (typeof documents)["\nmutation CreateReservation($createReservationData: ReservationData) {\n  createReservation(data: $createReservationData) {\n    id\n  }\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nquery GetAllTrips ($take: Int, $skip: Int){\ngetAllTrips(take: $take, skip: $skip) {\n    id\n    createdAt\n    destination\n    endAddress\n    seatLimit\n    startAddress\n    startingPoint\n    startTime\n    offeredBy\n    user {\n      hourlyRate\n      avgRating\n\t  contact\n\t  age\n    }\n}}"): (typeof documents)["\nquery GetAllTrips ($take: Int, $skip: Int){\ngetAllTrips(take: $take, skip: $skip) {\n    id\n    createdAt\n    destination\n    endAddress\n    seatLimit\n    startAddress\n    startingPoint\n    startTime\n    offeredBy\n    user {\n      hourlyRate\n      avgRating\n\t  contact\n\t  age\n    }\n}}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nquery GetTripDetails($getTripDetailsId: String!) {\n  getTripDetails(id: $getTripDetailsId) {\n    id\n    offeredBy\n    startAddress\n    endAddress\n    startTime\n\tseatLimit\n    user {\n    tripsTaken\n      firstName         \n      contact\n      lastName\n      photoUrl\n      avgRating\n      hourlyRate\n    }\n  }\n}\n"): (typeof documents)["\nquery GetTripDetails($getTripDetailsId: String!) {\n  getTripDetails(id: $getTripDetailsId) {\n    id\n    offeredBy\n    startAddress\n    endAddress\n    startTime\n\tseatLimit\n    user {\n    tripsTaken\n      firstName         \n      contact\n      lastName\n      photoUrl\n      avgRating\n      hourlyRate\n    }\n  }\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nquery GetTripReservations($tripId: String!, $take: Int) {\n  getTripReservations(tripId: $tripId, take: $take) {\n    approxDistance\n    pickupTitle\n    status\n    id\n    userInfo {\n      id\n      firstName\n      lastName\n    }\n  }\n}"): (typeof documents)["\nquery GetTripReservations($tripId: String!, $take: Int) {\n  getTripReservations(tripId: $tripId, take: $take) {\n    approxDistance\n    pickupTitle\n    status\n    id\n    userInfo {\n      id\n      firstName\n      lastName\n    }\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "query GetUserReservations($userId: String!) {\n  getUserReservations(userId: $userId) {\nid    \npickupTitle\nfare\napproxDistance\ntripData {\n  id\n  startTime\n}\nuserInfo {\n  avgRating\n  firstName\n  lastName\n  photoUrl\n}\n  }\n}"): (typeof documents)["query GetUserReservations($userId: String!) {\n  getUserReservations(userId: $userId) {\nid    \npickupTitle\nfare\napproxDistance\ntripData {\n  id\n  startTime\n}\nuserInfo {\n  avgRating\n  firstName\n  lastName\n  photoUrl\n}\n  }\n}"];

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
**/
export function gql(source: string): unknown;

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;