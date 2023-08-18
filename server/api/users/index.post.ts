import User from "~~/server/models/User.model";

export default defineEventHandler(async (event) => {
	const body = await readBody(event);
	try {
		console.log("POST /api/user/",body)
		const exists = await User.find({email: body.email})
		if(exists){
			console.log('already exists')
			return { message: "already exists", exists: true}
		}
		else{
			const res = await User.create(body);
			return { message: "User created", res: res };
		}
		
	} catch (e) {
        console.log(e)
	}
});