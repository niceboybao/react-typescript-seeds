import React from 'react';
import createReducer from '../reducers';

interface BundleProps { load: Promise<any>, props?: any, children?: any }

interface BundleState { module: { component: React.ComponentClass<any>|string, props?: any, children?: any } }

export default class Bundle extends React.Component<BundleProps, BundleState> {

    constructor(props: BundleProps) {
        super(props);
    }

    componentWillMount() {
        this.load(this.props)
    }

    componentWillReceiveProps(nextProps: BundleProps) {
        if (nextProps.load !== this.props.load) {
            this.load(nextProps)
        }
    }

    load(props: BundleProps) {
        // render loading placeholder
        this.setState({
            module: {
                component: "div",
                children: "Loading..."
            }
        })
        props.load.then(([component, reducers, sagas]) => {
            console.log("load success: component: " + component + ", reducers: " + reducers + ", sagas: " + sagas);
            // async inject reducers
            if( reducers != undefined) {
                let asyncReducers = window.asyncReducers;
                let store = window.store;
                asyncReducers[reducers.name] = reducers.default;
                store.replaceReducer(createReducer(asyncReducers));
            }
            // async inject sagas
            if(sagas != undefined) {
                window.sagaMiddleware.run(sagas.default);
            }
            // render component
            this.setState({
                module: {
                    component: component.default,
                    props: this.props.props,
                    children: this.props.children
                }
            });
        }).catch((error) => {
            // render error
            // console.log("error: " + error);
            this.setState({
                module: {
                    component: "div",
                    children: "error: " + error
                }
            })
        });
    }

    render() {
        return React.createElement(this.state.module.component as React.ComponentClass<any>, this.state.module.props, this.state.module.children);
    }
}
