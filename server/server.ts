import { id } from "zod/v4/locales";
import { publicProcedure, router } from "./trpc";
import { z } from 'zod';
import { createHTTPServer } from '@trpc/server/adapters/standalone';

const todoInputType = z.object({
    title : z.string(),
    description : z.string()
});


const appRouter = router({
    createTodo : publicProcedure
        .input(todoInputType)
        .mutation( async (opts) => {
            const username = opts.ctx.username;
            console.log("Username from context: " + username);
            const title = opts.input.title;
            const desc = opts.input.description;
            console.log(title , desc);
            console.log("here");
            return {
                id:"11",
            };
        } ),
    getTodo : publicProcedure
        .query( async(opts)=> {
            return [{
                id:"11",
                description: "desc",
                title: "title"
            }];
        }),
    signUp: publicProcedure
        .input(z.object({
            email : z.string(),
            password : z.string().min(2),
        }))
        .mutation( async(opts)=>{
            const email = opts.input.email;
            const password = opts.input.password;
            console.log(email , password);
            console.log("signup");
            const token = "eternal_token";
            return {
                token,
            };
        })
});

const server = createHTTPServer({
  router: appRouter,
  createContext(opts){
    const header = opts.req.headers["authorization"];
    console.log("Header: " + header);
    if(header){
        // res username 
        // or send undefined
    }
    return {
        username : "Saravanan",
    };
  }
});

server.listen(3000);

export type AppRouter = typeof appRouter;
