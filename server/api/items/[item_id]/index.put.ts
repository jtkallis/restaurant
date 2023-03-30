import Item from "~~/server/models/Item.model";

export default defineEventHandler(async (event) => {
	console.log('PUT /api/items/_id');
	const body = await readBody(event);
	const id = event.context.params.item_id;
	try{
		const res = await Item.findByIdAndUpdate(id,body);
		return { message: "Item updated", res: res };
	} catch (e) {
        console.log(e)
	}
});