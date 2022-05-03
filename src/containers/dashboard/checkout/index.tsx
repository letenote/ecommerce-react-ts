import React from "react";
import { TestId } from "../../../constant/TestId";

const DashboardCheckout: React.FC<{}> = () => {

  return (
    <div className="relative bg-white overflow-hidden">
      <div data-testid={TestId.containers.checkout.id} style={{ display: "none" }}>{TestId.containers.checkout.value}</div>
      <div className="pt-8 pb-15 sm:pt-8 sm:pb-15 lg:pt-8 lg:pb-15">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 sm:static">
          DashboardCheckout
        </div>
      </div>
    </div>
  )
};

export default DashboardCheckout;

// import React from 'react';
// import axios from 'axios';
// import { waitFor } from '@testing-library/dom';
// import { render } from "../../../test-utils";
// import DashboardCheckout from './index'
// import { BrowserRouter } from 'react-router-dom';

// jest.mock('axios');
// beforeEach(() => {
//   jest.clearAllMocks()
// })

// test('show name', async () => {
//   jest.spyOn(axios, 'get').mockResolvedValue({
//     data: {
//       title: 'delectus aut autem'
//     }
//   })
//   const wrapper = render(
//     <BrowserRouter>
//       <DashboardCheckout />
//     </BrowserRouter>
//   );
//   await waitFor(() => expect(wrapper.queryAllByText('delectus aut autem')).toHaveLength(1));
// });

// test('show name error', async () => {
//   jest.spyOn(axios, 'get').mockRejectedValue(() => ({}));
//   const wrapper = render(
//     <BrowserRouter>
//       <DashboardCheckout />
//     </BrowserRouter>
//   );
//   await waitFor(() => expect(wrapper.queryByText("error")).toBeInTheDocument());
// });