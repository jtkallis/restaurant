import { Schema, model } from "mongoose";

const sectionSchema = new Schema({
    name: {
      type: String,
      required: true
    },
    choice: {
      type: Number,
      required: false
    },
    suggested: [
      {
        type: Schema.Types.Mixed,
        required: false,
        default:{}
      }
    ],
    ingr: [
      {
        type: Schema.Types.Mixed, //Item Objs
        required: false,
        default: {}
      }
    ]},{ timestamps: true });

 export default model("Section", sectionSchema);