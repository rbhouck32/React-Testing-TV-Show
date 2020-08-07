import React from "react"; 
import { render, fireEvent, getByRole, waitFor } from "@testing-library/react";
import userEvent from '@testing-library/user-event';
import App from "../App";
import { showData } from "../data"


import { fetchShow as mockFetchShow } from "../api/fetchShow"



jest.mock('../api/fetchShow');
// console.log(mockFetchShow);



test("succesfully renders data from api", async () => {
    mockFetchShow.mockResolvedValueOnce(showData);
    //render app = shows Get Data Button

    const { getByRole, findByText, getAllByTestId } = render(<App/>)
})
