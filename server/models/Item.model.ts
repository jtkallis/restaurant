import { Schema, model } from "mongoose";
const itemSchema = new Schema({
    name: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required:false,
      default: 0
    },
    section: {
        type: Schema.Types.Mixed,
        required: false,
        default:{}
    },
    options: [ 
      {
        type: Schema.Types.Mixed,
        required: false,
        default:{}
      }
    ],
    description: {
      type: String,
      required: false
    }},{ timestamps: true });

export default model("Item", itemSchema);