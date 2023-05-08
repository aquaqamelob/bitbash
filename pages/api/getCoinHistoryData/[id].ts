import type { NextApiRequest, NextApiResponse } from 'next'

interface Data {
    Date: string,
    Price: number
}
// TODO: create data type for response
export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {

  const { id } = req.query;


  const getData = async () => {
    const response = await fetch(
      `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=90&interval=daily`,
      {
        method: "GET",
        headers: {
          Accept: "*/*",
        },
      }
    );

    const data = await response.json();
      
    

    try {
        const formatedData: Data[] = [];
        for(let i = 0; i < data.prices.length; i++) {
          const item = data.prices[i];
          let date = new Date(item[0]).toDateString().split(' ');
          let formattedDate = `${date[1]} ${date[2]}`;
          formatedData.push({Date: formattedDate, Price: item[1]});
      }
      res.status(200).json(formatedData);
      } catch (error) {
        res.status(500).json(error);
      }
    
  };

  getData();  
}

