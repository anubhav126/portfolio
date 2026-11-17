import { journeyTimeline } from './index';

export const TimeLineData = journeyTimeline.map((item) => ({
  year: parseInt(item.year, 10) || 2026,
  text: item.title,
  details: item.description,
}));
