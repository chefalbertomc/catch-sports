const SPORTS_CATALOG = [
  {
    sport: "Fútbol Americano",
    sportKey: "nfl",
    icon: "🏈",
    leagues: [
      {
        league: "NFL",
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
          { id: "nfl-texans", name: "Houston Texans" },
          { id: "nfl-colts", name: "Indianapolis Colts" },
          { id: "nfl-lions", name: "Detroit Lions" },
          { id: "nfl-vikings", name: "Minnesota Vikings" },
          { id: "nfl-saints", name: "New Orleans Saints" },
          { id: "nfl-giants", name: "New York Giants" },
          { id: "nfl-jets", name: "New York Jets" },
          { id: "nfl-buccaneers", name: "Tampa Bay Buccaneers" },
          { id: "nfl-commanders", name: "Washington Commanders" }
        ]
      }
    ]
  },
  {
    sport: "Básquetbol",
    sportKey: "nba",
    icon: "🏀",
    leagues: [
      {
        league: "NBA",
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
          { id: "nba-spurs", name: "San Antonio Spurs" }
        ]
      }
    ]
  },
  {
    sport: "Béisbol",
    sportKey: "mlb",
    icon: "⚾",
    leagues: [
      {
        league: "MLB",
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
      }
    ]
  },
  {
    sport: "Fútbol Socca",
    sportKey: "soccer",
    icon: "⚽",
    leagues: [
      {
        league: "Liga MX",
        teams: [
          { id: "soc-america", name: "Club América" },
          { id: "soc-chivas", name: "Chivas Guadalajara" },
          { id: "soc-cruzazul", name: "Cruz Azul" },
          { id: "soc-pumas", name: "Pumas UNAM" },
          { id: "soc-tigres", name: "Tigres UANL" },
          { id: "soc-monterrey", name: "Rayados de Monterrey" }
        ]
      },
      {
        league: "Europeas / UEFA",
        teams: [
          { id: "soc-realmadrid", name: "Real Madrid" },
          { id: "soc-barcelona", name: "FC Barcelona" },
          { id: "soc-manutd", name: "Manchester United" },
          { id: "soc-mancity", name: "Manchester City" },
          { id: "soc-bayern", name: "Bayern Munich" },
          { id: "soc-psg", name: "PSG" },
          { id: "soc-juventus", name: "Juventus" }
        ]
      }
    ]
  },
  {
    sport: "Automovilismo",
    sportKey: "f1",
    icon: "🏎️",
    leagues: [
      {
        league: "Fórmula 1",
        teams: [
          { id: "f1-redbull", name: "Red Bull Racing" },
          { id: "f1-ferrari", name: "Scuderia Ferrari" },
          { id: "f1-mercedes", name: "Mercedes-AMG Petronas" },
          { id: "f1-mclaren", name: "McLaren" },
          { id: "f1-checoperez", name: "Checo Pérez" }
        ]
      }
    ]
  },
  {
    sport: "Fitness & Casual",
    sportKey: "general",
    icon: "🎒",
    leagues: [
      {
        league: "Accesorios",
        teams: [
          { id: "cat-accesorios", name: "Accesorios Deportivos" },
          { id: "cat-memorabilia", name: "Memorabilia y Coleccionables" },
          { id: "cat-ropa", name: "Ropa Casual Deportiva" },
          { id: "otros", name: "Otro / General" }
        ]
      }
    ]
  }
];

const GENDER_DEPARTMENTS = [
  { id: "caballero", label: "👨 Caballero", sizes: ["S / CH", "M", "L / G", "XL", "XXL", "3XL"] },
  { id: "dama", label: "👩 Dama", sizes: ["XS Dama", "S Dama", "M Dama", "L Dama", "XL Dama"] },
  { id: "nino", label: "🧒 Niño / Infantil", sizes: ["Talla 4", "Talla 6", "Talla 8", "Talla 10", "Talla 12", "Talla 14", "Talla 16", "S Niño", "M Niño", "L Niño"] },
  { id: "unisex", label: "🧢 Unisex / Gorras / Calzado", sizes: ["Ajustable / Unitalla", "7 1/8", "7 1/4", "7 3/8", "7 1/2", "7 5/8", "25 MX", "26 MX", "27 MX", "28 MX", "29 MX"] }
];

const PRODUCT_CATEGORIES = [
  { id: "jerseys", label: "👕 Jerseys Oficiales", icon: "👕" },
  { id: "gorras", label: "🧢 Gorras & Hats", icon: "🧢" },
  { id: "chamarras", label: "🧥 Chamarras & Hoodies", icon: "🧥" },
  { id: "calzado", label: "👟 Calzado Deportivo", icon: "👟" },
  { id: "balones", label: "🏈 Balones & Pelotas", icon: "🏈" },
  { id: "accesorios", label: "🎒 Accesorios & Gear", icon: "🎒" }
];

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

// Full taxonomy breadcrumb lookup
function getFullTaxonomy(teamId) {
  if (!teamId || teamId === 'all') {
    return { sport: "Deportes", icon: "🏆", league: "Oficial", team: "Catch Sports" };
  }
  for (const s of SPORTS_CATALOG) {
    for (const l of s.leagues) {
      const team = l.teams.find(t => t.id === teamId);
      if (team) {
        return {
          sport: s.sport,
          icon: s.icon,
          league: l.league,
          team: team.name
        };
      }
    }
  }
  return { sport: "Deportes", icon: "🏆", league: "Oficial", team: teamId.toUpperCase() };
}

function getTeamName(teamId) {
  return getFullTaxonomy(teamId).team;
}

function getLeagueByTeam(teamId) {
  const tax = getFullTaxonomy(teamId);
  return `${tax.sport} — ${tax.league}`;
}

function getGenderLabel(genderId) {
  const g = GENDER_DEPARTMENTS.find(dept => dept.id === genderId);
  return g ? g.label : "👨 Caballero";
}

function getCategoryLabel(catId) {
  const c = PRODUCT_CATEGORIES.find(cat => cat.id === catId);
  return c ? c.label : "👕 Artículo Deportivo";
}
