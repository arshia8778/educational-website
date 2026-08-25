import { useContext } from "react";
import { UserContext } from "../../context/Authentication";
import { Link } from "react-router-dom";

const UserCourse = () => {
    const { user, purchesCart } = useContext(UserContext);


    return (
        <>
            {Array.isArray(purchesCart) && purchesCart.length > 0 ? (
                <section className="container mt-50 mb-50">
                    <div className="wrap-product-box">
                        <div className="title-course">
                            <h1>دوره‌های خریداری شده</h1>
                        </div>
                        <div className="clearfix"></div>
                        {purchesCart.map(cart => (
                            <div className="product-box" key={cart.cartId}>
                                <div className="product-box-img">
                                    <img src={cart.cartImg} alt={cart.cartTitle} />
                                </div>
                                <div className="title-discription">
                                    <h2>
                                        <a>{cart.cartTitle}</a>
                                    </h2>
                                </div>
                                <div className="meta">
                                    <div className="carts-edit">
                                        <i className="fa-solid fa-chalkboard-user"></i>
                                        {cart.cartTeacher}
                                    </div>
                                </div>
                                <div className="price-box">
                                    <div className="price" style={{color:"green"}}>خریداری شده است!</div>
                                </div>
                                <div className="clearfix"></div>
                                <Link to={`/course/${cart.cartId}`}>
                                    <div className="more">
                                        شروع کردن آموزش
                                        <i aria-hidden="true" className="fas fa-long-arrow-alt-left"></i>
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </div>
                </section>
            ) : (
                <div className="title-course" style={{ color: "red" }}>
                    <h1>دوره ای خریداری نشده!</h1>
                </div>
            )}
        </>
    );
};

export default UserCourse;