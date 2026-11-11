import climber from '../img_ref/Gallery_ATS/general20.webp';
import roofWork from '../img_ref/Gallery_ATS/general21.webp';
import equipmentAccess from '../img_ref/Gallery_ATS/general22.webp';
import fallenTree from '../img_ref/Gallery_ATS/19-01.jpg';
import beforeClearing from '../img_ref/Gallery_ATS/01-before.webp';
import afterClearing from '../img_ref/Gallery_ATS/01-after.webp';

const florenceStorm = {
  type: 'Local reporting', publisher: 'WAFF 48', date: '2025-05-20',
  title: 'Downed trees after severe weather in Florence and Rogersville',
  url: 'https://www.waff.com/2025/05/20/power-outages-downed-trees-reported-across-tennessee-valley-due-severe-weather/',
  description: 'Local emergency officials reported trees down along a county road in Rogersville and a tree on a home in Florence.',
};

const winterCleanup = {
  type: 'Local reporting', publisher: 'WAFF 48', date: '2026-01-25',
  title: 'Lauderdale County clears downed trees after winter weather',
  url: 'https://www.waff.com/2026/01/25/florence-lauderdale-county-emergency-management-agency-work-restoring-power-fixing-damage/',
  description: 'The report covers road crews clearing debris and utility crews restoring power after overnight damage in Florence and Lauderdale County.',
};

const shoalsStormSurvey = {
  type: 'Storm records', publisher: 'National Weather Service',
  title: 'Storm damage records for the Shoals',
  url: 'https://www.weather.gov/media/bmx/stormdat/2025/bmxapr2025.pdf',
  description: 'The April 2025 report records wind and tornado damage, including fallen trees in Colbert and Lauderdale counties and trees blocking lanes near Florence.',
};

export const serviceResearch = {
  'tree-trimming': {
    sections: [
      ['Start with the problem branch', 'Pruning can make room around a roof, path, or driveway, remove deadwood, and improve how the canopy is structured. A visit helps identify which limbs matter and how much live canopy to retain.'],
      ['Choose the timing for the tree', 'The species, the tree’s condition, and the reason for pruning all matter. An arborist may recommend a different timing for routine shaping than for a damaged limb. Utility-line clearance should be coordinated with the utility.'],
    ],
    photos: [{ src: climber, caption: 'A climber working above ground in a tree canopy.' }],
    articles: [
      { type: 'Homeowner guide', publisher: 'Alabama Cooperative Extension', title: 'Pruning for healthier trees', url: 'https://www.aces.edu/blog/topics/news/tree-pruning-tips-for-healthier-landscapes/', description: 'Explains how the time of year, the tree’s condition, and the purpose of the cut affect pruning decisions.' },
      { type: 'Tree assessment', publisher: 'Alabama Cooperative Extension', title: 'What to look for in a tree’s structure', url: 'https://www.aces.edu/blog/topics/lawn-garden-urban/assessing-the-structure-of-trees-in-the-landscape/', description: 'Shows how branch connections and other structural features help inform a professional assessment.' },
    ],
  },
  'stump-grinding': {
    sections: [
      ['Know what stays underground', 'Grinding breaks up the stump and can take down some exposed roots. It typically leaves deeper roots in place. If you plan to build, replant, or change the grade in that spot, discuss whether grinding will be enough.'],
      ['Decide how to finish the spot', 'Agree on depth and what will happen to the chips, and ask whether filling or leveling is part of the quote. A narrow gate, nearby hardscape, and irrigation can all affect access.'],
    ],
    articles: [
      { type: 'Homeowner guide', publisher: 'South Dakota State University Extension', title: 'What stump grinding leaves behind', url: 'https://extension.sdstate.edu/how-remove-stump', description: 'Compares stump removal options and explains why removing chips and filling the depression may be separate work.' },
      { type: 'Equipment example', publisher: 'Vermeer', title: 'A compact stump cutter for narrow access', url: 'https://www.vermeer.com/na/stump-cutters/sc292', description: 'A manufacturer’s example of why gate width and equipment clearance matter when planning a grinding job.' },
    ],
  },
  'tree-removal': {
    sections: [
      ['Assess the tree and its surroundings', 'A removal plan depends on the tree’s condition and what is within reach of the trunk and branches. A tree near a roof, fence, or neighboring lot may need to come down in sections with a defined landing area.'],
      ['Confirm what the crew leaves behind', 'Ask the estimator to describe how the crew will reach the tree, what will happen to the logs and branches, and where the stump will be left. Include stump grinding separately if the area needs to be usable afterward.'],
    ],
    photos: [{ src: equipmentAccess, caption: 'Compact equipment staged in a narrow residential access route.' }],
    articles: [
      { type: 'Crew safety', publisher: 'OSHA', title: 'How crews assess a tree-removal job', url: 'https://www.osha.gov/memos/2021-06-30/inspection-guidance-for-tree-care-and-tree-removal-operations', description: 'Workplace guidance explains why a crew evaluates the tree, nearby power lines, equipment, and the areas where material will land.' },
      florenceStorm,
    ],
  },
  'no-impact-and-crane-removal': {
    sections: [
      ['When lifting may make sense', 'A crane can lift a section over a roof or fence to an open landing area. A track lift, bucket truck, or climber may be a better fit depending on the tree, the reach required, and what can get to the site.'],
      ['Plan for setup and property protection', 'The assessment should cover where equipment can sit, what is overhead, and what needs protection on the ground. Discuss driveways, lawns, septic areas, and neighboring access before settling on a method.'],
    ],
    photos: [{ src: roofWork, caption: 'A worker with ropes next to cut limbs above a roof.' }],
    articles: [
      { type: 'Equipment and crew safety', publisher: 'OSHA', title: 'Safety considerations for tree work with lifting equipment', url: 'https://www.osha.gov/tree-care/', description: 'An overview of tree-care hazards and the safety requirements that can apply to aerial lifts, hoisting, and falling material.' },
      { type: 'Regional storm record', publisher: 'National Weather Service', title: 'February 2025 tree damage in Colbert and Lauderdale counties', url: 'https://www.weather.gov/media/bmx/stormdat/2025/bmxfeb2025.pdf', description: 'The regional report includes trees down near Muscle Shoals and North Florence and damage to a home. It provides local context for removal around structures.' },
    ],
  },
  '24-hour-emergency-storm-services': {
    sections: [
      ['Call when a tree has struck or blocked something', 'Use the dispatch number for a tree on a home, across an access route, or hanging where it could fall. Tell dispatch what is affected and whether first responders or the utility are already on site.'],
      ['Keep clear while help is arranged', 'Stay away from downed wires and damaged structures. Call 911 for immediate danger. Once conditions are safe, ask about cleanup and the documentation your insurer needs.'],
    ],
    photos: [{ src: fallenTree, caption: 'A fallen tree across a driveway beside a vehicle.' }],
    articles: [
      florenceStorm, shoalsStormSurvey,
      { type: 'Public safety', publisher: 'National Weather Service', title: 'What to do after severe weather', url: 'https://www.weather.gov/safety/thunderstorm-after', description: 'Guidance on staying informed and avoiding downed power lines and damaged buildings while a storm area is assessed.' },
    ],
  },
  'land-clearing': {
    sections: [
      ['Define the finished site first', 'Preparing a building lot, widening a driveway, and reclaiming overgrown land can call for different amounts of clearing. Walk the boundary and flag trees, buffers, or other features to keep.'],
      ['Separate clearing from follow-up work', 'Ask the estimator to identify what will be cut, hauled, or ground and what the site will look like when the crew leaves. Discuss grading, erosion control, or invasive plant follow-up when those affect your next step.'],
    ],
    photos: [{ src: beforeClearing, caption: 'Before clearing beside a driveway.' }, { src: afterClearing, caption: 'After clearing the same area.' }],
    articles: [
      { type: 'Land management', publisher: 'Alabama Cooperative Extension', title: 'Managing Chinese privet after clearing', url: 'https://www.aces.edu/blog/topics/control-invasive-plants/control-options-for-chinese-privet/', description: 'Explains why a site with invasive privet can need follow-up after the first clearing pass.' },
      { type: 'Land management', publisher: 'Alabama Cooperative Extension', title: 'Seasonal planning for brush control', url: 'https://www.aces.edu/blog/topics/forestry-wildlife/fall-brush-control/', description: 'Discusses how plant type and season can change the approach to brush management.' },
    ],
  },
  'debris-removal': {
    sections: [
      ['Describe what is in the pile', 'Fallen limbs, logs, brush, and mixed storm debris may need different handling. Tell the crew if the material contains fencing, roofing, or other items mixed in with vegetation.'],
      ['Identify access and disposal arrangements', 'Note whether a truck can approach the pile or whether material must move through a gate. After a regional storm, check whether your city has issued separate pickup instructions.'],
    ],
    articles: [
      winterCleanup,
      { type: 'Disposal guidance', publisher: 'Alabama Department of Environmental Management', title: 'State guidance on disaster debris disposal', url: 'https://adem.alabama.gov/sites/default/files/legacyfiles/programs/land/landforms/DisasterDebrisDisposalMemo.pdf', description: 'Background for understanding why disposal options differ by material and why local storm instructions matter.' },
    ],
  },
  'municipal-tree-service': {
    sections: [
      ['Plan around public use', 'A city project can include pruning along a street or sidewalk, retaining canopy in a public space, or removing a damaged tree. Identify pedestrian routes, street access, and the department responsible for the site.'],
      ['Give the crew a usable scope', 'Share a site list or map, which trees are highest priority, and any work windows. If traffic restrictions or notices are needed, identify who will coordinate them before scheduling.'],
    ],
    articles: [
      { type: 'Local program', publisher: 'City of Florence', title: 'Florence Urban Forestry', url: 'https://florenceal.org/urban-forestry/', description: 'The city’s urban forestry page provides a local starting point for questions about trees in public spaces.' },
      { type: 'Local reporting', publisher: 'WAFF 48', date: '2025-04-10', title: 'Storm damage in downtown Florence and near Waterloo', url: 'https://www.waff.com/2025/04/11/power-outages-downed-trees-reported-across-valley-due-severe-weather/', description: 'Coverage includes a downed tree in Wilson Park and storm-related closures near Waterloo.' },
    ],
  },
  'right-of-way-clearing': {
    sections: [
      ['Define the corridor and who owns it', 'A right-of-way plan should identify the route, the access needed, and which vegetation is in scope. The utility, road owner, or property manager can help establish the work boundaries and approvals.'],
      ['Coordinate before work near utilities', 'Share crossings, gates, and the location of overhead or underground utilities with the responsible owner. Keep away from downed lines and contact the utility about vegetation touching a line.'],
    ],
    articles: [
      { type: 'Utility guidance', publisher: 'Alabama Power', title: 'How Alabama Power manages vegetation near lines', url: 'https://www.alabamapower.com/company/safety/trees-and-rights-of-way/residential-vegetation-management.html', description: 'Explains the utility’s vegetation program and provides a contact point for line-clearance questions.' },
      winterCleanup,
    ],
  },
  'high-traffic-capable': {
    sections: [
      ['Build the schedule around access', 'Identify the busiest hours and the entrances that residents, customers, or deliveries rely on. Ask how the crew would stage equipment, manage temporary interruptions, and keep the responsible site contact informed.'],
      ['Coordinate work on or near a public road', 'The road owner or site manager can specify who handles closures, notices, and traffic control. Include pedestrian routes and emergency access in the planning discussion.'],
    ],
    articles: [
      { type: 'Road safety', publisher: 'Alabama Department of Transportation', title: 'Alabama work-zone awareness', url: 'https://www.dot.state.al.us/programs/WorkZoneAwareness.html', description: 'ALDOT’s public information on work-zone safety explains the importance of planning around both traffic and crews.' },
      shoalsStormSurvey,
    ],
  },
};
