import Prompt from "@models/prompt";
import { connectToDatabase } from "@utils/database";

export const POST = async (req) => {

    const {userId, prompt, tag} = await req.json();

    try {
        connectToDatabase();
        const newPrompt = new Prompt({
            creator: userId,
            prompt,
            tag
        });
        
        await newPrompt.save();

        return new Response(JSON.stringify(newPrompt), { status: 201})


    } catch (error) {
        return new Response(JSON.stringify(error), { status: 500})
    }

}