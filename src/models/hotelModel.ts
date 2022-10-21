import { Types, model, Schema } from "mongoose";

interface HotelAttribute {
  name: string;
  type: string;
  city: string;
  address: string;
  distance: string;
  photos?: Types.Array<string>;
  title: string;
  description: string;
  rating: number;
  rooms?: Types.Array<string>;
  cheapestPrice: Number;
  featured: boolean;
}

const HotelSchema = new Schema<HotelAttribute>(
  {
    name: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },

    distance: {
      type: String,
      required: true,
    },

    photos: {
      type: [String],
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      min: 0,
      max: 5,
    },
    rooms: {
      type: [String],
    },

    cheapestPrice: {
      type: Number,
      required: true,
    },
    featured: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Hotel = model<HotelAttribute>("Hotel", HotelSchema);

export default Hotel;
