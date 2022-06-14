import moment from "moment";
import React, { useEffect, useState, useCallback } from "react";
import SpendingService from "../../services/spendingService";

const Spending = () => {
  const [filter, setFilter] = useState("today");
  const [name, setName] = useState("1");
  const [price, setPrice] = useState("");
  const [status, setStatus] = useState("1");
  const [date, setDate] = useState(new Date());
  const [spendings, setSpendings] = useState([]);
  const [data, setData] = useState({});

  const getSpendings = useCallback(async () => {
    const { data, spendings } = await SpendingService.getSpendings();
    setSpendings(spendings);
    setData(data);
  }, []);

  useEffect(() => {
    getSpendings();
  }, [getSpendings]);

  const changeName = (value) => {
    setName(value);
  };

  const changePrice = (value) => {
    if (value % 1 >= 0) setPrice(value);
  };

  const clearInput = () => {
    setName("1");
    setPrice("");
    setStatus("1");
  };

  const addSpending = async () => {
    const spending = {
      id: Math.random(),
      name: name,
      price: price,
      status: status,
      time: date
    };
    await SpendingService.changeSpendings(data, [spending, ...spendings]);
    await getSpendings();
    clearInput();
  };

  const deleteSpending = async (id) => {
    const newSpendings = spendings.filter((item) => item.id !== id);
    await SpendingService.changeSpendings(data, newSpendings);
    await getSpendings();
  };

  const dataDemo = [
    {
      id: Math.random(),
      name: "1",
      status: "1",
      price: "15000",
      date: new Date("06/14/2022"),
    },
    {
      id: Math.random(),
      name: "1",
      status: "1",
      price: "15000",
      date: new Date("01/05/2022"),
    },
    {
      id: Math.random(),
      name: "1",
      status: "1",
      price: "15000",
      date: new Date("01/09/2022"),
    },
    {
      id: Math.random(),
      name: "1",
      status: "1",
      price: "15000",
      date: new Date("01/14/2022"),
    },
    {
      id: Math.random(),
      name: "1",
      status: "1",
      price: "15000",
      date: new Date("01/17/2022"),
    },
    {
      id: Math.random(),
      name: "1",
      status: "1",
      price: "15000",
      date: new Date("01/22/2022"),
    },
    {
      id: Math.random(),
      name: "1",
      status: "1",
      price: "15000",
      date: new Date("01/25/2022"),
    },
    {
      id: Math.random(),
      name: "1",
      status: "1",
      price: "15000",
      date: new Date("01/28/2022"),
    },
    {
      id: Math.random(),
      name: "1",
      status: "1",
      price: "15000",
      date: new Date("02/02/2022"),
    },
    {
      id: Math.random(),
      name: "1",
      status: "1",
      price: "15000",
      date: new Date("02/15/2022"),
    },
  ];

  // Date
  const now = new Date();
  const [currentYear, setCurrentYear] = useState(now.getFullYear());
  const [currentMonth, setCurrentMonth] = useState(now.getMonth());

  const getWeeks = () => {
    const date = new Date(currentYear, currentMonth, 0);
    const days = date.getDate();

    let weeks = [];
    let dayOfWeek = [];
    for (let i = 1; i <= days; i++) {
      const currentDate = new Date(currentYear, currentMonth, i);
      dayOfWeek = [...dayOfWeek, currentDate];
      // toi ngay cn thi tao mang dayOfWeek moi
      console.log(days, currentDate.getDay());
      if (currentDate.getDay() === 0 || i === days) {
        weeks = [...weeks, dayOfWeek];
        dayOfWeek = [];
      }
    }
    return weeks;
  };
  const weeks = getWeeks();
  // End Date

  return (
    <div className="flex">
      <div className="w-3/4">
        <div className="w-full flex h-fit px-2">
          <div className="mr-2">
            <p className="">Date</p>
            <input
              className="p-1 mr-2 outline-none"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
          <div className="mr-2">
            <p className="">Status</p>
            <select
              className="p-1 outline-none"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="1">Good</option>
              <option value="2">Bad</option>
            </select>
          </div>

          <div className="mr-2">
            <p className="">Spending</p>
            <select
              className="p-1 outline-none"
              value={name}
              onChange={(e) => setName(e.target.value)}
            >
              <option value="1">Ăn</option>
              <option value="2">Xăng</option>
              <option value="3">Cà phê</option>
              <option value="4">Tiền Phòng</option>
              <option value="5">Đi chơi</option>
              <option value="6">Lãng Phí</option>
            </select>
          </div>
          <div className="mr-2">
            <p className="">Price</p>
            <input
              className="p-1 outline-none"
              placeholder="Enter price..."
              value={price}
              onChange={(e) => changePrice(e.target.value)}
            />
          </div>
          <div className="flex mt-auto">
            <button
              className="mr-2 text-white text-sm font-semibold py-1.5 px-5 rounded bg-green-500 hover:bg-green-400"
              onClick={addSpending}
            >
              ADD
            </button>
            <button
              className="text-white text-sm font-semibold py-1.5 px-5 rounded bg-gray-500 hover:bg-gray-400"
              onClick={clearInput}
            >
              CLEAR
            </button>
          </div>
        </div>

        <div className="flex flex-wrap mt-5">
          {weeks &&
            weeks.map((week, index) => (
              <div className="w-1/2 p-2" key={index}>
                <div className="p-2 bg-green-100 rounded">
                  <h2 className="font-bold text-sm mb-2">Week {index + 1} - {week.length} day</h2>
                  <div className="flex items-center justify-between mb-5">
                    <div className="">
                      <p className="font-bold text-xs">Cash</p>
                      <p>320.000</p>
                    </div>
                    <div className="">
                      <p className="font-bold text-xs">Spent</p>
                      <p>320.000</p>
                    </div>
                    <div className="">
                      <p className="font-bold text-xs">Still</p>
                      <p>320.000</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="w-1/2">
                      <p className="mb-2 border-b w-fit border-black/10">
                        <span className="min-w-[60px] font-semibold text-xs inline-block">
                          Ăn
                        </span>
                        32.000
                      </p>
                      <p className="mb-2 border-b w-fit border-black/10">
                        <span className="min-w-[60px] font-semibold text-xs inline-block">
                          Cà Phê
                        </span>
                        32.000
                      </p>
                      <p className="mb-2 border-b w-fit border-black/10">
                        <span className="min-w-[60px] font-semibold text-xs inline-block">
                          Đi Chơi
                        </span>
                        32.000
                      </p>
                      <p className="mb-2 border-b w-fit border-black/10">
                        <span className="min-w-[60px] font-semibold text-xs inline-block">
                          Xăng
                        </span>
                        32.000
                      </p>
                      <p className="mb-2 border-b w-fit border-black/10">
                        <span className="min-w-[60px] font-semibold text-xs inline-block">
                          Lãng Phí
                        </span>
                        32.000
                      </p>
                    </div>
                    <div className="w-1/2">
                      <div className="flex items-center mb-4">
                        <p className="w-5 h-5 bg-green-500 mr-5"></p>
                        <span>430.000 đ</span>
                      </div>
                      <div className="flex items-center">
                        <p className="w-5 h-5 bg-orange-500 mr-5"></p>
                        <span>430.000 đ</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>

      <div className="w-1/4 p-2">
        <div className="flex items-center justify-between mb-5">
          <p
            className={`cursor-pointer hover:underline duration-200 ${
              filter === "today" ? "underline" : ""
            }`}
            onClick={() => setFilter("today")}
          >
            Today
          </p>
          <p
            className={`cursor-pointer hover:underline duration-200 ${
              filter === "week" ? "underline" : ""
            }`}
            onClick={() => filter("week")}
          >
            This Week
          </p>
          <p
            className={`cursor-pointer hover:underline duration-200 ${
              filter === "month" ? "underline" : ""
            }`}
            onClick={() => filter("month")}
          >
            This Month
          </p>
        </div>
        {spendings &&
          spendings?.map((spending, index) => {
            let bg = "";
            let name = ''
            if (spending.status === "1") bg = "bg-green-500";
            if (spending.status === "2") bg = "bg-orange-500";

            if (spending.name === '1') name = 'Ăn'
            if (spending.name === '2') name = 'Xăng'
            if (spending.name === '3') name = 'Cà Phê'
            if (spending.name === '4') name = 'Tiền Phòng'
            if (spending.name === '5') name = 'Đi Chơi'
            if (spending.name === '6') name = 'Lãng Phí'

            return (
              <div
                className={`mb-2 p-2 rounded-md text-black relative ${bg}`}
                key={index}
              >
                <div className="flex justify-between items-center mt-1">
                  <p className="font-semibold text-xs">{name}</p>
                  <p className="font-semibold text-xs">{spending.time}</p>
                </div>
                <p className="text-2xl font-bold mt-2">{spending.price}</p>
                <div className="flex absolute top-0 right-0 p-0.5">
                  <p
                    className="w-2 h-2 mr-2 rounded-full bg-yellow-500 cursor-pointer"
                  ></p>
                  <p
                    className="w-2 h-2 rounded-full bg-red-500 cursor-pointer"
                    onClick={() => deleteSpending(spending.id)}
                  ></p>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Spending;
