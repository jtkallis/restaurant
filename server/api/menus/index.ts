import Menu from "~~/server/models/Menu.model";

export default defineEventHandler(async (event) => {
    console.log('GET /api/menus/');
    try{
      const menus = await Menu.find();
      return menus;
    } catch (err) {
      console.dir(err)
      return {
        code: "error",
        message: 'something is wrong',
      };
    }
});