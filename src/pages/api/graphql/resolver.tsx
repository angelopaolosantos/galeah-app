import { AuthenticationError } from "apollo-server-micro";
import { argsToArgsConfig } from "graphql/type/definition";
import { ObjectId } from "mongodb";
import { GraphQLScalarType } from 'graphql';
import { Kind } from 'graphql/language';


const resolvers = {
  Date: new GraphQLScalarType({
    name: 'Date',
    description: 'Date custom scalar type',
    parseValue(value) {
      return new Date(value); // value from the client
    },
    serialize(value) {
      return value.getTime(); // value sent to the client
    },
    parseLiteral(ast) {
      if (ast.kind === Kind.INT) {
        return parseInt(ast.value, 10); // ast value is always in string format
      }
      return null;
    },
  }),

  Query: {
    customers: async (_parent, _args, _context, _info) => {
      const result = await _context.db
        .collection("customers")
        .find(_args)
        .toArray();

      return result;
    },

    customer: async (_parent, _args, _context, _info) => {
      const result = await _context.db
        .collection("customers")
        .findOne({ _id: ObjectId(_args.id) });
      return result;
    },

    reservations: async (_parent, _args, _context, _info) => {
      const result = await _context.db
        .collection("reservations")
        .find(_args)
        .toArray();

      return result;
    },

    reservation: async (_parent, _args, _context, _info) => {
      const result = await _context.db
        .collection("reservations")
        .findOne({_id: ObjectId(_args.id)})

      return result;
    },

    bookings: async (_parent, _args, _context, _info) => {
      const result = await _context.db
        .collection("bookings")
        .find(_args)
        .toArray();

      return result;
    },

    booking: async (_parent, _args, _context, _info) => {
      const result = await _context.db
        .collection("bookings")
        .findOne({_id: ObjectId(_args.id)})

      return result;
    },

    invoices: async (_parent, _args, _context, _info) => {
      const result = await _context.db
        .collection("invoices")
        .find(_args)
        .toArray();

      return result;
    },

    invoice: async (_parent, _args, _context, _info) => {
      const result = await _context.db
        .collection("invoices")
        .findOne({_id: ObjectId(_args.id)})

      return result;
    },

    rooms: async (_parent, _args, _context, _info) => {
      const result = await _context.db
        .collection("rooms")
        .find(_args)
        .toArray();

      return result;
    },

    room: async (_parent, _args, _context, _info) => {
      const result = await _context.db
        .collection("rooms")
        .findOne({_id: ObjectId(_args.id)})

      return result;
    },
  },
  Mutation: {
    createCustomer: async (_parent, _args, _context, _info) => {
      const response = await _context.db
        .collection("customers")
        .insertOne(_args.input);

      return { ..._args.input, _id: ObjectId(response.insertedId) };
    },
    updateCustomer: async (_parent, _args, _context, _info) => {
      const response = await _context.db
        .collection("customers")
        .updateOne({ _id: ObjectId(_args.id) }, { $set: _args.input });

      return { ..._args.input, _id: ObjectId(_args.id) };
    },
    deleteCustomer: async (_parent, _args, _context, _info) => {
      const response = await _context.db
        .collection("customers")
        .deleteOne({ _id: ObjectId(_args.id) });

      return { status: "success", message: "Customer was deleted." };
    },

    createReservation: async (_parent, _args, _context, _info) => {
      const response = await _context.db
        .collection("reservations")
        .insertOne(_args.input);

      return { ..._args.input, _id: ObjectId(response.insertedId) };
    },
    updateReservation: async (_parent, _args, _context, _info) => {
      const response = await _context.db
        .collection("reservations")
        .updateOne({ _id: ObjectId(_args.id) }, { $set: _args.input });

      return { ..._args.input, _id: ObjectId(_args.id) };
    },
    deleteReservation: async (_parent, _args, _context, _info) => {
      const response = await _context.db
        .collection("reservations")
        .deleteOne({ _id: ObjectId(_args.id) });

      return { status: "success", message: "Reservation was deleted." };
    },

    createBooking: async (_parent, _args, _context, _info) => {
      const response = await _context.db
        .collection("bookings")
        .insertOne(_args.input);

      return { ..._args.input, _id: ObjectId(response.insertedId) };
    },
    updateBooking: async (_parent, _args, _context, _info) => {
      const response = await _context.db
        .collection("bookings")
        .updateOne({ _id: ObjectId(_args.id) }, { $set: _args.input });

      return { ..._args.input, _id: ObjectId(_args.id) };
    },
    deleteBooking: async (_parent, _args, _context, _info) => {
      const response = await _context.db
        .collection("bookings")
        .deleteOne({ _id: ObjectId(_args.id) });

      return { status: "success", message: "Booking was deleted." };
    },

    createInvoice: async (_parent, _args, _context, _info) => {
      const response = await _context.db
        .collection("invoices")
        .insertOne(_args.input);

      return { ..._args.input, _id: ObjectId(response.insertedId) };
    },
    updateInvoice: async (_parent, _args, _context, _info) => {
      const response = await _context.db
        .collection("invoices")
        .updateOne({ _id: ObjectId(_args.id) }, { $set: _args.input });

      return { ..._args.input, _id: ObjectId(_args.id) };
    },
    deleteInvoice: async (_parent, _args, _context, _info) => {
      const response = await _context.db
        .collection("invoices")
        .deleteOne({ _id: ObjectId(_args.id) });

      return { status: "success", message: "Invoice was deleted." };
    },

    createRoom: async (_parent, _args, _context, _info) => {
      const response = await _context.db
        .collection("rooms")
        .insertOne(_args.input);

      return { ..._args.input, _id: ObjectId(response.insertedId) };
    },
    updateRoom: async (_parent, _args, _context, _info) => {
      const response = await _context.db
        .collection("rooms")
        .updateOne({ _id: ObjectId(_args.id) }, { $set: _args.input });

      return { ..._args.input, _id: ObjectId(_args.id) };
    },
    deleteRoom: async (_parent, _args, _context, _info) => {
      const response = await _context.db
        .collection("rooms")
        .deleteOne({ _id: ObjectId(_args.id) });

      return { status: "success", message: "Room was deleted." };
    },
  },
};

export default resolvers;
