import React from 'react'
import { Layout } from '../../components/layouts';
import {pokeApi} from '../../api'
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { Pokemon } from '../../interfaces';
import Image from 'next/image'


interface Props {
    pokemon: Pokemon
}

const PokemonPage:NextPage<Props> = ({pokemon}) => {
    
  return (
      <Layout>
          <h1>{pokemon.name}</h1>
          <Image src={pokemon.sprites.other?.dream_world.front_default || '/favicon.ico'} alt={pokemon.name} width='100px' height={'100px'}/>
      </Layout>
  )
}

// You should use getStaticPaths if you’re statically pre-rendering pages that use dynamic routes
export const getStaticPaths: GetStaticPaths = async (ctx) => {
    // const { data } = await pokeApi.get(`/pokemon/${id}`)// your fetch function here 
    const pokemonList = [...Array(151)].map((_, index)=> `${index + 1}`)
    return {
        paths: pokemonList.map(id=>({params: {id}})),
        fallback: false
    }
}

// You should use getStaticProps when:
//- The data required to render the page is available at build time ahead of a user’s request.
//- The data comes from a headless CMS.
//- The data can be publicly cached (not user-specific).
//- The page must be pre-rendered (for SEO) and be very fast — getStaticProps generates HTML and JSON files, both of which can be cached by a CDN for performance.


export const getStaticProps: GetStaticProps = async ({params}) => {
    const {id} = params as {id: string}
    const { data } = await pokeApi.get<Pokemon>(`/pokemon/${id}`) // your fetch function here 
    
    return {
        props: {
            pokemon: data
        }
    }
}

export default PokemonPage