import { useState, useEffect, useRef } from 'react';

export default function useClock() {
  const [time, setTime] = useState('--:--');
  const [date, setDate] = useState('Loading...');
  const [timeGroup, setTimeGroup] = useState('night');

  const timeFormatter = useRef(
    new Intl.DateTimeFormat('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    })
  );

  const dateFormatter = useRef(
    new Intl.DateTimeFormat('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    })
  );

  useEffect(() => {
    let timeoutId;

    function update() {
      const now = new Date();
      const hours = now.getHours();

      setTime(timeFormatter.current.format(now));
      setDate(dateFormatter.current.format(now));

      let group = 'night';
      if (hours >= 5 && hours < 11) group = 'morning';
      else if (hours >= 11 && hours < 14) group = 'noon';
      else if (hours >= 14 && hours < 17) group = 'afternoon';
      else if (hours >= 17 && hours < 19) group = 'goldenHour';
      else if (hours >= 19 && hours < 21) group = 'evening';
      setTimeGroup(group);

      // ⚡ Bolt: Calculate exact milliseconds until the next minute
      // Expected Impact: Reduces unnecessary timer executions by ~98% (from 60 per minute to 1)
      // since the clock only displays hours and minutes.
      const msUntilNextMinute = 60000 - (now.getSeconds() * 1000 + now.getMilliseconds());
      timeoutId = setTimeout(update, msUntilNextMinute);
    }

    update();
    return () => clearTimeout(timeoutId);
  }, []);

  return { time, date, timeGroup };
}
