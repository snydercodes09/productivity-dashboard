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

    // ⚡ Bolt: Sync clock updates with the system minute rollover instead of waking up every second.
    // Expected Impact: Reduces unnecessary React state updates and CPU wake-ups from 60x/min to 1x/min (98% reduction).
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

      const msUntilNextMinute = 60000 - (now.getSeconds() * 1000 + now.getMilliseconds());
      timeoutId = setTimeout(update, msUntilNextMinute);
    }

    update();

    return () => clearTimeout(timeoutId);
  }, []);

  return { time, date, timeGroup };
}
