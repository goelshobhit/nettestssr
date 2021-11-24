import includes from 'lodash/includes';

const sabbat2 = [
  'Auctoritas Ritae-  The Vaulderie (Sabbat)',
  'Auctoritas Ritae- High Holidays (Sabbat)',
  'Auctoritas Ritae- Monomancy (Sabbat)',
  'Auctoritas Ritae- War Party and Wild Hunt (Sabbat)',
];

const sabbat1 = [
  'Sabbat',
  'Factions and Faction Ritae (Sabbat)',
  'The Auctoritas Ritae (Sabbat)',
  'The Ignoblis Ritae (Sabbat)',
];

const menu1 = ['Character Creation Quick Start Guide'];
const menu2 = [
  'Combat Maneuvers',
  'Aerial Combat Maneuvers',
  'Feral Combat Maneuvers',
];
const menu3 = [
  'Dramatic Systems',
  'Blood Bond',
  'Diablerie',
  'Tracking',
  'Willpower',
];

const menu4 = ['Ghoul Rules', 'Animal Retainers'];

const menu5 = [
  'Influences- General',
  'Influence- Elite and Underworld Actions',
];

const menu6 = [
  'Optional Rules',
  'Advanced Feeding (Optional Rules)',
  'Blood Resonance (Optional Rules)',
  'Feeding Territories (Optional Rules)'
];

const menu7 = [
  'Spending XP',
];

const menu8 = [
  'Stock Locations',
  'Stock Locations - Iconic and Supernatural Qualities',
  'Stock Locations - Standard Qualities',
  'Stock Locations- Undermining Locations',
  'Stock Locations- Controlling them',
];

const menu9 = [
  'Stock NPC Generation',
  'Hunters: Arcanum',
  'Hunters: Project Twilight',
  'Hunters: Those of Faith',
];

const menu10 = [
  'Storytelling',
  'Cooperative Conflict and Advanced Narration: Expert Tools for Story Creation',
  'Platinum Rule',
];

const menu11 = [
  'The Temptation of the Beast',
  'Expanded Beast Trait System',
  'Expanded Path Mechanics',
  'Frenzy',
  'Vampire Sects and the Paths of Enlightenment',
];

function getMatchId(id) {
  if (includes(sabbat2, id)) {
    return ['Sabbat', 'The Auctoritas Ritae (Sabbat)'];
  }
  if (includes(sabbat1, id)) {
    return ['Sabbat'];
  }
  if (includes(menu1, id)) {
    return ['Character Creation Quick Start Guide'];
  }
  if (includes(menu2, id)) {
    return ['Combat Maneuvers'];
  }
  if (includes(menu3, id)) {
    return ['Dramatic Systems'];
  }
  if (includes(menu4, id)) {
    return ['Ghoul Rules'];
  }
  if (includes(menu5, id)) {
    return ['Influences- General'];
  }
  if (includes(menu6, id)) {
    return ['Optional Rules'];
  }

  if (includes(menu7, id)) {
    return ['Spending XP'];
  }
  if (includes(menu8, id)) {
    return ['Stock Locations'];
  }
  if (includes(menu9, id)) {
    return ['Stock NPC Generation'];
  }
  if (includes(menu10, id)) {
    return ['Storytelling'];
  }

  if (includes(menu11, id)) {
    return ['The Temptation of the Beast'];
  }

  return false;
}

export default getMatchId;
