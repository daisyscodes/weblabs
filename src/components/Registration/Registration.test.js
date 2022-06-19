import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import Input from "react-validation/build/input";
import Registration from './registration';

describe('<Login>', () => {
    it('has a Sing Up button', () => {
        const wrapper = shallow(<Registration/>);
        expect(wrapper.containsMatchingElement(<button>Sign Up</button>)).to.be.true;
    });

    it('has a email input field', () => {
        const wrapper = shallow(<Registration/>);
        let t = new Input();
        t.name = "username"
        expect(wrapper.containsMatchingElement(t)).to.be.true;
    });

    it('has a password input field', () => {
        const wrapper = shallow(<Registration/>);
        let t = new Input();
        t.name = "password"
        expect(wrapper.containsMatchingElement(t)).to.be.true;
    });
});
