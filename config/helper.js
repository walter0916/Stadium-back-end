const BASE_URL = 'https://api-football-v1.p.rapidapi.com/v3/standings?season=2023&'

async function getLeagueById(leagueId) {
  try {
    const res = await fetch(`${BASE_URL}league=${leagueId}`, {
      headers: {
        'X-RapidAPI-Key': `${import.meta.env.API_KEY}`,
        'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com'
      },
    })
    return await res.json()
  } catch (error) {
    throw new Error(error)
  }
}

export { getLeagueById }