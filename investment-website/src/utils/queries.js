function ValuationList() {
  const { loading, error, data } = useQuery(GET_VALUATIONS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  console.log(data); // Log the fetched data

  const valuations = data.getValuations;

  return (
    <div>
      <h1>Valuations</h1>
      <ul>
        {valuations.map((valuation) => (
          <li key={valuation.id}>
            {valuation.Ticker} - {valuation.Assessment_Date} - {valuation.previousClose}
            {/* Render other fields as needed */}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ValuationList;