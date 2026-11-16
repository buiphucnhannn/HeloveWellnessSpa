// Bộ icon SVG inline (stroke, currentColor). Dùng: <Phone className="h-4 w-4" />
const make = (paths, { fill = false, viewBox = "0 0 24 24" } = {}) =>
  function Icon({ className = "h-5 w-5" }) {
    return (
      <svg
        viewBox={viewBox}
        fill={fill ? "currentColor" : "none"}
        stroke={fill ? "none" : "currentColor"}
        strokeWidth={1.7}
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
        aria-hidden="true"
      >
        {paths}
      </svg>
    );
  };

export const Phone = make(
  <path d="M3 5a2 2 0 0 1 2-2h3.28a1 1 0 0 1 .95.68l1.5 4.5a1 1 0 0 1-.5 1.21l-2.26 1.13a11 11 0 0 0 5.52 5.52l1.13-2.26a1 1 0 0 1 1.21-.5l4.5 1.5a1 1 0 0 1 .68.95V19a2 2 0 0 1-2 2h-1C9.72 21 3 14.28 3 6V5z" />,
);
export const MapPin = make(
  <>
    <path d="M12 21s-7-6.13-7-11a7 7 0 1 1 14 0c0 4.87-7 11-7 11z" />
    <circle cx="12" cy="10" r="2.5" />
  </>,
);
export const Clock = make(
  <>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3 2" />
  </>,
);
export const Calendar = make(
  <>
    <rect x="3" y="5" width="18" height="16" rx="2" />
    <path d="M3 10h18M8 3v4M16 3v4" />
  </>,
);
export const ArrowRight = make(<path d="M5 12h14m-6-6 6 6-6 6" />);
export const ArrowUp = make(<path d="M12 19V5m-6 6 6-6 6 6" />);
export const ChevronLeft = make(<path d="m15 6-6 6 6 6" />);
export const ChevronRight = make(<path d="m9 6 6 6-6 6" />);
export const Close = make(<path d="M6 6l12 12M18 6 6 18" />);
export const Check = make(<path d="m5 12 4.5 4.5L19 7" />);
export const Plus = make(<path d="M12 5v14M5 12h14" />);
export const Star = make(
  <path d="m12 3 2.7 5.7 6.3.8-4.6 4.3 1.2 6.2L12 17l-5.6 3 1.2-6.2L3 9.5l6.3-.8L12 3z" />,
  { fill: true },
);
export const Sparkle = make(
  <path d="M12 3c.6 4.8 3.2 7.4 8 8-4.8.6-7.4 3.2-8 8-.6-4.8-3.2-7.4-8-8 4.8-.6 7.4-3.2 8-8z" />,
  { fill: true },
);
export const Quote = make(
  <path d="M7.5 6C5 6 3 8 3 10.5c0 2.2 1.6 4 3.7 4.4-.4 1.6-1.4 2.8-3.2 3.6l.8 1.5C8 18.7 10 16 10 12.2 10 8.7 9 6 7.5 6zm10 0C15 6 13 8 13 10.5c0 2.2 1.6 4 3.7 4.4-.4 1.6-1.4 2.8-3.2 3.6l.8 1.5c3.7-1.3 5.7-4 5.7-7.8C20 8.7 19 6 17.5 6z" />,
  { fill: true },
);
export const Facebook = make(
  <path d="M15 3h-2a4 4 0 0 0-4 4v3H7v4h2v7h4v-7h3l1-4h-4V7a1 1 0 0 1 1-1h2V3z" />,
);
export const Messenger = make(
  <>
    <path d="M12 3C6.9 3 3 6.7 3 11.4c0 2.6 1.2 4.9 3.2 6.4V21l2.9-1.6c.9.3 1.9.4 2.9.4 5.1 0 9-3.7 9-8.4S17.1 3 12 3z" />
    <path d="m7.5 13.5 3-3.2 2.2 2 3.8-2.8-3 3.2-2.2-2-3.8 2.8z" fill="currentColor" />
  </>,
);
export const Zalo = make(
  <>
    <rect x="2.5" y="3.5" width="19" height="17" rx="5" />
    <path d="M7 9.2h3.4L7 14.4h3.6M12.3 11v3.4M12.3 11.6c.5-.6 2.4-.8 2.4 1.1s-1.9 1.9-2.4 1.2M16.6 9v5.4" />
  </>,
);
export const Leaf = make(<path d="M5 19c7 0 13-5 14-14-9 1-14 7-14 14zm0 0c2-4 5-7 9-9" />);
export const Gift = make(
  <>
    <rect x="3" y="8" width="18" height="4" rx="1" />
    <path d="M5 12v8h14v-8M12 8v12M12 8S10.5 3.5 8 4.5 9.5 8 12 8zm0 0s1.5-4.5 4-3.5S14.5 8 12 8z" />
  </>,
);
