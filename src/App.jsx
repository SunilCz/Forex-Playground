import { useState, useEffect } from "react";
import { apiService } from "./services/apiService";
import { Spinner } from "./components/Spinner";
import { Paginator } from "./components/Paginator";
import { RatesTable } from "./components/RatesTable";
import { CurrencyConverter } from "./components/CurrencyConverter";

function App() {
  const perPage = 1;
  const from = "2023-12-20";
  const to = "2023-12-21";
  const [isLoading, setIsLoading] = useState(false);
  const [information, setInformation] = useState(null);
  const [currentPage, setCurrentPage] = useState(2);
  const [totalPages, setTotalpages] = useState(1);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function getRates() {
      try {
        setIsLoading(true);
        const response = await apiService.get(
          `/rates?per_page=${perPage}&page=${currentPage}&from=${from}&to=${to}`,
          {
            per_page: perPage,
            page: currentPage,
            from: from,
            to: to,
          },
        );
        setIsLoading(false);
        setInformation(response.data.data.payload);
        setTotalpages(response.data.pagination.pages);
        setError(null);
      } catch (error) {
        console.log("ERROR: ", error);
        setError("Error fetching information.");
      }
    }
    getRates();
  }, [currentPage]);

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <>
      <div className="bg-gray-100 min-h-screen">
        <div className="max-w-6xl mx-auto">
          <h1 className="p-16 text-center font-semibold text-4xl">
            FOREX Playground (NRB)
          </h1>
          {error && <p className="text-red-500 text-center text-sm">{error}</p>}
          {isLoading ? (
            <Spinner />
          ) : (
            <div>
              {information && (
                <CurrencyConverter rates={information[0].rates} />
              )}
              <RatesTable information={information} />
              <Paginator
                currentPage={currentPage}
                totalPages={totalPages}
                goToNextPage={goToNextPage}
                goToPreviousPage={goToPreviousPage}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
