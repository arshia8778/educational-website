import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getFaqOrgInfo } from "../../../services/CardsServices";
import NotFound from "../../global/NotFound";
import Spinner from "../../global/Spinner";

const FaqOrgInfo = () => {
  const { FaqOrgId } = useParams();
  const [faqInfo, setFaqInfo] = useState({});
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);
  useEffect(() => {
    const fetchFaqDetails = async () => {
      try {
        const { data, status } = await getFaqOrgInfo(FaqOrgId);
        if (status === 200) {
          setFaqInfo(data);
          console.log(data);
        } else {
          setError(true);
        }
      } catch (error) {
        console.error("Error fetching FAQ details:", error);
        setError(true);
      }
    };
    fetchFaqDetails();
  }, [FaqOrgId]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
               {loading ? (
        <Spinner />
      ) : (
        <>
    <div className="security-container">
      <h1 className="security-title">{faqInfo.title}</h1>
      <img src={faqInfo.photo} alt={faqInfo.title} className="img-Faq" />
      {error ? (
        "صفحه یافت نشد"
      ) : Array.isArray(faqInfo.moreFaq) && faqInfo.moreFaq.length > 0 ? (
        faqInfo.moreFaq.map((faqItem) => (
          <div>
            <h2 className="security-section-title">{faqItem.title}</h2>
            <h3 className="security-subtitle">{faqItem.subtitle}</h3>
            <p className="security-paragraph">{faqItem.paragraph}</p>
            {faqItem.subtitle2 && (
              <>
                <h3 className="security-subtitle">{faqItem.subtitle2}</h3>
                <p className="security-paragraph">{faqItem.paragraph2}</p>
              </>
            )}
          </div>
        ))
      ) : (
        "صفحه یافت نشد"
      )}
      <h2 className="security-section-title">
        <i className="fas fa-check-circle security-icon"></i> نتیجه‌گیری
      </h2>
      <p className="security-paragraph">{faqInfo.finalyParagraph}</p>
    </div>
    </>
      )}
    </>
  );
};

export default FaqOrgInfo;
