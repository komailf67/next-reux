import {combineReducers} from "redux";
import {productsReducer} from "./productsReducer";
import {categoryReducer} from "./categoryReducer";
import {formReducer} from "./formReducer";
import {salesReducer} from "./salesReducer";
import {modalReducer} from "./modalReducer";
import {serviceReducer} from "./serviceReducer";
import {messageReducer} from "./messageReducer";
import {expensesReducer} from "./expensesReducer";
import {debtorsReducer} from "./debtorsReducer";
import {salariesReducer} from "./salariesReducer";
import {investorsSalariesReducer} from "./investorsSalariesReducer";

const rootReduces = combineReducers({
    categories: categoryReducer,
    products: productsReducer,
    formReducer: formReducer,
    sales: salesReducer,
    isOpenModal: modalReducer,
    services: serviceReducer,
    messageShowed: messageReducer,
    expenses: expensesReducer,
    debtors: debtorsReducer,
    salaries: salariesReducer,
    investorsSalaries: investorsSalariesReducer
});

export default rootReduces;
