import React from 'react';
import { Col, Table } from 'react-bootstrap';

function ExpenseSummary({ data }) {
  return (
    <Col md={6}>
      <h5 className="text-center">Expense Summary</h5>

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>EXPENSE CATEGORY</th>
            <th>%</th>
          </tr>
        </thead>

        <tbody>
          {data && data.map((item, index) => (
            <tr key={index}>
              <td>{item.categoryName}</td>
              <td>{item.percentage}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Col>
  );
}

export default ExpenseSummary;