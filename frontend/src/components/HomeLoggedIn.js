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

    const [income, setIncome] = useState([]);
    const [statistics, setStatistics] = useState([]);

    // const chartIncomeAmount = income.map(x => x.amount);
    // const chartIncomeNames = income.map(x => x.incomeName);

    const chartIncomeAmount = Object.values(income);
    console.log(chartIncomeAmount)
    const chartIncomeNames = Object.keys(income);

    // const chartLimitAmount2 = statistics.map(x => x.limit);
    // const chartLimitNames2 = statistics.map(x => x.category.name);
    // const chartExpenseAmount2 = statistics.map(x => x.amount);
    // const chartExpenseNames2 = statistics.map(x => x.category.name);

    const chartLimitAmount = statistics.map(x => x.limit);
    const chartLimitNames = statistics.map(x => x.category.name);
    const chartExpenseAmount = statistics.map(x => x.amount);
    const chartExpenseNames = statistics.map(x => x.category.name);

    const randomBetween = (min, max) => min + Math.floor(Math.random() * (max - min + 1));
    const chartIncomeColors = [];
    const chartIncomeColorsBorder = [];

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
            setIncome(data);
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
        const fetchStatistics = async () => {
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

        fetchStatistics();
    }, []);

    // ChartJS.register(ArcElement, Tooltip, Legend);
    const limitsData = {
        labels: chartLimitNames,
        datasets: [
            {
                label: 'Limitai:',
                data: chartLimitAmount,
                backgroundColor: chartIncomeColors,
                borderColor: chartIncomeColorsBorder,
                borderWidth: 1,
            },
        ],
    };

    ChartJS.register(ArcElement, Tooltip, Legend);
    const expenseData = {
        labels: chartExpenseNames,
        datasets: [
            {
                label: 'Šio mėnesio išlaidos:',
                data: chartExpenseAmount,
                backgroundColor: chartIncomeColors,
                borderColor: chartIncomeColorsBorder,
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
                        {statistics.map((categoryStatisics) => {
                            return (
                                <div>
                                    <div className='row'>
                                        <div className='col-8'>
                                            <p className='mb-pb-fix'>{categoryStatisics.category.name}</p>
                                        </div>
                                        <div className='col-4'>
                                            <p style={{ textAlign: "end" }} className="mb-pb-fix">({categoryStatisics.limit}€)</p>
                                        </div>
                                    </div>

                                    <ProgressBar
                                        completed={Math.round((categoryStatisics.amount) / (categoryStatisics.limit) * 100)}
                                        maxCompleted={100}
                                        bgColor="#008F8C"
                                    />
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </>
    );
}
