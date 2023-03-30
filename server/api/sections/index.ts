import Section from "~~/server/models/Section.model";
export default defineEventHandler(async (event)=>{
    console.log('GET /api/sections/');
    try{
      const sections = await Section.find();
      return sections;
    } catch (err) {
      console.dir(err)
      return {
        code: "error",
        message: 'something is wrong',
      };
    }
  });