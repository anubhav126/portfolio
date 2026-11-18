import { journeyTimeline } from './index';

export const TimeLineData = journeyTimeline.map((item) => ({
  year: item.year,
  text: item.title,
  details: item.description,
}));
