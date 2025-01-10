export const parseEventDate = (dateString: string): Date => {
    return new Date(dateString);
  };
  
  export const getDaysInMonth = (date: Date): Date[] => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const days: Date[] = [];
  
    // Add padding for days before the first day of the month
    for (let i = 0; i < firstDay.getDay(); i++) {
      days.push(new Date(year, month, 0 - i));
    }
  
    // Add days of the current month
    for (let i = 1; i <= lastDay.getDate(); i++) {
      days.push(new Date(year, month, i));
    }
  
    // Add padding for days after the last day of the month
    const paddingDays = 7 - (days.length % 7);
    if (paddingDays !== 7) {
      for (let i = 1; i <= paddingDays; i++) {
        days.push(new Date(year, month + 1, i));
      }
    }
  
    return days;
  };