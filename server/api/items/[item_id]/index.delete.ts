import Item from "~~/server/models/Item.model";
export default defineEventHandler(async (event) => {
	console.log("DELETE /api/items/_id")
	const id = event.context.params.item_id;
	try {
		const res = await Item.findByIdAndDelete(id);
		return { message: "Item "+id+" has been deleted", res: res };
	} catch (e) {
        console.log(e)
	}
});