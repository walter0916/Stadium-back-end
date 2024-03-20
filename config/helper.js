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

async function getTeamInfo(teamName) {
  try {
    const formattedTeamName = teamName.replace(/\s+/g, ' ')
    const url = `${BASE_URL}/teams?name=${formattedTeamName.replace(/ /g, '%20')}`

    const res = await fetch(url, {
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

async function getUpcomingFixtureForFavoriteTeam(teamId) {
  try {
    const res = await fetch(`${BASE_URL}/fixtures?team=${teamId}&next=1`, {
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

async function getLeagueInfo(leagueName) {
  try {
    const formattedLeagueName = leagueName.replace(/\s+/g, ' ')
    const url = `${BASE_URL}/leagues?name=${formattedLeagueName.replace(/ /g, '%20')}`
    const res = await fetch(url, {
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

export { getLeagueById, getLeagueStandingsById, getLeagueTopScorers, getLeagueTopAssisters, getTeamInfo, getUpcomingFixtureForFavoriteTeam, getLeagueInfo }