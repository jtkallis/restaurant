import Menu from "~~/server/models/Menu.model";
export default defineEventHandler(async (event) => {
	const id = event.context.params.menu_id;
	try {
		console.log("DELETE /api/menu/id")
		const res = await Menu.findByIdAndDelete(id);
		return { message: "Menu "+id+" has been deleted", res: res };
	} catch (e) {
        console.log(e)
	}
});