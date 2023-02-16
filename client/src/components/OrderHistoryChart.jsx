import {CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis} from 'recharts';

export function OrderHistoryChart({ordersCountPerDay}) {
  return (
    <div className="text-center">
      <div className="p-5 me-5" style={{height: '600px'}}>
        <ResponsiveContainer>
          <LineChart data={ordersCountPerDay} >
            <XAxis dataKey="date"/>
            <YAxis dataKey="orderCount"/>
            <Tooltip/>
            <CartesianGrid stroke="#eee"/>
            <Line type="linear" dataKey="orderCount" stroke="rgb(75, 192, 192)" strokeWidth="2" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
