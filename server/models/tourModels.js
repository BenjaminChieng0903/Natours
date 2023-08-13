const mongoose = require('mongoose');
const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A tour must have a name'],
    unique: true,
  },
  duration: {
    type: Number,
    required: [true, 'A tour must have a duration'],
  },
  maxGroupSize: {
    type: Number,
    required: [true, 'A tour must have a maxGroupSize'],
  },
  difficulty: {
    type: String,
    required: [true, 'A tour must have a difficulty'],
  },
  rating: {
    type: Number,
    default: 4.5,
  },
  ratingsAverage: {
    type: Number,
    default: 4.5,
  },
  ratingsQuantity: {
    type: Number,
    default: 0,
  },
  price: {
    type: Number,
    required: [true, 'A tour must have a price'],
  },
  priceDiscount: {
    type: Number,
  },
  summary: {
    type: String,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  startDates: [Date],
  images: [String],
  imageCover: {
    type: String,
    required: [true, 'A tour must have an imageCover'],
  },
  CreateAt: {
    type: Date,
    default: Date.now(),
  },
  startLocation: {
    description: { type: String },
    type: { type: String, default: 'Point' },
    coordinates: [],
    address: { type: String },
  },
  locations: [
    {
      _id: { type: String },
      description: { type: String },
      type: { type: String, default: 'Point' },
      coordinates: [],
      day: { type: Number },
    },
  ],
  guides: [{ type: mongoose.Schema.ObjectId, ref: 'User', required: [true] }],
});

const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;
