const BASE_URL = 'https://api-football-v1.p.rapidapi.com/v3'

async function getLeagueById(leagueId) {
  try {
    const res = await fetch(`${BASE_URL}/standings?season=2023&league=${leagueId}`, {
      headers: {
        'X-RapidAPI-Key': `${process.env.API_KEY}`,
        'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com'
      },
    })
    return await res.json()
  } catch (error) {
    throw new Error(error)
  }
}

async function getLeagueStandingsById(leagueId) {
  try {
    const res = await fetch(`${BASE_URL}/fixtures?league=${leagueId}&season=2023`, {
      headers: {
        'X-RapidAPI-Key': `${process.env.API_KEY}`,
        'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com'
      },
    })
    return await res.json()
  } catch (error) {
    throw new Error(error)
  }
}

async function getLeagueTopScorers(leagueId) {
  try {
    const res = await fetch(`${BASE_URL}/players/topscorers?league=${leagueId}&season=2023`, {
      headers: {
        'X-RapidAPI-Key': `${process.env.API_KEY}`,
        'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com'
      },
    })
    return await res.json()
  } catch (error) {
    throw new Error(error)
  }
}

async function getLeagueTopAssisters(leagueId) {
  try {
    const res = await fetch(`${BASE_URL}/players/topassists?league=${leagueId}&season=2023`, {
      headers: {
        'X-RapidAPI-Key': `${process.env.API_KEY}`,
        'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com'
      },
    })
    return await res.json()
  } catch (error) {
    throw new Error(error)
  }
}

export { getLeagueById, getLeagueStandingsById, getLeagueTopScorers, getLeagueTopAssisters }