import React from 'react';
import App from './App';
import {shallow} from 'enzyme'

/*it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});*/
describe("Smoke test Main App", () => {
  it('renders without crashing', () => {
    shallow(<App />);
  });
})

