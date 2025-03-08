import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import SearchBar from '../components/SearchBar';
import SchemeCard from '../components/SchemeCard';
import "./Schemes.css"

function toID(text) {
  if (text && text.id) {
    text = text.id;
  } else if (text && text.userid) {
    text = text.userid;
  } else if (text && text.roomid) {
    text = text.roomid;
  }
  if (typeof text !== "string" && typeof text !== "number")
    return "";
  return ("" + text).toLowerCase().replace(/[^a-z0-9]+/g, "");
}

const App = () => {
    const [state, setState] = useState("Maharashtra");
    const [ministry, setMinistry] = useState("agriculture");
    const [residence, setResidence] = useState(null);
    const [benefit, setBenefit] = useState(null);
    const [dbt, setDbt] = useState(null);
    const [mode, setMode] = useState(null);


  let data = [
    {
     "Name": "Agri-Clinics And Agri-Business Centres Scheme",
     "Residence": "Both",
     "Benefit": "Composite",
     "DBT": "Yes",
     "Employment": "All",
     "Application Mode": "Online",
     "Description": "A welfare scheme by the Ministry of Agriculture and Farmers' Welfare was launched in 2002. AC&ABC aims at agricultural development by supplementing the efforts of public extension by providing extension and other services to farmers either on a payment basis or free of cost as per the business model of agri-preneur, local needs, and affordability of the target group of farmers. AC&ABC creates gainful self-employment opportunities for unemployed agricultural graduates, agricultural diploma holders, intermediate in agriculture, and biological science graduates with PG in agri-related courses"
    },
    {
     "Name": "Agricultural Extension",
     "Residence": "Both",
     "Benefit": "Kind",
     "DBT": "Yes",
     "Employment": "All",
     "Application Mode": "Online",
     "Description": "Extension Division endeavours towards successful implementation of Agricultural Extension activities. Through its various programmes, schemes and activities, Extension Division helps farmers to get information regarding scientific research and new knowledge in agricultural practices. It assists and encourages the State Governments in organizing, maintaining and operating professional Extension Services. "
    },
    {
     "Name": "Agricultural Marketing Infrastructure",
     "Residence": "Both",
     "Benefit": "Composite",
     "DBT": "No",
     "Employment": "All",
     "Application Mode": "Offline",
     "Description": "The scheme envisages value addition and processing at farmers level so as to enhance their income by selling more marketable and processed produce in the market. For creation of Agricultural Marketing Infrastructure including scientific Storage capacity, the Ministry of Agriculture & Farmers Welfare, Govt. of India is implementing capital subsidy sub-scheme “Agricultural Marketing Infrastructure (AMI)” of Integrated Scheme for Agricultural Marketing (ISAM) across the country and is continued till 31.03.2026"
    },
    {
     "Name": "Agriculture Infrastructure Fund",
     "Residence": "Both",
     "Benefit": "Cash",
     "DBT": "No",
     "Employment": "All",
     "Application Mode": "Online",
     "Description": "The financing facility will be provided for funding Agriculture Infrastructure Projects at farm-gate & aggregation points to agri entrepreneurs, farmers, Primary Agricultural Cooperative Societies, Farmers Producer Organizations, Start-ups, state agencies, state sponsored Public Private partnerships, etc."
    },
    {
     "Name": "Agroforestry component under RKVY",
     "Residence": "Both",
     "Benefit": "Cash",
     "DBT": "No",
     "Employment": "All",
     "Application Mode": "Offline",
     "Description": "In 2023-24, the scheme was restructured as an Agroforestry component under Rashtriya Krishi Vikas Yojana (RKVY) and focusses on Quality Planting Material. Under the scheme, financial assistance is being provided to the beneficiaries for establishment of nurseries and raising of saplings. The scheme shall promote the setting up of new small, medium and hi-tech nurseries for producing Quality Planting Materials (QPM). The details of cost norms is as under:"
    },
    {
     "Name": "Coconut Palm Insurance Scheme",
     "Residence": "Both",
     "Benefit": "Cash",
     "DBT": "No",
     "Employment": "All",
     "Application Mode": "Offline",
     "Description": "The “Coconut Palm Insurance Scheme (CPIS)” is being implemented by the Coconut Development Board, Ministry of Agriculture and Farmers Welfare, Government of India, with the objective of insuring coconut palms against natural calamities, climatic risks, pests, diseases, and other perils. Under this scheme, all healthy nut-bearing coconut palms in the age group of 4 years to 60 years in a contiguous area (mono\/mixed) can be insured against natural perils leading to death\/loss of palm\/becoming unproductive. The scheme is being implemented in all coconut-growing States through Agriculture Insurance Company and implementing State Governments."
    },
    {
     "Name": "India Afghanistan Fellowship",
     "Residence": "Both",
     "Benefit": "Cash",
     "DBT": "Yes",
     "Employment": "All",
     "Application Mode": "Online",
     "Description": "The \"India-Afghanistan Fellowship\" program introduced by the Indian Council of Agricultural Research, offers Bachelor's, Master's, and Ph.D. fellowships in Agriculture and allied sciences through Indian Agricultural Universities under the ICAR-AU system. From 2012-13 to 2014-15, over 600 fellowships were granted. Indian AUs, known for their research and human resource development, provide excellent facilities, including international student hostels. These universities cater to diverse agro-climatic regions, offering advanced educational infrastructure."
    },
    {
     "Name": "India Africa Fellowship",
     "Residence": "Both",
     "Benefit": "Cash",
     "DBT": "Yes",
     "Employment": "All",
     "Application Mode": "Online",
     "Description": "Launched under the India-Africa Forum Summit in 2010-11, the \"India-Africa Fellowship Programme\" provides 75 annual fellowships (50 for M.Sc. and 25 for Ph.D.) to African nationals. These fellowships enable students to study at renowned Indian agricultural universities affiliated with the Indian Council of Agricultural Research (ICAR). The program fosters agricultural expertise and collaboration between India and Africa. Fellows receive financial support, including monthly stipends, tuition, and travel assistance, for the program's duration."
    },
    {
     "Name": "Indian Agricultural Research Institute - Scholarship",
     "Residence": "Both",
     "Benefit": "Cash",
     "DBT": "Yes",
     "Employment": "All",
     "Application Mode": "Online",
     "Description": "The Indian Agricultural Research Institute (IARI) Junior and Senior Scholarship shall be awarded to M.Sc. and Ph.D. students admitted under General Open Competition Scheme."
    },
    {
     "Name": "Integrated Scheme on Agriculture Cooperation",
     "Residence": "Both",
     "Benefit": "Kind",
     "DBT": "No",
     "Employment": "All",
     "Application Mode": "Offline",
     "Description": "The Integrated Scheme on Agriculture Cooperation (ISAC) is a Central Sector Scheme of the Ministry of Agriculture and Farmers Welfare, Government of India. It is being implemented through the National Cooperative Development Corporation (NCDC)."
    },
    {
     "Name": "Kera Suraksha Insurance Scheme",
     "Residence": "Both",
     "Benefit": "Cash",
     "DBT": "No",
     "Employment": "All",
     "Application Mode": "Offline",
     "Description": "The ‘Kera Suraksha Insurance Scheme’ is a comprehensive Group Personal Accident Insurance Scheme, implemented by Coconut Development Board in association with Public Insurance companies for Coconut Tree Climbers\/Neera Technicians\/Coconut Harvesters."
    },
    {
     "Name": "Kisan Credit Card",
     "Residence": "Both",
     "Benefit": "Cash",
     "DBT": "No",
     "Employment": "All",
     "Application Mode": "Online",
     "Description": "The Kisan Credit Card (KCC) scheme was introduced in 1998 for issue of Kisan Credit Cards to farmers on the basis of their holdings for uniform adoption by the banks so that farmers may use them to readily purchase agriculture inputs and draw cash for their production"
    },
    {
     "Name": "Mission on Integrated Development of Horticulture- NHM and HMNEH",
     "Residence": "Rural",
     "Benefit": "Composite",
     "DBT": "No",
     "Employment": "All",
     "Application Mode": "Offline",
     "Description": "In 2014-15, the Government of India launched Mission for Integrated Development of Horticulture (MIDH) subsuming the ongoing schemes viz., NHM, HMNEH, CDB, NHB, CIH and NBM."
    },
    {
     "Name": "National Agriculture Insurance Scheme",
     "Residence": "Both",
     "Benefit": "Composite",
     "DBT": "No",
     "Employment": "All",
     "Application Mode": "Offline",
     "Description": "The National Agriculture Insurance Scheme (NAIS) was introduced by the Government of India to provide comprehensive insurance coverage and financial support to farmers against crop losses due to natural calamities, pests, and diseases."
    },
    {
     "Name": "National Agriculture Market",
     "Residence": "Both",
     "Benefit": "Cash",
     "DBT": "No",
     "Employment": "All",
     "Application Mode": "Online",
     "Description": "e-NAM a pan-India electronic trading portal was launched on 14th April 2016, by the Prime Minister of India, with the aim of networking the existing mandis on a common online market platform as “One Nation One Market” for agricultural commodities in India."
    },
    {
     "Name": "National Bamboo Mission",
     "Residence": "Both",
     "Benefit": "Composite",
     "DBT": "No",
     "Employment": "All",
     "Application Mode": "Online",
     "Description": "Restructured National Bamboo Mission was launched during 2018-19 as a Centrally Sponsored Scheme (CSS) after the historical amendment of the Indian Forest Act during 2017 to exclude bamboo out from definition of tree."
    },
    {
     "Name": "National Beekeeping & Honey Mission",
     "Residence": "Both",
     "Benefit": "Cash",
     "DBT": "No",
     "Employment": "All",
     "Application Mode": "Offline",
     "Description": "National Beekeeping & Honey Mission (NBHM) was announced as part of the Atmanirbhar Bharat Abhiyaan and aims for the overall promotion & development of scientific beekeeping in the country to achieve the goal of ‘Sweet Revolution’ which is being implemented"
    },
    {
     "Name": "National Food Security Mission NFSM",
     "Residence": "Both",
     "Benefit": "Composite",
     "DBT": "No",
     "Employment": "All",
     "Application Mode": "Offline",
     "Description": "National Food Security Mission was launched in 2007-08 to increase the production of rice, wheat and pulses. Later, coarse cereals, nutri cereals, commercial crops (sugarcane, jute, and cotton) were also added to the mission."
    },
    {
     "Name": "National Mission on Natural Farming",
     "Residence": "Both",
     "Benefit": "Composite",
     "DBT": "No",
     "Employment": "All",
     "Application Mode": "Offline",
     "Description": "To motivate farmers to adopt chemical free farming and enhance the reach of natural farming, the Government has formulated National Mission on Natural Farming (NMNF) as a separate and independent scheme from 2023-24 by up scaling the Bhartiya Prakritik Krishi Paddati"
    },
    {
     "Name": "Paramparagat Krishi Vikas Yojana",
     "Residence": "Both",
     "Benefit": "Composite",
     "DBT": "No",
     "Employment": "All",
     "Application Mode": "Offline",
     "Description": "The Paramparagat Krishi Vikas Yojana (PKVY), launched in 2015, is an extended component of Soil Health Management (SHM) under the Centrally Sponsored Scheme (CSS), National Mission on Sustainable Agriculture (NMSA)."
    },
    {
     "Name": "Pradhan Mantri Fasal Bima Yojna (PMFBY)",
     "Residence": "Rural",
     "Benefit": "Cash",
     "DBT": "No",
     "Employment": "Self",
     "Application Mode": "Online",
     "Description": "Pradhan Mantri Fasal Bima Yojana was launched in 2016 with the aim to support farmers by providing an affordable comprehensive risk cover for crops."
    },
    {
     "Name": "Pradhan Mantri Kisan Samman Nidhi",
     "Residence": "Both",
     "Benefit": "Cash",
     "DBT": "No",
     "Employment": "All",
     "Application Mode": "Offline",
     "Description": "Farmer welfare scheme by Ministry of Agriculture and Farmers Welfare to provide income support to all landholding farmers' families in the country to supplement their financial needs for procuring various inputs related to agriculture and allied activities as well as domestic needs."
    },
    {
     "Name": "Pradhan Mantri Krishi Sinchayee Yojana: Per Drop More Crop",
     "Residence": "Rural",
     "Benefit": "Kind",
     "DBT": "No",
     "Employment": "All",
     "Application Mode": "Offline",
     "Description": "The scheme “Pradhan Mantri Krishi Sinchayee Yojana: Per Drop More Crop” was launched by the Dept. of Agriculture & Farmers Welfare, Ministry of Agriculture & Farmers Welfare, Govt. of India on 1st July 2015. The scheme mainly focuses on water use efficiency at farm level"
    },
    {
     "Name": "RKVY Soil Health and Fertility - Soil Health Card",
     "Residence": "Both",
     "Benefit": "Kind",
     "DBT": "No",
     "Employment": "All",
     "Application Mode": "Offline",
     "Description": "Soil Health Card is designed to give each farmer soil nutrient status of his\/her holding and advice him\/her on the dosage of fertilizers and also the needed soil amendments, that s\/he should apply to maintain soil health in the long run."
    },
    {
     "Name": "RKVY Soil Health and Fertility Village level Soil Testing Lab",
     "Residence": "Rural",
     "Benefit": "Cash",
     "DBT": "Yes",
     "Employment": "All",
     "Application Mode": "Offline",
     "Description": "In order to promote soil test analysis in a campaign mode and to create awareness among farmers about soil health for judicious use of chemical fertilisers, organic manure, the component of “Setting of Village-level Soil Testing Laboratories” is being implemented under the"
    },
    {
     "Name": "Rainfed Area Development",
     "Residence": "Both",
     "Benefit": "Composite",
     "DBT": "Yes",
     "Employment": "All",
     "Application Mode": "Offline",
     "Description": "Rainfed Area Development (RAD) scheme was launched in 2014-15 to mainstream development of rainfed areas in a sustainable manner. It adopts an area-based approach, focuses on Integrated Farming System (IFS) for enhancing productivity and minimizing risks associated with"
    },
    {
     "Name": "Students Ready",
     "Residence": "Both",
     "Benefit": "Cash",
     "DBT": "Yes",
     "Employment": "All",
     "Application Mode": "Online",
     "Description": "The Student Rural Entrepreneurship Awareness Development Yojana (READY) was launched by Hon'ble Prime Minister on 25 July 2015."
    },
    {
     "Name": "Sub-mission On Agriculture Mechanization",
     "Residence": "Both",
     "Benefit": "Cash",
     "DBT": "Yes",
     "Employment": "All",
     "Application Mode": "Online",
     "Description": "The Sub-Mission on Agricultural Mechanization was launched in 2014-15 by the Ministry of Agriculture and Farmers’ Welfare."
    }
   ]
   let newData = []

   if(residence != null) {
    data.forEach((ele) => {
      if(ele.Residence == residence) newData.push(ele)
    })
   }
   if(mode != null) {

    data.forEach((ele) => {
      if(ele["Application Mode"] == mode) newData.push(ele)
    })
   }
   if(benefit != null) {
    data.forEach((ele) => {
      if(ele.Benefit == residence) newData.push(ele)
    })
   }
   if(dbt != null) {
    data.forEach((ele) => {
      if(ele.DBT == dbt) newData.push(ele)
    })
   }
   
  return (
    <div className="container">
      <Sidebar setMode = {setMode} setBenefit={setBenefit} setDbt={setDbt} setResidence={setResidence}  />
      <div className="content">
        <SearchBar setMode = {setMode} setBenefit={setBenefit} setDbt={setDbt} setResidence={setResidence}  />
        <div className="scheme-list">
        {newData.length ? newData.map((element) => {
          return <SchemeCard key={element.Name} data = {element}/>
        }) : data.map((element) => {
          return <SchemeCard key={element.Name} data = {element}/>
        })}
     
        </div>
      </div>
    </div>
  );
};

export default App;