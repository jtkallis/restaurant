import Item from "~~/server/models/Item.model";
export default defineEventHandler(async (event) => {
	const body = await readBody(event);
	console.log('POST /api/items/');
	try {
		const res = await Item.create(body);
		return { message: "Item created", res: res };
	} catch (e) {
        console.log(e)
	}
});