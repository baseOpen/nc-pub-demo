
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import classnames from 'classnames';
import { createPage, ajax, base } from 'nc-lightapp-front';
const { NCDatePicker, NCButton } = base;
//import { createPage } from '../../../src';
//import { NCDatePicker, NCButton } from '../../../src/base';
import { searchBtnClick, pageInfoClick, initTemplate } from './events';
import './index.less';


class OrderList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeKey: 0,
            showSearch: false,
            orderdateVal: ''
        }
        this.tabs = ['处理中', '待签字', '已签字', '全部'];
    }

    componentDidMount() {
        setTimeout(() => {
            let listTable = {
                pageinfo: {
                    number: 0,
                    size: 10,
                    totalElements: 3,
                    totalPages: 1
                },
                rows: [
                    {
                        rowId: 0,
                        values: {
                            id: { value: "1", display: null, scale: -1 },
                            ordercode: { value: "0222333", display: null, scale: -1 },
                            orderdate: { value: '2018-2-10', display: null, scale: -1 },
                            store: { value: '北京市海淀区第一仓库', display: null, scale: -1 },
                            buyer: { value: '张三', display: null, scale: -1 },
                            purchasedepartment: { value: '用友网络', display: null, scale: -1 },
                            purchaseorg: { value: '北京市用友产业园中区', display: null, scale: -1 },
                            supplier: { value: '北京市蓝蓝科技公司', display: null, scale: -1 },
                            orderstatus: { value: '自由', display: null, scale: -1 }
                        }
                    }, {
                        rowId: 1,
                        values: {
                            id: { value: "2", display: null, scale: -1 },
                            ordercode: { value: "0222324323", display: null, scale: -1 },
                            orderdate: { value: '2018-2-26', display: null, scale: -1 },
                            store: { value: '北京市海淀区第二仓库', display: null, scale: -1 },
                            buyer: { value: '张四', display: null, scale: -1 },
                            purchasedepartment: { value: '用友能源', display: null, scale: -1 },
                            purchaseorg: { value: '北京市用友产业园西区', display: null, scale: -1 },
                            supplier: { value: '北京市蓝蓝科技公司', display: null, scale: -1 },
                            orderstatus: { value: '已签字', display: null, scale: -1 }
                        }
                    }, {
                        rowId: 2,
                        values: {
                            id: { value: "3", display: null, scale: -1 },
                            ordercode: { value: "02243432323", display: null, scale: -1 },
                            orderdate: { value: '2018-2-27', display: null, scale: -1 },
                            store: { value: '北京市海淀区第三仓库', display: null, scale: -1 },
                            buyer: { value: '王五', display: null, scale: -1 },
                            purchasedepartment: { value: '用友医疗', display: null, scale: -1 },
                            purchaseorg: { value: '北京市用友产业园东区', display: null, scale: -1 },
                            supplier: { value: '北京市蓝蓝科技公司', display: null, scale: -1 },
                            orderstatus: { value: '未签字', display: null, scale: -1 }
                        }
                    },
                ]
            }
            this.props.table.setAllTableData("purchaseOrderListTable", listTable);

        }, 100)

    }

    changeTabClick = (index) => {
        if (this.state.activeKey != index) {
            this.setState({
                activeKey: index
            })
        }
        if (index == 3) {
            this.props.table.showColByKey('purchaseOrderListTable', 'orderstatus');
        } else {
            this.props.table.hideColByKey('purchaseOrderListTable', 'orderstatus');
        }
    }

    toggleShowSearch = (flag) => {
        if (this.state.showSearch != flag) {
            this.setState({
                showSearch: flag
            })
        }
    }

    changeOrderDate = (value) => {
        if (value != this.state.orderdateVal) {
            this.setState({
                orderdateVal: value
            })
        }
    }

    render() {
        console.log(this.state.orderdateVal)
        const { table, button, search } = this.props;
        const { createSimpleTable } = table;
        const { createButton } = button;
        const { NCCreateSearch } = search;
        const { activeKey, showSearch, orderdateVal } = this.state;
        return (
            <div className="purchaseOrder-list-wrapper">
                <div className="purchaseOrder-list-header">
                    <div className="title">
                        <h2 className="head">采购入库管理</h2>
                        <NCButton className="head-btn" onClick={() => {
                            window.location.hash = '/purchaseOrder/card?type=add';
                        }}>自制入库</NCButton>
                        <NCButton className="head-btn">到货入库</NCButton>
                    </div>
                    <div className="simple-search">
                        <NCDatePicker
                            className="condition"
                            placeholder='搜索单据日期'
                            value={orderdateVal}
                            onChange={this.changeOrderDate}
                        />
                        <span className="toggle-search" onClick={this.toggleShowSearch.bind(this, !showSearch)}>{showSearch ? "收起" : "高级"}</span>
                    </div>
                </div>
                {showSearch && <div className="purchaseOrder-list-searchArea">
                    {NCCreateSearch({
                        id: 'purchaseOrderSearchArea',
                        clickSearchBtn: searchBtnClick.bind(this)
                    })}
                </div>}
                <div className="purchaseOrder-list-simpleTable">
                    <ul className="table-tabs">
                        {this.tabs.map((item, index) => {
                            let tabClass = classnames({
                                'tab': true,
                                'active': activeKey === index
                            });
                            return (
                                <li
                                    className={tabClass}
                                    key={index}
                                    onClick={() => {
                                        this.changeTabClick(index)
                                    }}
                                >
                                    {item}
                                </li>
                            )
                        })}
                    </ul>
                    {createSimpleTable('purchaseOrderListTable', {
                        handlePageInfoChange: pageInfoClick.bind(this)
                    })}
                </div>
            </div>
        )
    }
}

export default createPage({
    //模板
    initTemplate: initTemplate,
    //分页点击事件
    //handlePageInfoChange: pageInfoClick
})(OrderList);