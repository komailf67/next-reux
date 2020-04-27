import React, { Component } from 'react';
import withRedux from "next-redux-wrapper";
import { initStore } from "../../../../redux/store";
import { IS_OPEN_MODAL, SALE_PRODUCTS } from "../../consts/actionsConstants";
import { dispatchActions, selectedProducts } from "../../../../redux/actions";
import { Table, Form, Col, InputGroup, FormControl } from "react-bootstrap";
import DatePicker from 'react-datepicker2';
import momentJalaali from 'moment-jalaali';
import $ from "jquery";
import SalesInvoicesItemModal from "./salesInvoicesItemModal";
import Modal, { ModalHeader, ModalBody, ModalFooter } from '../../modal/Modal.js';



class SaleModal extends Component {

    constructor(props) {
        super(props);

        this.state = {
            category: '',
            value: momentJalaali(),
        }
    }

    toggle = () => {
        this.props.fetchData('', IS_OPEN_MODAL, 0);
    }

    submitSale = () => {
        let commonDetails = {};
        commonDetails['buyerName'] = $('#seller').val();
        commonDetails['phoneNumber'] = $('#phone-number').val();
        commonDetails['guarantee'] = $('#guarantee').val();
        commonDetails['assurance'] = $('#assurance').val();
        commonDetails['date'] = $('.datepicker-input').val();
        commonDetails['amount'] = $('#invoice-sum').val();
        // console.log(commonDetails);
        
        let products = $('tr.product-for-sale');
        let productsDetails = [];
        $.map(products, function (value, index) {
            let eachProduct = {};            
            eachProduct['id'] = $(value).find('td.product-id').data('product-id');
            eachProduct['count'] = $(value).find('select.exist_count').val();
            eachProduct['buyPrice'] = $(value).find('td.buy-price').data('buy-price');
            eachProduct['sumSalePrice'] = $(value).find('input.sum-sale-price').val();
            productsDetails.push(eachProduct)
        });
        let soldProducts = {};
        soldProducts['commonDetails'] = commonDetails;
        soldProducts['uncommonDetails'] = productsDetails;
        // console.log(soldProducts);
        this.props.fetchData('http://127.0.0.1/api/sales', SALE_PRODUCTS, soldProducts);        
    }
    render() {
        let { is_open_modal, products, selectedProductsIds } = this.props;
        let selectedProductsRows = $.map(products, function (value, index) {            
            if (selectedProductsIds.indexOf(value.id) !== -1) {
                return [<SalesInvoicesItemModal key={index} row={index} product={value} />]
            }
        });

        return (
            <Modal dialogClassName="my-modal" isOpen={is_open_modal}>
                <ModalHeader>
                    <h3>فاکتور شماره</h3>
                </ModalHeader>
                <ModalBody>
                    <Form>
                        <Form.Row>
                            <Form.Group as={Col} className="input" controlId="seller">
                                <Form.Label>نام خریدار</Form.Label>
                                <Form.Control type="text" placeholder="" />
                            </Form.Group>
                            <Form.Group as={Col} controlId="phone-number">
                                <Form.Label>شماره تماس</Form.Label>
                                <Form.Control type="tel" placeholder="" />
                            </Form.Group>
                            <Form.Group as={Col} controlId="guarantee">
                                <Form.Label>گارانتی</Form.Label>
                                    <Form.Control className="guarantee" as="select" >
                                        <option value="0">ندارد</option>
                                        <option value="1">دارد</option>
                                    </Form.Control>
                            </Form.Group>
                            <Form.Group as={Col} controlId="assurance">
                                <Form.Label>بیمه</Form.Label>
                                    <Form.Control className="assurance" as="select" >
                                        <option value="0">ندارد</option>
                                        <option value="1">دارد</option>
                                    </Form.Control>
                            </Form.Group>
                            <Form.Group as={Col}>
                                <Form.Label>تاریخ خرید</Form.Label>
                                <DatePicker
                                    className="form-control"
                                    isGregorian={false}
                                    value={this.state.value}
                                    onChange={value => this.setState({ value })}
                                />
                            </Form.Group>
                        </Form.Row>
                    </Form>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>شناسه محصول</th>
                                <th>دسته بندی</th>
                                <th>عنوان</th>
                                <th>قیمت خرید</th>
                                <th>تعداد</th>
                                <th>قیمت مجموع</th>
                            </tr>
                        </thead>
                        <tbody>
                            {selectedProductsRows}
                            <tr>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td>مجموع فاکتور</td>
                                <td>
                                    <input id="invoice-sum" value="" disabled/> 
                                </td>
                            </tr>
                            <tr>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td>مجموع قابل قبول</td>
                                <td>
                                    <input id="acceptable-sum" value="" disabled/> 
                                </td>
                            </tr>
                        </tbody>
                    </Table>
                </ModalBody>
                <ModalFooter>
                <button
                    type="button"
                    className="btn btn-success"
                    onClick={this.submitSale}
                >
                    فروش
                </button>
                <button
                    type="button"
                    className="btn btn-danger"
                    onClick={products ? this.toggle : null }
                >
                    لغو
                </button>
                </ModalFooter>
            </Modal>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchData: (url, actionType, data) => dispatch(dispatchActions(url, actionType, data)),
    }
}
const mapStateToProps = (state) => {
    // console.log('f',state);
    return {
        is_open_modal: state.isOpenModal.is_open_modal,
        selectedProductsIds: state.sales.selectedProductsIds,
        products: state.products.products.data
    }
}

export default withRedux(initStore, mapStateToProps, mapDispatchToProps)(SaleModal);