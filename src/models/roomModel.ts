import { Types, model, Schema } from "mongoose";

interface RoomAttribute {
  hotel: {};
  title: string;
  price: number;
  maxPeople: number;
  description: string;
  roomNumbers: Types.Array<{}>;
}

const RoomSchema = new Schema<RoomAttribute>(
  {
    hotel: { type: Schema.Types.ObjectId, ref: "Hotel" },
    title: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    maxPeople: {
      type: Number,
      require: true,
    },
    description: {
      type: String,
      required: true,
    },

    roomNumbers: {
      type: [{ number: Number, unavailableDates: { type: [Date] } }],
    },
  },
  {
    timestamps: true,
  }
);

const Room = model<RoomAttribute>("Room", RoomSchema);

export default Room;
