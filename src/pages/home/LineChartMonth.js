import React from "react";
import LineChart from "../../component/LineChart";
import { cashflowGet } from "../../api/api";
import { FormatDate } from "../../helpers";
export default (props) => {
  const [lineChartData, setLineChartData] = React.useState([]);
  const [lineChartSeries, setLineChartSeries] = React.useState([]);
  const formatLineChartData = (data) => {
    /**
     * get unique date (ignore time) from response
     * loop uniques dates and get value of wallet from response
     */
    // get unique dates
    const format = "DD-MMM-YYYY";
    const allDates = data.map((m) => FormatDate(m.date, format));
    const allWallets = data.map((m) => m.wallet.name);
    var uniqueDates = [...new Set(allDates)];
    var uniqueWallets = [...new Set(allWallets)];
    setLineChartSeries(uniqueWallets);
    // loop uniques dates and get value of wallet from response
    const formatedData = uniqueDates.map((ud) => {
      const byDate = data.filter((dr) => FormatDate(dr.date, format) === ud);
      const result = { date: ud };
      uniqueWallets.map((uw) => {
        const amounts = byDate
          .filter((b) => b.wallet.name === uw)
          .map((m) => m.amount);
        const sum = amounts.reduce((partial_sum, a) => partial_sum + a, 0);
        result[uw] = sum;
        return 0;
      });
      return result;
    });
    setLineChartData(formatedData);
  };
  const loadData = async () => {
    try {
      cashflowGet(0, 100).then((r) => formatLineChartData(r.data.content));
    } catch (err) {}
  };
  React.useEffect(() => {
    loadData();
  }, []);
  return (
    <div className="z-card mb-2">
      <span className="font-weight-bold">Cashflow by Month</span>
      <hr className="mt-1" />
      <LineChart data={lineChartData} series={lineChartSeries} />
    </div>
  );
};
