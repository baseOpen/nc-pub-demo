// import Ajax from '../../../../../src/api/ajax';
// import { NCPopconfirm } from '../../../../../src/base';
import { ajax,base} from 'nc-lightapp-front';
const {NCPopconfirm } = base;
export default function(props) {
	let meta = {
		purchaseOrderSearchArea: {
			moduleType: 'search',
			items: [
				{
					key: 'ordercode',
					label: '单据号',
					itemType: 'input'
				},
				{
					key: 'store',
					label: '仓库',
					itemType: 'refer'
				},
				{
					key: 'wuliname',
					label: '物料名称',
					itemType: 'refer'
				},
				{
					key: 'purchaseorg',
					label: '采购组织',
					itemType: 'refer'
				},
				{
					key: 'buyer',
					label: '采购员名称',
					itemType: 'refer'
				},
				{
					key: 'purchasedepartment',
					label: '采购部门名称',
					itemType: 'refer'
				},
				{
					key: 'supplier',
					label: '供应商名称',
					itemType: 'refer'
				},
				{
					key: 'purchaseback',
					label: '采购退库',
					itemType: 'radio',
					options:[
						{
							display: '全部',
							value: 0
						},
						{
							display: '是',
							value: 1
						},
						{
							display: '否',
							value: 2
						}
					]
				}
			]
		},
		purchaseOrderListTable: {
			moduleType: 'table',
			pagination: {
				pageSize: 10
			},
			columns: [
				{
					label: '单据编号',
					key: 'ordercode'
				},
				{
					label: '单据日期',
					key: 'orderdate'
				},
				{
					label: '仓库',
					key: 'store',
					width:250
				},
				{
					label: '采购员',
					key: 'buyer',
					showColumns: false,
				},{
					label: '采购部门',
					key: 'purchasedepartment',
					showColumns: false,
				},{
					label: '采购组织',
					key: 'purchaseorg',
					showColumns: false,
				},
				{
					label: '供应商',
					width:250,
					key: 'supplier'
				},
				{
					label: '单据状态',
					key: 'orderstatus'
				}
			]
		}
	};

	
	let listTableMeta = meta.purchaseOrderListTable;
	if (listTableMeta) {
		//显示序号
		listTableMeta.showIndex = true;
		//修改列渲染样式
		listTableMeta.columns = listTableMeta.columns.map((item, key) => {
			if (item.key == "ordercode") {
				item.render = (text, record, index) => {
					return (
						<a 
						  	style={{'textDecoration':'underline','cursor':'pointer'}}
							href={'#/purchaseOrder/card?type=browse&id=' + record.id.value}>
							{record.ordercode.value}
						</a>
					)
				}
			}
			return item
		});
		//添加折行显示列
		let newshowCol = {
			label: '采购员/采购部门/采购组织',
			width:250,
			key: 'merge',
			showColumns: true,
			render(text, record, index) {
				return (
					<span>
						{record.buyer.value+'-'+record.purchasedepartment.value}<br />
						{record.purchaseorg.value}
					</span>
				);
			}
		}
		listTableMeta.columns.splice(3,0,newshowCol);
		//添加表格操作列
		let event = {
			label: '操作',
			key: 'opr',
			showColumns: true,
			render(text, record, index) {
				return (
					<span>
						<i
							className="icon iconfont icon-bianji"
							onClick={() => {
								window.location.hash = `/purchaseOrder/card?type=edit&id=${record.id.value}`;
							}}
						/>
						<NCPopconfirm trigger="click" placement="top" content="确认删除?" onClose={()=>{
							console.log("删除",index)
						}}>
							{<i className="icon iconfont icon-shanchu"/>}
						</NCPopconfirm>
					</span>
				);
			}
		};
		listTableMeta.columns.push(event);
	}

	return meta;
}