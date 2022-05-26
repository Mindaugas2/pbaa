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
    const expenseSum = chartStatisticsAmount.reduce((sum, a) => sum + a, 0);
    const chartStatisticsNames = statistics.map(x => x.category.name);

    // const chartLimitAmount = statistics.map(x => x.limit);
    // const chartLimitNames = statistics.map(x => x.category.name);
    const chartExpenseAmount = statistics.map(x => x.amount);
    const chartExpenseNames = statistics.map(x => x.category.name);

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
                <div className="col-6" style={{paddingLeft:0}}>

                    <div>
                        <p>Mėnesio balansas</p>
                        <p>Pajamos {incomeSum} EUR</p>
                        <p>Išlaidos {expenseSum} EUR</p>
                        <p>Likutis {savings} EUR</p>
                        <p>Pajamų likutis išlaidoms, %</p>
                        <ProgressBar completed={
                            Math.round((savings) / ((incomeSum)) * 100)
                        } maxCompleted={100} 
                        bgColor="#008F8C"

                        />
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
                </div>
                <p>Limitų išnaudojimas:</p>
                <div>
                    {statistics.map((categoryStatistics) => {
                        if (categoryStatistics.limit !== 0) {
                            return (
                                <div>
                                    <div className='row'>
                                        <div className='col-8'>
                                            <p className='mb-pb-fix'>{categoryStatistics.category.name}</p>
                                        </div>
                                        <div className='col-4'>
                                            <p style={{ textAlign: "end" }} className="mb-pb-fix">({categoryStatistics.limit}€)</p>
                                        </div>
                                    </div>

                                    <ProgressBar
                                        completed={Math.round((categoryStatistics.amount) / (categoryStatistics.limit) * 100)}
                                        maxCompleted={100}
                                        bgColor="#008F8C"
                                    />
                                </div>
                            )
                        }
                    })}
                </div>
                {/* 
 */}
                {/*  */}
                <main className="content">
                    <div className="container-fluid p-0">

                        {/* <h1 className="h3 mb-3"><strong>Analytics</strong> Dashboard</h1> */}

                        <div className="row">
                            <div className="col-xl-6 col-xxl-5 d-flex">
                                <div className="w-100">
                                    <div className="row">
                                        <div className="col-sm-6">
                                            <div className="card">
                                                <div className="card-body">
                                                    <div className="row">
                                                        <div className="col mt-0">
                                                            <h5 className="card-title">Likutis</h5>
                                                        </div>

                                                        <div className="col-auto">
                                                            <div className="stat text-primary">
                                                                <i className="align-middle" data-feather="truck"></i>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <h1 className="mt-1 mb-3">{savings} €</h1>
                                                </div>
                                            </div>
                                            <div className="card">
                                                <div className="card-body">
                                                    <div className="row">
                                                        <div className="col mt-0">
                                                            <h5 className="card-title">Visitors</h5>
                                                        </div>

                                                        <div className="col-auto">
                                                            <div className="stat text-primary">
                                                                <i className="align-middle" data-feather="users"></i>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <h1 className="mt-1 mb-3">14.212</h1>
                                                    <div className="mb-0">
                                                        <span className="text-success"> <i className="mdi mdi-arrow-bottom-right"></i> 5.25% </span>
                                                        <span className="text-muted">Since last week</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-sm-6">
                                            <div className="card">
                                                <div className="card-body">
                                                    <div className="row">
                                                        <div className="col mt-0">
                                                            <h5 className="card-title">Pajamų likutis išlaidoms, %</h5>
                                                        </div>

                                                        <div className="col-auto">
                                                            <div className="stat text-primary">
                                                                <i className="align-middle" data-feather="dollar-sign"></i>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <ProgressBar completed={
                                                        Math.round((savings) / ((incomeSum)) * 100)
                                                    } maxCompleted={100}
                                                        bgColor="#008F8C" />
                                                    {/* <h1 className="mt-1 mb-3">$21.300</h1>
                                                    <div className="mb-0">
                                                        <span className="text-success"> <i className="mdi mdi-arrow-bottom-right"></i> 6.65% </span>
                                                        <span className="text-muted">Since last week</span>
                                                    </div> */}
                                                </div>
                                            </div>
                                            <div className="card">
                                                <div className="card-body">
                                                    <div className="row">
                                                        <div className="col mt-0">
                                                            <h5 className="card-title">Orders</h5>
                                                        </div>

                                                        <div className="col-auto">
                                                            <div className="stat text-primary">
                                                                <i className="align-middle" data-feather="shopping-cart"></i>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <h1 className="mt-1 mb-3">64</h1>
                                                    <div className="mb-0">
                                                        <span className="text-danger"> <i className="mdi mdi-arrow-bottom-right"></i> -2.25% </span>
                                                        <span className="text-muted">Since last week</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-xl-6 col-xxl-7">
                                <div className="card flex-fill w-100">
                                    <div className="card-header">

                                        <h5 className="card-title mb-0">Recent Movement</h5>
                                    </div>
                                    <div className="card-body py-3">
                                        <div className="chart chart-sm">
                                            <canvas id="chartjs-dashboard-line"></canvas>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-12 col-md-6 col-xxl-3 d-flex order-2 order-xxl-3">
                                <div className="card flex-fill w-100">
                                    <div className="card-header">

                                        <h5 className="card-title mb-0">Browser Usage</h5>
                                    </div>
                                    <div className="card-body d-flex">
                                        <div className="align-self-center w-100">
                                            <div className="py-3">
                                                <div className="chart chart-xs">
                                                    <canvas id="chartjs-dashboard-pie"></canvas>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-12 col-md-6 col-xxl-3 d-flex order-1 order-xxl-1">
                                <div className="card flex-fill">
                                    <div className="card-header">

                                        <h5 className="card-title mb-0">Calendar</h5>
                                    </div>
                                    <div className="card-body d-flex">
                                        <div className="align-self-center w-100">
                                            <div className="chart">
                                                <div id="datetimepicker-dashboard"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </main>


                {/* </div> */}
                {/* </div> */}
            </div>
        </>
    );
}
