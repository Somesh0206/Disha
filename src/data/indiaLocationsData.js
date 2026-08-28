// India States and Union Territories with major cities and disaster-prone districts
// 28 States + 8 Union Territories

export const INDIA_STATES_AND_UTS = [
  // 28 STATES
  {
    name: 'Andhra Pradesh',
    nameHi: 'आंध्र प्रदेश',
    type: 'State',
    defaultCoords: [15.9129, 79.7400],
    cities: [
      'Visakhapatnam',
      'Vijayawada',
      'Guntur',
      'Nellore',
      'Tirupati',
      'Kurnool',
      'Kakinada',
      'Rajahmundry',
      'Kadapa',
      'Anantapur',
      'Eluru',
      'Ongole',
      'Srikakulam',
      'Machilipatnam'
    ]
  },
  {
    name: 'Arunachal Pradesh',
    nameHi: 'अरुणाचल प्रदेश',
    type: 'State',
    defaultCoords: [28.2180, 94.7278],
    cities: [
      'Itanagar',
      'Tawang',
      'Pasighat',
      'Ziro',
      'Bomdila',
      'Naharlagun',
      'Changlang',
      'Tezu',
      'Along (Aalo)',
      'Roing'
    ]
  },
  {
    name: 'Assam',
    nameHi: 'असम',
    type: 'State',
    defaultCoords: [26.2006, 92.9376],
    cities: [
      'Guwahati',
      'Dibrugarh',
      'Silchar',
      'Jorhat',
      'Tezpur',
      'Nagaon',
      'Tinsukia',
      'Bongaigaon',
      'Karimganj',
      'Dhubri',
      'Barpeta',
      'Sivasagar'
    ]
  },
  {
    name: 'Bihar',
    nameHi: 'बिहार',
    type: 'State',
    defaultCoords: [25.0961, 85.3131],
    cities: [
      'Patna',
      'Gaya',
      'Bhagalpur',
      'Muzaffarpur',
      'Darbhanga',
      'Purnia',
      'Begusarai',
      'Saharsa',
      'Katihar',
      'Munger',
      'Arrah',
      'Chhapra',
      'Motihari',
      'Sitamarhi'
    ]
  },
  {
    name: 'Chhattisgarh',
    nameHi: 'छत्तीसगढ़',
    type: 'State',
    defaultCoords: [21.2787, 81.8661],
    cities: [
      'Raipur',
      'Bilaspur',
      'Durg',
      'Bhilai',
      'Korba',
      'Jagdalpur',
      'Ambikapur',
      'Rajnandgaon',
      'Raigarh',
      'Dhamtari'
    ]
  },
  {
    name: 'Goa',
    nameHi: 'गोवा',
    type: 'State',
    defaultCoords: [15.2993, 74.1240],
    cities: [
      'Panaji',
      'Margao',
      'Vasco da Gama',
      'Mapusa',
      'Ponda',
      'Bicholim',
      'Curchorem',
      'Cuncolim'
    ]
  },
  {
    name: 'Gujarat',
    nameHi: 'गुजरात',
    type: 'State',
    defaultCoords: [22.2587, 71.1924],
    cities: [
      'Ahmedabad',
      'Surat',
      'Vadodara',
      'Rajkot',
      'Bhavnagar',
      'Jamnagar',
      'Junagadh',
      'Gandhinagar',
      'Bhuj',
      'Anand',
      'Navsari',
      'Morbi',
      'Porbandar',
      'Bharuch',
      'Valsad'
    ]
  },
  {
    name: 'Haryana',
    nameHi: 'हरियाणा',
    type: 'State',
    defaultCoords: [29.0588, 76.0856],
    cities: [
      'Gurugram',
      'Faridabad',
      'Panipat',
      'Ambala',
      'Yamunanagar',
      'Rohtak',
      'Hisar',
      'Karnal',
      'Sonipat',
      'Panchkula',
      'Sirsa',
      'Rewari',
      'Jind'
    ]
  },
  {
    name: 'Himachal Pradesh',
    nameHi: 'हिमाचल प्रदेश',
    type: 'State',
    defaultCoords: [31.1048, 77.1734],
    cities: [
      'Shimla',
      'Manali',
      'Dharamshala',
      'Mandi',
      'Solan',
      'Kullu',
      'Chamba',
      'Bilaspur',
      'Hamirpur',
      'Una',
      'Palampur',
      'Keylong (Lahaul & Spiti)',
      'Reckong Peo (Kinnaur)'
    ]
  },
  {
    name: 'Jharkhand',
    nameHi: 'झारखंड',
    type: 'State',
    defaultCoords: [23.6102, 85.2799],
    cities: [
      'Ranchi',
      'Jamshedpur',
      'Dhanbad',
      'Bokaro Steel City',
      'Deoghar',
      'Hazaribagh',
      'Giridih',
      'Ramgarh',
      'Dumka',
      'Chaibasa',
      'Medininagar'
    ]
  },
  {
    name: 'Karnataka',
    nameHi: 'कर्नाटक',
    type: 'State',
    defaultCoords: [15.3173, 75.7139],
    cities: [
      'Bengaluru',
      'Mysuru',
      'Mangaluru',
      'Hubballi-Dharwad',
      'Belagavi',
      'Kalaburagi',
      'Ballari',
      'Udupi',
      'Shivamogga',
      'Davanagere',
      'Kodagu (Madikeri)',
      'Chikkamagaluru',
      'Tumakuru',
      'Hassan',
      'Karwar'
    ]
  },
  {
    name: 'Kerala',
    nameHi: 'केरल',
    type: 'State',
    defaultCoords: [10.8505, 76.2711],
    cities: [
      'Wayanad',
      'Thiruvananthapuram',
      'Kochi (Ernakulam)',
      'Kozhikode',
      'Thrissur',
      'Kollam',
      'Idukki',
      'Palakkad',
      'Alappuzha',
      'Kannur',
      'Kottayam',
      'Malappuram',
      'Kasaragod',
      'Pathanamthitta'
    ]
  },
  {
    name: 'Madhya Pradesh',
    nameHi: 'मध्य प्रदेश',
    type: 'State',
    defaultCoords: [22.9734, 78.6569],
    cities: [
      'Bhopal',
      'Indore',
      'Jabalpur',
      'Gwalior',
      'Ujjain',
      'Sagar',
      'Dewas',
      'Satna',
      'Ratlam',
      'Rewa',
      'Katni',
      'Singrauli',
      'Chhindwara',
      'Hoshangabad (Narmadapuram)'
    ]
  },
  {
    name: 'Maharashtra',
    nameHi: 'महाराष्ट्र',
    type: 'State',
    defaultCoords: [19.7515, 75.7139],
    cities: [
      'Mumbai',
      'Pune',
      'Nagpur',
      'Thane',
      'Nashik',
      'Chhatrapati Sambhajinagar (Aurangabad)',
      'Solapur',
      'Kolhapur',
      'Navi Mumbai',
      'Amravati',
      'Nanded',
      'Ratnagiri',
      'Raigad',
      'Sindhudurg',
      'Satara',
      'Sangli'
    ]
  },
  {
    name: 'Manipur',
    nameHi: 'मणिपुर',
    type: 'State',
    defaultCoords: [24.6637, 93.9063],
    cities: [
      'Imphal',
      'Churachandpur',
      'Thoubal',
      'Bishnupur',
      'Ukhrul',
      'Senapati',
      'Tamenglong',
      'Chandel',
      'Kakching',
      'Kangpokpi'
    ]
  },
  {
    name: 'Meghalaya',
    nameHi: 'मेघालय',
    type: 'State',
    defaultCoords: [25.4670, 91.3662],
    cities: [
      'Shillong',
      'Tura',
      'Cherrapunji (Sohra)',
      'Jowai',
      'Nongpoh',
      'Baghmara',
      'Williamnagar',
      'Mairang',
      'Resubelpara'
    ]
  },
  {
    name: 'Mizoram',
    nameHi: 'मिज़ोरम',
    type: 'State',
    defaultCoords: [23.1645, 92.9376],
    cities: [
      'Aizawl',
      'Lunglei',
      'Champhai',
      'Serchhip',
      'Kolasib',
      'Lawngtlai',
      'Saiha',
      'Mamit',
      'Hnahthial'
    ]
  },
  {
    name: 'Nagaland',
    nameHi: 'नागालैंड',
    type: 'State',
    defaultCoords: [26.1584, 94.5624],
    cities: [
      'Kohima',
      'Dimapur',
      'Mokokchung',
      'Tuensang',
      'Wokha',
      'Zunheboto',
      'Mon',
      'Phek',
      'Chumukedima',
      'Kiphire'
    ]
  },
  {
    name: 'Odisha',
    nameHi: 'ओडिशा',
    type: 'State',
    defaultCoords: [20.9517, 85.0985],
    cities: [
      'Bhubaneswar',
      'Cuttack',
      'Rourkela',
      'Puri',
      'Balasore',
      'Berhampur',
      'Sambalpur',
      'Baripada',
      'Bhadrak',
      'Kendrapara',
      'Jagatsinghpur',
      'Ganjam',
      'Koraput',
      'Jharsuguda'
    ]
  },
  {
    name: 'Punjab',
    nameHi: 'पंजाब',
    type: 'State',
    defaultCoords: [31.1471, 75.3412],
    cities: [
      'Ludhiana',
      'Amritsar',
      'Jalandhar',
      'Patiala',
      'Bathinda',
      'SAS Nagar (Mohali)',
      'Pathankot',
      'Hoshiarpur',
      'Moga',
      'Firozpur',
      'Gurdaspur',
      'Kapurthala'
    ]
  },
  {
    name: 'Rajasthan',
    nameHi: 'राजस्थान',
    type: 'State',
    defaultCoords: [27.0238, 74.2179],
    cities: [
      'Jaipur',
      'Jodhpur',
      'Kota',
      'Bikaner',
      'Ajmer',
      'Udaipur',
      'Bhilwara',
      'Alwar',
      'Sikar',
      'Bharatpur',
      'Jaisalmer',
      'Barmer',
      'Pali',
      'Sri Ganganagar'
    ]
  },
  {
    name: 'Sikkim',
    nameHi: 'सिक्किम',
    type: 'State',
    defaultCoords: [27.5330, 88.5122],
    cities: [
      'Gangtok',
      'Namchi',
      'Geyzing',
      'Mangan',
      'Ravangla',
      'Pelling',
      'Singtam',
      'Rangpo',
      'Jorethang'
    ]
  },
  {
    name: 'Tamil Nadu',
    nameHi: 'तमिलनाडु',
    type: 'State',
    defaultCoords: [11.1271, 78.6569],
    cities: [
      'Chennai',
      'Coimbatore',
      'Madurai',
      'Tiruchirappalli',
      'Salem',
      'Tirunelveli',
      'Vellore',
      'Erode',
      'Thoothukudi',
      'Cuddalore',
      'Kanyakumari',
      'The Nilgiris (Ooty)',
      'Nagapattinam',
      'Thanjavur',
      'Dindigul'
    ]
  },
  {
    name: 'Telangana',
    nameHi: 'तेलंगाना',
    type: 'State',
    defaultCoords: [18.1124, 79.0193],
    cities: [
      'Hyderabad',
      'Warangal',
      'Nizamabad',
      'Karimnagar',
      'Khammam',
      'Ramagundam',
      'Mahbubnagar',
      'Nalgonda',
      'Adilabad',
      'Siddipet',
      'Mancherial'
    ]
  },
  {
    name: 'Tripura',
    nameHi: 'त्रिपुरा',
    type: 'State',
    defaultCoords: [23.9408, 91.9882],
    cities: [
      'Agartala',
      'Dharmanagar',
      'Udaipur',
      'Kailashahar',
      'Belonia',
      'Khowai',
      'Ambassa',
      'Teliamura',
      'Sabroom'
    ]
  },
  {
    name: 'Uttar Pradesh',
    nameHi: 'उत्तर प्रदेश',
    type: 'State',
    defaultCoords: [26.8467, 80.9462],
    cities: [
      'Lucknow',
      'Kanpur',
      'Varanasi',
      'Agra',
      'Prayagraj',
      'Meerut',
      'Ghaziabad',
      'Noida',
      'Gorakhpur',
      'Bareilly',
      'Aligarh',
      'Moradabad',
      'Ayodhya',
      'Jhansi',
      'Saharanpur',
      'Mathura',
      'Muzaffarnagar'
    ]
  },
  {
    name: 'Uttarakhand',
    nameHi: 'उत्तराखंड',
    type: 'State',
    defaultCoords: [30.0668, 79.0193],
    cities: [
      'Dehradun',
      'Haridwar',
      'Rishikesh',
      'Chamoli',
      'Joshimath',
      'Uttarkashi',
      'Rudraprayag',
      'Pithoragarh',
      'Nainital',
      'Almora',
      'Haldwani',
      'Roorkee',
      'Tehri Garhwal',
      'Bageshwar',
      'Champawat'
    ]
  },
  {
    name: 'West Bengal',
    nameHi: 'पश्चिम बंगाल',
    type: 'State',
    defaultCoords: [22.9868, 87.8550],
    cities: [
      'Kolkata',
      'Howrah',
      'Siliguri',
      'Asansol',
      'Durgapur',
      'Darjeeling',
      'Kalimpong',
      'Jalpaiguri',
      'Malda',
      'Kharagpur',
      'Bardhaman',
      'Alipurduar',
      'Cooch Behar',
      'South 24 Parganas (Sundarbans)'
    ]
  },

  // 8 UNION TERRITORIES
  {
    name: 'Andaman and Nicobar Islands',
    nameHi: 'अंडमान और निकोबार द्वीप समूह',
    type: 'Union Territory',
    defaultCoords: [11.7401, 92.6586],
    cities: [
      'Port Blair',
      'Diglipur',
      'Car Nicobar',
      'Mayabunder',
      'Rangat',
      'Havelock Island (Swaraj Dweep)',
      'Neil Island (Shaheed Dweep)'
    ]
  },
  {
    name: 'Chandigarh',
    nameHi: 'चंडीगढ़',
    type: 'Union Territory',
    defaultCoords: [30.7333, 76.7794],
    cities: [
      'Chandigarh (Sector 1-60)',
      'Manimajra',
      'Mohali Border Sector'
    ]
  },
  {
    name: 'Dadra and Nagar Haveli and Daman and Diu',
    nameHi: 'दादरा और नगर हवेली और दमन और दीव',
    type: 'Union Territory',
    defaultCoords: [20.4283, 72.8397],
    cities: [
      'Daman',
      'Diu',
      'Silvassa',
      'Amli',
      'Naroli'
    ]
  },
  {
    name: 'Delhi (NCT)',
    nameHi: 'दिल्ली (राष्ट्रीय राजधानी क्षेत्र)',
    type: 'Union Territory',
    defaultCoords: [28.7041, 77.1025],
    cities: [
      'New Delhi',
      'Central Delhi',
      'North Delhi',
      'South Delhi',
      'East Delhi',
      'West Delhi',
      'Dwarka',
      'Rohini',
      'Narela',
      'Shahdara',
      'Najafgarh'
    ]
  },
  {
    name: 'Jammu and Kashmir',
    nameHi: 'जम्मू और कश्मीर',
    type: 'Union Territory',
    defaultCoords: [33.7782, 76.5762],
    cities: [
      'Srinagar',
      'Jammu',
      'Anantnag',
      'Baramulla',
      'Udhampur',
      'Kathua',
      'Rajouri',
      'Poonch',
      'Kupwara',
      'Pulwama',
      'Ganderbal',
      'Bandipora',
      'Budgam',
      'Kishtwar',
      'Doda',
      'Ramban'
    ]
  },
  {
    name: 'Ladakh',
    nameHi: 'लद्दाख',
    type: 'Union Territory',
    defaultCoords: [34.1526, 77.5771],
    cities: [
      'Leh',
      'Kargil',
      'Nubra Valley (Diskit)',
      'Zanskar (Padum)',
      'Dras',
      'Changthang (Nyoma)',
      'Khaltsi'
    ]
  },
  {
    name: 'Lakshadweep',
    nameHi: 'लक्षद्वीप',
    type: 'Union Territory',
    defaultCoords: [10.5667, 72.6417],
    cities: [
      'Kavaratti',
      'Agatti',
      'Andrott',
      'Minicoy',
      'Amini',
      'Kalpeni',
      'Kadmat',
      'Kiltan'
    ]
  },
  {
    name: 'Puducherry',
    nameHi: 'पुदुचेरी',
    type: 'Union Territory',
    defaultCoords: [11.9416, 79.8083],
    cities: [
      'Puducherry (Town)',
      'Oulgaret',
      'Karaikal',
      'Mahe',
      'Yanam',
      'Villianur',
      'Bahour'
    ]
  }
];

export function getCitiesForState(stateName) {
  const match = INDIA_STATES_AND_UTS.find(
    (item) => item.name.toLowerCase() === (stateName || '').toLowerCase()
  );
  return match ? match.cities : [];
}

export function getDefaultCoordsForState(stateName) {
  const match = INDIA_STATES_AND_UTS.find(
    (item) => item.name.toLowerCase() === (stateName || '').toLowerCase()
  );
  return match ? match.defaultCoords : [11.55400, 76.12650];
}
