import axios from 'axios';

const __URL = 'https://covid19.mathdro.id/api';

export const fetchData = async (country) => {
    let chageableUrl = __URL;

    if(country){
        chageableUrl = `${__URL}/countries/${country}`
    }


    try{
        const {data:{confirmed,recovered,deaths,lastUpdate}} = await axios.get(chageableUrl);

        const modifiedData = {confirmed, recovered, deaths,  lastUpdate };

        return modifiedData;       
       
    }catch(error)
    {
        console.log('Error 404')
    }
}

export const featchDailyData = async () => {
    try{
        const {data} = await axios.get(`${__URL}/daily`)
       
        const modifiedData = data.map((dailyData) =>({
            confirmed: dailyData.confirmed.total,
            deaths: dailyData.deaths.total,
            date: dailyData.reportDate
        }))
      
        return modifiedData;

    }catch(error){
        console.log(error)
    }
}


export const fetchCountries = async () =>{
    try{
        const {data:{countries}} = await axios.get(`${__URL}/countries`);

        return countries.map((country)=> country.name)
    }catch(error){
        console.log(error)
    }
}