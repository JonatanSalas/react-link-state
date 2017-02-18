import React from 'react';

const mapValuesToDefaultState = (defaultState, item) => {
    if (typeof item === 'string') {
        defaultState[item] = '';
    }

    if (typeof item === 'object') {
        const { key, value } = item;
        defaultState[key] = value;
    }
}

const withLinkState = (state = []) => Component => {
    const defaultState = {};

    if (!Array.isArray(state)) {
        throw new Error('keys must be an Array of Strings/Objects!');
    }

    state.forEach(item => mapValuesToDefaultState(defaultState, item));

    class LinkStateComponent extends React.Component {
        state = defaultState;

        render() {
            return (
                <Component
                    getState={this.getState}
                    linkState={this.linkState}
                    getValue={this.getValue}
                    updateState={this.updateState}
                    {...this.props}
                />
            );
        }

        linkState = (key, callback) => ({
            value: this.state[key] || '',
            onChange: event => {
                let value = event.target.value;

                if (callback && typeof(callback) === 'function') {
                    const modifiedValue = callback(event.target.value);
                    value = modifiedValue ? modifiedValue : value;
                }

                this.updateState({
                    [key]: value
                });
            }
        });

        getState = () => this.state;

        getValue = key => this.state[key] || '';

        updateState = (object, callback = undefined) => this.setState(object, callback);
    }

    return LinkStateComponent;
};

export default withLinkState;