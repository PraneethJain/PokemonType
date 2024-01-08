const range = (start, end) =>
  Array.from({ length: end - start + 1 }, (_, i) => start + i);

const getValidPokemon = (generations) => {
  let validPokemon = [];
  generations.forEach((val, idx) => {
    if (val) {
      switch (idx + 1) {
        case 1:
          validPokemon.push(...range(1, 151));
          break;
        case 2:
          validPokemon.push(...range(152, 251));
          break;
        case 3:
          validPokemon.push(...range(252, 386));
          break;
        case 4:
          validPokemon.push(...range(387, 493));
          break;
        case 5:
          validPokemon.push(...range(494, 649));
          break;
        case 6:
          validPokemon.push(...range(650, 721));
          break;
        case 7:
          validPokemon.push(...range(722, 809));
          break;
        case 8:
          validPokemon.push(...range(810, 905));
          break;
        default:
          throw new Error("invalid generation number");
      }
    }
  });

  return validPokemon;
};

const getRandomPokedexNum = (generations) => {
  const validPokemon = getValidPokemon(generations);
  return validPokemon[Math.floor(Math.random() * validPokemon.length)];
};

export { getValidPokemon, getRandomPokedexNum };
