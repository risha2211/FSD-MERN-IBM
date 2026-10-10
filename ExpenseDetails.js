import React, { useState } from 'react';
import { Table, Button } from 'react-bootstrap';
import { useExpenseModal } from '../context/ExpenseModalContext';
import { useAppContext } from '../context/AppContext';
import DeleteConfirmationModal from './DeleteConfirmationModal';

function ExpenseDetails({ data = [] }) {
console.log(data?.length);
  const { handleShow } = useExpenseModal();
  const { setExpenseIdToBeDeleted } = useAppContext();

  const [showDM, setShowDM] = useState(false);

  const handleDMClose = () => {
    setShowDM(false);
  };

  const handleDeleteClick = (expense) => {
    if (setExpenseIdToBeDeleted) {
      setExpenseIdToBeDeleted(expense._id);
    }

    setShowDM(true);
  };

  const handleDelete = () => {
    // Deletion is not implemented in this capstone task.
    handleDMClose();
  };

  const formatDate = (date) => {
    if (!date) return '';

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return date;
    }

    return parsedDate.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      weekday: 'short',
    });
  };

  return (
    <>
      <div className="col-md-6">
        <h5 className="mb-3">Expense Details</h5>

        <Table responsive hover>
          <thead>
            <tr>
              <th>DATE</th>
              <th>DESCRIPTION</th>
              <th>AMOUNT</th>
              <th>ACTIONS</th>
            </tr>
          </thead>

          <tbody>
            {data && data.length > 0 ? (
              data.map((expense) => (
                <tr key={expense._id}>
                  <td>{formatDate(expense.date)}</td>
                  <td>{expense.description}</td>
                  <td>${expense.amount}</td>

                  <td>
                    <Button
                      variant="link"
                      size="sm"
                      title="Edit expense"
                      onClick={() => handleShow('edit', expense)}
                    >
                      ✏️
                    </Button>

                    <Button
                      variant="link"
                      size="sm"
                      title="Delete expense"
                      onClick={() => handleDeleteClick(expense)}
                    >
                      🗑️
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center">
                  No expenses found.
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>

      <DeleteConfirmationModal
        showDM={showDM}
        handleDMClose={handleDMClose}
        handleDelete={handleDelete}
      />
    </>
  );
}

export default ExpenseDetails;