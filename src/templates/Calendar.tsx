const Calendar = () => {
  const date = new Date();
  const locale = 'en-GB';
  const month = date.toLocaleString('default', { month: 'short' });
  const day = date.getDate();
  const weekday = date.toLocaleDateString(locale, { weekday: 'short' });

  return (
    <div className="text-center flex flex-col p-4 sm:text-left sm:flex-row sm:items-center sm:justify-center sm:p-8 bg-primary-100 rounded-md col-span-1">
      <h1 className="mobile-date">{day}</h1>
      <p>{`of ${month},`}</p>
      <h2>{weekday}</h2>
    </div>
  );
};

export { Calendar };
