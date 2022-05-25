import React, { useEffect, useState } from 'react';
import AuthService from "../services/auth.service";
// import Header from './Header';
// import NavbarAna from './NavbarAna';
// import SideBar from './SideBar';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import ProgressBar from "@ramonak/react-progress-bar";

export default function HomeLoggedIn() {
    const currentUser = AuthService.getCurrentUser();

    const [incomes, setIncomes] = useState([]);
    const [statistics, setStatistics] = useState([]);
    const [limits, setLimits] = useState([]);
    const [savings, setSavings] = useState([]);

    const chartIncomeAmount = Object.values(incomes);
    const incomeSum = chartIncomeAmount.reduce((sum, a) => sum + a, 0);
    const chartIncomeNames = Object.keys(incomes);

    const chartStatisticsAmount = statistics.map(x => x.amount);
    const expenseSum = chartStatisticsAmount.reduce((sum,  a ) => sum + a, 0);
    const chartStatisticsNames = statistics.map(x => x.category.name);

    const chartLimitAmount = limits.map(x => x.amount);
    const chartLimitNames = limits.map(x => x.expensesCategory.name);

    useEffect(() => {
        const calculateSavings = () => {
            if ((incomeSum - expenseSum) > 0) {
                setSavings(incomeSum - expenseSum)
            } else 
            setSavings(0);
        };
        calculateSavings();
    }, [incomeSum, expenseSum]);

    const randomBetween = (min, max) => min + Math.floor(Math.random() * (max - min + 1));
    const chartIncomeColors = [];
    const chartIncomeColorsBorder = [];
    const chartStatisticsColors = [];
    const chartStatisticsColorsBorder = [];
    const chartLimitColors = [];
    const chartLimitColorsBorder = [];

    // Generates random RGB values for the displayed incomes
    for (let i = 1; i <= chartIncomeNames.length; i++) {
        const r = randomBetween(0, 200);
        const g = randomBetween(0, 200);
        const b = randomBetween(0, 200);
        const rgb = `rgb(${r}, ${g}, ${b}, 0.4)`; // Collect all to a css color string
        const rgbBorder = `rgb(${r}, ${g}, ${b}, 1)`;

        chartIncomeColors.push(rgb);
        chartIncomeColorsBorder.push(rgbBorder);
    }

    for (let i = 1; i <= chartStatisticsNames.length; i++) {
        const r = randomBetween(0, 200);
        const g = randomBetween(0, 200);
        const b = randomBetween(0, 200);
        const rgb = `rgb(${r}, ${g}, ${b}, 0.4)`; // Collect all to a css color string
        const rgbBorder = `rgb(${r}, ${g}, ${b}, 1)`;

        chartStatisticsColors.push(rgb);
        chartStatisticsColorsBorder.push(rgbBorder);
    }

    for (let i = 1; i <= chartLimitNames.length; i++) {
        const r = randomBetween(0, 200);
        const g = randomBetween(0, 200);
        const b = randomBetween(0, 200);
        const rgb = `rgb(${r}, ${g}, ${b}, 0.4)`; // Collect all to a css color string
        const rgbBorder = `rgb(${r}, ${g}, ${b}, 1)`;

        chartLimitColors.push(rgb);
        chartLimitColorsBorder.push(rgbBorder);
    }

    // Fetch all user's income from database to display down below
    // useEffect(() => {
    //     const fetchData = async () => {
    //         const response = await fetch(`http://localhost:8080/api/income/user/${currentUser.id}`,
    //             {
    //                 method: "GET",
    //                 headers: {
    //                     'Content-Type': 'application/json',
    //                     'Authorization': `Bearer ${currentUser.accessToken}`
    //                 }
    //             });

    //         const data = await response.json();
    //         setIncome(data);
    //     };

    //     fetchData();
    // }, []);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`http://localhost:8080/api/statistics/user/income/${currentUser.id}`,
                {
                    method: "GET",
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${currentUser.accessToken}`
                    }
                });

            const data = await response.json();
            setIncomes(data);
        };

        fetchData();
    }, []);
    

    ChartJS.register(ArcElement, Tooltip, Legend);
    const data = {
        labels: chartIncomeNames,
        datasets: [
            {
                label: 'Šio mėnesio pajamos:',
                data: chartIncomeAmount,
                backgroundColor: chartIncomeColors,
                borderColor: chartIncomeColorsBorder,
                borderWidth: 1,
            },
        ],
    };

    useEffect(() => {
        const fetchStatitics = async () => {
            const response = await fetch(`http://localhost:8080/api/statistics/user/${currentUser.id}`,
                {
                    method: "GET",
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${currentUser.accessToken}`
                    }
                });

            const data = await response.json();
            setStatistics(data);
        };

        fetchStatitics();
    }, []);

    ChartJS.register(ArcElement, Tooltip, Legend);
    const expenseData = {
        labels: chartStatisticsNames,
        datasets: [
            {
                label: 'Šio mėnesio išlaidos:',
                data: chartStatisticsAmount,
                backgroundColor: chartStatisticsColors,
                borderColor: chartStatisticsColorsBorder,
                borderWidth: 1,
            },
        ],
    };

    
    useEffect(() => {
        const fetchLimits = async () => {
            const response = await fetch(`http://localhost:8080/api/limits/user/${currentUser.id}`,
                {
                    method: "GET",
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${currentUser.accessToken}`
                    }
                });

            const data = await response.json();
            setLimits(data);
        };

        fetchLimits();
    }, []);

    ChartJS.register(ArcElement, Tooltip, Legend);
    const limitsData = {
        labels: chartLimitNames,
        datasets: [
            {
                label: 'Limitai:',
                data: chartLimitAmount,
                backgroundColor: chartLimitColors,
                borderColor: chartLimitColorsBorder,
                borderWidth: 1,
            },
        ],
    };

    return (
        // <>
        //     <div>
        //         <h2>Sveiki {currentUser.email}</h2>
        //     </div>

        //     {/* <div>
        //         <Header />
        //     </div> */}
        //     <div className='row'>
        //         <div className='row col-8 ps-4'>
        //             <div className='col-12 mt-4'><NavbarAna /></div>
        //             <h2>Some content</h2>
        //         </div>
        //         <div className='col-4'>
        //             <SideBar />
        //         </div>
        //     </div>
        // </>
<>
<div className="container-fluid budget__expense">
        <div className="container">
          <div className="row">
            <div className="col">
              <h2>Statistika</h2>
            </div>
          </div>
        </div>
      </div>
        <div className="container">
                            <div className="col-6">

             <div>
                                    <p>Mėnesio balansas</p>
                                    <p>Pajamos {incomeSum} EUR</p>
                                    <p>Išlaidos {expenseSum} EUR</p>
                                    <p>Likutis {savings} EUR</p>
                                    <p>Pajamų likutis išlaidoms, %</p>

                                    <ProgressBar completed={
                                        Math.round((savings) / ((incomeSum)) * 100)
                                    } maxCompleted={100}/>
                                </div>
                                </div>

            <div className="row">
                <div className="col">
                <p>Šio mėnesio pajamos:</p>

                <div className="col-6">
                    <Doughnut
                        data={data}
                        width={400}
                        height={400}
                        options={{ maintainAspectRatio: false }}
                    />
                </div>
                </div>

                <div className="col">
                <p>Šio mėnesio Išlaidos:</p>

                <div className="col-6">
                    <Doughnut
                        data={expenseData}
                        width={400}
                        height={400}
                        options={{ maintainAspectRatio: false }}
                    />
                                    </div>

                </div>

                {/* <p>Limitai:</p>

                <div className="col-6">
                    <Doughnut
                        data={limitsData}
                        width={200}
                        height={200}
                        options={{ maintainAspectRatio: false }}
                    />

                </div> */}
                <p>Limitų išnaudojimas:</p>
                <div>
                    {statistics.map((categoryStatistics) => {
                        if (categoryStatistics.limit !== 0) {
                            return (
                            
                                <div>
                                    <p>{categoryStatistics.category.name}</p>
                                    <ProgressBar completed={
                                        
                                        Math.round((categoryStatistics.amount) / (categoryStatistics.limit) * 100)
                                        } maxCompleted={100}/>
                                </div>
                            )
                        } 
                    })}
                </div>
            </div>
        </div>
</>
    );
}
