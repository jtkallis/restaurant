import Section from "~~/server/models/Section.model";
export default defineEventHandler(async (event) => {
	const id = event.context.params.section_id;
	console.log("DELETE /api/sections/id")
	try {
		const res = await Section.findByIdAndDelete(id);
		return { message: "section "+id+" has been deleted", res: res };
	} catch (e) {
        console.log(e)
	}
});