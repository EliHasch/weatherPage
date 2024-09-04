const DAYS = [
    "Sonntag",
    "Montag",
    "Dienstag",
    "Mittwoch",
    "Donnerstag",
    "Freitag",
    "Samstag",
  ];

  const getWeekDay = (date) => {
    return DAYS[new Date(date * 1000).getDay()];
  }; 
  
  export {getWeekDay}