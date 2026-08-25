import React, { useContext, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { UserContext } from '../../context/Authentication';
import axios from 'axios';

const generateCaptcha = () => {
    return Array.from({ length: 6 }, () => Math.floor(Math.random() * 10)).join(' ');
};

const PaymentPage = () => {
    const [captcha, setCaptcha] = useState(generateCaptcha());
    const [captchaInput, setCaptchaInput] = useState('');
    const [showErrors, setShowErrors] = useState(false);
    const [captchaError, setCaptchaError] = useState('');
    const { carts, user, purchesCart, updatePurchesCart, updateCarts } = useContext(UserContext);

    const refreshCaptcha = () => {
        setCaptcha(generateCaptcha());
        setCaptchaError('');
    };

    const formik = useFormik({
        initialValues: {
            name: '',
            cardNumber: '',
            expiryDate: '',
            cvv: '',
        },
        validationSchema: Yup.object({
            name: Yup.string().required('نام و نام خانوادگی الزامی است'),
            cardNumber: Yup.string()
                .matches(/^\d{16}$/, 'شماره کارت باید 16 رقم باشد')
                .required('شماره کارت الزامی است'),
            expiryDate: Yup.string()
                .matches(/^(0[1-9]|1[0-2])\/\d{2}$/, 'تاریخ انقضا باید به فرمت MM/YY باشد')
                .required('تاریخ انقضا الزامی است'),
            cvv: Yup.string()
                .matches(/^\d{3}$/, 'CVV باید 3 رقم باشد')
                .required('CVV الزامی است'),
        }),
        onSubmit: async (values) => { // اینجا درست کردیم
            const sanitizedCaptcha = captcha.replace(/\s+/g, '');
            if (captchaInput.trim() !== sanitizedCaptcha) {
                setCaptchaError('کد تایید نادرست است.');
            } else {
                alert(`پرداخت با موفقیت انجام شد! نام: ${values.name}`);

                // بررسی اینکه purchesCart یک آرایه است
                const newPurchesCart = Array.isArray(purchesCart) ? [
                    ...purchesCart,
                    ...carts,
                ] : [...carts]; // اگر purchesCart نال بود، فقط carts را اضافه کنید

                // به‌روزرسانی purchesCart و خالی کردن carts
                await updatePurchesCart(newPurchesCart);
                
                // خالی کردن carts
                await updateCarts([]); // اینجا باید carts را خالی کنیم

                // همچنین می‌توانید اطلاعات کاربر را به‌روزرسانی کنید اگر لازم باشد
                if (user) {
                    try {
                        await axios.patch(`http://localhost:3001/users/${user.id}`, {
                            carts: [], // خالی کردن carts در پایگاه داده
                        });
                    } catch (error) {
                        console.error("Error updating user carts in database:", error);
                    }
                }

                // Reset the form fields and captcha
                formik.resetForm();
                setCaptchaInput('');
                refreshCaptcha();
            }
        },
    });

    const handleBlur = async (field) => {
        await formik.validateField(field);
        setShowErrors(true);
    };

    return (
        <div className="payment-container">
            <div className="card">
                <div className="card-number">
                    {formik.values.cardNumber || '#### #### #### ####'}
                </div>
                <div className="card-details">
                    <div>{formik.values.name || 'نام دارنده کارت'}</div>
                    <div>{formik.values.expiryDate || 'MM/YY'}</div>
                </div>
            </div>
            <h1 className="payment-title">پرداخت</h1>
            <form onSubmit={formik.handleSubmit}>
                <div className="input-group">
                    <label className="input-label3">نام و نام خانوادگی:</label>
                    <input 
                        type="text" 
                        className={`input-field ${showErrors && formik.touched.name && formik.errors.name ? 'error' : ''}`} 
                        placeholder="مثال: محمد رضایی" 
                        {...formik.getFieldProps('name')} 
                        onBlur={() => handleBlur('name')}
                    />
                    {showErrors && formik.touched.name && formik.errors.name ? (
                        <div className="error">{formik.errors.name}</div>
                    ) : null}
                </div>
                <div className="input-group">
                    <label className="input-label3">شماره کارت:</label>
                    <input 
                        type="text" 
                        className={`input-field ${showErrors && formik.touched.cardNumber && formik.errors.cardNumber ? 'error' : ''}`} 
                        placeholder="شماره 16 رقمی" 
                        maxLength={16}
                        {...formik.getFieldProps('cardNumber')} 
                        onBlur={() => handleBlur('cardNumber')}
                    />
                    {showErrors && formik.touched.cardNumber && formik.errors.cardNumber ? (
                        <div className="error">{formik.errors.cardNumber}</div>
                    ) : null}
                </div>
                <div className="input-group">
                    <label className="input-label3">تاریخ انقضا (MM/YY):</label>
                    <input 
                        type="text" 
                        className={`input-field ${showErrors && formik.touched.expiryDate && formik.errors.expiryDate ? 'error' : ''}`} 
                        placeholder="مثال: 12/25"
                        {...formik.getFieldProps('expiryDate')} 
                        onBlur={() => handleBlur('expiryDate')}
                    />
                    {showErrors && formik.touched.expiryDate && formik.errors.expiryDate ? (
                        <div className="error">{formik.errors.expiryDate}</div>
                    ) : null}
                </div>
                <div className="input-group">
                    <label className="input-label3">CVV:</label>
                    <input 
                        type="text" 
                        className={`input-field ${showErrors && formik.touched.cvv && formik.errors.cvv ? 'error' : ''}`} 
                        placeholder="3 رقمی" 
                        maxLength={3}
                        {...formik.getFieldProps('cvv')} 
                        onBlur={() => handleBlur('cvv')}
                    />
                    {showErrors && formik.touched.cvv && formik.errors.cvv ? (
                        <div className="error">{formik.errors.cvv}</div>
                    ) : null}
                </div>
                <div className="captcha-container">
                    {captcha}
                    <button type="button" className="refresh-button" onClick={refreshCaptcha}>تازه‌سازی</button>
                </div>
                <div className="input-group">
                    <label className="input-label3">کد تایید:</label>
                    <input 
                        type="text" 
                        className="input-field" 
                        value={captchaInput} 
                        onChange={(e) => setCaptchaInput(e.target.value)} 
                    />
                    {captchaError && <div className="error">{captchaError}</div>}
                </div>
                <input type="submit" className="submit-button" value="پرداخت" />
            </form>
            <p className="footer-text">با پرداخت این مبلغ، موافقت خود را با شرایط و قوانین اعلام می‌کنید.</p>
        </div>
    );
};

export default PaymentPage;