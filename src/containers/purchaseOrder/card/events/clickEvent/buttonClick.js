// import Ajax from '../../../../../src/api/ajax';
// import {NCMessage,NCModal} from '../../../../../src/base'
import { ajax, base} from 'nc-lightapp-front';
const {NCMessage,NCModal} = base;
//点击查询，获取查询区数据
export default function buttonClick(props, id) {
    switch (id) {
        case 'saveButton':
        let formIds = ['purchaseOrderCardForm1','purchaseOrderCardForm2','purchaseOrderCardForm3'];
        let flag =  props.form.getAllRequiredItems(formIds);
        if(flag){
            let formData = props.form.getAllFormValue(formIds);
            console.log(formData)
                // Ajax({
                // 	method: 'post',
                // 	//url: '/demo-web/demo/inment/save',
                // 	data: { data: data },
                // 	success: function (res) {
                        
                // 	}
                // });

                setTimeout(()=>{
                    props.setPageStatus('browse', props.location.query.id);
                    props.editTable.setStatus('purchaseOrderCardTable', 'browse');
                },500)
        }
            
            break;
        case 'cancelButton':
            if (props.getPageStatus() != 'add') {
                //编辑返回上一次的值
                props.editTable.cancelEdit('purchaseOrderCardTable');
                //表单返回上一次的值
                let oldFormData = props.form.getCacheFormData();
                props.form.setAllFormValue(oldFormData);
            }
            //页面回退	
            history.back();
			break;
        case 'editButton':
            props.setPageStatus('edit', this.getPageParam('id'));
            break;
        case 'copyButton':
        
        break;
        case 'deleteButton':

        break;
        case 'backButton':
            window.location.hash = '/purchaseOrder/list';
        break;
        case 'getNumButton':
            let shouldNums = props.editTable.getColValue('purchaseOrderCardTable', 'shouldnum');
            props.editTable.setColValue('purchaseOrderCardTable', 'actualnum',shouldNums);
        break;
		default:
			break;
	}
};
