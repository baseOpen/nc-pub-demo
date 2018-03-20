import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { createPage, ajax, base,high } from 'nc-lightapp-front';
const { NCFormControl, NCButton, NCModal } = base;
//import { createPage } from '../../../src';
//import { NCFormControl, NCButton, NCModal } from '../../../src/base';
import { initTemplate, afterEvent, buttonClick } from './events';
//import { high } from '../../../src';
const { Refer } = high;
import './index.less';

class OrderCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            materiels: []
        }
        this.status = this.getStatus();
        this.id = this.getPageParam('id');
    }

    componentDidMount() {
        this.props.setPageStatus(this.status, this.id);
        this.togglePageShow();
        setTimeout(() => {
            if(this.status!=='add'){
                //设置表单默认数据


                //this.props.form.setAllFormValue(formDataObj);

                //设置表格数据
                let cardTable = {
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
                                materiel: { value: '4354', display: "1111", scale: -1 },
                                specification: { value: '1-1-1', display: '46565676', scale: -1 },
                                model: { value: '3465', display: '北京市海淀区第一仓库', scale: -1 },
                                batchno: { value: '121323', display: '张三', scale: -1 },
                                huoquan: { value: '435', display: '用友网络', scale: -1 },
                                useorgan: { value: '2354', display: '北京市用友产业园中区', scale: -1 },
                                shouldnum: { value: '100', display: null, scale: -1 },
                                actualnum: { value: '23', display: null, scale: -1 },
                                shouldunit: { value: '0', display: '箱', scale: -1 },
                                actualunit: { value: '0', display: '箱', scale: -1 }
                            }
                        }, {
                            rowId: 1,
                            values: {
                                id: { value: "2", display: null, scale: -1 },
                                materiel: { value: "2222", display: 'wewre4t', scale: -1 },
                                specification: { value: '2-2-2', display: '54365876', scale: -1 },
                                model: { value: '454', display: '北京市海淀区第二仓库', scale: -1 },
                                batchno: { value: '6765', display: '李si', scale: -1 },
                                huoquan: { value: '89989', display: '用友网络', scale: -1 },
                                useorgan: { value: '12323', display: '北京市用友产业园中区', scale: -1 },
                                shouldnum: { value: '122', display: null, scale: -1 },
                                actualnum: { value: '11', display: null, scale: -1 },
                                shouldunit: { value: '1', display: '台', scale: -1 },
                                actualunit: { value: '1', display: '台', scale: -1 }
                            }
                        }, {
                            rowId: 2,
                            values: {
                                id: { value: "3", display: null, scale: -1 },
                                materiel: { value: "3333", display: '432546', scale: -1 },
                                specification: { value: '3-3-3-', display: '213254', scale: -1 },
                                model: { value: '33333', display: '北京市海淀区第三仓库', scale: -1 },
                                batchno: { value: '55555', display: 'werwr', scale: -1 },
                                huoquan: { value: '12131', display: '用友网络', scale: -1 },
                                useorgan: { value: '898976', display: '北京市用友产业园中区', scale: -1 },
                                shouldnum: { value: '100', display: null, scale: -1 },
                                actualnum: { value: '12', display: null, scale: -1 },
                                shouldunit: { value: '2', display: '个', scale: -1 },
                                actualunit: { value: '2', display: '个', scale: -1 }
                            }
                        },
                    ]
                }
                this.props.editTable.setTableData("purchaseOrderCardTable", cardTable);
            }
        }, 100)
    }

    componentWillReceiveProps(nextProps) {
        let newStatus = this.getStatus();
        if (newStatus != this.status) {
            this.status = newStatus;
            this.id = this.getPageParam('id');
            this.props.setPageStatus(this.status, this.id);
            this.togglePageShow();
        }
    }

    //根据页面状态，修改编辑态表格
    togglePageShow = () => {
        if (this.status != 'browse') {
            //表格改为编辑态
            this.props.editTable.edit('purchaseOrderCardTable');
            //显示操作列
            this.props.editTable.showColByKey('purchaseOrderCardTable', 'opr');
        } else {
            //表格改为浏览态
            this.props.editTable.setStatus('purchaseOrderCardTable', 'browse');
            //隐藏操作列
            this.props.editTable.hideColByKey('purchaseOrderCardTable', 'opr');
        }
    }

    //获取url的status
    getStatus = () => {
        return window.location.href.split('?')[1].split("&")[0].split("=")[1];
    }

    //获取指定url参数
    getPageParam = (id) => {
        let param = window.location.href.split('&');
        param.shift();
        let result;
        param.find((item) => {
            if (item.indexOf(id) != -1) {
                result = item.split('=')[1];
            }
        })
        return result;
    }

    //物料参照弹窗
    addTableRows = (value) => {
        this.setState({
            materiels:value
        })
        //根据选择的参照，新增表格行


        //新增完以后设置字段的默认值
        /* 所有组织:
                非空；
                自制，默认为库存组织，可编辑，参照范围受库存组织+仓库的代储组织限制；
                根据来源单据带入，不可编辑；
        */
        //this.props.editTable.setValByKey('purchaseOrderCardTable', index, 'useorgan', value);

        //设置表格某个字段的编辑性


    }

    //表格列求和
    addTableCol = (key) => {
        let data = this.props.editTable.getColValue('purchaseOrderCardTable', key);
        if (data) {
            data = data.value;

            if (data && data.length > 0) {
                let sum = 0;
                data.forEach(function (val, idx, arr) {
                    if(val.trim()!=='-'){
                        sum += +val;
                    }                 
                }, 0);
                return sum;
            }
        }
        return 0;
    }

    render() {
        const { editTable, form, button } = this.props;
        const { createForm, createFourColForm } = form;
        const { createEditTable } = editTable;
        const { createButton } = button;

        return (
            <div className="purchaseOrder-card-wrapper">
                <div className="purchaseOrder-card-header">
                    <h2>采购入库单</h2>
                    {this.props.getPageStatus() === 'browse' ? (
                        <span>
                            {createButton('editButton', { name: '修改', className: "card-btn card-edit", onButtonClick: buttonClick.bind(this) })}
                            {createButton('copyButton', { name: '复制', className: "card-btn", onButtonClick: buttonClick.bind(this) })}
                            {createButton('deleteButton', { name: '删除', className: "card-btn", onButtonClick: buttonClick.bind(this) })}
                        </span>) : (
                            <span>
                                {createButton('saveButton', { name: '保存', className: "card-btn card-add", onButtonClick: buttonClick.bind(this) })}
                                {createButton('cancelButton', { name: '取消', className: "card-btn", onButtonClick: buttonClick.bind(this) })}
                            </span>)}
                    {createButton('backButton', { name: '返回', className: "card-btn", onButtonClick: buttonClick.bind(this) })}
                </div>
                <div className="purchaseOrder-card-form">
                    <div className="four-form-wrapper">
                        <label className="four-form-label">库管信息</label>
                        <div className="four-form-container">{createFourColForm('purchaseOrderCardForm1', {
                            onAfterEvent: afterEvent
                        })}</div>
                    </div>
                    <div className="four-form-wrapper">
                        <label className="four-form-label">采购信息</label>
                        <div className="four-form-container">{createFourColForm('purchaseOrderCardForm2', {
                            onAfterEvent: afterEvent
                        })}</div>
                    </div>
                    {createForm('purchaseOrderCardForm3', {
                        onAfterEvent: afterEvent
                    })}
                </div>
                <div className="purchaseOrder-card-editTable">
                    <div className="editTable-title">
                        <div className="title-info">
                            <h3>物料列表</h3>
                            <MaterielRefer
                                value={this.state.materiels}
                                onChange={(value) => {
                                    this.addTableRows(value);
                                }}
                                placeholder="多选树表"
                                refType="gridTree"
                                isMultiSelectedEnabled={true}
                                clickContainer={<NCButton className="table-btn table-add">新增</NCButton>}
                            />
                            {createButton('getNumButton', { name: '自动取数', className: "table-btn table-getNum", onButtonClick: buttonClick.bind(this) })}
                        </div>
                        <div className="sum-info">
                            <span>应收数量合计：{this.addTableCol('shouldnum')}</span>
                            <span>实收数量合计：<span style={{ 'color': '#F6720F' }}>{this.addTableCol('actualnum')}</span></span>
                        </div>
                    </div>
                    {createEditTable('purchaseOrderCardTable', {
                        onAfterEvent: afterEvent
                    })}
                </div>
            </div>
        )
    }
}

class MaterielRefer extends Component {
    render() {
        return (
            <Refer
                {...this.props}
                refCode={'materiel'}
            //queryGridUrl={'/newdemo-web/demo/matrial/matrialtree'}
            //queryTreeUrl={'/newdemo-web/demo/matrialclass/matrialclasstree'}
            />
        );
    }
}

export default createPage({
    //模板
    initTemplate: initTemplate,
    // 编辑后事件
    //onAfterEvent: afterEvent,
    // 按钮点击事件
    //onButtonClick: buttonClick,
})(OrderCard);