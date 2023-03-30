import { Schema, model } from "mongoose";

const menuSchema = new Schema(
    {
      name: {
        type: String,
        required: [true, 'name field is required'],
      },
      hours: {
        type: String,
        required: [true, 'start time field is required'],
      },
      days: [
        {
          type: String,
          required: [true, 'days field is required'],
        }
      ],
      sections:[
        {
          type: Schema.Types.Mixed, //Section Objs
          required: [true,'sections is required']
        }
      ]
    },
    { timestamps: true },
  );
export default model("Menu", menuSchema);