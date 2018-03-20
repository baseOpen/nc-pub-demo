// import Ajax from '../../../../../src/api/ajax';
// import toast from '../../../../../src/api/toast';
// import { NCUnit, NCPopconfirm } from '../../../../../src/base';
import { ajax, toast,base} from 'nc-lightapp-front';
const {NCUnit, NCPopconfirm } = base;

export default function (props) {
	let meta = {
		purchaseOrderCardForm1: {
			moduleType: 'form',
			items: [
				{
					label: '选择仓库',
					key: 'store',
					config: {
						refcode: 'store',
						refType: 'tree',
						queryGridUrl:'/newdemo-web/demo/matrial/matrialtree',
						queryTreeUrl:'/newdemo-web/demo/matrialclass/matrialclasstree'
					},
					initialValue: '',
					placeholder: '选择仓库',
					col: 3,
					leftSpace: 0,
					rightSpace: 0,
					rows: 3,
					required: true,
					itemType: 'refer'
				},
				{
					key: 'storekeeper',
					label: '选择库管员',
					config: {
						refcode: 'storekeeper',
						refType: 'grid',
						queryGridUrl:'/newdemo-web/demo/matrial/matrialtree',
						queryTreeUrl:'/newdemo-web/demo/matrialclass/matrialclasstree'
					},
					itemType: 'refer',
					disabled: true,
					col: 3,
					rows: 3,
					leftSpace: 0,
					rightSpace: 6,
				}
			]
		},
		purchaseOrderCardForm2: {
			moduleType: 'form',
			items: [
				{
					key: 'purchaseorg',
					label: '选择采购组织',
					itemType: 'refer',
					config: {
						refcode: 'purchaseorg',
						refType: 'grid',
						isMultiSelectedEnabled: true,
						queryGridUrl:'/newdemo-web/demo/matrial/matrialtree',
						queryTreeUrl:'/newdemo-web/demo/matrialclass/matrialclasstree'
					},
					col: 3,
					leftSpace: 0,
					rightSpace: 0,
				},
				{
					key: 'buyer',
					label: '选择采购员',
					itemType: 'refer',
					config: {
						refcode: 'buyer'
					},
					col: 3,
					leftSpace: 0,
					rightSpace: 0,
				},
				{
					key: 'purchasedepartment',
					label: '选择采购部门',
					itemType: 'refer',
					config: {
						refcode: 'purchasedepartment',
						refType: 'tree',
						isMultiSelectedEnabled: true,
						queryGridUrl:'/newdemo-web/demo/matrial/matrialtree',
						queryTreeUrl:'/newdemo-web/demo/matrialclass/matrialclasstree'
					},
					col: 3,
					leftSpace: 0,
					rightSpace: 0,
				},
				{
					key: 'supplier',
					label: '选择供应商',
					itemType: 'refer',
					required: true,
					config: {
						refcode: 'supplier',
						refType: 'grid',
						isMultiSelectedEnabled: true,
						queryGridUrl:'/newdemo-web/demo/matrial/matrialtree',
						queryTreeUrl:'/newdemo-web/demo/matrialclass/matrialclasstree'
					},
					col: 3,
					leftSpace: 0,
					rightSpace: 0,
				}
			]
		},
		purchaseOrderCardForm3: {
			moduleType: 'form',
			items: [
				{
					key: 'ordercode',
					label: '单据编号',
					itemType: 'label',
					col: 4,
					leftSpace: 0,
					rightSpace: 0,
				},
				{
					key: 'orderdate',
					label: '单据日期',
					required: true,
					itemType: 'datepicker',
					col: 4,
					leftSpace: 0,
					rightSpace: 0,
				},
				{
					key: 'purchaseback',
					label: '采购退库',
					itemType: 'switch',
					col: 4,
					initialValue: 1,
					leftSpace: 0,
					rightSpace: 0,
				},
				{
					key: 'comm',
					label: '备注',
					itemType: 'textarea',
					col: 4,
					leftSpace: 0,
					rightSpace: 0,
				}
			]
		},
		purchaseOrderCardTable: {
			moduleType: 'table',
			pagination: false,
			columns: [
				{
					label: '物料',
					key: 'materiel',
					itemType: 'input',
					showColumns: false
				},
				{
					label: '规格',
					key: 'specification',
					itemType: 'input',
					showColumns: false
				},
				{
					label: '型号',
					key: 'model',
					itemType: 'input',
					showColumns: false
				},
				{
					label: '批次号',
					key: 'batchno',
					itemType: 'refer',
					config: {
						refType: "grid",
						refCode: 'materiel',
						queryGridUrl: '/newdemo-web/demo/matrial/matrialtree',
						showLabel: false,
					}
				}, {
					label: '货权组织',
					key: 'huoquan',
					itemType: 'refer',
					config: {
						refType: "grid",
						refCode: 'materiel',
						queryGridUrl: '/newdemo-web/demo/matrial/matrialtree',
						showLabel: false,
					}
				}, {
					label: '使用组织',
					key: 'useorgan',
					itemType: 'refer',
					config: {
						refType: "grid",
						refCode: 'materiel',
						queryGridUrl: '/newdemo-web/demo/matrial/matrialtree',
						showLabel: false,
					}
				},
				{
					label: '应收数量',
					key: 'shouldnum',
					itemType: 'input',
					showColumns: false
				},
				{
					label: '实收数量',
					key: 'actualnum',
					itemType: 'input',
					showColumns: false
				}
			]
		}
	};


	let form3Meta = meta.purchaseOrderCardForm3;
	if (form3Meta) {
		//单据日期默认为今天
		form3Meta.items.forEach((item, index) => {
			if (item.key === 'orderdate') {
				let today = new Date().getFullYear() + "-" + (new Date().getMonth() + 1) + "-" + new Date().getDate();
				item.initialValue = today;
			}
		})
	}

	let cardTableMeta = meta.purchaseOrderCardTable;
	if (cardTableMeta) {
		cardTableMeta.showIndex = true;
		//添加折行显示列
		let newshowCol1 = {
			label: '物料/规格/型号',
			key: 'merge1',
			render(text, record, index) {
				let recordVal = record.values;
				return (
					<span>
						{recordVal.materiel.value}<br />
						{recordVal.specification.value} <br />
						{recordVal.model.value}
					</span>
				);
			}
		}
		cardTableMeta.columns.unshift(newshowCol1);

		//添加折行显示列
		let newshowCol2 = {
			label: '应收数量/实收数量',
			key: 'merge2',
			render(text, record, index) {
				let recordVal = record.values;
				return (
					//获取表格状态 表格和表单有自己的status
					props.getPageStatus() === 'browse' ? (
						<span>
							{recordVal.shouldnum.value}<br />
							<span style={{'color':'#F6720F'}}>{recordVal.actualnum.value}</span><br />
						</span>
					) : (
							<span>
								<NCUnit
									value={recordVal.shouldnum.value}
									unitValue={recordVal.shouldunit.value}
									options={[
										{
											display: '箱',
											value: '0'
										},
										{
											display: '台',
											value: '1'
										},
										{
											display: '个',
											value: '2'
									}]}
									onChangeInput={(value) => {
										// 若为采购退库，应收数量不允许录入正数；否则，不允许录入负数。
										let purchaseback = props.form.getFormItemsValue('purchaseOrderCardForm3','purchaseback');
										if(purchaseback.value===1){
											if(Number(value)>0){
												toast({
													'color':'warning',
													'content':'采购退库时,应收数量不大于0！'
												})
												return;
											}
										}else{
											if(Number(value)<0){
												toast({
													'color':'warning',
													'content':'采购退库时,应收数量须不小于0！'
												})
												return;
											}
										}
										props.editTable.setValByKey('purchaseOrderCardTable', index, 'shouldnum', value);
									}}
									onChangeUnit={(value, display) => {										
										props.editTable.setValByKey('purchaseOrderCardTable', index, 'shouldunit', value, display);
										props.editTable.setValByKey('purchaseOrderCardTable', index, 'actualunit', value, display);										
									}}
								/> <br />
								<NCUnit
									value={recordVal.actualnum.value}
									unitValue={recordVal.actualunit.value}
									options={[
										{
											display: '箱',
											value: '0'
										},
										{
											display: '台',
											value: '1'
										},
										{
											display: '个',
											value: '2'
									}]}
									onChangeInput={(value) => {
										// 若为采购退库，实收数量不允许录入正数；否则，不允许录入负数。
										let purchaseback = props.form.getFormItemsValue('purchaseOrderCardForm3','purchaseback');
										if(purchaseback.value===1){
											if(Number(value)>0){
												toast({
													'color':'warning',
													'content':'采购退库时,实收数量不大于0！'
												})
												return;
											}
										}else{
											if(Number(value)<0){
												toast({
													'color':'warning',
													'content':'采购退库时,实收数量须不小于0！'
												})
												return;
											}
										}
										props.editTable.setValByKey('purchaseOrderCardTable', index,'actualnum', value);
									}}
									onChangeUnit={(value, display) => {
										props.editTable.setValByKey('purchaseOrderCardTable', index,'shouldunit', value,display );
										props.editTable.setValByKey('purchaseOrderCardTable', index, 'actualunit', value, display);
									}}
								/>
							</span>
					)
				);
			}
		}
		cardTableMeta.columns.push(newshowCol2);

		//添加表格操作列
		let event = {
			label: '操作',
			key: 'opr',
			render(text, record, index) {
				let recordVal = record.values;
				return (
					<div>
						<span
							className="opr-col"
							onClick={() => {
								props.editTable.pasteRow('purchaseOrderCardTable', record, index)
							}}
						>
							复制
						</span><br />
						<span
							className="opr-col"
							onClick={() => {

							}}
						>
							货位序列号
						</span><br />
						<NCPopconfirm trigger="click" placement="top" content="确认删除?" onClose={() => {
							props.editTable.delRow('purchaseOrderCardTable', index);
						}}>
							<span className="opr-col">删除</span>
						</NCPopconfirm>
					</div>
				);
			}
		};
		cardTableMeta.columns.push(event);

		meta.purchaseOrderCardTable = cardTableMeta;
	}


	return meta;
}