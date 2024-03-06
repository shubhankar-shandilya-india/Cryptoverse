import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { HistoricalChart } from '../Api';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import { useSelector } from 'react-redux';

const Chart = () => {
  const currency = useSelector(store=>store.currency.currency);
  const [arr, setarr] = useState();
  const [days, setdays] = useState(1);
  const { id } = useParams();
  useEffect(() => {
    const fetchdata = async () => {
      try {
        const response = await axios.get(HistoricalChart(id, days, currency));
        console.log(response.data);
        setarr(response.data.prices);
      }
      catch (err) {
        console.log(err.message);
      }
    }
    fetchdata();
  }, [days,currency]);
  return (
    <div className=' w-[97vw] lg:w-[73vw] flex flex-col gap-[2vh] pb-9 lg:pb-0 p-3 lg:pt-[5vh] text-[#FAF0E6]'>
      <Line
        data={{
          labels: arr?.map((coin) => {
            let date = new Date(coin[0]);
            let time =
              date.getHours() > 12
                ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                : `${date.getHours()}:${date.getMinutes()} AM`;
            return days === 1 ? time : date.toLocaleDateString();
          }),
          datasets: [
            {
              data: arr?.map((coin) => coin[1]),
              label: `Price ( Past ${days} Days ) in ${currency==='usd'?"$":"₹"}`,
              borderColor: "skyblue",
            },
          ],
        }}
        options={{
          elements: {
            point: {
              radius: 1,
            },
          },
        }}
      />
      <div className='flex gap-[4vw] justify-evenly text-black text-xs md:text-base'>
        <button className={`h-[35px] w-[15vw] hover:bg-[#87CEEB] hover:text-black  border-white-600  border-[1px] rounded-sm ${days === 1? 'bg-[#87CEEB] text-black' : 'text-white border-0'}`} onClick={days !== 1 ? () => setdays(1) : null}>24 Hours</button>
        <button className={`h-[35px] w-[15vw] hover:bg-[#87CEEB] hover:text-black  border-white border-0-600  border-[1px] rounded-sm ${days === 30? 'bg-[#87CEEB] text-black' : 'text-white border-0'}`} onClick={days !== 30 ? () => setdays(30) : null}>30 Days</button>
        <button className={`h-[35px] w-[15vw] hover:bg-[#87CEEB] hover:text-black  border-white border-0-600  border-[1px] rounded-sm ${days === 90? 'bg-[#87CEEB] text-black' : 'text-white border-0'}`} onClick={days !== 90 ? () => setdays(90) : null}>3 Months</button>
        <button className={`h-[35px] w-[15vw] hover:bg-[#87CEEB] hover:text-black  border-white border-0-600  border-[1px] rounded-sm ${days === 365? 'bg-[#87CEEB] text-black' : 'text-white border-0'}`} onClick={days !== 365 ? () => setdays(365) : null}>1 Year</button>

      </div>
    </div>
  )
}

export default Chart