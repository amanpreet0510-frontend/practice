export interface CalendarEvent {
  id: string;
  title: string;
  description?: string;
  date: string;
  type: "holiday" | "event" | "announcement";
}
