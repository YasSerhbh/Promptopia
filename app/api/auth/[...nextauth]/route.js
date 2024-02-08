import User from "@models/user";
import { connectToDatabase } from "@utils/database";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";


// console.log({
//     clientId: process.env.GOOGLE_ID,
//     clientSecret: process.env.GOOGLE_CLIENT_SECRET,
// });

const handler = NextAuth({  

    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            httpOptions: {
                timeout: 15000,
            }
        })
    ],
    callbacks: {


    async session({session}) {
        
        const sessionUser = await User.findOne({ email: session.user.email });

        
        session.user.id = sessionUser._id.toString();
    
    
        return session;
    },

    async signIn(profile) {
        try  {
            await connectToDatabase();
            

            // check if user exists
            const userExists = await User.findOne({ email: profile.user.email });

            
            // if not, create user
            if (!userExists) {
                let randomNumber = Math.floor(Math.random() * 1000) * 1000; // generates a random number between 0 and 99
                await User.create({
                    email: profile.user.email,
                    username: profile.user.name.replace(' ', '').toLowerCase(),
                    image: profile.user.image,
                })
            }

            return true;

        } catch (error) {
            console.log(error);
            return false;
        }
    },


}
  })

  export {handler as GET, handler as POST};

