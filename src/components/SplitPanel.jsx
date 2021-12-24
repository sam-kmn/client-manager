const SplitPanel = ({ left, right }) => {
  return (
    <div className="container mt-4">
      <div className="row justify-content-center">
        <div className="col-12 col-sm-auto">{left}</div>
        <div className="col-12 col-sm-auto">{right}</div>
      </div>
    </div>
  );
};

export default SplitPanel;
