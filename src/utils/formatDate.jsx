// utils/formatDate.js
export const formatDate = (isoDate) => {
    const date = new Date(isoDate);
  
    // Format options
    const options = {
      year: 'numeric',
      month: 'long',  // 'short' for abbreviations like 'Oct', 'numeric' for 10
      day: 'numeric',
    };
  
    return new Intl.DateTimeFormat('en-US', options).format(date);
  };
  