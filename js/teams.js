const SPORTS_CATALOG = [
  {
    league: "NFL",
    sportKey: "nfl",
    teams: [
      { id: "steelers", name: "Pittsburgh Steelers" },
      { id: "nfl-cowboys", name: "Dallas Cowboys" },
      { id: "nfl-49ers", name: "San Francisco 49ers" },
      { id: "nfl-chiefs", name: "Kansas City Chiefs" },
      { id: "nfl-raiders", name: "Las Vegas Raiders" },
      { id: "nfl-packers", name: "Green Bay Packers" },
      { id: "nfl-eagles", name: "Philadelphia Eagles" },
      { id: "nfl-patriots", name: "New England Patriots" },
      { id: "nfl-dolphins", name: "Miami Dolphins" },
      { id: "nfl-bills", name: "Buffalo Bills" },
      { id: "nfl-ravens", name: "Baltimore Ravens" },
      { id: "nfl-bengals", name: "Cincinnati Bengals" },
      { id: "nfl-browns", name: "Cleveland Browns" },
      { id: "nfl-broncos", name: "Denver Broncos" },
      { id: "nfl-chargers", name: "Los Angeles Chargers" },
      { id: "nfl-rams", name: "Los Angeles Rams" },
      { id: "nfl-seahawks", name: "Seattle Seahawks" },
      { id: "nfl-cardinals", name: "Arizona Cardinals" },
      { id: "nfl-falcons", name: "Atlanta Falcons" },
      { id: "nfl-panthers", name: "Carolina Panthers" },
      { id: "nfl-bears", name: "Chicago Bears" },
      { id: "nfl-texans", name: "Houston Texans" },
      { id: "nfl-colts", name: "Indianapolis Colts" },
      { id: "nfl-jaguars", name: "Jacksonville Jaguars" },
      { id: "nfl-lions", name: "Detroit Lions" },
      { id: "nfl-vikings", name: "Minnesota Vikings" },
      { id: "nfl-saints", name: "New Orleans Saints" },
      { id: "nfl-giants", name: "New York Giants" },
      { id: "nfl-jets", name: "New York Jets" },
      { id: "nfl-buccaneers", name: "Tampa Bay Buccaneers" },
      { id: "nfl-titans", name: "Tennessee Titans" },
      { id: "nfl-commanders", name: "Washington Commanders" }
    ]
  },
  {
    league: "NBA",
    sportKey: "nba",
    teams: [
      { id: "nba-lakers", name: "Los Angeles Lakers" },
      { id: "nba-bulls", name: "Chicago Bulls" },
      { id: "nba-warriors", name: "Golden State Warriors" },
      { id: "nba-celtics", name: "Boston Celtics" },
      { id: "nba-knicks", name: "New York Knicks" },
      { id: "nba-heat", name: "Miami Heat" },
      { id: "nba-nets", name: "Brooklyn Nets" },
      { id: "nba-76ers", name: "Philadelphia 76ers" },
      { id: "nba-bucks", name: "Milwaukee Bucks" },
      { id: "nba-mavericks", name: "Dallas Mavericks" },
      { id: "nba-suns", name: "Phoenix Suns" },
      { id: "nba-spurs", name: "San Antonio Spurs" },
      { id: "nba-raptors", name: "Toronto Raptors" }
    ]
  },
  {
    league: "MLB",
    sportKey: "mlb",
    teams: [
      { id: "mlb-yankees", name: "New York Yankees" },
      { id: "mlb-dodgers", name: "Los Angeles Dodgers" },
      { id: "mlb-redsox", name: "Boston Red Sox" },
      { id: "mlb-padres", name: "San Diego Padres" },
      { id: "mlb-cubs", name: "Chicago Cubs" },
      { id: "mlb-astros", name: "Houston Astros" },
      { id: "mlb-braves", name: "Atlanta Braves" },
      { id: "mlb-mets", name: "New York Mets" }
    ]
  },
  {
    league: "Soccer / Fútbol",
    sportKey: "soccer",
    teams: [
      { id: "soc-america", name: "Club América (Liga MX)" },
      { id: "soc-chivas", name: "Chivas Guadalajara (Liga MX)" },
      { id: "soc-cruzazul", name: "Cruz Azul (Liga MX)" },
      { id: "soc-pumas", name: "Pumas UNAM (Liga MX)" },
      { id: "soc-tigres", name: "Tigres UANL (Liga MX)" },
      { id: "soc-monterrey", name: "Rayados (Liga MX)" },
      { id: "soc-realmadrid", name: "Real Madrid" },
      { id: "soc-barcelona", name: "FC Barcelona" },
      { id: "soc-manutd", name: "Manchester United" },
      { id: "soc-mancity", name: "Manchester City" },
      { id: "soc-bayern", name: "Bayern Munich" },
      { id: "soc-psg", name: "PSG" },
      { id: "soc-juventus", name: "Juventus" }
    ]
  },
  {
    league: "F1 & Automovilismo",
    sportKey: "f1",
    teams: [
      { id: "f1-redbull", name: "Red Bull Racing" },
      { id: "f1-ferrari", name: "Scuderia Ferrari" },
      { id: "f1-mercedes", name: "Mercedes-AMG Petronas" },
      { id: "f1-mclaren", name: "McLaren" },
      { id: "f1-checoperez", name: "Checo Pérez (Piloto)" }
    ]
  },
  {
    league: "General / Fitness",
    sportKey: "general",
    teams: [
      { id: "cat-accesorios", name: "Accesorios Generales" },
      { id: "cat-memorabilia", name: "Memorabilia y Coleccionables" },
      { id: "cat-ropa", name: "Ropa Deportiva Casual" },
      { id: "otros", name: "Otro" }
    ]
  }
];

const PRODUCT_CATEGORIES = [
  { id: "jerseys", label: "👕 Jerseys Oficiales", icon: "👕" },
  { id: "gorras", label: "🧢 Gorras & Hats", icon: "🧢" },
  { id: "chamarras", label: "🧥 Chamarras & Hoodies", icon: "🧥" },
  { id: "calzado", label: "👟 Calzado Deportivo", icon: "👟" },
  { id: "balones", label: "🏈 Balones & Baloncesto", icon: "🏈" },
  { id: "accesorios", label: "🎒 Accesorios & Gear", icon: "🎒" }
];

const SIZE_OPTIONS = ["CH / S", "M", "G / L", "XL", "XXL", "7 1/8", "7 1/4", "7 3/8", "7 1/2", "Ajustable / Unitalla", "26 MX", "27 MX", "28 MX", "29 MX"];

const PROMO_BADGES = [
  { id: "oferta", label: "🔥 Oferta Especial", color: "#ef4444" },
  { id: "exclusivo", label: "⭐ Exclusivo", color: "#eab308" },
  { id: "nuevo", label: "⚡ Nuevo Lanzamiento", color: "#3b82f6" },
  { id: "edicion-limitada", label: "🏆 Edición Limitada", color: "#a855f7" },
  { id: "ninguno", label: "Sin Insignia", color: "#666" }
];

const STORE_BANK_DETAILS = {
  bank: "BBVA Bancomer",
  clabe: "012680015948392019",
  account: "1594839201",
  owner: "CATCH SPORTS QRO / ALBERTO MUÑOZ",
  phoneWhatsApp: "524423376955"
};

// Helper functions for dynamic UI
function getTeamName(teamId) {
  if (!teamId || teamId === 'all') return "Todos los Equipos";
  for (const league of SPORTS_CATALOG) {
    const team = league.teams.find(t => t.id === teamId);
    if (team) return team.name;
  }
  return teamId.toUpperCase();
}

function getLeagueByTeam(teamId) {
  for (const league of SPORTS_CATALOG) {
    if (league.teams.some(t => t.id === teamId)) {
      return league.league;
    }
  }
  return "Tienda de Deportes";
}
