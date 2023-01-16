import { gql } from "./__generated__";

export const AUTHENTICATE = gql(`
  mutation Authenticate($email: String!, $password: String!) {
    authenticate(email: $email, password: $password)
  }
`);

export const CREATE_TRIP = gql(`
 mutation CreateTrip($data: TripInput) {
  createTrip(data: $data) {
    id
    endAddress
    createdAt
  }
}
`);

export const CREATE_RESERVATION = gql(`
mutation CreateReservation($createReservationData: ReservationData) {
  createReservation(data: $createReservationData) {
    id
  }
}
`);
