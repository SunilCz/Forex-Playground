export const Paginator = ({
  currentPage,
  totalPages,
  goToNextPage,
  goToPreviousPage,
}) => {
  return (
    <>
      <div className="p-8">
        <div className="flex items-center justify-end">
          <button
            disabled={currentPage === 1}
            onClick={goToPreviousPage}
            className="flex items-center justify-center px-4 h-10 text-base font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:text-gray-700"
          >
            Previous
          </button>

          <button
            disabled={currentPage === totalPages}
            onClick={goToNextPage}
            className="flex items-center justify-center px-4 h-10 ms-3 text-base font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:text-gray-700"
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
};
