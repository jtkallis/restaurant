import Order from "~~/server/models/Order.model";
import { default as Twilio } from 'twilio';
export default defineEventHandler(async (event) => {
	console.log("POST /api/order/")
	const config = useRuntimeConfig();
	const accountSid = "AC2702e44b44d3f712309408fd09a5a0f5";
	const authToken = config.twilioAuthToken;
  	const body = await readBody(event);
	  console.log('body', body);
	try {
		const res = await Order.create(body);

		try{
			const client = Twilio(accountSid, authToken);
			const message = await client.messages
				.create({ body: body.message , from: "+18665169314", to: "+16193404056" })
				.then(message => console.log(message.sid));
			console.log(message)
		}
		catch(e){
			console.log(e)
		}

		return { message: "Order created", res: res };

	} catch (e) {
        console.log(e)
	}


});