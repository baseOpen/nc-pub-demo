
import {Router, Route, hashHistory} from 'react-router';


import FinanceMessageCard from 'containers/finance/finance_message/card';
import FinanceMessageList from 'containers/finance/finance_message/list';
import FinanceMessageMain from 'containers/finance/finance_message/main';
import BankFilesList from 'containers/baseDoc/bank/list';
import OrderList from 'containers/purchaseOrder/list';
import OrderCard from 'containers/purchaseOrder/card';


export default (
<Router history={hashHistory}>
    <Route path="/finance/finance_message/list" component={FinanceMessageList} />
    <Route path="/finance/finance_message/card" component={FinanceMessageCard} />
    <Route path="/finance/finance_message/main" component={FinanceMessageMain} />
    <Route path="/baseDoc/bank/list" component={BankFilesList} />
    <Route path="/purchaseOrder/list" component={OrderList} />
    <Route path="/purchaseOrder/card" component={OrderCard} />
</Router>
)
