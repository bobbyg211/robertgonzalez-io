// TODO[INVENTED]: every client below is fabricated to make the logo treatments
// visible. These names may well collide with real businesses — none of them is
// a real engagement and none should survive to launch. Replace wholesale with
// Robert's actual client list, and with real logo files.
//
// TODO[NEEDS ROBERT]: the brief's rule is that integration clients are
// described by industry and system rather than named, and that agency clients
// are the agency's relationships. Which of these are actually yours to publish
// is a question only you can answer — the marquee will happily show whatever
// this array contains.

export const clients = [
  { name: "Northgate Supply", industry: "Building materials" },
  { name: "Halvorsen Group", industry: "Insurance" },
  { name: "Cedarline Services", industry: "Field service" },
  { name: "Ambrose Manufacturing", industry: "Industrial" },
  { name: "Wexler Health Network", industry: "Healthcare" },
  { name: "The Larkin Fund", industry: "Nonprofit" },
  { name: "Portside Logistics", industry: "Logistics" },
  { name: "Brightwater Bank", industry: "Financial services" },
  { name: "Calloway Instruments", industry: "Medical devices" },
  { name: "Merrow & Fitch", industry: "Professional services" },
  { name: "Stonebridge Builders", industry: "Construction" },
  { name: "Ridgeway Equipment", industry: "Equipment rental" },
  { name: "Tallgrass Foods", industry: "Food manufacturing" },
  { name: "Ashford Staffing", industry: "Staffing" },
  { name: "Kestrel Architecture", industry: "Architecture" },
  { name: "Vance Trade Council", industry: "Trade association" },
];

export const getClient = (name) => clients.find((c) => c.name === name);
