import Item from "~~/server/models/Item.model";

export default defineEventHandler(async (event) => {
    console.log('GET /api/items/');
    try{
      const items = await Item.find();
      return items;
    } catch (err) {
      console.dir(err)
      return {
        code: "error",
        message: 'something is wrong',
      };
    }
});