import Item from "~~/server/models/Item.model";
export default defineEventHandler(async (event) => {
	console.log("GET /api/items/_id")
	const id = event.context.params.item_id;
	try {
		const res = await Item.findById(id);
		return { message: " Returned item "+id, res: res };
	} catch (e) {
        console.log(e)
	}
});