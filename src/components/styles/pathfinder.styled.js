import styled from "styled-components";

/*
This file contains all the necessary styled components for the visualiser (except for global styles).
*/

export const StyledGrid = styled.section`
    height: 640px;
    width: 800px;
    display: grid;
    grid-template-rows: repeat(${({ numRows }) => numRows}, 1fr);
    grid-template-columns: repeat(${({ numCols }) => numCols}, 1fr);

    border-bottom: 1px solid black;
    border-left: 1px solid black;

    .cell {
        border-top: 1px solid black;
        border-right: 1px solid black;
    }

    .wall {
        background-color: black;
    }
`