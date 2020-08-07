import React from "react"; 
import { render, fireEvent, waitFor, waitForElementToBeRemoved } from "@testing-library/react";
import userEvent from '@testing-library/user-event';
import App from "../App";

import Episodes from "../components/Episodes";
import { fetchShow as mockFetchShow } from "../api/fetchShow";



jest.mock('../api/fetchShow');
// console.log(mockFetchShow);



test("succesfully fetches show data and renders data from api", async () => {
    const showData = {
        data: {
            name: "test1",
            image: { medium: "test1", original: "test1"},
            summary: "this is test 1",
            _embedded: { episodes: [{season: 1}, { season : 2 }] },
        },
    };
    mockFetchShow.mockResolvedValueOnce(showData);
    //render app = shows Get Data Button


    const { getByText } = render(<App/>);

    await waitForElementToBeRemoved(() => getByText(/fetching/i));
});



test("Episodes receives data and renders episodes", async () => {
    const showData = {
        data: {
            name: "test1",
            image: { medium: "test1", original: "test1"},
            summary: "this is test summary 1",
            _embedded: {
                episodes: [
                    {season:1, id:1},
                    {season:2, id:2},
                ],
            },
        },
    }

    mockFetchShow.mockResolvedValueOnce(showData);
    const { getAllByTestId } = render(
        <Episodes episodes={showData.data._embedded.episodes}/>
    );
    
    await (await waitFor(() => expect(getAllByTestId(/episodes/i)))).toHaveLength(2);
});
