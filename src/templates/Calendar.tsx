const Calendar = () => {
  const date = new Date();
  const locale = 'en-GB';
  const month = date.toLocaleString('default', { month: 'long' });
  const day = date.getDate();
  const weekday = date.toLocaleDateString(locale, { weekday: 'long' });

  return (
    <div className="text-center flex flex-col p-4 sm:text-left sm:flex-row sm:items-center sm:justify-between sm:p-12 bg-primary-100 rounded-md col-span-1">
      <h1>{day}</h1>
      <h2>
        <p>of {month},</p>
        <p>
          <b>{weekday}</b>
        </p>
      </h2>
    </div>
  );
};

export { Calendar };
