import { useExpenses } from "../hooks/useExpenses";
import { StatCard } from "../components/StatCard";
import { useFilter } from "../hooks/useFilter";
import { AddEditModal } from "../components/AddEditModal";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { formatDate } from "../util/formatDate";
import { formatCurrency } from "../util/formatCurrency";

export const Home = () => {
  const {
    filter,
    selectFilter,
    filtersArray,
    FILTERS,
    customRange,
    setCustomRange,
  } = useFilter();

  const {
    stats,
    expenses,
    addModalOpen,
    toggleAddModal,
    addExpenseForm,
    setAddExpenseForm,
    MODES,
    selectedExpense,
    openEditModal,
    closeEditModal,
    handleCreate,
    handleDelete,
    handleEdit,
    error,
    loading,
  } = useExpenses(filter, customRange);

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
              handleCreate={handleCreate}
              mode={MODES.ADD}
              toggleAddModal={toggleAddModal}
              addExpenseForm={addExpenseForm}
              setAddExpenseForm={setAddExpenseForm}
              error={error}
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

      <section className="filters-section row g-2">
        {filtersArray.map((item) => (
          <div className="col-4 col-md-auto" key={item.label}>
            <button
              className={`btn btn-secondary m-0 text-nowrap w-100 ${filter === item.value ? "active-filter" : ""}`}
              onClick={() => selectFilter(item.value)}
            >
              {item.label}
            </button>
          </div>
        ))}

        {filter === "custom" && (
          <section className="d-flex gap-5">
            <DatePicker
              placeholderText="Select start date"
              selected={customRange.startDate}
              showYearDropdown
              showMonthDropdown
              dropdownMode="select"
              onChange={(date) =>
                setCustomRange((current) => ({ ...current, startDate: date }))
              }
            ></DatePicker>
            <DatePicker
              placeholderText="Select end date"
              selected={customRange.endDate}
              showYearDropdown
              showMonthDropdown
              dropdownMode="select"
              onChange={(date) =>
                setCustomRange((current) => ({ ...current, endDate: date }))
              }
            ></DatePicker>
          </section>
        )}
      </section>

      <section className="expenses-section row g-3 fw-bold">
        {expenses.map((item) => (
          <div key={item.expense_id}>
            <div className="card">
              {loading ? (
                <div className="h-100 d-flex justify-content-center align-items-center">
                  <span className="spinner-border text-center mx-auto"></span>
                </div>
              ) : (
                <div className=" p-3 d-flex justify-content-between align-items-center flex-row">
                  <div className="d-flex flex-column text-capitalize ">
                    <span>{item.description}</span>
                    <div>
                      <span>{item.category}</span>
                      <span> . {formatDate(item.expense_date)}</span>
                    </div>
                  </div>
                  <div className="d-flex gap-3 align-items-center ">
                    <span className="text-danger">
                      {formatCurrency(item.amount)}
                    </span>
                    <div className="position-relative">
                      <i
                        className="bi bi-pencil-square btn"
                        onClick={() => openEditModal(item)}
                      ></i>
                      {selectedExpense?.expense_id === item.expense_id && (
                        <div>
                          <AddEditModal
                            selectedExpense={selectedExpense}
                            mode={MODES.EDIT}
                            addExpenseForm={addExpenseForm}
                            setAddExpenseForm={setAddExpenseForm}
                            closeEditModal={closeEditModal}
                            handleEdit={handleEdit}
                          ></AddEditModal>
                        </div>
                      )}
                    </div>
                    <i
                      className="bi bi-trash btn"
                      onClick={() => handleDelete(item.expense_id)}
                    ></i>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};
