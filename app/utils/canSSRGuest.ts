import { GetServerSideProps,GetServerSidePropsContext,GetServerSidePropsResult } from "next";
import { parseCookies } from "nookies";


export function canSSRGuest<P>(fn: GetServerSideProps<P>){
    return async (context: GetServerSidePropsContext): Promise<GetServerSidePropsResult<P>> => {

        const cookies = parseCookies(context)

        // se tentar acessar e ja tiver um login retorna pra dashboad
        if(cookies['auth.token']){
            return{
                redirect:{
                    destination:'/dashboard',
                    permanent:false,
                }
            }
        }
        return await fn(context)
    }

}