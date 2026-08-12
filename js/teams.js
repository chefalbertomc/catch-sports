const SPORTS_CATALOG = [
  {
    league: "NFL",
    teams: [
      { id: "nfl-cardinals", name: "Arizona Cardinals" },
      { id: "nfl-falcons", name: "Atlanta Falcons" },
      { id: "nfl-ravens", name: "Baltimore Ravens" },
      { id: "nfl-bills", name: "Buffalo Bills" },
      { id: "nfl-panthers", name: "Carolina Panthers" },
      { id: "nfl-bears", name: "Chicago Bears" },
      { id: "nfl-bengals", name: "Cincinnati Bengals" },
      { id: "nfl-browns", name: "Cleveland Browns" },
      { id: "nfl-cowboys", name: "Dallas Cowboys" },
      { id: "nfl-broncos", name: "Denver Broncos" },
      { id: "nfl-lions", name: "Detroit Lions" },
      { id: "nfl-packers", name: "Green Bay Packers" },
      { id: "nfl-texans", name: "Houston Texans" },
      { id: "nfl-colts", name: "Indianapolis Colts" },
      { id: "nfl-jaguars", name: "Jacksonville Jaguars" },
      { id: "nfl-chiefs", name: "Kansas City Chiefs" },
      { id: "nfl-raiders", name: "Las Vegas Raiders" },
      { id: "nfl-chargers", name: "Los Angeles Chargers" },
      { id: "nfl-rams", name: "Los Angeles Rams" },
      { id: "nfl-dolphins", name: "Miami Dolphins" },
      { id: "nfl-vikings", name: "Minnesota Vikings" },
      { id: "nfl-patriots", name: "New England Patriots" },
      { id: "nfl-saints", name: "New Orleans Saints" },
      { id: "nfl-giants", name: "New York Giants" },
      { id: "nfl-jets", name: "New York Jets" },
      { id: "nfl-eagles", name: "Philadelphia Eagles" },
      { id: "steelers", name: "Pittsburgh Steelers" }, // Keeping original ID to match previous products
      { id: "nfl-49ers", name: "San Francisco 49ers" },
      { id: "nfl-seahawks", name: "Seattle Seahawks" },
      { id: "nfl-buccaneers", name: "Tampa Bay Buccaneers" },
      { id: "nfl-titans", name: "Tennessee Titans" },
      { id: "nfl-commanders", name: "Washington Commanders" }
    ]
  },
  {
    league: "NBA",
    teams: [
      { id: "nba-celtics", name: "Boston Celtics" },
      { id: "nba-nets", name: "Brooklyn Nets" },
      { id: "nba-knicks", name: "New York Knicks" },
      { id: "nba-76ers", name: "Philadelphia 76ers" },
      { id: "nba-raptors", name: "Toronto Raptors" },
      { id: "nba-bulls", name: "Chicago Bulls" },
      { id: "nba-cavaliers", name: "Cleveland Cavaliers" },
      { id: "nba-pistons", name: "Detroit Pistons" },
      { id: "nba-pacers", name: "Indiana Pacers" },
      { id: "nba-bucks", name: "Milwaukee Bucks" },
      { id: "nba-nuggets", name: "Denver Nuggets" },
      { id: "nba-timberwolves", name: "Minnesota Timberwolves" },
      { id: "nba-thunder", name: "Oklahoma City Thunder" },
      { id: "nba-blazers", name: "Portland Trail Blazers" },
      { id: "nba-jazz", name: "Utah Jazz" },
      { id: "nba-warriors", name: "Golden State Warriors" },
      { id: "nba-clippers", name: "LA Clippers" },
      { id: "nba-lakers", name: "Los Angeles Lakers" },
      { id: "nba-suns", name: "Phoenix Suns" },
      { id: "nba-kings", name: "Sacramento Kings" },
      { id: "nba-mavericks", name: "Dallas Mavericks" },
      { id: "nba-rockets", name: "Houston Rockets" },
      { id: "nba-grizzlies", name: "Memphis Grizzlies" },
      { id: "nba-pelicans", name: "New Orleans Pelicans" },
      { id: "nba-spurs", name: "San Antonio Spurs" },
      { id: "nba-heat", name: "Miami Heat" }
    ]
  },
  {
    league: "MLB",
    teams: [
      { id: "mlb-yankees", name: "New York Yankees" },
      { id: "mlb-redsox", name: "Boston Red Sox" },
      { id: "mlb-dodgers", name: "Los Angeles Dodgers" },
      { id: "mlb-cubs", name: "Chicago Cubs" },
      { id: "mlb-astros", name: "Houston Astros" },
      { id: "mlb-braves", name: "Atlanta Braves" },
      { id: "mlb-phillies", name: "Philadelphia Phillies" },
      { id: "mlb-mets", name: "New York Mets" },
      { id: "mlb-padres", name: "San Diego Padres" },
      { id: "mlb-giants", name: "San Francisco Giants" },
      { id: "mlb-bluejays", name: "Toronto Blue Jays" },
      { id: "mlb-rangers", name: "Texas Rangers" },
      { id: "mlb-mariners", name: "Seattle Mariners" }
    ]
  },
  {
    league: "Soccer / Fútbol",
    teams: [
      { id: "soc-america", name: "Club América (Liga MX)" },
      { id: "soc-chivas", name: "Chivas (Liga MX)" },
      { id: "soc-cruzazul", name: "Cruz Azul (Liga MX)" },
      { id: "soc-pumas", name: "Pumas UNAM (Liga MX)" },
      { id: "soc-tigres", name: "Tigres UANL (Liga MX)" },
      { id: "soc-monterrey", name: "Rayados (Liga MX)" },
      { id: "soc-realmadrid", name: "Real Madrid" },
      { id: "soc-barcelona", name: "FC Barcelona" },
      { id: "soc-manutd", name: "Manchester United" },
      { id: "soc-mancity", name: "Manchester City" },
      { id: "soc-arsenal", name: "Arsenal" },
      { id: "soc-liverpool", name: "Liverpool" },
      { id: "soc-bayern", name: "Bayern Munich" },
      { id: "soc-psg", name: "PSG" },
      { id: "soc-juventus", name: "Juventus" }
    ]
  },
  {
    league: "F1 & Automovilismo",
    teams: [
      { id: "f1-redbull", name: "Red Bull Racing" },
      { id: "f1-ferrari", name: "Scuderia Ferrari" },
      { id: "f1-mercedes", name: "Mercedes-AMG Petronas" },
      { id: "f1-mclaren", name: "McLaren" },
      { id: "f1-astonmartin", name: "Aston Martin" },
      { id: "f1-checoperez", name: "Checo Pérez (Piloto)" }
    ]
  },
  {
    league: "Otros Artículos",
    teams: [
      { id: "cat-accesorios", name: "Accesorios Generales" },
      { id: "cat-memorabilia", name: "Memorabilia y Coleccionables" },
      { id: "cat-ropa", name: "Ropa Deportiva Casual" },
      { id: "otros", name: "Otro" }
    ]
  }
];

// Helper functions for dynamic UI
function getTeamName(teamId) {
  for (const league of SPORTS_CATALOG) {
    const team = league.teams.find(t => t.id === teamId);
    if (team) return team.name;
  }
  return "Colección Oficial";
}

function getLeagueByTeam(teamId) {
  for (const league of SPORTS_CATALOG) {
    if (league.teams.some(t => t.id === teamId)) {
      return league.league;
    }
  }
  return "Tienda de Deportes";
}
