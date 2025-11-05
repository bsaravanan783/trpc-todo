import { createTRPCClient , httpBatchLink } from '@trpc/client';
import type { AppRouter } from '../server/server'; 
import { da } from 'zod/v4/locales';
//     👆 **type-only** import
 
// Pass AppRouter as generic here. 👇 This lets the `trpc` object know
// what procedures are available on the server and their input/output types.
const trpc = createTRPCClient<AppRouter>({
  links: [
    httpBatchLink({
      url: 'http://localhost:3000',
    }),
  ],
});



 async function main(){
   trpc.createTodo.mutate({ title :"helli" , description: "thor"});
    const data = await trpc.signUp.mutate({
      email:"snjh",
      password:"kjnhfkgd",
    });
    
    console.log(JSON.stringify(data) + " rendered from client");
 }

 main();