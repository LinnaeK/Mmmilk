const countryCodes = {
    NPL: 'Nepal',
    ETH: 'Ethiopia',
    GIN: 'Guinea',
    PHL: 'Philippines (the)',
    NGA: 'Nigeria',
    LAO: "Lao People's Democratic Republic (the)",
    MAR: 'Morocco',
    IRQ: 'Iraq',
    JOR: 'Jordan',
    ZAF: 'South Africa',
    AFG: 'Afghanistan',
    PER: 'Peru',
    MLI: 'Mali',
    MRT: 'Mauritania',
    BWA: 'Botswana',
    IDN: 'Indonesia',
    MHL: 'Marshall Islands (the)',
    PRK: "Korea (the Democratic People's Republic of)",
    PRY: 'Paraguay',
    HTI: 'Haiti',
    MDV: 'Maldives',
    LKA: 'Sri Lanka',
    TJK: 'Tajikistan',
    MNG: 'Mongolia',
    CIV: "Côte d'Ivoire",
    BOL: 'Bolivia (Plurinational State of)',
    KGZ: 'Kyrgyzstan',
    PAK: 'Pakistan',
    BEN: 'Benin',
    TUN: 'Tunisia',
    MYS: 'Malaysia',
    SLE: 'Sierra Leone',
    TLS: 'Timor-Leste',
    BFA: 'Burkina Faso',
    BDI: 'Burundi',
    ZMB: 'Zambia',
    UGA: 'Uganda',
    USA: 'United States of America (the)',
    ALB: 'Albania',
    SEN: 'Senegal',
    OMN: 'Oman'
  }

ccHTML = ''
  for(CC in countryCodes){
      ccHTML += ` <option key=${CC} value=${CC}  name="country" onClick={props.handleCountryClick} >
      ${countryCodes[CC]}
      </option>`
  }
  console.log(ccHTML)