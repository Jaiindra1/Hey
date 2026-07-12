const CITIES_DATA = [
  {
    id: "bangalore",
    name: "Bangalore",
    lat: "12.9141\xB0 N",
    lng: "77.6208\xB0 E",
    flowIndex: 78,
    flowIndexOptimal: "OPTIMAL",
    throughputText: "Traffic throughput is 12% higher than yesterday's average at this hour.",
    zones: [
      {
        name: "M.G. Road",
        efficiency: 92,
        status: "flowing",
        icon: "apartment"
      },
      {
        name: "Indiranagar North",
        efficiency: 85,
        status: "flowing",
        icon: "precision_manufacturing"
      },
      {
        name: "Silk Board Crossing",
        efficiency: 64,
        status: "busy",
        icon: "hub"
      },
      {
        name: "Electronic City P1",
        efficiency: 79,
        status: "flowing",
        icon: "account_balance"
      }
    ],
    feedItems: [
      {
        id: "b1",
        agent: "Agent #419",
        time: "2m ago",
        message: "Extended green light cycle at M.G. Road Junction to clear 14% congestion spike.",
        type: "green_light"
      },
      {
        id: "b2",
        agent: "Agent #082",
        time: "12m ago",
        message: "Rerouted 250+ vehicles away from Silk Board Junction due to minor lane obstruction.",
        type: "rerouted"
      },
      {
        id: "b3",
        agent: "Agent #661",
        time: "25m ago",
        message: "Synchronized emergency corridor for Ambulance EM-402 through Brigade Road Crossing.",
        type: "emergency"
      }
    ],
    criticalNodes: [
      {
        id: "n1",
        name: "M.G. Road Cluster",
        type: "Central Business District",
        status: "Critical",
        currentLoad: 62,
        predictedLoad: 94
      },
      {
        id: "n2",
        name: "Indiranagar North",
        type: "Residential/Retail Mix",
        status: "Stable",
        currentLoad: 45,
        predictedLoad: 48
      },
      {
        id: "n3",
        name: "Electronic City Phase 1",
        type: "Tech Corridor",
        status: "Trending High",
        currentLoad: 78,
        predictedLoad: 82
      }
    ],
    activeReroutingCount: 124,
    reroutingAccuracy: 99.2,
    anomalyCount: 3,
    anomalies: [
      {
        id: "an1",
        location: "Silk Board Flyover",
        impact: "High Impact",
        time: "T+12 min",
        actionRequired: "Reroute active via outer ring road"
      },
      {
        id: "an2",
        location: "Koramangala 80ft Rd",
        impact: "Medium Impact",
        time: "T+5 min",
        actionRequired: "Preemptive signal timing adjustment"
      },
      {
        id: "an3",
        location: "Outer Ring Rd (Bellandur)",
        impact: "Low Impact",
        time: "T+15 min",
        actionRequired: "Automated advisory warning broadcast"
      }
    ],
    node04Data: {
      name: "Silk Board Node 04",
      throughput: "4.2k",
      reduction: "-18%",
      signalCycle: "90s (Dynamic)",
      congestionIndex: 3.2,
      lat: "12.9141\xB0 N",
      lng: "77.6208\xB0 E"
    }
  },
  {
    id: "hyderabad",
    name: "Hyderabad",
    lat: "17.3850\xB0 N",
    lng: "78.4867\xB0 E",
    flowIndex: 82,
    flowIndexOptimal: "HIGHLY FLOWING",
    throughputText: "Traffic throughput is 18% higher than average due to optimized corridor cycles.",
    zones: [
      {
        name: "Cyber Towers",
        efficiency: 94,
        status: "flowing",
        icon: "apartment"
      },
      {
        name: "Hitech City",
        efficiency: 87,
        status: "flowing",
        icon: "precision_manufacturing"
      },
      {
        name: "Madhapur",
        efficiency: 61,
        status: "busy",
        icon: "hub"
      },
      {
        name: "Financial District",
        efficiency: 81,
        status: "flowing",
        icon: "account_balance"
      }
    ],
    feedItems: [
      {
        id: "h1",
        agent: "Agent #419",
        time: "2m ago",
        message: "Extended green light cycle at Madhapur Junction to clear 14% congestion spike.",
        type: "green_light"
      },
      {
        id: "h2",
        agent: "Agent #082",
        time: "12m ago",
        message: "Rerouted 250+ vehicles away from Cyber Towers due to minor obstruction.",
        type: "rerouted"
      },
      {
        id: "h3",
        agent: "Agent #661",
        time: "25m ago",
        message: "Synchronized emergency corridor for Ambulance V-22 through Financial District.",
        type: "emergency"
      }
    ],
    criticalNodes: [
      {
        id: "h_n1",
        name: "Madhapur Junction",
        type: "IT Corridor Hub",
        status: "Critical",
        currentLoad: 68,
        predictedLoad: 91
      },
      {
        id: "h_n2",
        name: "Gachibowli Circle",
        type: "Corporate Traffic Zone",
        status: "Stable",
        currentLoad: 52,
        predictedLoad: 55
      },
      {
        id: "h_n3",
        name: "Cyber Towers Underpass",
        type: "Expressway Interchange",
        status: "Trending High",
        currentLoad: 74,
        predictedLoad: 86
      }
    ],
    activeReroutingCount: 96,
    reroutingAccuracy: 98.7,
    anomalyCount: 2,
    anomalies: [
      {
        id: "h_an1",
        location: "Kondapur Main Rd",
        impact: "High Impact",
        time: "T+8 min",
        actionRequired: "Divert heavy vehicles to bypass"
      },
      {
        id: "h_an2",
        location: "Jubilee Hills Checkpost",
        impact: "Medium Impact",
        time: "T+11 min",
        actionRequired: "Activate rapid clearing protocol"
      }
    ],
    node04Data: {
      name: "Cyber Towers Node 01",
      throughput: "5.1k",
      reduction: "-22%",
      signalCycle: "80s (Dynamic)",
      congestionIndex: 2.8,
      lat: "17.4483\xB0 N",
      lng: "78.3741\xB0 E"
    }
  },
  {
    id: "shanghai",
    name: "Shanghai",
    lat: "31.2304\xB0 N",
    lng: "121.4737\xB0 E",
    flowIndex: 74,
    flowIndexOptimal: "MODERATE",
    throughputText: "Volume remains dense but flow speed increased by 6.8% under AI coordination.",
    zones: [
      {
        name: "Lujiazui Financial",
        efficiency: 91,
        status: "flowing",
        icon: "apartment"
      },
      {
        name: "The Bund Boulevard",
        efficiency: 81,
        status: "flowing",
        icon: "precision_manufacturing"
      },
      {
        name: "People Square Node",
        efficiency: 58,
        status: "busy",
        icon: "hub"
      },
      {
        name: "Pudong Expressway",
        efficiency: 76,
        status: "flowing",
        icon: "account_balance"
      }
    ],
    feedItems: [
      {
        id: "s1",
        agent: "Agent #512",
        time: "5m ago",
        message: "Extended green wave cycle along Century Avenue to absorb Pudong Tunnel traffic overflow.",
        type: "green_light"
      },
      {
        id: "s2",
        agent: "Agent #301",
        time: "18m ago",
        message: "Rerouted 400+ vehicles to Yan\u2019an Elevated Road following a delivery truck stall.",
        type: "rerouted"
      },
      {
        id: "s3",
        agent: "Agent #902",
        time: "34m ago",
        message: "Preempted signals at Huaihai Road for rapid passage of fire rescue task force.",
        type: "emergency"
      }
    ],
    criticalNodes: [
      {
        id: "s_n1",
        name: "People Square Node",
        type: "Transit & Tourism Hub",
        status: "Critical",
        currentLoad: 75,
        predictedLoad: 97
      },
      {
        id: "s_n2",
        name: "Lujiazui Ring Tunnel",
        type: "Financial District Gateway",
        status: "Stable",
        currentLoad: 61,
        predictedLoad: 64
      },
      {
        id: "s_n3",
        name: "Nanpu Bridge Ramp",
        type: "High-speed Connector",
        status: "Trending High",
        currentLoad: 80,
        predictedLoad: 89
      }
    ],
    activeReroutingCount: 231,
    reroutingAccuracy: 99.5,
    anomalyCount: 4,
    anomalies: [
      {
        id: "s_an1",
        location: "Xujiahui Junction",
        impact: "High Impact",
        time: "T+6 min",
        actionRequired: "Force flow separation layout"
      },
      {
        id: "s_an2",
        location: "Inner Ring Rd East",
        impact: "Medium Impact",
        time: "T+10 min",
        actionRequired: "Reduce input lane capacity"
      },
      {
        id: "s_an3",
        location: "Zhongshan Park Access",
        impact: "Medium Impact",
        time: "T+14 min",
        actionRequired: "Initiate dynamic gridlock release"
      },
      {
        id: "s_an4",
        location: "Bund Tunnel Entrance",
        impact: "Low Impact",
        time: "T+20 min",
        actionRequired: "Display early advisory warnings"
      }
    ],
    node04Data: {
      name: "Lujiazui Node 12",
      throughput: "6.4k",
      reduction: "-15%",
      signalCycle: "110s (Dynamic)",
      congestionIndex: 4.1,
      lat: "31.2397\xB0 N",
      lng: "121.5012\xB0 E"
    }
  }
];
const MOCK_EMERGENCY_UNIT = {
  id: "em_402",
  unitCode: "EM-402",
  status: "HOSPITAL BOUND",
  currentSpeed: 78,
  intersectionsClear: "4 / 6",
  fuelBattery: 84,
  distanceToDestination: "0.8 km",
  estimatedArrival: "2m 45s",
  clearances: [
    {
      id: "c1",
      name: "Brigade Road Crossing",
      status: "Preempted",
      distance: "120m"
    },
    {
      id: "c2",
      name: "Residency Circle",
      status: "Clearing",
      distance: "450m"
    },
    {
      id: "c3",
      name: "Mayo Hall Junction",
      status: "Pending",
      distance: "800m"
    }
  ]
};
const MAP_IMAGE_URLS = {
  lightMap: "https://lh3.googleusercontent.com/aida-public/AB6AXuAp5UDvOVMaMTLmd8DahpV1amKdl0XOX9VNCZi1W391Jf1lBLQFqemniSIVgU6896xK60vSFxZtXiR3ddiEuhD_kNzOKnaLGCCNtPBhhbbWrMLKvw9vxVLTiRiou5dy93l-u_-2IQanu_vWaaYm_axMGqm4tidMQ6mwYupeqzMnGuGxrB83bBRVrPZ8fo9s4awhhajp37WQ4R9EUQunNnbSQXvs4Cty6V17i2eXO_1y4A2J8VFsW8luTTQWaNuYWVnzvhph4dWyaUY",
  darkMap: "https://lh3.googleusercontent.com/aida-public/AB6AXuCGI3Vv-KEZPfhIQCiLHbjL6OKjZPXkAYShWlZPK5rlxGOF_1QGwV7tbMfPXjnbYKrIT9CawGHQt7eN5XSGRG4W-x-PC51pNtFvfd1NEn3qTzec6Bhb-ONr82l08E6pM5vwJhE8F0UMb8Q_rDCgwAR6t_1N1KqitEujtiyEIfaoCMg2a7vvXzQaceg9g94FJRndLf_15owGCh9qujiq8brSMl6ZIT8OBAei7Iu6uOB2Imv3eGZ1cKhO9AehKGpU8C5Y8192a4kIiEo"
};
const AVATAR_IMAGE_URLS = {
  executive: "https://lh3.googleusercontent.com/aida-public/AB6AXuBU8IhE4UbdccwVUx5LxXR2Fyc0gRmJbgV0wF1Fbq7j1K3d_rGItSp-tqYvgfimHX7rT_bcmjSFL4S7eyTNtcakYzalil5wEeGWy7qwdRaxs8bxtgFuoywYajFQ1Jy9dS3-jANcrsgK743PbmCjUeMhNJhlLLAVnno7HiIbEPy8ddagTVg4h8AZsELnil_sBltgS9OMi2BhIYp4L2IjHdWtOzs27YTr3y86a4Znr9Gw5KGiyGs50Um18dnHO_yeJC4pBQfOsj03Dcw",
  predictionsAvatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuAkLeh3PRY_5yclemusbRb_gpTA4FWqsfmp6jyJ1xNjR5zwov35EOBfEbEfS2xf5R7ghvjvNYGCojFHjNKbwHLLxpCMPmgPulPfg1daF7C9gGG5G2DIxDuLYQG_AYzBX6TBIe1xSkqmJY4b8JEIObhzDaFEQ44ACCvZNU_WTp5HI8RoLAM4OhjlgVRRhTfEOqmMi8D4_jE3eh9U0zUerCPkU8zdwHNwd_4ooDg9bGf3A8YKFi9Y9uzwu-QoBdFoOlbF6J8lJiSh8I4",
  operator: "https://lh3.googleusercontent.com/aida-public/AB6AXuDP4meiTiN4Fu4QjAbir05eeF5Ypmq353cQgRGwe7Fabz5SbUnSDZa4YYn85r-AUwfwqD76V2fQ6B0taRgI4MSJZPZ62iIY8Er52miqfZwGvLR69bx9EOY0Fn_LWIIwbbVuOP8vo5xeOsiq9GKmfwkSuIzTCDrIoacaSnqlazUlHpii6WpaIB4j5SguyGvDjoTFye2s34Z_QAvbTJlJ1zNHqSWFC-KR1BV8h-_Z7eHu5lWyzS0nmUXtPxmUcsh5pTOzubsR8Zie7Bw"
};
export {
  AVATAR_IMAGE_URLS,
  CITIES_DATA,
  MAP_IMAGE_URLS,
  MOCK_EMERGENCY_UNIT
};
