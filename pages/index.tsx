import type { GetStaticProps, NextPage } from 'next'
import { Layout } from '../components/layouts'
import {pokeApi} from '../api'
import axios from 'axios';
import { PokemonListResponse, SmallPokemon } from '../interfaces';
import { Card, Grid, Row, Text } from '@nextui-org/react';
import Link from 'next/link';

interface Props{
  pokemons: SmallPokemon[] 
}

const HomePage: NextPage<Props> = ({pokemons}) => {
  
  return (
    <Layout title='Listado de Pokemons'>
      <Grid.Container gap={2} justify='flex-start'>
        {pokemons.map(({id, name, image}) => (
          <Link href={`/pokemon/${id}`}>
            <Grid xs={6} sm={3} md={2} xl={1} key={id}>
              <Card hoverable clickable>
                <Card.Body css={{p:1}}>
                  <Card.Image 
                    src={image}
                    width="100%"
                    height={140}/>
                </Card.Body>
                <Card.Footer>
                  <Row justify='space-between'>
                    <Text>{name}</Text>
                    <Text>#{id}</Text>
                  </Row>
                </Card.Footer>
              </Card>
            </Grid>
          </Link>
        ))}
        {/* {pokemons.map(pokemon => <li key={pokemon.id}>{`#${pokemon.id} - ${pokemon.name}`}</li>)} */}
      </Grid.Container>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async(context) => {
  const {data} = await pokeApi.get<PokemonListResponse>('/pokemon?limit=151')
  
  const pokemons: SmallPokemon[] = data.results.map((pokemon, i)=>({
    ...pokemon,
    id: i + 1,
    image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${i+1}.svg`
  }))


  return {
    props: {
      pokemons
    },
  }
}


export default HomePage
