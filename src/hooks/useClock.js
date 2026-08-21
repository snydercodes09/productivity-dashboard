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
    }

    let timeoutId;
    function scheduleNextUpdate() {
      const now = new Date();
      // ⚡ Bolt: Calculate exact ms until the next minute.
      // Expected Impact: Reduces Navbar re-renders from 60 per minute to just 1 per minute, saving CPU cycles.
      const msUntilNextMinute = 60000 - (now.getSeconds() * 1000 + now.getMilliseconds());
      timeoutId = setTimeout(() => {
        update();
        scheduleNextUpdate();
      }, msUntilNextMinute);
    }

    update();
    scheduleNextUpdate();

    return () => clearTimeout(timeoutId);
  }, []);

  return { time, date, timeGroup };
}
