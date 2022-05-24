package lt.vtmc.pbaa.services;

import lt.vtmc.pbaa.models.Expense;
import lt.vtmc.pbaa.models.ExpenseLimit;
import lt.vtmc.pbaa.models.ExpenseUnitStatistic;
import lt.vtmc.pbaa.models.Income;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class StatisticsService {

    private final ExpenseService expenseService;
    private final ExpenseLimitService expenseLimitService;
    private final IncomeService incomeService;

    @Autowired
    public StatisticsService(ExpenseService expenseService, ExpenseLimitService expenseLimitService, IncomeService incomeService) {
        this.expenseService = expenseService;
        this.expenseLimitService = expenseLimitService;
        this.incomeService = incomeService;
    }


    public List<ExpenseUnitStatistic> getAllExpenseStatisticByUser(Long id) {
        List<Expense> allExpenses = expenseService.getAllExpenseByUser(id);
        List<Expense> thisMonthExpenses = allExpenses.stream().filter(expense -> !expense.getDate().isBefore(LocalDate.of(LocalDate.now().getYear(), LocalDate.now().getMonth(), 1))).collect(Collectors.toList());
        List<ExpenseLimit> limits = expenseLimitService.getAllExpenseLimitsByUser(id);
        List<ExpenseUnitStatistic> expenseUnitStatisticList = new ArrayList<>();
        for (ExpenseLimit limit : limits) {
            BigDecimal sumOfExpenseCategory = thisMonthExpenses.stream().filter(expense -> expense.getExpensesCategory().equals(limit.getExpensesCategory())).map(expense -> expense.getAmount()).reduce(BigDecimal.ZERO, BigDecimal::add);
            expenseUnitStatisticList.add(new ExpenseUnitStatistic(limit.getExpensesCategory(), sumOfExpenseCategory, limit.getAmount()));
        }
    return expenseUnitStatisticList;
    }

    public Map<String, Integer> getAllIncomeStatisticByUser(Long id) {
        List<Income> allIncomes = incomeService.getAllIncomeByUser(id);
        List<Income> thisMonthIncomes = allIncomes.stream().filter(expense -> !expense.getDate().isBefore(LocalDate.of(LocalDate.now().getYear(), LocalDate.now().getMonth(), 1))).collect(Collectors.toList());
        return thisMonthIncomes.stream().collect(
                Collectors.toMap(
                        income -> income.getIncomeName(),
                        income -> income.getAmount().intValue(),
                        Integer::sum
                )
        );
    }

}
