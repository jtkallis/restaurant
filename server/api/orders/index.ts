import Order from "~~/server/models/Order.model";

export default defineEventHandler(async (event) => {
    console.log('GET /api/Orders/');
    try{
      const Orders = await Order.find();
      return Orders;
    } catch (err) {
      console.dir(err)
      return {
        code: "error",
        message: 'something is wrong',
      };
    }
});