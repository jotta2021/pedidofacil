import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from 'next'
import { parseCookies, destroyCookie } from 'nookies'
import { AuthTokenError } from '../services/errors/error'

// Função para páginas que só usuários logados podem ter acesso.
export function canSSRAuth<P extends { [key: string]: any }>(fn: GetServerSideProps<P>) {
  return async (ctx: GetServerSidePropsContext): Promise<GetServerSidePropsResult<P>> => {
    const cookies = parseCookies(ctx)
    const token = cookies['@nextauth.token']

    if (!token) {
      return {
        redirect: {
          destination: '/',
          permanent: false,
        },
      }
    }

    try {
      return await fn(ctx)
    } catch (err) {
      if (err instanceof AuthTokenError) {
        destroyCookie(ctx, '@nextauth.token')

        return {
          redirect: {
            destination: '/',
            permanent: false,
          },
        }
      }

      // Se o erro não for AuthTokenError, podemos re-levantar o erro para tratativas adicionais
      throw err
    }
  }
}
