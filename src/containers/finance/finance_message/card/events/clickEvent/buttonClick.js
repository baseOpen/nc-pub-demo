
import { createPage, base, ajax } from 'nc-lightapp-front';
const { NCMessage } = base;

export default function (props, id) {
	let { form } = props;
	switch (id) {
		case 'saveButton':
			//判断前5项必输内容，保存时校验不能为空。
			let flag1 = form.getAllRequiredItems('invest_form1');
			let flag2 = form.getAllRequiredItems('invest_form2');

			if (form.getFormItemsValue('invest_form2', 'hirepurchase')) {
				//子表总和应该等于主表投资金额
				let investmny = form.getFormItemsValue('invest_form2', 'investmny');
				//获取子表金额总和
				let tableDataRows = props.editTable.getAllRows('invest_table');
				let totalMny = 0;
				for (let i = 0; i < tableDataRows.length; i++) {
					totalMny = totalMny + parseFloat(tableDataRows[i].values.paymny.value);
				}
				if (totalMny != investmny) {
					NCMessage.create({ content: "付款金额总和应该等于投资金额!", color: 'danger' });
					return;
				}
			}

			//调用ajax保存数据
			if (flag1 && flag2) {
				let editTableData = props.editTable.getAllRows('invest_table');
				let data = {
					invest_form1: form.getAllFormValue('invest_form1'),
					invest_form2: form.getAllFormValue('invest_form2'),
					invest_table: {
						rows: editTableData
					}
				}
				if (editTableData.length === 0) {
					data = {
						invest_form1: form.getAllFormValue('invest_form1'),
						invest_form2: form.getAllFormValue('invest_form2'),
						invest_table: {}
					}
				}
				data.invest_form2.values.hirepurchase.value=data.invest_form2.values.hirepurchase.value ? 1:0;
				ajax({
					method: 'post',
					url: '/demo-web/demo/inment/save',
					data: { data: data },
					success: function (res) {
						props.setPageStatus('browse', props.location.query.id);
						props.editTable.setStatus('invest_table', 'browse');
						props.form.setAllFormValue("invest_form1", res.data.invest_form1.values);
						props.form.setAllFormValue("invest_form2", res.data.invest_form2.values);
						if (res.data.invest_table) {
							props.editTable.setTableData("invest_table", res.data.invest_table);
						}
					}
				});

			}
			break;
		case 'cancelButton':
			if (props.getPageStatus() != 'add') {
				//编辑返回上一次的值
				props.editTable.cancelEdit('invest_table');
				//表单返回上一次的值
				let formData = props.form.getCacheFormData();
				props.form.setAllFormValue("invest_form1", formData.invest_form1);
				props.form.setAllFormValue("invest_form2", formData.invest_form2);
			}
			//页面回退	
			history.back();
			break;
		case 'backButton':
			const hash = props.location.query.from;
			if(hash){
				window.location.hash = '/finance/finance_message/'+hash;
			}
			break;
		case 'editButton':
			props.setPageStatus('edit', props.location.query.id)
			break;
		case 'addRowButton':
			props.editTable.addRow('invest_table');
			break;
		default:
			break;
	}
}
