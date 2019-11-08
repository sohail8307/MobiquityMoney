import React from 'react';
import Add from './AddUser';
import {shallow} from 'enzyme'
import axios from 'axios'
import { exportAllDeclaration } from '@babel/types';

jest.mock('axios')

describe("Smoke test Add User component", () => {
  it('renders without crashing', () => {
    shallow(<Add />);
  });
});

describe('Add user form simulation', () => {
  let add;
  beforeEach(() => {
    add = shallow(<Add />);
  });

  it('Valid firstname', () => {
    add.find('input#firstname').simulate('change', {
      target: {
        name: 'firstname',
        value: 'firstname'
      }
    });
    expect(add.state('errFirstName')).toBe(false);
  });

  it('Invalid first name', () => {
    add.find('input#firstname').simulate('change', {
      target: {
        name: 'firstname',
        value: 'A'
      }
    });
    expect(add.state('errFirstName')).toBe(true);
  });

  it('Valid last name', () => {
    add.find('input#lastname').simulate('change', {
      target: {
        name: 'lastname',
        value: 'lastname'
      }
    });
    expect(add.state('errLastName')).toBe(false);
  });

  it('Invalid last name', () => {
    add.find('input#lastname').simulate('change', {
      target: {
        name: 'lastname',
        value: 'A'
      }
    });
    expect(add.state('errLastName')).toBe(true);
  });

  it('Valid age', () => {
    add.find('input#age').simulate('change', {
      target: {
        name: 'age',
        value: '19'
      }
    });
    expect(add.state('errAge')).toBe(false);
  });

  it('Invalid age', () => {
    add.find('input#age').simulate('change', {
      target: {
        name: 'age',
        value: '12'
      }
    });
    expect(add.state('errAge')).toBe(true);
  });

  it('Valid phone number', () => {
    add.find('input#ph').simulate('change', {
      target: {
        name: 'phoneNo',
        value: '1234567890'
      }
    });
    expect(add.state('errPh')).toBe(false);
  });

  it('Invalid phone number', () => {
    add.find('input#ph').simulate('change', {
      target: {
        name: 'phoneNo',
        value: '123456'
      }
    });
    expect(add.state('errPh')).toBe(true);
  });

  it('Valid email', () => {
    add.find('input#email').simulate('change', {
      target: {
        name: 'email',
        value: 'aaa@x.com'
      }
    });
    expect(add.state('errEmail')).toBe(false);
  });

  it('Invalid email', () => {
    add.find('input#email').simulate('change', {
      target: {
        name: 'email',
        value: 'aaa@x'
      }
    });
    expect(add.state('errEmail')).toBe(true);
  });

  it('Gender valid entry', () => {
    add.find('select#dropdown').simulate('change', {
      target: {
        name: 'gender',
        value: 'Male'
      }
    });
    expect(add.state('gender')).toEqual('Male');
  });

  it('House number valid entry', () => {
    add.find('input#Addrhouseno').simulate('change', {
      target: {
        name: 'houseNo',
        value: 'No.23'
      }
    });
    expect(add.state('houseNo')).toEqual('No.23');
  });

  it('House number valid entry', () => {
    add.find('input#Addrhousestreet').simulate('change', {
      target: {
        name: 'street',
        value: '11th Cross'
      }
    });
    expect(add.state('street')).toEqual('11th Cross');
  });

  it('Country and valid entry', () => {
    add.find('#Addrhousecountry').simulate('change', 'India');
    expect(add.state('country')).toEqual('India');

    add.find('#Addrhousestate').simulate('change', 'Karnataka');
    expect(add.state('region')).toEqual('Karnataka');
  });

  it('City valid entry', () => {
    add.find('input#city').simulate('change', {
      target: {
        name: 'city',
        value: 'Blore'
      }
    });
    expect(add.state('city')).toEqual('Blore');
  });

  it('Valid pin number', () => {
    add.find('input#pin').simulate('change', {
      target: {
        name: 'pincode',
        value: '123456'
      }
    });
    expect(add.state('errPin')).toBe(false);
  });

  it('Invalid pin number', () => {
    add.find('input#pin').simulate('change', {
      target: {
        name: 'pincode',
        value: '123'
      }
    });
    expect(add.state('errPin')).toBe(true);
  });

})