// City list extracted from feature names
const cities = [
    "Unknown", "Acton", "Adelanto", "Adin", "Agoura Hills", "Aguanga", "Ahwahnee", "Alameda", "Alamo", "Albany",
    "Albion", "Alderpoint", "Alhambra", "Aliso Viejo", "Alleghany", "Alpaugh", "Alpine", "Alta", "Altadena", "Alturas",
    "Alviso", "Amador City", "Amboy", "Anaheim", "Anderson", "Angels Camp", "Angelus Oaks", "Angwin", "Annapolis", "Antelope",
    "Antioch", "Anza", "Apple Valley", "Applegate", "Aptos", "Arbuckle", "Arcadia", "Arcata", "Armona", "Arnold",
    "Aromas", "Arroyo Grande", "Artesia", "Arvin", "Atascadero", "Atherton", "Atwater", "Auberry", "Auburn", "Avalon",
    "Avenal", "Avery", "Avila Beach", "Azusa", "Badger", "Baker", "Bakersfield", "Baldwin Park", "Ballico", "Bangor",
    "Banning", "Barstow", "Bass Lake", "Bayside", "Beale Afb", "Beaumont", "Bell", "Bella Vista", "Bellflower", "Belmont",
    "Belvedere Tiburon", "Ben Lomond", "Benicia", "Benton", "Berkeley", "Berry Creek", "Bethel Island", "Beverly Hills", "Bieber", "Big Bar",
    "Big Bear City", "Big Bear Lake", "Big Bend", "Big Creek", "Big Oak Flat", "Big Pine", "Biggs", "Biola", "Birds Landing", "Bishop",
    "Blairsden Graeagle", "Blocksburg", "Bloomington", "Blue Lake", "Blythe", "Bodega", "Bodega Bay", "Bodfish", "Bolinas", "Bonita",
    "Bonsall", "Boonville", "Boron", "Borrego Springs", "Boulder Creek", "Boulevard", "Bradley", "Branscomb", "Brawley", "Brea",
    "Brentwood", "Bridgeport", "Bridgeville", "Brisbane", "Brookdale", "Brooks", "Browns Valley", "Brownsville", "Buellton", "Buena Park",
    "Burbank", "Burlingame", "Burney", "Burnt Ranch", "Burson", "Butte City", "Buttonwillow", "Byron", "Cabazon", "Calabasas",
    "Calexico", "Caliente", "California City", "California Hot Springs", "Calimesa", "Calipatria", "Calistoga", "Callahan", "Calpine", "Camarillo",
    "Cambria", "Camino", "Camp Nelson", "Campbell", "Campo", "Campo Seco", "Camptonville", "Canby", "Canoga Park", "Cantua Creek",
    "Canyon Country", "Canyon Dam", "Capay", "Capistrano Beach", "Capitola", "Cardiff By The Sea", "Carlotta", "Carlsbad", "Carmel", "Carmel By The Sea",
    "Carmel Valley", "Carmichael", "Carnelian Bay", "Carpinteria", "Carson", "Caruthers", "Casmalia", "Caspar", "Cassel", "Castaic",
    "Castella", "Castro Valley", "Castroville", "Cathedral City", "Catheys Valley", "Cayucos", "Cazadero", "Cedar Glen", "Cedarville", "Ceres",
    "Cerritos", "Challenge", "Chatsworth", "Chester", "Chico", "Chilcoot", "Chino", "Chino Hills", "Chowchilla", "Chualar",
    "Chula Vista", "Citrus Heights", "Claremont", "Clarksburg", "Clayton", "Clearlake", "Clearlake Oaks", "Clements", "Clio", "Clipper Mills",
    "Cloverdale", "Clovis", "Coachella", "Coalinga", "Coarsegold", "Cobb", "Coleville", "Colfax", "Colton", "Columbia",
    "Colusa", "Comptche", "Compton", "Concord", "Cool", "Copperopolis", "Corcoran", "Corning", "Corona", "Corona Del Mar",
    "Coronado", "Corte Madera", "Costa Mesa", "Cotati", "Cottonwood", "Coulterville", "Courtland", "Covelo", "Covina", "Crescent Mills",
    "Cressey", "Crestline", "Creston", "Crockett", "Crows Landing", "Culver City", "Cupertino", "Cutler", "Cypress", "Daggett",
    "Daly City", "Dana Point", "Danville", "Darwin", "Davenport", "Davis", "Davis Creek", "Death Valley", "Deer Park", "Del Mar",
    "Del Rey", "Delano", "Delhi", "Denair", "Descanso", "Desert Center", "Desert Hot Springs", "Diamond Bar", "Diamond Springs", "Dillon Beach",
    "Dinuba", "Dixon", "Dobbins", "Dorris", "Dos Palos", "Dos Rios", "Douglas City", "Downey", "Downieville", "Doyle",
    "Duarte", "Dublin", "Ducor", "Dulzura", "Duncans Mills", "Dunlap", "Dunnigan", "Dunsmuir", "Durham", "Dutch Flat",
    "Eagleville", "Earlimart", "Earp", "Echo Lake", "Edwards", "El Cajon", "El Centro", "El Cerrito", "El Dorado", "El Dorado Hills",
    "El Monte", "El Nido", "El Portal", "El Segundo", "El Sobrante", "Eldridge", "Elk", "Elk Creek", "Elk Grove", "Elmira",
    "Elverta", "Emeryville", "Emigrant Gap", "Encinitas", "Encino", "Escalon", "Escondido", "Esparto", "Essex", "Etna",
    "Eureka", "Exeter", "Fair Oaks", "Fairfax", "Fairfield", "Fall River Mills", "Fallbrook", "Farmersville", "Farmington", "Fawnskin",
    "Fellows", "Felton", "Ferndale", "Fiddletown", "Fields Landing", "Fillmore", "Firebaugh", "Fish Camp", "Five Points", "Flournoy",
    "Folsom", "Fontana", "Foothill Ranch", "Forbestown", "Forest Falls", "Forest Knolls", "Forest Ranch", "Foresthill", "Forestville", "Forks Of Salmon",
    "Fort Bidwell", "Fort Bragg", "Fort Irwin", "Fortuna", "Fountain Valley", "Fowler", "Frazier Park", "Freedom", "Fremont", "French Camp",
    "French Gulch", "Fresno", "Friant", "Fullerton", "Fulton", "Galt", "Garberville", "Garden Grove", "Garden Valley", "Gardena",
    "Gasquet", "Gazelle", "Georgetown", "Gerber", "Geyserville", "Gilroy", "Glen Ellen", "Glencoe", "Glendale", "Glendora",
    "Glenhaven", "Glenn", "Glennville", "Gold Run", "Goleta", "Gonzales", "Goodyears Bar", "Granada Hills", "Grand Terrace", "Granite Bay",
    "Grass Valley", "Graton", "Green Valley Lake", "Greenbrae", "Greenfield", "Greenview", "Greenville", "Greenwood", "Grenada", "Gridley",
    "Grimes", "Grizzly Flats", "Groveland", "Grover Beach", "Guadalupe", "Gualala", "Guatay", "Guerneville", "Guinda", "Gustine",
    "Hacienda Heights", "Half Moon Bay", "Hamilton City", "Hanford", "Happy Camp", "Harbor City", "Hat Creek", "Hathaway Pines", "Hawaiian Gardens", "Hawthorne",
    "Hayward", "Healdsburg", "Heber", "Helendale", "Helm", "Hemet", "Herald", "Hercules", "Herlong", "Hermosa Beach",
    "Hesperia", "Hickman", "Highland", "Hilmar", "Hinkley", "Holtville", "Homeland", "Homewood", "Honeydew", "Hood",
    "Hoopa", "Hopland", "Hornbrook", "Hornitos", "Hughson", "Hume", "Huntington Beach", "Huntington Park", "Huron", "Hyampom",
    "Hydesville", "Idyllwild", "Igo", "Imperial", "Imperial Beach", "Independence", "Indian Wells", "Indio", "Inglewood", "Inverness",
    "Ione", "Irvine", "Isleton", "Ivanhoe", "Jackson", "Jacumba", "Jamestown", "Jamul", "Janesville", "Jenner",
    "Johannesburg", "Jolon", "Joshua Tree", "Julian", "Junction City", "June Lake", "Keeler", "Keene", "Kelseyville", "Kenwood",
    "Kerman", "Kernville", "Kettleman City", "Keyes", "King City", "Kings Beach", "Kingsburg", "Kirkwood", "Klamath", "Klamath River",
    "Kneeland", "Knights Landing", "Korbel", "Kyburz", "La Canada Flintridge", "La Crescenta", "La Grange", "La Habra", "La Honda", "La Jolla",
    "La Mesa", "La Mirada", "La Palma", "La Puente", "La Quinta", "La Verne", "Ladera Ranch", "Lafayette", "Laguna Beach", "Laguna Hills",
    "Laguna Niguel", "Lagunitas", "Lake Arrowhead", "Lake Elsinore", "Lake Forest", "Lake Hughes", "Lake Isabella", "Lakehead", "Lakeport", "Lakeshore",
    "Lakeside", "Lakewood", "Lamont", "Lancaster", "Landers", "Larkspur", "Lathrop", "Laton", "Lawndale", "Laytonville",
    "Le Grand", "Lebec", "Lee Vining", "Leggett", "Lemon Cove", "Lemon Grove", "Lemoore", "Lewiston", "Likely", "Lincoln",
    "Linden", "Lindsay", "Litchfield", "Little River", "Littlerock", "Live Oak", "Livermore", "Livingston", "Llano", "Lockeford",
    "Lockwood", "Lodi", "Loleta", "Loma Linda", "Loma Mar", "Lomita", "Lompoc", "Long Barn", "Long Beach", "Lookout",
    "Loomis", "Los Alamitos", "Los Alamos", "Los Altos", "Los Angeles", "Los Banos", "Los Gatos", "Los Molinos", "Los Olivos", "Los Osos",
    "Lost Hills", "Lotus", "Lower Lake", "Loyalton", "Lucerne", "Lucerne Valley", "Ludlow", "Lynwood", "Lytle Creek", "Macdoel",
    "Mad River", "Madeline", "Madera", "Madison", "Magalia", "Malibu", "Mammoth Lakes", "Manchester", "Manhattan Beach", "Manteca",
    "Manton", "March Air Reserve Base", "Marina", "Marina Del Rey", "Mariposa", "Markleeville", "Marshall", "Martinez", "Marysville", "Mather",
    "Maxwell", "Maywood", "Mc Farland", "Mc Kittrick", "Mcarthur", "Mccloud", "Mckinleyville", "Meadow Valley", "Meadow Vista", "Mecca",
    "Mendocino", "Menifee", "Menlo Park", "Mentone", "Merced", "Meridian", "Mi Wuk Village", "Middletown", "Midpines", "Midway City",
    "Milford", "Mill Creek", "Mill Valley", "Millbrae", "Millville", "Milpitas", "Mineral", "Mira Loma", "Miramonte", "Miranda",
    "Mission Hills", "Mission Viejo", "Modesto", "Mojave", "Mokelumne Hill", "Monrovia", "Montara", "Montclair", "Monte Rio", "Montebello",
    "Monterey", "Monterey Park", "Montgomery Creek", "Montrose", "Moorpark", "Moraga", "Moreno Valley", "Morgan Hill", "Morongo Valley", "Morro Bay",
    "Moss Beach", "Moss Landing", "Mount Hamilton", "Mount Hermon", "Mount Laguna", "Mount Shasta", "Mountain Center", "Mountain Ranch", "Mountain View", "Mt Baldy",
    "Murphys", "Murrieta", "Myers Flat", "Napa", "National City", "Navarro", "Needles", "Nevada City", "New Cuyama", "Newark",
    "Newbury Park", "Newcastle", "Newhall", "Newman", "Newport Beach", "Newport Coast", "Nicasio", "Nice", "Nicolaus", "Niland",
    "Nipomo", "Nipton", "Norco", "North Fork", "North Highlands", "North Hills", "North Hollywood", "North Palm Springs", "North San Juan", "Northridge",
    "Norwalk", "Novato", "Nubieber", "Nuevo", "O Neals", "Oak Park", "Oak Run", "Oak View", "Oakdale", "Oakhurst",
    "Oakland", "Oakley", "Occidental", "Oceano", "Oceanside", "Ocotillo", "Ojai", "Olancha", "Old Station", "Olema",
    "Olivehurst", "Olympic Valley", "Ontario", "Orange", "Orange Cove", "Orangevale", "Oregon House", "Orick", "Orinda", "Orland",
    "Orleans", "Oro Grande", "Orosi", "Oroville", "Oxnard", "Pacific Grove", "Pacific Palisades", "Pacifica", "Pacoima", "Paicines",
    "Pala", "Palermo", "Palm Desert", "Palm Springs", "Palmdale", "Palo Alto", "Palo Cedro", "Palo Verde", "Palomar Mountain", "Palos Verdes Peninsula",
    "Paradise", "Paramount", "Parker Dam", "Parlier", "Pasadena", "Paskenta", "Paso Robles", "Patterson", "Pauma Valley", "Paynes Creek",
    "Pearblossom", "Pebble Beach", "Penn Valley", "Penngrove", "Penryn", "Perris", "Pescadero", "Petaluma", "Petrolia", "Phelan",
    "Phillipsville", "Philo", "Pico Rivera", "Piercy", "Pilot Hill", "Pine Grove", "Pine Valley", "Pinecrest", "Pinole", "Pinon Hills",
    "Pioneer", "Pioneertown", "Piru", "Pismo Beach", "Pittsburg", "Pixley", "Placentia", "Placerville", "Planada", "Platina",
    "Playa Del Rey", "Pleasant Grove", "Pleasant Hill", "Pleasanton", "Plymouth", "Point Arena", "Point Reyes Station", "Pollock Pines", "Pomona", "Pope Valley",
    "Port Costa", "Port Hueneme", "Porter Ranch", "Porterville", "Portola", "Portola Valley", "Posey", "Potrero", "Potter Valley", "Poway",
    "Prather", "Princeton", "Quincy", "Raisin City", "Ramona", "Ranchita", "Rancho Cordova", "Rancho Cucamonga", "Rancho Mirage", "Rancho Palos Verdes",
    "Rancho Santa Fe", "Rancho Santa Margarita", "Randsburg", "Ravendale", "Raymond", "Red Bluff", "Redcrest", "Redding", "Redlands", "Redondo Beach",
    "Redway", "Redwood City", "Redwood Valley", "Reedley", "Rescue", "Reseda", "Rialto", "Richgrove", "Richmond", "Richvale",
    "Rio Dell", "Rio Linda", "Rio Nido", "Rio Oso", "Rio Vista", "Ripon", "River Pines", "Riverbank", "Riverdale", "Riverside",
    "Rocklin", "Rodeo", "Rohnert Park", "Rosamond", "Rosemead", "Roseville", "Rough And Ready", "Round Mountain", "Rowland Heights", "Running Springs",
    "Sacramento", "Saint Helena", "Salida", "Salinas", "Salton City", "Salyer", "Samoa", "San Andreas", "San Anselmo", "San Ardo",
    "San Bernardino", "San Bruno", "San Carlos", "San Clemente", "San Diego", "San Dimas", "San Fernando", "San Francisco", "San Gabriel", "San Geronimo",
    "San Gregorio", "San Jacinto", "San Joaquin", "San Jose", "San Juan Bautista", "San Juan Capistrano", "San Leandro", "San Lorenzo", "San Lucas", "San Luis Obispo",
    "San Marcos", "San Marino", "San Martin", "San Mateo", "San Miguel", "San Pablo", "San Pedro", "San Quentin", "San Rafael", "San Ramon",
    "San Simeon", "San Ysidro", "Sanger", "Santa Ana", "Santa Barbara", "Santa Clara", "Santa Clarita", "Santa Cruz", "Santa Fe Springs", "Santa Margarita",
    "Santa Maria", "Santa Monica", "Santa Paula", "Santa Rosa", "Santa Ynez", "Santa Ysabel", "Santee", "Saratoga", "Sausalito", "Scotia",
    "Scott Bar", "Scotts Valley", "Seal Beach", "Seaside", "Sebastopol", "Seeley", "Seiad Valley", "Selma", "Sequoia National Park", "Shafter",
    "Shandon", "Shasta", "Shasta Lake", "Shaver Lake", "Sheep Ranch", "Sheridan", "Sherman Oaks", "Shingle Springs", "Shingletown", "Shoshone",
    "Sierra City", "Sierra Madre", "Sierraville", "Silverado", "Simi Valley", "Sloughhouse", "Smartville", "Smith River", "Snelling", "Soda Springs",
    "Solana Beach", "Soledad", "Solvang", "Somerset", "Somes Bar", "Somis", "Sonoma", "Sonora", "Soquel", "Soulsbyville",
    "South Dos Palos", "South El Monte", "South Gate", "South Lake Tahoe", "South Pasadena", "South San Francisco", "Spreckels", "Spring Valley", "Springville", "Squaw Valley",
    "Standish", "Stanford", "Stanton", "Stevenson Ranch", "Stevinson", "Stinson Beach", "Stirling City", "Stockton", "Stonyford", "Stratford",
    "Strathmore", "Strawberry Valley", "Studio City", "Sugarloaf", "Suisun City", "Sultana", "Summerland", "Sun City", "Sun Valley", "Sunland",
    "Sunnyvale", "Sunol", "Sunset Beach", "Surfside", "Susanville", "Sutter", "Sutter Creek", "Sylmar", "Taft", "Tahoe City",
    "Tahoe Vista", "Tahoma", "Tarzana", "Taylorsville", "Tecate", "Tehachapi", "Tehama", "Temecula", "Temple City", "Templeton",
    "Termo", "Terra Bella", "The Sea Ranch", "Thermal", "Thornton", "Thousand Oaks", "Thousand Palms", "Three Rivers", "Tollhouse", "Tomales",
    "Topanga", "Topaz", "Torrance", "Trabuco Canyon", "Tracy", "Tranquillity", "Traver", "Travis Afb", "Trinidad", "Trinity Center",
    "Tujunga", "Tulare", "Tulelake", "Tuolumne", "Tupman", "Turlock", "Tustin", "Twain", "Twain Harte", "Twentynine Palms",
    "Twin Bridges", "Ukiah", "Union City", "Upland", "Upper Lake", "Vacaville", "Valencia", "Vallecito", "Vallejo", "Valley Center",
    "Valley Ford", "Valley Springs", "Valley Village", "Valyermo", "Van Nuys", "Venice", "Ventura", "Vernalis", "Victorville", "Villa Park",
    "Vina", "Visalia", "Vista", "Volcano", "Wallace", "Walnut", "Walnut Creek", "Walnut Grove", "Warner Springs", "Wasco",
    "Washington", "Waterford", "Watsonville", "Weaverville", "Weed", "Weimar", "Weldon", "Wendel", "Weott", "West Covina",
    "West Hills", "West Hollywood", "West Point", "West Sacramento", "Westlake Village", "Westminster", "Westmorland", "Westport", "Westwood", "Wheatland",
    "White Water", "Whitmore", "Whittier", "Wildomar", "Williams", "Willits", "Willow Creek", "Willows", "Wilmington", "Wilseyville",
    "Wilton", "Winchester", "Windsor", "Winnetka", "Winterhaven", "Winters", "Winton", "Wishon", "Witter Springs", "Wofford Heights",
    "Woodacre", "Woodbridge", "Woodlake", "Woodland", "Woodland Hills", "Woody", "Wrightwood", "Yermo", "Yorba Linda", "Yorkville",
    "Yountville", "Yreka", "Yuba City", "Yucaipa", "Yucca Valley", "Zenia"
];

// Initialize on page load - wait for DOM
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
        console.log('📄 DOM loaded, initializing...');
        initializeApp();
    });
} else {
    // DOM already loaded
    console.log('📄 DOM already loaded, initializing...');
    initializeApp();
}

function initializeApp() {
    try {
        console.log('🔧 Starting initialization...');
        setupFormHandlers();
        console.log('✅ Initialization complete!');
    } catch (error) {
        console.error('❌ Initialization error:', error);
        alert('Error initializing application. Please refresh the page.');
    }
}

// Setup form handlers
function setupFormHandlers() {
    const form = document.getElementById('churnForm');
    const resetBtn = document.getElementById('resetBtn');
    const sampleDataBtn = document.getElementById('sampleDataBtn');
    
    if (!form) {
        console.error('❌ Form element (churnForm) not found!');
        return;
    }
    
    if (!resetBtn) {
        console.error('❌ Reset button not found!');
        return;
    }
    
    form.addEventListener('submit', handleFormSubmit);
    resetBtn.addEventListener('click', resetForm);
    
    if (sampleDataBtn) {
        sampleDataBtn.addEventListener('click', fillSampleData);
    } else {
        console.warn('⚠️ Sample data button not found (optional)');
    }
    
    console.log('✅ Form handlers setup complete');
}

// Fill form with sample data
function fillSampleData() {
    // Ask user which sample to use
    const sampleType = confirm('Click OK for HIGH RISK sample (likely to churn)\nClick Cancel for LOW RISK sample (unlikely to churn)');
    
    if (sampleType) {
        // HIGH RISK sample - likely to churn
        fillHighRiskSample();
    } else {
        // LOW RISK sample - unlikely to churn
        fillLowRiskSample();
    }
}

function fillHighRiskSample() {
    // High risk customer - likely to churn
    // Different factors: Low tenure, High charge, Low satisfaction, No contract, Low referrals
    document.getElementById('tenureInMonths').value = '5';
    document.getElementById('monthlyCharge').value = '150.00';  // HIGH charge
    document.getElementById('totalCharges').value = '750.00';    // Low total (short tenure)
    document.getElementById('satisfactionScore').value = '1';   // LOW satisfaction
    document.getElementById('internetType').value = 'Fiber Optic';
    document.getElementById('contract').value = 'Unknown';      // NO contract
    document.getElementById('numberOfReferrals').value = '0';   // No referrals
    document.getElementById('avgLongDistanceCharges').value = '25.00';  // High long distance
    
    alert('✅ HIGH RISK sample data filled!\n\nFactors:\n- Tenure: 5 months (LOW)\n- Monthly Charge: $150 (HIGH)\n- Total Charges: $750 (LOW - short tenure)\n- Satisfaction: 1/5 (LOW)\n- Contract: None\n- Referrals: 0\n- Avg Long Distance: $25\n\nExpected: HIGH risk (60-90%)\n\nClick "Predict Churn" and check if risk is high!');
}

function fillLowRiskSample() {
    // Low risk customer - unlikely to churn
    // Different factors: High tenure, Low charge, High satisfaction, Long contract, High referrals
    document.getElementById('tenureInMonths').value = '60';     // HIGH tenure
    document.getElementById('monthlyCharge').value = '50.00';   // LOW charge
    document.getElementById('totalCharges').value = '3000.00'; // High total (long tenure)
    document.getElementById('satisfactionScore').value = '5';   // HIGH satisfaction
    document.getElementById('internetType').value = 'DSL';
    document.getElementById('contract').value = 'Two Year';     // LONG contract
    document.getElementById('numberOfReferrals').value = '3';   // High referrals
    document.getElementById('avgLongDistanceCharges').value = '5.00';  // Low long distance
    
    alert('✅ LOW RISK sample data filled!\n\nFactors:\n- Tenure: 60 months (HIGH)\n- Monthly Charge: $50 (LOW)\n- Total Charges: $3000 (HIGH - long tenure)\n- Satisfaction: 5/5 (HIGH)\n- Contract: Two Year (LONG)\n- Referrals: 3\n- Avg Long Distance: $5\n\nExpected: LOW risk (10-30%)\n\nClick "Predict Churn" and check if risk is low!');
}

// Handle form submission
async function handleFormSubmit(event) {
    event.preventDefault();
    event.stopPropagation();
    
    console.log('🔘 Form submit button clicked');
    console.log('🔄 Reading form values RIGHT NOW (before collectFormData):');
    
    // FIX: Read values directly here to verify they're current
    const tenureCheck = document.getElementById('tenureInMonths')?.value;
    const monthlyCheck = document.getElementById('monthlyCharge')?.value;
    const satisfactionCheck = document.getElementById('satisfactionScore')?.value;
    console.log('   Tenure (direct check):', tenureCheck);
    console.log('   Monthly (direct check):', monthlyCheck);
    console.log('   Satisfaction (direct check):', satisfactionCheck);
    
    const submitBtn = document.getElementById('submitBtn');
    const btnText = submitBtn.querySelector('.btn-text');
    const btnLoader = submitBtn.querySelector('.btn-loader');
    const errorMessage = document.getElementById('errorMessage');
    const results = document.getElementById('results');
    
    // Show loading state
    submitBtn.disabled = true;
    btnText.style.display = 'none';
    btnLoader.style.display = 'inline';
    errorMessage.style.display = 'none';
    results.style.display = 'none';
    
    try {
        // Validate required fields before collecting data - FIX: Read directly
        const tenureEl = document.getElementById('tenureInMonths');
        const monthlyEl = document.getElementById('monthlyCharge');
        const totalEl = document.getElementById('totalCharges');
        
        const tenure = tenureEl ? tenureEl.value : '';
        const monthlyCharge = monthlyEl ? monthlyEl.value : '';
        const totalCharges = totalEl ? totalEl.value : '';
        
        console.log('🔍 Validation - Reading values directly:');
        console.log('   Tenure:', tenure);
        console.log('   Monthly:', monthlyCharge);
        console.log('   Total:', totalCharges);
        
        if (!tenure || tenure === '0' || !monthlyCharge || monthlyCharge === '0' || !totalCharges || totalCharges === '0') {
            throw new Error('⚠️ Please fill in required fields: Tenure, Monthly Charge, and Total Charges must be greater than 0');
        }
        
        // FIX: Force read values again RIGHT BEFORE collectFormData
        console.log('🔄 About to call collectFormData() - Current form values:');
        console.log('   Tenure:', document.getElementById('tenureInMonths')?.value);
        console.log('   Monthly:', document.getElementById('monthlyCharge')?.value);
        console.log('   Satisfaction:', document.getElementById('satisfactionScore')?.value);
        
        // FIX: Read satisfaction DIRECTLY and FORCE it into formData
        // Read MULTIPLE TIMES to ensure we get the latest value
        const satisfactionElement = document.getElementById('satisfactionScore');
        
        // Read value THREE TIMES to make sure we get the latest
        const satisfactionValue1 = satisfactionElement ? satisfactionElement.value : null;
        const satisfactionValue2 = satisfactionElement ? satisfactionElement.value : null;
        const satisfactionValue3 = satisfactionElement ? satisfactionElement.value : null;
        
        console.log('🔧 FIX: Reading satisfaction DIRECTLY from DOM (3 times):');
        console.log('   Read 1:', satisfactionValue1);
        console.log('   Read 2:', satisfactionValue2);
        console.log('   Read 3:', satisfactionValue3);
        console.log('   Element:', satisfactionElement);
        console.log('   Element.value:', satisfactionElement ? satisfactionElement.value : 'ELEMENT NOT FOUND');
        console.log('   Element.defaultValue:', satisfactionElement ? satisfactionElement.defaultValue : 'N/A');
        console.log('   Element.getAttribute("value"):', satisfactionElement ? satisfactionElement.getAttribute('value') : 'N/A');
        
        // Use the latest value
        const satisfactionValueDirect = satisfactionValue3 || satisfactionValue2 || satisfactionValue1;
        
        // Collect form data
        const formData = collectFormData();
        
        // FORCE update satisfaction from direct read - ALWAYS override
        if (satisfactionValueDirect && satisfactionValueDirect !== '') {
            const satisfactionNum = parseFloat(satisfactionValueDirect);
            console.log('🔧 FORCING Satisfaction Score to:', satisfactionNum, '(from direct DOM read)');
            console.log('🔧 BEFORE FORCE - formData["Satisfaction Score"]:', formData['Satisfaction Score']);
            formData['Satisfaction Score'] = satisfactionNum;
            console.log('🔧 AFTER FORCE - formData["Satisfaction Score"]:', formData['Satisfaction Score']);
        } else {
            console.error('❌ ERROR: Satisfaction value is empty or invalid!');
            console.error('   satisfactionValueDirect:', satisfactionValueDirect);
        }
        
        // Validate collected data
        if (formData['Tenure in Months'] === 0 || formData['Monthly Charge'] === 0 || formData['Total Charges'] === 0) {
            throw new Error('⚠️ Required fields cannot be zero. Please fill in Tenure, Monthly Charge, and Total Charges.');
        }
        
        // Debug: Log satisfaction score specifically - CHECK ACTUAL ELEMENT VALUE
        const satisfactionElementCheck = document.getElementById('satisfactionScore');
        const actualElementValue = satisfactionElementCheck ? satisfactionElementCheck.value : 'ELEMENT NOT FOUND';
        
        console.log('🔍 Satisfaction Score DEBUG:');
        console.log('   - Element value (from DOM):', actualElementValue);
        console.log('   - Collected data value:', formData['Satisfaction Score']);
        console.log('   - Are they the same?', actualElementValue == formData['Satisfaction Score']);
        
        if (formData['Satisfaction Score'] === 0 || !formData['Satisfaction Score']) {
            console.warn('⚠️ WARNING: Satisfaction Score is 0 or missing in collected data!');
            console.warn('⚠️ Element value is:', actualElementValue);
            console.warn('⚠️ This might cause prediction issues. Make sure Satisfaction Score is filled (1-5).');
        }
        
        // If they don't match, there's a bug!
        if (actualElementValue != formData['Satisfaction Score']) {
            console.error('❌ BUG DETECTED: Element value (' + actualElementValue + ') != Collected data (' + formData['Satisfaction Score'] + ')');
            console.error('❌ The satisfaction score is NOT being read correctly!');
        }
        
        // Debug: Log the data being sent (first 20 features)
        console.log('📤 Sending data to API...');
        console.log('Sample features:', Object.keys(formData).slice(0, 20));
        console.log('Total features:', Object.keys(formData).length);
        
        // FIX: Log all critical values in ONE object so they're visible
        const criticalValues = {
            'Tenure in Months': formData['Tenure in Months'],
            'Monthly Charge': formData['Monthly Charge'],
            'Total Charges': formData['Total Charges'],
            'Satisfaction Score': formData['Satisfaction Score'],
            'Number of Referrals': formData['Number of Referrals'],
            'Avg Monthly Long Distance Charges': formData['Avg Monthly Long Distance Charges']
        };
        console.log('🔑 CRITICAL VALUES BEING SENT:', criticalValues);
        console.log('   ⚠️ Satisfaction Score:', formData['Satisfaction Score'], '← THIS MUST CHANGE!');
        
        // Log the actual JSON being sent
        const jsonPayload = JSON.stringify({ data: formData });
        console.log('📦 JSON Payload (first 500 chars):', jsonPayload.substring(0, 500));
        
        // Count non-zero values
        const nonZeroCount = Object.values(formData).filter(v => v !== 0 && v !== '0' && v !== null && v !== undefined).length;
        console.log(`ℹ️ Non-zero values: ${nonZeroCount} out of ${Object.keys(formData).length}`);
        
        // Show which features have non-zero values
        const nonZeroFeatures = Object.entries(formData)
            .filter(([key, value]) => value !== 0 && value !== '0' && value !== null && value !== undefined)
            .map(([key, value]) => `${key}: ${value}`)
            .slice(0, 20); // Show first 20
        console.log('📋 Non-zero features:', nonZeroFeatures);
        
        if (nonZeroCount < 10) {
            console.warn('⚠️ Very few non-zero values! Make sure you filled the form correctly.');
            console.warn('⚠️ Required fields: Tenure, Monthly Charge, Total Charges, Satisfaction Score, Number of Referrals, Avg Long Distance Charges must be filled');
        }
        
        // Check critical features
        const criticalFeatures = {
            'Tenure in Months': formData['Tenure in Months'],
            'Monthly Charge': formData['Monthly Charge'],
            'Total Charges': formData['Total Charges'],
            'Satisfaction Score': formData['Satisfaction Score'],
            'Internet Type': Object.keys(formData).find(k => k.startsWith('Internet Type_') && formData[k] === 1),
            'Contract': Object.keys(formData).find(k => k.startsWith('Contract_') && formData[k] === 1),
            'Number of Referrals': formData['Number of Referrals'],
            'Avg Monthly Long Distance Charges': formData['Avg Monthly Long Distance Charges']
        };
        console.log('🔑 Critical features:', criticalFeatures);
        
        // Verify all essential inputs are different
        console.log('📊 Input verification:');
        console.log('   Tenure:', formData['Tenure in Months'], '(should vary)');
        console.log('   Monthly Charge:', formData['Monthly Charge'], '(should vary)');
        console.log('   Total Charges:', formData['Total Charges'], '(should vary)');
        console.log('   Satisfaction:', formData['Satisfaction Score'], '(should vary)');
        console.log('   Internet Type:', criticalFeatures['Internet Type']);
        console.log('   Contract:', criticalFeatures['Contract']);
        console.log('   Number of Referrals:', criticalFeatures['Number of Referrals']);
        console.log('   Avg Long Distance Charges:', criticalFeatures['Avg Monthly Long Distance Charges']);
        
        // Send to API
        console.log('📡 Sending POST request to /predict...');
        console.log('📦 Request body contains Satisfaction Score:', formData['Satisfaction Score']);
        
        const requestBody = JSON.stringify({ data: formData });
        console.log('📦 Full request body (check Satisfaction):', requestBody.includes('"Satisfaction Score":' + formData['Satisfaction Score']));
        
        const response = await fetch('/predict', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: requestBody
        });
        
        console.log('📡 Response status:', response.status, response.statusText);
        
        if (!response.ok) {
            const errorText = await response.text();
            console.error('❌ Response error:', errorText);
            throw new Error(`HTTP error! status: ${response.status} - ${errorText}`);
        }
            
        const result = await response.json();
        console.log('✅ Response received successfully');
        
        // Debug: Log the response - CLEAR AND SIMPLE
        console.log('📥 Received response:', result);
        console.log('🎯 RISK PREDICTION FROM API:', result.risk_model_prediction);
        console.log('🎯 RISK PERCENTAGE:', (result.risk_model_prediction * 100).toFixed(2) + '%');
        console.log('📊 Prediction details:', {
            teacher: result.teacher_model_prediction,
            risk: result.risk_model_prediction,
            status: result.status
        });
        
        if (result.status === 'error') {
            throw new Error(result.error || 'Unknown error occurred');
        }
        
        // Validate risk prediction is reasonable (should be 0-1)
        if (result.risk_model_prediction > 1 || result.risk_model_prediction < 0) {
            console.warn('⚠️ Risk prediction out of range:', result.risk_model_prediction);
            console.warn('⚠️ This might indicate the model returns raw scores, not probabilities');
        }
        
        // Check if predictions are always the same (potential issue)
        if (typeof window.lastPrediction !== 'undefined') {
            const riskDiff = Math.abs(window.lastPrediction.risk - result.risk_model_prediction);
            const teacherSame = window.lastPrediction.teacher === result.teacher_model_prediction;
            
            if (teacherSame && riskDiff < 0.01) {
                console.warn('⚠️ Same prediction as before - model might not be receiving different data');
                console.warn('⚠️ Previous risk:', window.lastPrediction.risk);
                console.warn('⚠️ Current risk:', result.risk_model_prediction);
                console.warn('⚠️ Difference:', riskDiff);
                console.warn('⚠️ Check if Tenure, Monthly Charge, Total Charges, Satisfaction Score are actually different!');
            } else {
                console.log('✅ Prediction changed:', {
                    previous: window.lastPrediction.risk,
                    current: result.risk_model_prediction,
                    difference: riskDiff
                });
            }
        }
        window.lastPrediction = {
            teacher: result.teacher_model_prediction,
            risk: result.risk_model_prediction,
            inputs: {
                tenure: formData['Tenure in Months'],
                monthlyCharge: formData['Monthly Charge'],
                totalCharges: formData['Total Charges'],
                satisfaction: formData['Satisfaction Score'],
                referrals: formData['Number of Referrals'],
                avgLongDistance: formData['Avg Monthly Long Distance Charges']
            }
        };
        
        // Log prediction values for debugging
        console.log('🎯 Final predictions:', {
            teacher: result.teacher_model_prediction,
            risk: result.risk_model_prediction,
            risk_percentage: (result.risk_model_prediction * 100).toFixed(2) + '%'
        });
        
        // Display results
        displayResults(result);
        
        } catch (error) {
        console.error('❌ Error:', error);
        console.error('❌ Error details:', {
            message: error.message,
            stack: error.stack,
            name: error.name
        });
        
        // Show detailed error message
        let errorMsg = `❌ ${error.message}`;
        if (error.message.includes('fetch') || error.message.includes('network')) {
            errorMsg += '\n\n💡 Check if server is running: http://3.17.4.184:5000/health';
        }
        
        errorMessage.textContent = errorMsg;
        errorMessage.style.display = 'block';
        errorMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        
        // Hide results on error
        const results = document.getElementById('results');
        if (results) {
            results.style.display = 'none';
        }
        // DON'T reset form on error - keep user input
        } finally {
        // Reset button state (but keep form data)
        submitBtn.disabled = false;
        btnText.style.display = 'inline';
        btnLoader.style.display = 'none';
    }
}

// Collect form data and convert to model format
// SIMPLE VERSION - Read directly, no complex logic
function collectFormData() {
    console.log('🔄 collectFormData() called - Reading FRESH values from DOM NOW');
    
    const data = {};
    
    // FIX: Read values DIRECTLY from DOM - NO caching, NO variables, read EVERY TIME
    // Get elements FIRST
    const tenureEl = document.getElementById('tenureInMonths');
    const monthlyEl = document.getElementById('monthlyCharge');
    const totalEl = document.getElementById('totalCharges');
    const satisfactionEl = document.getElementById('satisfactionScore');
    const referralsEl = document.getElementById('numberOfReferrals');
    const longDistEl = document.getElementById('avgLongDistanceCharges');
    const internetEl = document.getElementById('internetType');
    const contractEl = document.getElementById('contract');
    
    // Log what we're reading
    console.log('🔍 Reading elements:');
    console.log('   satisfactionEl:', satisfactionEl);
    console.log('   satisfactionEl.value:', satisfactionEl ? satisfactionEl.value : 'ELEMENT NOT FOUND');
    
    // Read values - FORCE fresh read, NO defaults
    data['Tenure in Months'] = tenureEl ? parseFloat(tenureEl.value) || 0 : 0;
    data['Monthly Charge'] = monthlyEl ? parseFloat(monthlyEl.value) || 0 : 0;
    data['Total Charges'] = totalEl ? parseFloat(totalEl.value) || 0 : 0;
    
    // FIX: Satisfaction - ONLY use .value, NEVER use defaultValue
    // defaultValue is the HTML attribute and doesn't change!
    const satisfactionValue = satisfactionEl ? satisfactionEl.value : null;
    console.log('   Satisfaction element.value:', satisfactionValue);
    console.log('   Satisfaction element.defaultValue:', satisfactionEl ? satisfactionEl.defaultValue : 'N/A (ignoring)');
    console.log('   Satisfaction raw value (using .value ONLY):', satisfactionValue);
    data['Satisfaction Score'] = satisfactionValue && satisfactionValue !== '' ? parseFloat(satisfactionValue) : NaN;
    console.log('   Satisfaction parsed:', data['Satisfaction Score']);
    
    data['Number of Referrals'] = referralsEl ? parseFloat(referralsEl.value) || 0 : 0;
    data['Avg Monthly Long Distance Charges'] = longDistEl ? parseFloat(longDistEl.value) || 0 : 0;
    
    // Internet Type - FIX: Read directly
    const internetType = internetEl ? internetEl.value : 'Unknown';
    data['Internet Type_DSL'] = internetType === 'DSL' ? 1 : 0;
    data['Internet Type_Fiber Optic'] = internetType === 'Fiber Optic' ? 1 : 0;
    data['Internet Type_Unknown'] = internetType === 'Unknown' ? 1 : 0;
    
    // Contract - FIX: Read directly
    const contract = contractEl ? contractEl.value : 'Unknown';
    data['Contract_Month-to-Month'] = contract === 'Month-to-Month' ? 1 : 0;
    data['Contract_One Year'] = contract === 'One Year' ? 1 : 0;
    data['Contract_Two Year'] = contract === 'Two Year' ? 1 : 0;
    data['Contract_Unknown'] = contract === 'Unknown' ? 1 : 0;
    
    // Log final values
    console.log('✅ FINAL VALUES READ FROM DOM:');
    console.log('   Satisfaction Score:', data['Satisfaction Score']);
    console.log('   Internet Type:', internetType);
    console.log('   Contract:', contract);
    
    // Show what we read - SIMPLE LOG
    console.log('✅ READ FROM FORM:', {
        Tenure: data['Tenure in Months'],
        Monthly: data['Monthly Charge'],
        Total: data['Total Charges'],
        Satisfaction: data['Satisfaction Score'],
        Internet: internetType,
        Contract: contract,
        Referrals: data['Number of Referrals'],
        LongDistance: data['Avg Monthly Long Distance Charges']
    });
    
    // ============================================
    // FIXED: Send ONLY essential features (like curl test)
    // Backend's build_X_from_input() will set all other features to 0 automatically
    // This prevents calculated features from interfering with prediction
    // ============================================
    
    // DO NOT send calculated features (CLTV, TenureBucket, Total Revenue, etc.)
    // DO NOT send default values (Age, Gender, City, etc.)
    // Backend will handle all missing features by setting them to 0
    
    const featureCount = Object.keys(data).length;
    console.log(`📊 Prepared ${featureCount} essential features for API (backend will fill rest with 0)`);
    console.log('📊 Essential features:', Object.keys(data));
    
    // Debug: Log all collected values
    console.log('🔍 ALL COLLECTED VALUES:', {
        'Tenure in Months': data['Tenure in Months'],
        'Monthly Charge': data['Monthly Charge'],
        'Total Charges': data['Total Charges'],
        'Satisfaction Score': data['Satisfaction Score'],
        'Internet Type': internetType,
        'Contract': contract,
        'Number of Referrals': data['Number of Referrals'],
        'Avg Monthly Long Distance Charges': data['Avg Monthly Long Distance Charges']
    });
    
    // Validate key required fields have values
    if (data['Tenure in Months'] === 0) {
        console.warn('⚠️ Tenure is 0 - make sure to fill required fields');
    }
    if (data['Monthly Charge'] === 0) {
        console.warn('⚠️ Monthly Charge is 0 - make sure to fill required fields');
    }
    if (data['Total Charges'] === 0) {
        console.warn('⚠️ Total Charges is 0 - make sure to fill required fields');
    }
    if (data['Number of Referrals'] === undefined || isNaN(data['Number of Referrals'])) {
        console.warn('⚠️ Number of Referrals is missing - make sure to fill required fields');
    }
    if (data['Avg Monthly Long Distance Charges'] === undefined || isNaN(data['Avg Monthly Long Distance Charges'])) {
        console.warn('⚠️ Avg Monthly Long Distance Charges is missing - make sure to fill required fields');
    }
    
    return data;
}

// Display results
function displayResults(result) {
    console.log('📊 Displaying results:', result);
    
    const resultsDiv = document.getElementById('results');
    const teacherPred = document.getElementById('teacherPrediction');
    const riskPred = document.getElementById('riskPrediction');
    const riskFill = document.getElementById('riskFill');
    const riskText = document.getElementById('riskText');
    
    if (!resultsDiv) {
        console.error('❌ Results div not found!');
        return;
    }
    
    if (!teacherPred || !riskPred || !riskFill || !riskText) {
        console.error('❌ Result elements not found!', {
            teacherPred: !!teacherPred,
            riskPred: !!riskPred,
            riskFill: !!riskFill,
            riskText: !!riskText
        });
        return;
    }
    
    // Display predictions
    teacherPred.textContent = result.teacher_model_prediction;
    teacherPred.className = 'result-value ' + (result.teacher_model_prediction === 1 ? 'danger' : 'success');
    
    const riskScore = result.risk_model_prediction;
    
    // Debug: Log what we're displaying
    console.log('🖥️ DISPLAYING RESULT:');
    console.log('   riskScore from API:', riskScore);
    console.log('   riskScore type:', typeof riskScore);
    
    // Display the prediction
    riskPred.textContent = riskScore.toFixed(4);
    riskPred.className = 'result-value ' + getRiskClass(riskScore);
    
    // Update risk indicator
    const riskPercentage = Math.min(100, Math.max(0, riskScore * 100));
    riskFill.style.width = riskPercentage + '%';
    
    // Update risk text - use backend's risk_level if available, otherwise calculate
    let riskLevel = result.risk_level || 'Low';
    if (!result.risk_level) {
        // Fallback calculation (should match backend logic: <0.3 Low, 0.3-0.7 Medium, >0.7 High)
        if (riskScore > 0.7) riskLevel = 'High';
        else if (riskScore > 0.4) riskLevel = 'Medium';
        else riskLevel = 'Low';
    }
    
    riskText.textContent = `Churn Risk: ${riskLevel} (${riskPercentage.toFixed(1)}%)`;
    
    // Debug: Log what's displayed
    console.log('🖥️ DISPLAYED ON PAGE:');
    console.log('   riskPred.textContent:', riskPred.textContent);
    console.log('   riskPercentage:', riskPercentage);
    console.log('   riskText.textContent:', riskText.textContent);
    riskText.className = 'risk-text ' + getRiskClass(riskScore);
    
    // Show results first
    resultsDiv.style.display = 'block';
    console.log('✅ Results section displayed');
    
    // Generate and display recommendations (with error handling)
    try {
        generateRecommendations(result, riskScore, riskLevel);
    } catch (recError) {
        console.error('❌ Error generating recommendations:', recError);
        const recommendationsList = document.getElementById('recommendationsList');
        if (recommendationsList) {
            recommendationsList.innerHTML = '<div class="recommendation-item">⚠️ Error loading recommendations. Please check console for details.</div>';
        }
    }
    
    resultsDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// Get risk class for styling
function getRiskClass(riskScore) {
    if (riskScore > 0.7) return 'danger';
    if (riskScore > 0.4) return 'warning';
    return 'success';
}

// Generate business recommendations based on prediction results
function generateRecommendations(result, riskScore, riskLevel) {
    const recommendationsList = document.getElementById('recommendationsList');
    if (!recommendationsList) {
        console.warn('⚠️ Recommendations list element not found');
        return;
    }
    
    // Get customer data from form
    const tenure = parseFloat(document.getElementById('tenureInMonths')?.value || 0);
    const monthlyCharge = parseFloat(document.getElementById('monthlyCharge')?.value || 0);
    const totalCharges = parseFloat(document.getElementById('totalCharges')?.value || 0);
    const satisfactionScore = parseFloat(document.getElementById('satisfactionScore')?.value || 3);
    const internetType = document.getElementById('internetType')?.value || 'Unknown';
    const contract = document.getElementById('contract')?.value || 'Unknown';
    const numberOfReferrals = parseFloat(document.getElementById('numberOfReferrals')?.value || 0);
    const avgLongDistance = parseFloat(document.getElementById('avgLongDistanceCharges')?.value || 0);
    
    const recommendations = [];
    
    // High Risk Recommendations (Risk > 70%)
    if (riskScore > 0.7) {
        recommendations.push({
            priority: 'high',
            icon: '🚨',
            title: 'Immediate Action Required',
            description: 'This customer has a high churn risk. Take immediate retention actions.'
        });
        
        if (satisfactionScore <= 2) {
            recommendations.push({
                priority: 'high',
                icon: '😞',
                title: 'Low Satisfaction Score',
                description: `Customer satisfaction is only ${satisfactionScore}/5. Assign a dedicated account manager to address concerns and improve service quality.`
            });
        }
        
        if (tenure < 12) {
            recommendations.push({
                priority: 'high',
                icon: '⏱️',
                title: 'New Customer (Low Tenure)',
                description: `Customer has been with us for only ${tenure} months. Offer a loyalty discount (15-20% off) for the next 3 months to build retention.`
            });
        }
        
        if (contract === 'Unknown' || contract === 'Month-to-Month') {
            recommendations.push({
                priority: 'high',
                icon: '📝',
                title: 'No Contract Protection',
                description: 'Customer has no contract or month-to-month. Offer a 1-year or 2-year contract with 10-15% discount to lock them in.'
            });
        }
        
        if (monthlyCharge > 100) {
            recommendations.push({
                priority: 'high',
                icon: '💰',
                title: 'High Monthly Charges',
                description: `Monthly charge is $${monthlyCharge.toFixed(2)}. Consider offering a bundle discount or downgrade option to reduce cost pressure.`
            });
        }
        
        if (numberOfReferrals === 0) {
            recommendations.push({
                priority: 'medium',
                icon: '👥',
                title: 'No Referrals',
                description: 'Customer hasn\'t referred anyone. Launch a referral program: "Refer a friend, get $50 credit and your friend gets 20% off first 3 months."'
            });
        }
        
        recommendations.push({
            priority: 'high',
            icon: '🎁',
            title: 'Retention Offer',
            description: 'Offer a special retention package: 3 months free premium support + 10% discount on current plan.'
        });
    }
    
    // Medium Risk Recommendations (40-70%)
    else if (riskScore > 0.4) {
        recommendations.push({
            priority: 'medium',
            icon: '⚠️',
            title: 'Moderate Churn Risk',
            description: 'This customer shows moderate churn risk. Proactive engagement recommended.'
        });
        
        if (satisfactionScore <= 3) {
            recommendations.push({
                priority: 'medium',
                icon: '📞',
                title: 'Improve Satisfaction',
                description: `Satisfaction score is ${satisfactionScore}/5. Conduct a satisfaction survey and address any concerns promptly.`
            });
        }
        
        if (contract === 'Unknown' || contract === 'Month-to-Month') {
            recommendations.push({
                priority: 'medium',
                icon: '📋',
                title: 'Contract Opportunity',
                description: 'Offer a contract renewal with benefits: 5% discount + free upgrade to premium support for 1-year commitment.'
            });
        }
        
        if (tenure < 24) {
            recommendations.push({
                priority: 'medium',
                icon: '🎯',
                title: 'Build Loyalty',
                description: `Customer tenure is ${tenure} months. Offer loyalty rewards: "Stay with us for 6 more months, get 1 month free."`
            });
        }
        
        if (numberOfReferrals < 2) {
            recommendations.push({
                priority: 'low',
                icon: '🤝',
                title: 'Referral Program',
                description: 'Encourage referrals: "Refer 2 friends, get $100 account credit."'
            });
        }
    }
    
    // Low Risk Recommendations (Risk < 40%)
    else {
        recommendations.push({
            priority: 'low',
            icon: '✅',
            title: 'Low Churn Risk',
            description: 'This customer has low churn risk. Focus on upselling and expansion opportunities.'
        });
        
        if (satisfactionScore >= 4) {
            recommendations.push({
                priority: 'low',
                icon: '⭐',
                title: 'High Satisfaction',
                description: `Excellent satisfaction score (${satisfactionScore}/5)! Perfect time to upsell premium services or additional features.`
            });
        }
        
        if (tenure > 36) {
            recommendations.push({
                priority: 'low',
                icon: '🏆',
                title: 'Loyal Customer',
                description: `Long-term customer (${tenure} months). Offer VIP status with exclusive benefits and early access to new features.`
            });
        }
        
        if (numberOfReferrals >= 2) {
            recommendations.push({
                priority: 'low',
                icon: '👑',
                title: 'Brand Advocate',
                description: `Customer has referred ${numberOfReferrals} people! Consider making them a brand ambassador with special perks.`
            });
        } else {
            recommendations.push({
                priority: 'low',
                icon: '📢',
                title: 'Referral Opportunity',
                description: 'Happy customer - perfect candidate for referral program. Offer incentives for referrals.'
            });
        }
        
        if (monthlyCharge < 80) {
            recommendations.push({
                priority: 'low',
                icon: '📈',
                title: 'Upsell Opportunity',
                description: `Current plan is $${monthlyCharge.toFixed(2)}/month. Offer premium upgrade with more features for $${(monthlyCharge * 1.3).toFixed(2)}/month.`
            });
        }
        
        recommendations.push({
            priority: 'low',
            icon: '🎯',
            title: 'Cross-sell Opportunity',
            description: 'Offer complementary services: premium support, additional data, or family plans.'
        });
    }
    
    // Additional feature-based recommendations
    if (internetType === 'Fiber Optic' && monthlyCharge > 100) {
        recommendations.push({
            priority: 'medium',
            icon: '⚡',
            title: 'Premium Service User',
            description: 'Fiber Optic customer with high charges. Ensure service quality matches premium pricing. Consider value-added services.'
        });
    }
    
    if (avgLongDistance > 20) {
        recommendations.push({
            priority: 'medium',
            icon: '📞',
            title: 'High Long Distance Usage',
            description: `Average long distance charges are $${avgLongDistance.toFixed(2)}. Offer unlimited long distance plan add-on for better value.`
        });
    }
    
    // Display recommendations
    recommendationsList.innerHTML = '';
    recommendations.forEach((rec, index) => {
        const recElement = document.createElement('div');
        recElement.className = `recommendation-item recommendation-${rec.priority}`;
        recElement.innerHTML = `
            <div class="recommendation-icon">${rec.icon}</div>
            <div class="recommendation-content">
                <div class="recommendation-title">${rec.title}</div>
                <div class="recommendation-description">${rec.description}</div>
            </div>
        `;
        recommendationsList.appendChild(recElement);
    });
    
    console.log(`✅ Generated ${recommendations.length} recommendations`);
}

// Reset form
function resetForm() {
    document.getElementById('churnForm').reset();
    document.getElementById('results').style.display = 'none';
    document.getElementById('errorMessage').style.display = 'none';
    const recommendationsList = document.getElementById('recommendationsList');
    if (recommendationsList) {
        recommendationsList.innerHTML = '';
    }
}
