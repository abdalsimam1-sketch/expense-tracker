import { useExpenses } from "../hooks/useExpenses";
import { StatCard } from "../components/StatCard";
import { useFilter } from "../hooks/useFilter";

import { AddEditModal } from "../components/AddEditModal";

export const Home = () => {
  const { filter, selectFilter, filtersArray, FILTERS } = useFilter();

  const {
    stats,
    expenses,
    addModalOpen,
    toggleAddModal,
    addExpenseForm,
    setAddExpenseForm,
    MODES,
    toggleEditModal,
    selectedExpense,
    openEditModal,
    closeEditModal,
  } = useExpenses();

  return (
    <div className="container d-flex flex-column gap-4 pb-5">
      <header className="d-flex justify-content-between mt-5">
        <h2>My Expenses</h2>
        <div className="position-relative">
          <button
            className="btn btn-secondary text-nowrap "
            onClick={toggleAddModal}
          >
            Add New Expense
          </button>
          {addModalOpen && (
            <AddEditModal
              mode={MODES.ADD}
              toggleAddModal={toggleAddModal}
              addExpenseForm={addExpenseForm}
              setAddExpenseForm={setAddExpenseForm}
            ></AddEditModal>
          )}
        </div>
      </header>

      <section className="stats-section row g-3">
        {stats.map((stat) => (
          <div key={stat.label} className="col-12 col-md-4">
            <StatCard stat={stat}></StatCard>
          </div>
        ))}
      </section>

      <section className="filters-section row g-3">
        {filtersArray.map((item) => (
          <div className="col-auto" key={item.label}>
            <button
              className={`btn btn-secondary ${filter === item.value ? "active-filter" : ""}`}
              onClick={() => selectFilter(item.value)}
            >
              {item.label}
            </button>
          </div>
        ))}
      </section>

      <section className="expenses-section row g-3">
        {expenses.map((item) => (
          <div key={item.expense_id}>
            <div className="card p-3 d-flex justify-content-between align-items-center flex-row">
              <div className="d-flex flex-column">
                <span>{item.description}</span>
                <div>
                  <span>{item.category}</span>
                  <span> . {item.expense_date}</span>
                </div>
              </div>
              <div className="d-flex gap-3 align-items-center ">
                <span>{item.amount}</span>
                <div className="position-relative">
                  <i
                    className="bi bi-pencil-square btn"
                    onClick={() => openEditModal(item)}
                  ></i>
                  {selectedExpense?.expense_id === item.expense_id && (
                    <div>
                      <AddEditModal
                        mode={MODES.EDIT}
                        addExpenseForm={addExpenseForm}
                        setAddExpenseForm={setAddExpenseForm}
                        closeEditModal={closeEditModal}
                      ></AddEditModal>
                    </div>
                  )}
                </div>
                <i className="bi bi-trash btn"></i>
              </div>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};
