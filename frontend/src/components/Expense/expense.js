import React from "react";
import styled from "styled-components";
import { InnerLayout } from "../../styles/Layouts";

function Expense() {
  return (
    <ExpenseStyled>
      <InnerLayout></InnerLayout>
    </ExpenseStyled>
  );
}

const ExpenseStyled = styled.div``;

export default Expense;
