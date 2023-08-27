import "./customerReview.css";

const CustomerReview = () => {
  return (
    <main className="main">
      <div className="customer-review">
        <div className="customer-review__header">
          {" "}
          <h2 className="font-heading ma-bt-md">Review for {}</h2>
        </div>
        <div className="customer-review__body">
          <div className="tour-infomation">hi, tourInfo</div>
          <div className="customer-review-section">hi, reviewSection</div>
        </div>
      </div>
    </main>
  );
};

export default CustomerReview;
