// import Ajax from '../../../../../src/api/ajax';
// import NCMessage from '../../../../../src/base/nc_Message'
import { ajax, base} from 'nc-lightapp-front';
const {NCMessage} = base;

export default function afterEvent(props,moduleId,key,value) {

    //表单一：
    if(moduleId==='purchaseOrderCardForm1'){
        //编辑仓库
       if(key==='store'){
           //自动赋值库管员
            props.form.setFormItemsValue('purchaseOrderCardForm1', { 'storekeeper': {display:'自动赋值',value:'323'} });
       }       
    }
    

    //表单二：
    if(moduleId==='purchaseOrderCardForm2'){
        //选择采购组织
        if(key==='purchaseorg'){
            //对采购员和采购部门过滤

        }
        //选择采购员
        if(key==='buyer'){
            //自动赋值采购部门
            props.form.setFormItemsValue('purchaseOrderCardForm2', { 'purchasedepartment': {display:'用友',value:'1212'} });
        }
    }
    
    
    
};