import { gql } from "apollo-angular";

export const GET_TEAM_QUERY = gql `
    query($vehicleAge:String!) {
    getVehicleByAge(vehicleAge:$vehicleAge){
        firstName
        lastName
        email
        carMake
        carModel
        vinNumber
        manufacturedDate
        ageOfVehicle
        }

    }
`;

export const SEARCH_CAR_MODEL_QUERY = gql `
query($carModel:String!){ 
  allVehicles(carModel:$carModel,first: 100, after: null){
    pageInfo {
      hasNextPage
      endCursor
    }
    totalCount
    nodes {
      id
      firstName
      lastName
      email
      carMake
      carModel
      vinNumber
      manufacturedDate
      ageOfVehicle
    }
  }
}
`;

export const DELETE_VEHICLE_QUERY = gql `   
mutation deleteVehicle($id:ID!){
   deleteVehicle(id:$id ){  
       id
       firstName
       lastName
       email
       carMake
       carModel
       vinNumber
       manufacturedDate
       ageOfVehicle    
   }
 }
`;

export const UPDATE_VEHICLE_QUERY = gql `
mutation updateVehicleById($id:ID!,$firstName:String){
  updateVehicleById(id: $id, firstName: $firstName) {
        id
        firstName
        lastName
        email
        carMake
        carModel
        vinNumber
        manufacturedDate 
  }
}
`;

export const RETRIEVE_VEHICLE_QUERY = gql ` 
query($carModel:String!,$after:String){
  allVehicles(carModel: $carModel, first: 100, after: $after) {
    pageInfo {
      hasNextPage
      endCursor
    }
    totalCount
    nodes {
      id
      firstName
      lastName
      email
      carMake
      carModel
      vinNumber
      manufacturedDate
      ageOfVehicle
    }
  }
}
`;