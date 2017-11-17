import React from 'react';
import { shallow } from 'enzyme';

import { TopNav } from './top-nav';
import { NEW_GAME, toggleInfoModal } from '../actions';

describe('<TopNav />', () => {
    it('Renders without crashing', () => {
        shallow(<TopNav />);
    });

    it('Should call onNewGame when new game is clicked', () => {
        const dispatch = jest.fn();
        const wrapper = shallow(<TopNav dispatch={dispatch} />);
        const link = wrapper.find('.new');
        link.simulate('click', {
            preventDefault() { }
        });
        const arg = dispatch.mock.calls[0][0];
        expect(arg.type).toEqual(NEW_GAME);
    });

    it('Should toggle modal when info is clicked', () => {
        const dispatch = jest.fn();
        const wrapper = shallow(<TopNav dispatch={dispatch} />);
        const link = wrapper.find('.what');
        link.simulate('click', {
            preventDefault() { }
        });
        expect(dispatch).toHaveBeenCalled();
        const arg = dispatch.mock.calls[0][0];
        expect(arg).toEqual(toggleInfoModal());
    });
});