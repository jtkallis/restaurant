import User from "~~/server/models/User.model";

export default defineEventHandler(async (event) => {
    console.log('GET /api/users/');
    try{
      const Users = await User.find();
      return Users;
    } catch (err) {
      console.dir(err)
      return {
        code: "error",
        message: 'something is wrong',
      };
    }
});