
//依赖组件
import React from "react";
import {Breadcrumb, Table} from 'antd';
import {connect} from 'react-redux';
import {RouteComponentProps} from 'react-router-dom';

//引入自定义组件
import {CounterDisplay} from '../../components/CounterDisplay/';
import {CounterControl} from '../../components/CounterControl/';

//dispatch action
import {
    increment,
    decrement,
    initment,
    requestData
} from './actions';

import {
    dataSelector,
    countSelector
} from './selectors';

//import css
import style from './style.scss';


// properties directed pass in throw react tag
interface Team1OwnProps extends RouteComponentProps<any> {
}

// properties from redux store
interface Team1StateProps {
    //    dispatch?: any,
    counter?: number,
    data?: any;
}

// dispatch functions from redux store
interface Team1DispatchProps {
    counterPlusOne?: Function,
    counterMinusOne?: Function,
    counterInit?: Function,
    getData?: Function
}

// component own properties
interface Team1State {
    name?: string,
    age?: number,
    from?: string
}

@(connect<Team1StateProps, Team1DispatchProps & Team1OwnProps, Team1State>(
    (state: any) => (
        {
            data: dataSelector(state),
            counter: countSelector(state)
//            data: state.team1Reducer.getData,
//            counter: state.team1Reducer.count as number
        }
    ),
    (dispatch: any) => (
        {
            //计数器+
            counterPlusOne: () => {
                console.log("call from 'mapDispatchToProps'");
                dispatch(increment(1));
            },
            //计数器-
            counterMinusOne: () => {
                console.log("call from 'mapDispatchToProps'");
                dispatch(decrement(1));
            },
            //初始化计数器
            counterInit: () => {
                dispatch(initment(0));
            },
            //获取数据
            getData: () => {
                dispatch(requestData());
            }
        }
    )
) as any)

export default class Team1 extends React.Component<Team1StateProps & Team1DispatchProps & Team1OwnProps, Team1State> {

    constructor(props: Team1StateProps & Team1DispatchProps & Team1OwnProps) {
        super(props);
        console.log("Team1 constructor");

        this.counterInit = this.counterInit.bind(this);
        this.changeState = this.changeState.bind(this);
        this.initTable = this.initTable.bind(this);

        this.state = {
            name: 'react',
            age: 3,
            from: 'USA'

        };
        //获取接口数据
        this.props.getData();
    }
    // 设置默认的props，也可以用dufaultProps设置组件的默认属性。
    //    getDefaultProps() {
    //        console.log("Team1 component getDefaultProps");
    //    }
    // 在使用es6的class语法时是没有这个钩子函数的，可以直接在constructor中定义this.state。此时可以访问this.props。
    //    getInitialState() {
    //        console.log("Team1 component getInitialState");
    //    }
    // Team1组件初始化时调用，以后组件更新不调用，整个生命周期只调用一次，此时可以修改state
    componentWillMount() {
        console.log("Team1 component componentWillMount");
    }
    // 组件渲染之后调用，可以通过this.getDOMNode()获取和操作dom节点，只调用一次
    componentDidMount() {
        console.log("Team1 component componentDidMount");
        document.getElementById('content_display_area').style.height = ((document.getElementsByClassName('ant-layout-content')[0] as HTMLElement).offsetHeight - 42).toString() + "px";
    }
    // 组件初始化时不调用，组件接受新的props时调用。
    componentWillReceiveProps(nextProps: any) {
        console.log("Team1 component componentWillReceivePorps");
    }
    /*
     * react性能优化非常重要的一环。组件接受新的state或者props时调用，我们可以设置在此对比前后两个props和state是否相同，
     * 如果相同则返回false阻止更新，因为相同的属性状态一定会生成相同的dom树，这样就不需要创造新的dom树和旧的dom树进行diff算法对比，
     * 节省大量性能，尤其是在dom结构复杂的时候。不过调用this.forceUpdate会跳过此步骤。
     */
    //组件接受新的state或者props时调用
    shouldComponentUpdate(nextProps: any, nextState: any) {
        console.log("Team1 component shouldComponentUpdate");
        //        if(typeof nextProps.data.name === "undefined"){
        //            return false;
        //        }
//        console.log("dom改变了刷新");
//        return true;
        // 短路运算  &&->一false短路,||->一true短路
        debugger;
        if (this.props.counter !== nextProps.counter || this.state.name !== nextState.name) {
            console.log("dom改变了刷新");
            return true;
        }
        else {
            console.log("dom没改变不刷新");
            return false;
        }
    }
    // 组件初始化时不调用，只有在组件将要更新时才调用，此时可以修改state
    componentWillUpdate(nextProps: any, nextState: any) {
        console.log("Team1 component componentWillUpdate");
    }
    // 组件初始化时不调用，组件更新完成后调用，此时可以获取dom节点。
    componentDidUpdate() {
        console.log("Team1 component componentDidUpdate");
    }
    // 组件将要卸载时调用，一些事件监听和定时器需要在此时清除。
    componentWillUnmount() {
        console.log("Team1 component componentWillUnmount");
    }

    //初始化计时器方法
    counterInit() {
        this.props.counterInit();
    }

    //改变state
    changeState() {
        this.setState({
            name: '改变state'
        });
    }

    //初始化table
    initTable() {
        const columns = [
            {
                title: '姓名',
                dataIndex: 'name',
                key: 'name',
            }, {
                title: '日期',
                dataIndex: 'data',
                key: 'data',
            }, {
                title: '事件',
                dataIndex: 'event',
                key: 'event',
            }
        ];
        return columns;
    }

    render() {
        //react最重要的步骤，创建虚拟dom，进行diff算法，更新dom树都在此进行。此时就不能更改state了
        const {counter, counterPlusOne, counterMinusOne, data} = this.props;
        console.log("Team1 render");
        return (
            <div id={style.team1}>
                <Breadcrumb className={style.header}>
                    <Breadcrumb.Item>Team</Breadcrumb.Item>
                    <Breadcrumb.Item>Team 1</Breadcrumb.Item>
                </Breadcrumb>
                <div className={style.content1} id="content_display_area">
                    <CounterDisplay counter={counter} />
                    <CounterControl onPlusClick={counterPlusOne} onMinusClick={counterMinusOne} />
                    <div className={style.initCount} onClick={this.counterInit}>重置计数器</div>
                    <div className={style.initCount} onClick={this.changeState}>{this.state.name}</div>
                    {
                        typeof data.information !== 'undefined'
                        &&
                        <div className={style.table}>
                            <div>{data.information[0]}</div>
                        </div>
                    }
                </div>
            </div>

        );
        //        }

    }
}
