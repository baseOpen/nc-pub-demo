import { ajax } from 'nc-lightapp-front';
export default function (props) {
    let pageInfo = props.table.getTablePageInfo('financeListTable');
    let searchVal = props.search.getAllSearchData('financeSearchArea');

    searchVal.page = pageInfo.page;
    searchVal.size = pageInfo.size;
    searchVal.sort = {
        property: "investdate",
        direction: "desc"
    }
    let data = {
        page: pageInfo.page,
        size: pageInfo.size,
        searchParams: {
            'searchMap': searchVal
        }
    }
    //得到数据渲染到页面
    ajax({
        url: '/demo-web/demo/inment/search',
        data: data,
        success: function (res) {
            props.table.setAllTableData('financeListTable', res.data.invest)
        }
    });
}