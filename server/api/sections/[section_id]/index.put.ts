import Section from "~~/server/models/Section.model";
export default defineEventHandler(async (event) => {
	console.log("PUT /api/sections/id")
	const body = await readBody(event);
	const id = event.context.params.section_id;
	try {
		const res = await Section.findByIdAndUpdate(id,body);
		return { message: "section updated", res: res };
	} catch (e) {
        console.log(e)
	}
});