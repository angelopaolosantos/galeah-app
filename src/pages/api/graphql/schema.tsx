// data/schema.js
import { gql } from 'apollo-server-micro'
import { makeExecutableSchema } from 'graphql-tools'
import resolvers from './resolver'

// Define our schema using the GraphQL schema language
const typeDefs = gql`
  scalar Date

  type Customer {
    _id: ID!
    firstName: String!
    lastName: String!
    email: String
    phone: String
    address: String
    created: Date
    updated: Date
    notes: String
  }

  type SpecialRate {
    name: String!
    description: String
    date: Date
    rate: Float
  }

  type Room {
    _id: ID!
    name: String!
    description: String
    reservedDates: [Date]
    rate: Float
    specialRate: [SpecialRate]
  }

  type ReservationDetail {
    room: String
    reservedDate: Date
    rate: Float
  }

  type Reservation {
    _id: ID!
    customer_id: ID
    firstName: String!
    lastName: String
    email: String!
    phone: String
    created: Date
    modified: Date
    notes: String
    reserves: [ReservationDetail]
    status: String
    booking_id: ID
    coupons: [String]
  }

  type Booking {
    _id: ID!
    reservation: Reservation!
    status: String!
    checkedIn: Date
    checkedOut: Date
    invoice_id: ID
    notes: String
  }

  type InvoiceItem {
    name: String
    description: String
    quantity: Int
    price: Float
  }

  type Invoice {
    _id: ID!
    date: Date!
    firstName: String!
    lastName: String
    email: String!
    phone: String
    address: String
    items: [InvoiceItem]
    total: Float
    status: String
    notes: String
  }

  type RequestStatus {
    status: String!
    message: String
  }

  type Query {
    customers: [Customer]
    customer(id: ID!): Customer
    reservations: [Reservation]
    reservation(id: ID!): Reservation
    bookings: [Booking]
    booking(id: ID!): Booking
    invoices: [Invoices]
    invoice(id: ID!): Invoice
    rooms: [Room]
    room(id: ID!): Room
  }

  input CustomerInput {
    firstName: String
    lastName: String
    email: String
    phone: String
    address: String
    created: Date
    updated: Date
    notes: String
  }

  input ReservationInput {
    customer_id: ID
    firstName: String
    lastName: String
    email: String
    phone: String
    created: Date
    modified: Date
    notes: String
    reserves: [ReservationDetail]
    status: String
    booking_id: ID
    coupons: [String]
  }

  input BookingInput {
    reservation: Reservation
    status: String
    checkedIn: Date
    checkedOut: Date
    invoice_id: ID
    notes: String
  }

  input InvoiceInput {
    date: Date
    firstName: String
    lastName: String
    email: String
    phone: String
    address: String
    items: [InvoiceItem]
    total: Float
    status: String
    notes: String
  }

  input RoomInput {
    name: String
    description: String
    reservedDates: [Date]
    rate: Float
    specialRate: [SpecialRate]
  }

  type Mutation {
    createCustomer(input: CustomerInput!): Customer
    updateCustomer(id: ID!, input: CustomerInput): Customer
    deleteCustomer(id: ID!): RequestStatus

    createReservation(input: ReservationInput!): Reservation
    updateReservation(id: ID!, input: ReservationInput): Reservation
    deleteReservation(id: ID!): RequestStatus

    createBooking(input: BookingInput!): Booking
    updateBooking(id: ID!, input: BookingInput): Booking
    deleteBooking(id: ID!): RequestStatus

    createInvoice(input: InvoiceInput!): Invoice
    updateInvoice(id: ID!, input: InvoiceInput): Invoice
    deleteInvoice(id: ID!): RequestStatus

    createRoom(input: RoomInput!): Room
    updateRoom(id: ID!, input: RoomInput): Room
    deleteRoom(id: ID!): RequestStatus
  }

`
export default makeExecutableSchema({ typeDefs, resolvers })