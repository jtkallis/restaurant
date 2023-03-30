import Menu from "~~/server/models/Menu.model";
export default defineEventHandler(async (event) => {
	const body = await readBody(event);
	try {
		console.log("POST /api/menu/")
		const res = await Menu.create(body);
		return { message: "Menu created", res: res };
	} catch (e) {
        console.log(e)
	}
});