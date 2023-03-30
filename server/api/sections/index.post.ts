import Section from "~~/server/models/Section.model";
export default defineEventHandler(async (event) => {
	console.log("POST /api/sections/")
	const body = await readBody(event);
	try {
		const res = await Section.create(body);
		return { message: "section created", res: res };
	} catch (e) {
        console.log(e)
	}
});