import type { CampusEvent } from "../../types/campus-event";
import EventCard from "./EventCard";

interface EventListProps {
  events: CampusEvent[];
  emptyText?: string;
  className?: string;
}

function EventList({
  events,
  emptyText = "Etkinlik bulunamadı.",
  className = "kartlar",
}: EventListProps) {
  if (events.length === 0) {
    return <p className="sonuc">{emptyText}</p>;
  }

  return (
    <div className={className}>
      {events.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </div>
  );
}

export default EventList;
