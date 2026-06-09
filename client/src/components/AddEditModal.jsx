import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export const AddEditModal = ({
  toggleAddModal,
  addExpenseForm,
  mode,
  setAddExpenseForm,
  closeEditModal,
  handleCreate,
  handleEdit,
  selectedExpense,
  error,
}) => {
  return (
    <div
      className={`position-absolute bg-light rounded p-4 z-1 add-expense-modal`}
    >
      <header className="d-flex gap-3 align-items-center">
        <button
          className="bi bi-arrow-left-short fs-3 btn m-0"
          onClick={() => {
            {
              mode === "add" ? toggleAddModal() : closeEditModal();
            }
          }}
        ></button>
        {mode === "add" ? <span>Add Expense</span> : <span>Edit Expense</span>}
      </header>

      <section>
        <form
          className="d-flex flex-column gap-3"
          onSubmit={(e) => {
            e.preventDefault();
            if (mode === "add") {
              handleCreate(addExpenseForm);
            } else if (mode === "edit") {
              handleEdit(selectedExpense.expense_id, addExpenseForm);
            }
          }}
        >
          <div>
            <label htmlFor="description">Description</label>
            <input
              value={addExpenseForm.description}
              onChange={(e) =>
                setAddExpenseForm((current) => ({
                  ...current,
                  description: e.target.value,
                }))
              }
              type="text"
              id="description"
              className="form-control"
            />
          </div>
          <div>
            <label htmlFor="amount">Amount</label>
            <input
              type="number"
              id="amount"
              className="form-control"
              value={addExpenseForm.amount}
              onChange={(e) =>
                setAddExpenseForm((current) => ({
                  ...current,
                  amount: e.target.value,
                }))
              }
            />
          </div>
          <div>
            <select
              className="form-control"
              value={addExpenseForm.category}
              onChange={(e) =>
                setAddExpenseForm((current) => ({
                  ...current,
                  category: e.target.value,
                }))
              }
            >
              <option value="">Select Category</option>
              <option value="groceries">Gocereies</option>{" "}
              <option value="leisure">Leisure</option>{" "}
              <option value="electronics">Electronics</option>{" "}
              <option value="utilities">Utilities</option>
              <option value="clothing">Clothing</option>
              <option value="health">Health</option>
              <option value="others">Others</option>
            </select>
          </div>
          <DatePicker
            showYearDropdown
            showMonthDropdown
            dropdownMode="select"
            className="w-100 form-control"
            placeholderText="mm/dd/yyyy"
            selected={addExpenseForm.expense_date}
            onChange={(date) =>
              setAddExpenseForm((current) => ({
                ...current,
                expense_date: date,
              }))
            }
          ></DatePicker>
          <button className="btn btn-secondary">Save Expense</button>
        </form>
        {error && <span className="text-danger text-center">{error}</span>}
      </section>
    </div>
  );
};
