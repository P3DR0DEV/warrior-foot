export function generateRandomTeamName(index: number) {
  const teamNames = [
    'Águias',
    'Leões',
    'Tigres',
    'Dragões',
    'Falcões',
    'Lobos',
    'Panthers',
    'Sharks',
    'Bulls',
    'Bears',
    'Eagles',
    'Lions',
    'Tigers',
    'Warriors',
    'Knights',
    'Spartans',
    'Phoenix',
    'Thunder',
    'Lightning',
    'Storm',
    'Flames',
    'Blaze',
    'Fire',
    'Ice',
    'Rangers',
    'Hunters',
    'Gladiators',
    'Champions',
    'Legends',
    'Heroes',
    'Titans',
    'Giants',
  ]

  const suffixes = ['FC', 'SC', 'EC', 'AC', 'United', 'City', 'Town', 'Club']

  const baseName = teamNames[index % teamNames.length]
  const suffix = suffixes[Math.floor(Math.random() * suffixes.length)]
  const teamName = `${baseName} ${suffix}`

  return teamName
}