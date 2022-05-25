import React, { useState, useEffect } from "react";
import { CSVLink } from 'react-csv';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


import AuthService from "../services/auth.service";

const ReactCSV = (props) => {

    const data = [
        ["Aprašymas", "Data", "Kategorija", "Kiekis"],
        // [expense.expenseName, expense.date, expense.expensesCategory.name, expense.amount]
        
    ];
    const currentUser = AuthService.getCurrentUser();
    const [allExpense2, setAllExpense2] = useState([]);
  // Sums user's expense
  const expenseSum = allExpense2.reduce((n, { amount }) => n + amount, 0);
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `http://localhost:8080/api/expense/user/${currentUser.id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${currentUser.accessToken}`,
          },
        }
      );
      const data = await response.json();
      setAllExpense2(data);
      console.log(data);
    };
    
    fetchData();
  }, []);


    return (
        <div>
            <CSVLink
                data={props.allExpenses}
                filename={"Išlaidos"}
                target="_blank"
                style={{ color: "white" }}
            >
                Atsisiųsti išlaidas <FontAwesomeIcon icon="download" style={{ paddingBottom: 2.5 }} />
            </CSVLink>
        </div>
    )
};

export default ReactCSV;