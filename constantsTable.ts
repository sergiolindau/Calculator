var constantsTable: Array<[string, number]> = [
	// Mathematical Constants
	["cte.pi",		Math.PI],
	["cte.e",		Math.E],
    // Physical Constants
    // source: http://physics.nist.gov/cuu/Constants/Table/allascii.txt
    ["cte.g",		9.80665],			// standard acceleration of gravity
    ["cte.G",		6.67408e-11],		// Newtonian constant of gravitation
    ["cte.N0",		6.022140857e23],	// Avogadro constant
    ["cte.atm",		1.01325e5],			// standard atmosphere
    ["cte.R",		8.3144598],			// molar gas constant
    ["cte.k",		1.38064852e-23],	// Boltzmann constant
    ["cte.e",		1.6021766208e-19],	// elementary charge
    ["cte.me",		9.10938356e-31],	// electron mass
    ["cte.ep0",		8.854187817e-12],	// vacuum electric permittivity
    ["cte.mi0",		(Math.PI*4.0e-7)],	// vacuum magnetic permeability
    ["cte.c",		2.99792458e8],		// speed of light in vacuum
    ["cte.h",		6.626070040e-34],	// Planck constant
	// Unit conversion factors
	["cte.cal",		4.1868],			// calorie in Joules
	["cte.kWh",		3.6e6],				// kWh in Joules
	["cte.BTU",		252.2*4.1868],		// British Thermal Unit
	["cte.hp",		745.7],				// Horse Power in Watts
	["cte.cv",		735.3],				// Cavalo Vapor
	["cte.in",		2.54e-2]			// Inch in meters
];

const atomsTable: Array<[string, number]> = [
/*  Symbol	Molar mass */
	["0",	0],
	["H",	1.007947],
	["He",	4.0026022],
	["Li",	6.9412],
	["Be",	9.0121823],
	["B",	10.8117],
	["C",	12.01078],
	["N",	14.00672],
	["O",	15.99943],
	["F",	18.99840325],
	["Ne",	20.17976],
	["Na",	22.989769282],
	["Mg",	24.30506],
	["Al",	26.98153868],
	["Si",	28.08553],
	["P",	30.9737622],
	["S",	32.0655],
	["Cl",	35.4532],
	["Ar",	39.9481],
	["K",	39.09831],
	["Ca",	40.0784],
	["Sc",	44.9559126],
	["Ti",	47.8671],
	["V",	50.94151],
	["Cr",	51.99616],
	["Mn",	54.9380455],
	["Fe",	55.8452],
	["Co",	58.9331955],
	["Ni",	58.69342],
	["Cu",	63.5463],
	["Zn",	65.4094],
	["Ga",	69.7231],
	["Ge",	72.641],
	["As",	74.921602],
	["Se",	78.963],
	["Br",	79.9041],
	["Kr",	83.7982],
	["Rb",	85.46783],
	["Sr",	87.621],
	["Y",	88.905852],
	["Zr",	91.2242],
	["Nb",	92.906382],
	["Mo", 	95.942],
	["Tc",	98],
	["Ru",	101.072],
	["Rh",	102.905502],
	["Pd",	106.421],
	["Ag",	107.86822],
	["Cd",	112.4118],
	["In",	114.8183],
	["Sn",	118.7107],
	["Sb",	121.7601],
	["Te",	128.603],
	["I",	126.904473],
	["Xe",	131.2936],
	["Cs",	132.90545192],
	["Ba",	137.3277],
	["La",	138.905477],
	["Ce",	140.1161],
	["Pr",	140.907652],
	["Nd",	144.2423],
	["Pm",	145],
	["Sm",	150.362],
	["Eu",	151.9641],
	["Gd",	157.253],
	["Tb",	158.925352],
	["Dy",	162.5001],
	["Ho",	164.930322],
	["Er",	167.2593],
	["Tm",	168.934212],
	["Yb",	173.043],
	["Lu",	174.9671],
	["Hf",	178.492],
	["Ta",	180.947882],
	["W",	183.841],
	["Re",	186.2071],
	["Os",	190.233],
	["Ir",	192.2173],
	["Pt",	195.0849],
	["Au",	196.9665694],
	["Hg",	200.592],
	["Tl",	204.38332],
	["Pb",	207.21],
	["Bi",	208.980401],
	["Po",	210],
	["At",	210],
	["Rn",	220],
	["Fr",	223],
	["Ra",	226],
	["Ac",	227],
	["Th",	232.038062],
	["Pa",	231.035882],
	["U",	238.028913],
	["Np",	237],
	["Pu",	244],
	["Am",	243],
	["Cm",	247],
	["Bk",	247],
	["Cf",	251],
	["Es",	252],
	["Fm",	257],
	["Md",	258],
	["No",	259],
	["Lr",	262],
	["Rf",	261],
	["Db",	262],
	["Sg",	266],
	["Bh",	264],
	["Hs",	277],
	["Mt",	268],
	["Ds",	271],
	["Rg",	272],
	["Cn",	277],
	["Uut",	284],
	["Fl",	289],
	["Uup",	288],
	["Lv",	292],
	["Uus",	288],
	["Uuo",	294],
];

// Insert chemical elements properties in constantsTable (molar mass and atomic number)
for (var i = 1;i<atomsTable.length;i++){
	// Molar mass
	constantsTable.push(["cte."+atomsTable[i][0]+"_M", atomsTable[i][1]]);
	// Atomic number
	constantsTable.push(["cte."+atomsTable[i][0]+"_Z", i]);
}