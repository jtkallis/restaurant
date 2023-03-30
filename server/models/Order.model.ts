import { Schema, model } from "mongoose";

const orderSchema = new Schema({
    name: {
      type: String,
      required: true
    },
    total: {
      type: Number,
      required:true
    },
    phone: {
        type: String,
        required: true
    },
    message: {
      type: String,
      required: true
    },
    order: [ 
      {
        type: Schema.Types.Mixed,
        required: true
      }
    ],
    notes: {
      type: String,
      required: false
    }},{ timestamps: true });

export default model("Order", orderSchema);