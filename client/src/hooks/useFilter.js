import { useState } from "react";

export const useFilter = () => {
  const FILTERS = {
    ALL: "all",
    WEEK: "past_week",
    MONTH: "past_month",
    MONTH_3: "past_3_months",
    CUSTOM: "custom",
  };
  const [filter, setFilter] = useState(FILTERS.ALL);
  const filtersArray = [
    { label: "All", value: FILTERS.ALL },
    { label: "Past Week", value: FILTERS.WEEK },
    { label: "Past month", value: FILTERS.MONTH },
    { label: "Past 3 months", value: FILTERS.MONTH_3 },
    { label: "Custom", value: FILTERS.CUSTOM },
  ];
  const selectFilter = (selectedFilter) => {
    setFilter(selectedFilter);
  };

  return { filter, filtersArray, selectFilter, FILTERS };
};
