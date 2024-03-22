const BASE_URL = 'https://api-football-v1.p.rapidapi.com/v3'

async function getLeagueById(leagueId, year) {
  try {
    const res = await fetch(`${BASE_URL}/standings?season=${year}&league=${leagueId}`, {
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

async function getLeagueFixturesById(leagueId, year) {
  try {
    const res = await fetch(`${BASE_URL}/fixtures?league=${leagueId}&season=${year}`, {
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

async function getLeagueTopScorers(leagueId, year) {
  try {
    const res = await fetch(`${BASE_URL}/players/topscorers?league=${leagueId}&season=${year}`, {
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

async function getLeagueTopAssisters(leagueId, year) {
  try {
    const res = await fetch(`${BASE_URL}/players/topassists?league=${leagueId}&season=${year}`, {
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

async function getFixturesForTeam(teamId, year) {
  try {
    const res = await fetch(`${BASE_URL}/fixtures?season=${year}&team=${teamId}`, {
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

async function getTeamStatistics(leagueId, teamId, year) {
  try {
    const res = await fetch(`${BASE_URL}/teams/statistics?league=${leagueId}&season=${year}&team=${teamId}`, {
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

async function getPlayerInformation(teamId, year, playerName) {
  try {
    const formattedPlayerName = playerName.replace(/\s+/g, ' ')
    const res = await fetch(`${BASE_URL}/players?team=${teamId}&season=${year}&search=${formattedPlayerName.replace(/ /g, '%20')}`, {
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

export { getLeagueById, getLeagueFixturesById, getLeagueTopScorers, getLeagueTopAssisters, getTeamInfo, getUpcomingFixtureForFavoriteTeam, getLeagueInfo, getFixturesForTeam, getTeamStatistics, getPlayerInformation }