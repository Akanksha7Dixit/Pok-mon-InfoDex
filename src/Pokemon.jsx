import "./index.css";
import { useEffect, useState } from "react";
import { PokemonCards } from "./PokemonCards";

export const  Pokemon =()=>{

    const [pokemon,setPokemon]=useState([]);
    const [loading,setLoading]=useState(true);
    //continue fromm here.............

    const API="https://pokeapi.co/api/v2/pokemon?limit=24";

    const fetchPokemon=async()=>{
        try{
            const res=await fetch(API);
            const data=await res.json();
            console.log(data);

            const detailedPokemonData =data.results.map(async(curPokemon)=>{
                const res =await fetch(curPokemon.url);
                const data=await res.json();
                return data;
            });
            console.log(detailedPokemonData);

            const detailedResponses = await Promise.all(detailedPokemonData);
            console.log(detailedResponses);
            setPokemon(detailedResponses);


        }catch(error){

        }
    }

    useEffect(()=>{
        fetchPokemon();
    },[]);

    return(
    <>
    <section className="container">
        <header>
            <h1>Lets catch Pokemon</h1>
        </header>
        <div>
            <ul className ="cards">
                {pokemon.map((curPokemon)=>{
                        return (
                        <PokemonCards key={curPokemon.id} pokemonData={curPokemon} />
                        );
                    })}
            </ul>
        </div>
    </section>
    </>
    );
};