import { gql } from "./__generated__";

export const GET_TRIPS = gql(`
query GetAllTrips ($take: Int, $skip: Int){
getAllTrips(take: $take, skip: $skip) {
    id
    createdAt
    destination
    endAddress
    seatLimit
    startAddress
    startingPoint
    startTime
    offeredBy
    user {
      hourlyRate
      avgRating
	  contact
	  age
    }
}}`);

export const GET_TRIP_DETAILS = gql(`
query GetTripDetails($getTripDetailsId: String!) {
  getTripDetails(id: $getTripDetailsId) {
    id
    offeredBy
    startAddress
    endAddress
    startTime
	seatLimit
    user {
    tripsTaken
      firstName         
      contact
      lastName
      photoUrl
      avgRating
      hourlyRate
    }
  }
}
`);

export const GET_TRIP_RESERVATIONS = gql(`
query GetTripReservations($tripId: String!, $take: Int) {
  getTripReservations(tripId: $tripId, take: $take) {
    approxDistance
    pickupTitle
    status
    id
    userInfo {
      id
      firstName
      lastName
    }
  }
}`);

export const GET_USER_RESERVATIONS =
  gql(`query GetUserReservations($userId: String!) {
  getUserReservations(userId: $userId) {
id    
pickupTitle
fare
approxDistance
tripData {
  id
  startTime
}
userInfo {
  avgRating
  firstName
  lastName
  photoUrl
}
  }
}`);
